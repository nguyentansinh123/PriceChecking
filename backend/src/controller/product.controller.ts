import { Request, Response } from "express";
import { scrapeSingleProduct } from "./func/Coles/singleProduct";
import { scrapeColesSpecials } from "./func/Coles/specialsCatalogs";
import { scrapeIgaSingleProduct } from "./func/IGA/singleProduct";
import { scrapeIgaHalfPrice } from "./func/IGA/halfPrice";
import { scrapeWwSingleProduct } from "./func/Ww/singleProduct";
import { scrapeHalfPriceProducts as scrapeWwHalfPrice } from "./func/Ww/halfPrice";
import { scrapeHalfPriceColes } from "./func/Coles/halfPrice";
import { scrapeSearchColesProduct } from "./func/Coles/searchProduct"; 
import { scrapeHalfPriceProducts as searchWwProducts } from "./func/Ww/SearchProduct"; 
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
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to scrape IGA product" });
  }
};

export const getIGAhalfPrice = async (req: Request, res: Response) => {
  try {
    
    const scrapePromise = scrapeIgaHalfPrice();
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("IGA scraping timed out after 120 seconds")), 260000);
    });
    
    const results = await Promise.race([scrapePromise, timeoutPromise]) as any[];
    
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
  } finally {
    await cleanupPuppeteerResources();
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
    res.status(500).json({ error: "Failed to scrape Woolworths product" });
  }
};

export const getWWhalfPrice = async (req: Request, res: Response) => {
  try {
    
    const scrapePromise = scrapeWwHalfPrice();
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Woolworths scraping timed out after 180 seconds")), 260000);
    });
    
    const results = await Promise.race([scrapePromise, timeoutPromise]) as any[];
    
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
  } finally {
    await cleanupPuppeteerResources();
  }
};

export const searchProducts = async (req: Request, res: Response) => {
  const { query, store } = req.query;

  if (!query || typeof query !== "string") {
    return res
      .status(400)
      .json({ error: "Search query is required as a query parameter." });
  }

  try {
    let results: any[] = [];
    const promises = [];
    
    if (!store || store === "coles") {
      console.log(`Searching Coles for: ${query}`);
      const colesPromise = Promise.race<any[]>([
        scrapeSearchColesProduct(query),
        new Promise<any[]>((resolve) => setTimeout(() => {
          console.log('Coles search timeout reached (30 seconds)');
          resolve([]); 
        }, 30000))
      ]).then((colesResults) => {
        if (Array.isArray(colesResults) && colesResults.length > 0) {
          results = [
            ...results, 
            ...colesResults.map(product => ({ 
              ...product, 
              source: "Coles", 
              store: "Coles" 
            }))
          ];
          console.log(`Found ${colesResults.length} products from Coles`);
        }
      });
      
      promises.push(colesPromise);
    }

    if (!store || store === "woolworths") {
      console.log(`Searching Woolworths for: ${query}`);
      const wwPromise = Promise.race<any[]>([
        searchWwProducts(query),
        new Promise<any[]>((resolve) => setTimeout(() => {
          console.log('Woolworths search timeout reached (30 seconds)');
          resolve([]);
        }, 30000))
      ]).then((wwResults) => {
        if (Array.isArray(wwResults) && wwResults.length > 0) {
          results = [
            ...results, 
            ...wwResults.map(product => ({ 
              ...product, 
              source: "Woolworths", 
              store: "Woolworths" 
            }))
          ];
          console.log(`Found ${wwResults.length} products from Woolworths`);
        }
      });
      
      promises.push(wwPromise);
    }

    await Promise.all(promises);
    
    console.log(`Total: Found ${results.length} products in search results`);
    res.status(200).json(results);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Failed to search for products" });
  } finally {
    await cleanupPuppeteerResources();
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products from database" });
  }
};

