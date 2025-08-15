import puppeteer, { Browser, Page } from "puppeteer";

interface GalleryImage {
  main: string | null;
  zoom: string | null;
}

interface NutritionInfo {
  nutrient: string | null;
  perServe: string | null;
  per100g: string | null;
}

interface ProductDetails {
  title: string | null;
  weight: string | null;
  gallery: GalleryImage[];
  thumbnails: (string | null)[];
  details: string | null;
  ingredients: string | null;
  nutrition: NutritionInfo[] | null;
}

const safeEval = async <T>(page: Page, selector: string, fn: (el: Element) => T): Promise<T | null> => {
  try {
    return await page.$eval(selector, fn);
  } catch (e) {
    console.warn(`Could not find selector: ${selector}`);
    return null;
  }
};

export const scrapeIgaSingleProduct = async (productUrl: string): Promise<ProductDetails> => {
  let browser: Browser | null = null;
  try {
    browser = await puppeteer.launch({
      headless: false, 
      defaultViewport: null,
      userDataDir: "./tmp",
    });
    const page = await browser.newPage();

    await page.goto(productUrl, { waitUntil: "load" });

    try {
      await page.waitForSelector("button[data-modal-close]", { timeout: 3000 });
      await page.click("button[data-modal-close]");
      await page.waitForSelector("button[data-modal-close]", { hidden: true });
      console.log("Guest modal dismissed successfully.");
    } catch {
      console.log("No guest modal to dismiss or it timed out.");
    }

    const title = await safeEval(page, ".line-clamp-3", el => el.textContent?.trim() ?? null);
    const weight = await safeEval(page, 'div.flex.flex-col.items-start.font-bold.text-lg.lg\\:text-2xl.leading-tight.gap-3 span.text-base', el => el.textContent?.trim() ?? null);

    const gallery = await page.$$eval("figure.iiz", figs =>
      figs.map(fig => ({
        main: fig.querySelector("img.iiz__img")?.getAttribute('src') ?? null,
        zoom: fig.querySelector("img.iiz__zoom-img")?.getAttribute('src') ?? null,
      }))
    ).catch(() => {
        console.warn("Could not find gallery images.");
        return [];
    });

    const thumbnails = await page.$$eval("div[data-active-index] button img", imgs => imgs.map(img => img.getAttribute('src'))).catch(() => {
        console.warn("Could not find thumbnails.");
        return [];
    });

    const details = await page.evaluate(() => {
      const detailDiv = Array.from(document.querySelectorAll("div")).find(d =>
        d.className.includes("[&_h4]:my-5") && d.className.includes("mb-5")
      );
      return detailDiv ? (detailDiv as HTMLElement).innerText.trim() : null;
    }).catch(() => {
        console.warn("Could not extract product details.");
        return null;
    });

    const ingredients = await page.evaluate(() => {
      const ingH3 = Array.from(document.querySelectorAll('h3')).find(h => h.textContent?.trim() === 'Ingredients');
      const ingDiv = ingH3?.nextElementSibling;
      return ingDiv ? (ingDiv as HTMLElement).innerText.trim() : null;
    }).catch(() => {
        console.warn("Could not extract ingredients.");
        return null;
    });

    let nutrition: NutritionInfo[] | null = null;
    try {
      await page.evaluate(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.trim() === 'Product Details');
        btn?.click();
      });
      await page.waitForSelector('table tbody tr', { timeout: 3000 });
      nutrition = await page.$$eval('table tbody tr', rows =>
        rows.map(row => {
          const [nutrientEl, perServeEl, per100gEl] = row.querySelectorAll('td');
          return {
            nutrient: nutrientEl?.innerText.trim() ?? null,
            perServe: perServeEl?.innerText.trim() ?? null,
            per100g:  per100gEl?.innerText.trim() ?? null
          };
        })
      );
    } catch (e) {
      console.warn("Could not extract nutrition information.");
    }

    const productData: ProductDetails = { title, weight, gallery, thumbnails, details, ingredients, nutrition };
    console.log("Scraping complete.");
    return productData;

  } catch (error) {
    console.error("An error occurred during IGA single product scraping:", error);
    throw new Error(`Scraping failed for ${productUrl}: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    if (browser) {
      await browser.close();
      console.log("Browser closed.");
    }
  }
};