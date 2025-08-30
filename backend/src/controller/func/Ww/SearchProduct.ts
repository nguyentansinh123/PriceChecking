import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { Browser, Page, ElementHandle } from "puppeteer";
import fs from "fs/promises";

puppeteer.use(StealthPlugin());

export interface Product {
  title: string | null;
  price: string | null;
  originalPrice: string | null;
  image: string | null;
  productId: string | null;
  href: string | null;
}

/**
 * Scrapes product details from a single product tile element.
 * @param productHandle - The Puppeteer element handle for a product tile.
 * @returns A promise that resolves to the scraped product data.
 */
async function scrapeProductTile(
  productHandle: ElementHandle<Element>,
): Promise<Product> {
  const shadowRootHandle = await productHandle.evaluateHandle(
    (el: Element) => el.shadowRoot,
  );
  const shadowRoot = shadowRootHandle.asElement();
  if (!shadowRoot) {
    return {
      title: null,
      price: null,
      originalPrice: null,
      image: null,
      productId: null,
      href: null,
    };
  }

  const getProperty = async <T>(
    selector: string,
    property: string,
  ): Promise<T | null> => {
    const element = await shadowRoot.$(selector);
    if (!element) return null;
    return element.evaluate((el: any, prop: string) => el[prop], property);
  };

  const getAttribute = async (
    selector: string,
    attribute: string,
  ): Promise<string | null> => {
    const element = await shadowRoot.$(selector);
    if (!element) return null;
    return element.evaluate(
      (el: Element, attr: string) => el.getAttribute(attr),
      attribute,
    );
  };

  const hrefSelector =
    "section > div > div.product-tile-group.left > div > div > a";
  const imageSelector = `${hrefSelector} > img`;

  const href = await getAttribute(hrefSelector, "href");
  const title = await getProperty<string>(
    "section .product-title-container a",
    "textContent",
  );
  const price = await getProperty<string>(
    "section .label-price-promotion .primary",
    "textContent",
  );
  const originalPrice = await getProperty<string>(
    "section .label-price-promotion .secondary .was-price",
    "textContent",
  );
  const image = await getAttribute(imageSelector, "src");

  const productId = image
    ? (image.split("/").pop()?.split(".")[0] ?? null)
    : null;

  return {
    title: title?.trim() ?? null,
    price: price?.trim() ?? null,
    originalPrice: originalPrice?.trim() ?? null,
    image,
    productId,
    href,
  };
}

/**
 * Scrapes all half-price products from the Woolworths website.
 * @returns A promise that resolves to an array of scraped products.
 */
export async function scrapeHalfPriceProducts(
  searchQuery: string,
): Promise<Product[]> {
  let browser: Browser | null = null;
  try {
    console.log("Launching browser...");
    browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
      userDataDir: "./tmp",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60000);
    page.setDefaultTimeout(60000);

    const startUrl = `https://www.woolworths.com.au/shop/search/products?searchTerm=${searchQuery}`;
    console.log(`Navigating to ${startUrl}...`);
    await page.goto(startUrl, { waitUntil: "networkidle2" });

    const allProducts: Product[] = [];
    const nextButtonSelector = ".paging-next:not(.disabled)";

    while (true) {
      console.log(`Scraping page: ${page.url()}`);
      await page.waitForSelector("wc-product-tile", {
        visible: true,
      });

      const productHandles = await page.$$("wc-product-tile");
      const pageProducts = await Promise.all(
        productHandles.map((handle) => scrapeProductTile(handle)),
      );
      allProducts.push(...pageProducts);
      console.log(
        `Found ${pageProducts.length} products on this page. Total: ${allProducts.length}`,
      );

      const nextButton = await page.$(nextButtonSelector);
      if (!nextButton) {
        console.log("No more pages to scrape. Reached the last page.");
        break;
      }

      console.log("Clicking next page...");
      await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle2" }),
        nextButton.click(),
      ]);
    }

    return allProducts;
  } catch (error) {
    console.error("An error occurred during scraping:", error);
    throw error;
  } finally {
    if (browser) {
      console.log("Closing browser...");
      await browser.close();
    }
  }
}
