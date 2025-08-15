import puppeteer from "puppeteer-extra";
import { setTimeout } from "node:timers/promises";
import { Browser } from "puppeteer";

const StealthPlugin = require("puppeteer-extra-plugin-stealth");

interface ScrapedItem {
  title: string | null;
  price: string | null;
  image: string | null;
  productId: string | null;
}

puppeteer.use(StealthPlugin());

export const scrapeColesSpecials = async (): Promise<ScrapedItem[]> => {
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
    console.log("Running tests…");

    await page.goto(
      "https://www.coles.com.au/on-special?pid=homepage_cat_explorer_specials",
      { waitUntil: "load" }
    );
    await setTimeout(2000);

    const items: ScrapedItem[] = [];

    while (true) {
      const productHandles = await page.$$('[data-testid="product-tile"]');

      for (const producthandle of productHandles) {
        let title: string | null = null;
        let price: string | null = null;
        let image: string | null = null;
        let productId: string | null = null;

        try {
          title = await page.evaluate(
            (el) => el.querySelector(".product__title")?.textContent || null,
            producthandle
          );
        } catch (error) {
          // Handle or log error if necessary
        }
        try {
          price = await page.evaluate(
            (el) => el.querySelector(".price__value")?.textContent || null,
            producthandle
          );
        } catch (error) {
          // Handle or log error if necessary
        }
        try {
          image = await page.evaluate(
            (el) =>
              el
                .querySelector('[data-testid="product-image"]')
                ?.getAttribute("src") || null,
            producthandle
          );
        } catch (error) {
          // Handle or log error if necessary
        }
        try {
          productId = await page.evaluate(
            (el) =>
              el
                .querySelector(".product__link.product__image")
                ?.getAttribute("href") || null,
            producthandle
          );
        } catch (error) {
          // Handle or log error if necessary
        }

        if (title) {
          items.push({ title, price, image, productId });
        }
      }

      await page.waitForSelector("#pagination-button-next", { visible: true });
      const isDisabled = await page.$eval(
        "#pagination-button-next",
        (el) => el.getAttribute("aria-disabled") === "true"
      );

      if (isDisabled) {
        console.log("Next button is disabled – end of pages");
        break;
      }

      await page.click("#pagination-button-next");
      await page.waitForNavigation({ waitUntil: "networkidle2" });
    }

    console.log(`Scraped ${items.length} items.`);
    return items;
  } catch (error) {
    console.error("An error occurred during scraping:", error);
    return []; 
  } finally {
    if (browser) {
      await browser.close();
      console.log("Browser closed.");
    }
  }
};
