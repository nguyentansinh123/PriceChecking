import { Request, Response } from "express";
import { scrapeSingleProduct } from "./func/Coles/singleProduct";

export const getColesSingleProduct = async (req: Request, res: Response) => {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res
      .status(400)
      .json({ error: "Product URL is required as a query parameter." });
  }

  try {
    const result = await scrapeSingleProduct(url);
    res.status(200).json(result);
  } catch (error) {
    console.error("Scraping failed:", error);
    res.status(500).json({ error: "Failed to scrape product data." });
  }
};
