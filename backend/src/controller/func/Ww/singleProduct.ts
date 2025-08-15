import puppeteer, { Browser, Page } from "puppeteer";

interface NutritionInfo {
  nutrient: string;
  perServing: string;
  per100g: string;
}

interface ProductDetails {
  title: string | null;
  price: string | null;
  pricePerQuan: string | null;
  imageUrls: (string | null)[] | null;
  productDetails: string | null;
  nutrition: NutritionInfo[] | null;
  nutritionNote: string | null;
}

const safeEval = async <T>(
  page: Page,
  selector: string,
  fn: (el: Element) => T 
): Promise<T | null> => {
  try {
    return await page.$eval(selector, fn);
  } catch (e) {
    console.warn(`Could not find or evaluate selector: ${selector}`);
    return null;
  }
};

const safeEvalAll = async <T>(
  page: Page,
  selector: string,
  fn: (els: Element[]) => T
): Promise<T | null> => {
  try {
    return await page.$$eval(selector, fn);
  } catch (e) {
    console.warn(`Could not find or evaluate selectorAll: ${selector}`);
    return null;
  }
};

export const scrapeWwSingleProduct = async (
  productUrl: string
): Promise<ProductDetails> => {
  let browser: Browser | null = null;
  try {
    browser = await puppeteer.launch({
      headless: false, 
      defaultViewport: null,
      userDataDir: "./tmp",
    });
    const page = await browser.newPage();

    await page.goto(productUrl, { waitUntil: "networkidle2" });

    const title = await safeEval(
      page,
      ".product-title_component_product-title__azQKW",
      (el) => el.textContent?.trim() ?? null
    );
    const price = await safeEval(
      page,
      ".product-price_component_price-lead__vlm8f",
      (el) => el.textContent?.trim() ?? null
    );
    const pricePerQuan = await safeEval(
      page,
      ".product-unit-price_component_price-cup-string__HdxP0",
      (el) => el.textContent?.trim() ?? null
    );
    const imageUrls = await safeEvalAll(
      page,
      ".image-thumbnails_thumbnails__1iOKe img",
      (imgs) => imgs.map((img) => img.getAttribute("src"))
    );
    const productDetails = await safeEval(
      page,
      ".text_component_text__ErEDp",
      (el) => (el as HTMLElement).innerText.trim() 
    );

    const nutrition = await safeEvalAll(
      page,
      ".nutritional-info_component_nutritional-info-panel__jgVXH ul.nutritional-info_component_nutrition-row__IYE_S",
      (rows) =>
        rows.slice(2).map((row) => {
          const [nutrientEl, perServingEl, per100gEl] = Array.from(
            row.querySelectorAll("li")
          );
          return {
            nutrient: nutrientEl?.textContent?.trim() ?? "N/A",
            perServing: perServingEl?.textContent?.trim() ?? "N/A",
            per100g: per100gEl?.textContent?.trim() ?? "N/A",
          };
        })
    );

    const nutritionNote = await safeEval(
      page,
      ".nutritional-info_component_nutrition-note__zPIVr",
      (el) => (el as HTMLElement).innerText.trim() 
    );

    const output: ProductDetails = {
      title,
      price,
      pricePerQuan,
      imageUrls,
      productDetails,
      nutrition,
      nutritionNote,
    };

    console.log("Scraping complete for single product.");
    return output;
  } catch (error) {
    console.error(
      "An error occurred during Woolworths single product scraping:",
      error
    );
    throw new Error(
      `Scraping failed for ${productUrl}: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  } finally {
    if (browser) {
      await browser.close();
      console.log("Browser closed.");
    }
  }
};
