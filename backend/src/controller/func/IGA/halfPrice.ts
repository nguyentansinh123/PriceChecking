import puppeteer, { Browser, Page, ElementHandle } from "puppeteer";

interface ScrapedItem {
  title: string | null;
  quantity: string | null;
  price: string | null;
  image: string | null;
  href: string | null;
}

export const scrapeIgaHalfPrice = async (): Promise<ScrapedItem[]> => {
  let browser: Browser | null = null;
  try {
    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      defaultViewport: null,
      userDataDir: "./tmp",
      headless: false,
    });
    const page = await browser.newPage();

    await page.goto("https://www.igashop.com.au/specials/1", {
      waitUntil: "load",
    });

    try {
      await page.waitForSelector("button[data-modal-close]", { timeout: 5000 });
      await page.click("button[data-modal-close]");
      await page.waitForSelector("button[data-modal-close]", { hidden: true });
      console.log("Guest modal dismissed successfully.");
    } catch {
      console.log("No guest modal to dismiss or it timed out.");
    }

    const items: ScrapedItem[] = [];

    while (true) {
      const productButtons = await page.$$('[data-add-to-cart-button="true"]');
      for (const btn of productButtons) {
        const item: ScrapedItem | null = await page.evaluate((el) => {
          const card = el.closest("[data-product-card]");
          if (!card) return null;

          const title =
            card
              .querySelector('a[data-variant="link"] span.line-clamp-3')
              ?.textContent?.trim() ?? null;
          const quantity =
            card
              .querySelector('a[data-variant="link"] span:nth-of-type(2)')
              ?.textContent?.trim() ?? null;
          const price =
            card
              .querySelector("span.font-bold.leading-none")
              ?.textContent?.trim() ?? null;
          const image = card.querySelector("img")?.getAttribute("src") ?? null;
          const href =
            card
              .querySelector('a[data-variant="link"]')
              ?.getAttribute("href") ?? null;

          return { title, quantity, price, image, href };
        }, btn);

        if (item?.title) {
          items.push(item);
        }
      }

      const nextBtn = await page.$("a[data-pagination-next]");
      if (!nextBtn) {
        console.log("No next button found. Ending pagination.");
        break;
      }

      const isDisabled = await page.evaluate(
        (el) => el.getAttribute("aria-disabled") === "true",
        nextBtn
      );
      if (isDisabled) {
        console.log("Next button is disabled. Ending pagination.");
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
    console.error("An error occurred during IGA scraping:", error);
    throw new Error(
      `Scraping failed: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  } 
};
