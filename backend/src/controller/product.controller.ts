import { Request, Response } from "express";
import { scrapeSingleProduct } from "./func/Coles/singleProduct";
import { scrapeColesSpecials } from "./func/Coles/specialsCatalogs";
import { scrapeIgaSingleProduct } from "./func/IGA/singleProduct";
import { scrapeIgaHalfPrice } from "./func/IGA/halfPrice";
import { scrapeWwSingleProduct } from "./func/Ww/singleProduct";
import { scrapeHalfPriceProducts as scrapeWwHalfPrice } from "./func/Ww/halfPrice";
import { scrapeHalfPriceColes } from "./func/Coles/halfPrice"; // Add this import
import { promises as fs } from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';
import Product from "../models/product.model";
import { ProductDetails } from "../types/product.types";

const execPromise = util.promisify(exec);
async function cleanupPuppeteerResources() {
  try {
    await execPromise('pkill -f "chromium|chrome" || true');
    const tmpDir = path.join(process.cwd(), 'tmp');
    try {
      await fs.rm(path.join(tmpDir, 'SingletonLock'), { force: true });
      await fs.rm(path.join(tmpDir, 'SingletonCookie'), { force: true });
      await fs.rm(path.join(tmpDir, 'SingletonSocket'), { force: true });
      console.log('Removed lock files successfully');
    } catch (err) {
      console.log('Some lock files could not be removed:', err);
    }
  } catch (err) {
    console.error('Error cleaning up resources:', err);
  }
}

function prepareProductForDB(data: any, source: string, store: string): any {
  return {
    title: data.title || "Unknown Product",
    price: data.price || "0.00",
    originalPrice: data.originalPrice || data.saveAmount || null,
    image: data.image || data.imageUrls?.[0] || "",
    productId: data.productId || data.productCode || `${source}-${Date.now()}`,
    href: data.href || null,
    source: source,
    store: store 
  };
}

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
    const results = await scrapeColesSpecials();
    
    if (Array.isArray(results)) {
      const savePromises = results.map(async (product) => {
        if (product) {
          const productToSave = prepareProductForDB(product, "Coles", "Coles");
          
          return Product.findOneAndUpdate(
            { productId: productToSave.productId },
            productToSave,
            { upsert: true, new: true }
          );
        }
      });
      
      await Promise.all(savePromises.filter(p => p !== undefined));
      console.log(`Saved ${results.length} Coles special products to MongoDB`);
    }
    
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to scrape Coles special catalog" });
  }
};

export const getColesHalfPrice = async (req: Request, res: Response) => {
  try {
    const results = await scrapeHalfPriceColes();
    
    if (Array.isArray(results)) {
      const savePromises = results.map(async (product) => {
        if (product) {
          const productToSave = prepareProductForDB(product, "Coles", "Coles");
          
          return Product.findOneAndUpdate(
            { productId: productToSave.productId },
            productToSave,
            { upsert: true, new: true }
          );
        }
      });
      
      await Promise.all(savePromises.filter(p => p !== undefined));
      console.log(`Saved ${results.length} Coles half-price products to MongoDB`);
    }
    
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to scrape Coles half-price specials" });
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
    // Just return the scraped data without storing in database
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to scrape IGA product" });
  }
};

export const getIGAhalfPrice = async (req: Request, res: Response) => {
  try {
    const results = await scrapeIgaHalfPrice();
    
    if (Array.isArray(results)) {
      const savePromises = results.map(async (product) => {
        if (product) {
          const productToSave = prepareProductForDB(product, "IGA", "IGA");
          
          return Product.findOneAndUpdate(
            { productId: productToSave.productId },
            productToSave,
            { upsert: true, new: true }
          );
        }
      });
      
      await Promise.all(savePromises.filter(p => p !== undefined));
      console.log(`Saved ${results.length} IGA half-price products to MongoDB`);
    }
    
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to scrape IGA half-price specials." });
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
    // Just return the scraped data without storing in database
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to scrape Woolworths product" });
  }
};

export const getWWhalfPrice = async (req: Request, res: Response) => {
  try {
    const results = await scrapeWwHalfPrice();
    
    if (Array.isArray(results)) {
      const savePromises = results.map(async (product) => {
        if (product) {
          const productToSave = prepareProductForDB(product, "Woolworths", "Woolworths");
          
          return Product.findOneAndUpdate(
            { productId: productToSave.productId },
            productToSave,
            { upsert: true, new: true }
          );
        }
      });
      
      await Promise.all(savePromises.filter(p => p !== undefined));
      console.log(`Saved ${results.length} Woolworths half-price products to MongoDB`);
    }
    
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to scrape Woolworths half-price specials" });
  }
};

