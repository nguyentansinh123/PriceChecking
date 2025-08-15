import puppeteer, { Browser, ElementHandle } from "puppeteer";

// Interface for the scraped product data
interface ScrapedItem {
  title: string | null;
  price: string | null;
  originalPrice: string | null;
  image: string | null;
  productId: string | null;
  href: string | null;
}

export const scrapeWwHalfPrice = async (): Promise<ScrapedItem[]> => {
  let browser: Browser | null = null;
  try {
    browser = await puppeteer.launch({
      headless: false, // Set to true for production environments
      defaultViewport: null,
      userDataDir: "./tmp",
    });
    const page = await browser.newPage();

    await page.goto(
      "https://www.woolworths.com.au/shop/browse/specials/half-price",
      { waitUntil: "networkidle2" }
    );

    const nextBtnSelector =
      "#search-content > div > shared-paging > div > div.paging-section > a.paging-next.ng-star-inserted";
    const items: ScrapedItem[] = [];

    while (true) {
      try {
        await page.waitForSelector("wc-product-tile", {
          visible: true,
          timeout: 10000,
        });
      } catch (error) {
        console.log("No product tiles found on this page. Ending scrape.");
        break;
      }

      const productHandles = await page.$$("wc-product-tile");
      for (const productHandle of productHandles) {
        const itemData: ScrapedItem | null = await page.evaluate(
          (tile: Element) => {
            const shadow = tile.shadowRoot;
            if (!shadow) {
              return null;
            }

            const getText = (selector: string): string | null => {
              const element = shadow.querySelector(selector);
              return element?.textContent?.trim() ?? null;
            };

            const getAttribute = (
              selector: string,
              attribute: string
            ): string | null => {
              const element = shadow.querySelector(selector);
              return element?.getAttribute(attribute) ?? null;
            };

            const href = getAttribute(
              "section > div > div.product-tile-group.left > div > div > a",
              "href"
            );
            const title = getText("section .product-title-container a");
            const price = getText("section .label-price-promotion .primary");
            const originalPrice = getText(
              "section .label-price-promotion .secondary .was-price"
            );
            const image = getAttribute(
              "section > div > div.product-tile-group.left > div > div > a > img",
              "src"
            );
            const productId = image
              ? image.split("/").pop()?.split(".")[0] ?? null
              : null;

            return { title, price, originalPrice, image, productId, href };
          },
          productHandle
        );

        if (itemData && itemData.title && itemData.href) {
          items.push(itemData);
        }
      }

      const nextBtn = await page.$(nextBtnSelector);
      if (!nextBtn) {
        console.log("Reached last page – no more pages to scrape.");
        break;
      }

      console.log("Navigating to the next page...");
      await Promise.all([
        nextBtn.click(),
        page.waitForNavigation({ waitUntil: "networkidle2" }),
      ]);
    }

    console.log(`Scraped ${items.length} items successfully.`);
    return items;
  } catch (error) {
    console.error("An error occurred during Woolworths scraping:", error);
    throw new Error(
      `Scraping failed: ${
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
