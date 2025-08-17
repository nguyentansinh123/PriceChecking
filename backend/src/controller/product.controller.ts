import { Request, Response } from "express";
import { scrapeSingleProduct } from "./func/Coles/singleProduct";
import { scrapeColesSpecials } from "./func/Coles/specialsCatalogs";
import { scrapeIgaSingleProduct } from "./func/IGA/singleProduct";
import { scrapeIgaHalfPrice } from "./func/IGA/halfPrice";
import { scrapeWwSingleProduct } from "./func/Ww/singleProduct";
import { scrapeHalfPriceProducts as scrapeWwHalfPrice } from "./func/Ww/halfPrice";

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

export const getColesSpecialCatalog = async (req: Request, res: Response) => {
  try {
    const result = await scrapeColesSpecials();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed Scrape Data Special Coles" });
  }
};

export const getIGASingleProduct = async (req: Request, res: Response) => {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    console.log(url);
    return res
      .status(400)
      .json({ error: "Product Url is required as a query parameter." });
  }
  try {
    const result = await scrapeIgaSingleProduct(url);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Product Url is required as a query parameter" });
  }
};

export const getIGAhalfPrice = async (req: Request, res: Response) => {
  try {
    const result = await scrapeIgaHalfPrice();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to scrape IGA half-price specials." });
  }
};

export const getWWsingleProduct = async (req: Request, res: Response) => {
  const { url } = req.query;

  if (!url || typeof url != "string") {
    return res
      .status(400)
      .json({ error: "Product Url is required as a query parameter." });
  }
  try {
    const result = await scrapeWwSingleProduct(url);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something Went Wrong" });
  }
};

export const getWWhalfPrice = async (req: Request, res: Response) => {
  try {
    const result = await scrapeWwHalfPrice();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something Went Wrong" });
  }
};
