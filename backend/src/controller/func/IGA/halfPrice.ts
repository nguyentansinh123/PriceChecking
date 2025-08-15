import puppeteer, { Browser, Page, ElementHandle } from "puppeteer";

interface ScrapedItem {
  title: string | null;
  quantity: string | null;
  price: string | null;
  image: string | null;
  href: string | null;
}

const safeEvalFromCard = async (
  page: Page,
  btn: ElementHandle,
  selector: string,
  evaluateFn: (element: Element) => string | null
): Promise<string | null> => {
  try {
    return await page.evaluate(
      (el, sel, cardSel) => {
        const card = el.closest(cardSel);
        if (!card) return null;
        const targetEl = card.querySelector(sel);
        return targetEl ? (evaluateFn(targetEl) as string | null) : null;
      },
      btn,
      selector,
      "[data-product-card]" 
    );
  } catch (e) {
    console.warn(`Error evaluating selector "${selector}":`, e);
    return null;
  }
};

export const scrapeIgaHalfPrice = async (): Promise<ScrapedItem[]> => {
  let browser: Browser | null = null;
  try {
    browser = await puppeteer.launch({
      headless: false, 
      defaultViewport: null,
      userDataDir: "./tmp",
    });
    const page = await browser.newPage();

    await page.goto("https://www.igashop.com.au/specials/263", {
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
        const cardSel = "[data-product-card]";

        const title = await page.evaluate(
          (el, sel) =>
            el
              .closest(sel)
              ?.querySelector('a[data-variant="link"] span.line-clamp-3')
              ?.textContent?.trim() ?? null,
          btn,
          cardSel
        );
        const quantity = await page.evaluate(
          (el, sel) =>
            el
              .closest(sel)
              ?.querySelector('a[data-variant="link"] span:nth-of-type(2)')
              ?.textContent?.trim() ?? null,
          btn,
          cardSel
        );
        const price = await page.evaluate(
          (el, sel) =>
            el
              .closest(sel)
              ?.querySelector("span.font-bold.leading-none")
              ?.textContent?.trim() ?? null,
          btn,
          cardSel
        );
        const image = await page.evaluate(
          (el, sel) =>
            el.closest(sel)?.querySelector("img")?.getAttribute("src") ?? null,
          btn,
          cardSel
        );
        const href = await page.evaluate(
          (el, sel) =>
            el
              .closest(sel)
              ?.querySelector('a[data-variant="link"]')
              ?.getAttribute("href") ?? null,
          btn,
          cardSel
        );

        if (title) {
          items.push({ title, quantity, price, image, href });
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
  } finally {
    if (browser) {
      await browser.close();
      console.log("Browser closed.");
    }
  }
};
