import { Request, Response } from "express";
import { scrapeSingleProduct } from "./func/Coles/singleProduct";
import { scrapeColesSpecials } from "./func/Coles/specialsCatalogs";

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

export const getColesSpecialCatalog = async (req: Request, res: Response) =>{
    try {
       const result = await scrapeColesSpecials() 
       res.status(200).json(result)
    } catch (error) {
       console.log(error) 
       res.status(500).json({error: "Failed Scrape Data Special Coles"})
    }
}