import puppeteer from "puppeteer-extra";
import { setTimeout } from "node:timers/promises";
import { Browser, Page } from "puppeteer";

const StealthPlugin = require("puppeteer-extra-plugin-stealth");

interface NutritionInfo {
  nutrient: string;
  per100g: string;
  perServing: string;
  pctDI: string;
}

interface ProductDetails {
  title: string | null;
  price: string | null;
  saveAmount: string | null;
  imageUrls: (string | null)[];
  nutrition: NutritionInfo[];
  ingredients: string | null;
  productDetailDisclaimer: string | null;
  productPriceDisclaimer: string | null;
  retailLimit: string | null;
  promotionalLimit: string | null;
  productCode: string | null;
}

puppeteer.use(StealthPlugin());

const safeEval = async <T>(
  page: Page,
  selector: string,
  evaluateFn: (element: Element) => T
): Promise<T | null> => {
  try {
    return await page.$eval(selector, evaluateFn);
  } catch (error) {
    console.warn(`Selector not found: ${selector}`);
    return null;
  }
};

export const scrapeSingleProduct = async (
  productUrl: string
): Promise<ProductDetails> => {
  let browser: Browser | null = null;
  try {
    browser = await puppeteer.launch({
      headless: false,
      args: ["--enable-features=NetworkService,NetworkServiceInProcess"],
    });

    const page = await browser.newPage();
    const context = browser.defaultBrowserContext();
    await context.overridePermissions("https://www.coles.com.au", [
      "geolocation",
    ]);
    await page.setGeolocation({ latitude: -33.8688, longitude: 151.2093 });

    console.log(`Navigating to ${productUrl}...`);
    await page.goto(productUrl, { waitUntil: "load" });
    await setTimeout(2000);

    const title = await safeEval(
      page,
      ".product__title",
      (el) => el.textContent?.trim() ?? null
    );
    const price = await safeEval(
      page,
      ".price__value",
      (el) => el.textContent?.trim() ?? null
    );
    const saveAmount = await safeEval(
      page,
      ".badge-label",
      (el) => el.textContent?.trim() ?? null
    );

    const imageUrls = await page.$$eval(".thumbnail-container > img", (imgs) =>
      imgs.map((img) => img.getAttribute("src"))
    );

    const nutrition = await page.$$eval(
      "#nutritional-information-control table tbody tr",
      (rows) =>
        rows.map((row) => {
          const cols = Array.from(
            row.querySelectorAll("th div, td div"),
            (div) => div.textContent?.trim() ?? ""
          );
          return {
            nutrient: cols[0] || "N/A",
            per100g: cols[1] || "N/A",
            perServing: cols[2] || "N/A",
            pctDI: cols[3] || "N/A",
          };
        })
    );

    const ingredients = await safeEval(
      page,
      ".ingredients-panel",
      (el) => el.textContent?.trim() ?? null
    );

    const productDetailDisclaimer = await safeEval(
      page,
      '[data-testid="product-detail-disclaimer"]',
      (el) => el.textContent?.trim() ?? null
    );
    const productPriceDisclaimer = await safeEval(
      page,
      '[data-testid="product-price-disclaimer"]',
      (el) => el.textContent?.trim() ?? null
    );
    const retailLimit = await safeEval(
      page,
      '[data-testid="retail-limit"]',
      (el) => el.textContent?.replace("Retail limit:", "").trim() ?? null
    );
    const promotionalLimit = await safeEval(
      page,
      '[data-testid="promotional-limit"]',
      (el) => el.textContent?.replace("Promotional limit:", "").trim() ?? null
    );
    const productCode = await safeEval(
      page,
      '[data-testid="product-code"]',
      (el) => el.textContent?.replace("Code:", "").trim() ?? null
    );

    const productData: ProductDetails = {
      title,
      price,
      saveAmount,
      imageUrls,
      nutrition,
      ingredients,
      productDetailDisclaimer,
      productPriceDisclaimer,
      retailLimit,
      promotionalLimit,
      productCode,
    };

    console.log("Scraping complete.");
    return productData;
  } catch (error) {
    console.error("An error occurred during single product scraping:", error);
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
