import { Request, Response } from "express";
import { scrapeSingleProduct } from "./func/Coles/singleProduct";
import { scrapeColesSpecials } from "./func/Coles/specialsCatalogs";
import { scrapeIgaSingleProduct } from "./func/IGA/singleProduct";
import { scrapeIgaHalfPrice } from "./func/IGA/halfPrice";
import { scrapeWwSingleProduct } from "./func/Ww/singleProduct";
import { scrapeHalfPriceProducts as scrapeWwHalfPrice } from "./func/Ww/halfPrice";
import { promises as fs } from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';
import Product from "../models/product.model";
import { ProductDetails, StoredProduct, PriceRecord } from "../types/product.types";

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

function normalizeProductData(data: any, source: string): ProductDetails {
  return {
    title: data.title || "Unknown Product",
    price: data.price || "0.00",
    originalPrice: data.originalPrice || data.saveAmount || null,
    image: data.image || data.imageUrls?.[0] || "",
    productId: data.productId || data.productCode || `${source}-${Date.now()}-${Math.random().toString(36).substring(7)}`,
    href: data.href || null,
    source: source
  };
}

function prepareProductForDB(data: ProductDetails): StoredProduct {
  const currentPrice = data.price;
  const originalPrice = data.originalPrice;
  
  return {
    title: data.title,
    currentPrice: currentPrice,
    priceHistory: [{ 
      price: currentPrice,
      timestamp: new Date()
    }],
    originalPriceHistory: originalPrice ? [{
      price: originalPrice,
      timestamp: new Date()
    }] : [],
    image: data.image,
    productId: data.productId,
    href: data.href,
    source: data.source || "Unknown"
  };
}

async function updateProductWithPriceHistory(existingProduct: any, newData: ProductDetails) {
  const updates: any = {};
  const currentTime = new Date();
  
  if (existingProduct.currentPrice !== newData.price && newData.price) {
    updates.currentPrice = newData.price;
    updates.$push = {
      priceHistory: {
        price: newData.price,
        timestamp: currentTime
      }
    };
  }
  
  if (newData.originalPrice && 
      (!existingProduct.originalPriceHistory.length || 
       existingProduct.originalPriceHistory[existingProduct.originalPriceHistory.length-1].price !== newData.originalPrice)) {
    
    if (!updates.$push) updates.$push = {};
    updates.$push.originalPriceHistory = {
      price: newData.originalPrice,
      timestamp: currentTime
    };
  }
  
  updates.title = newData.title || existingProduct.title;
  updates.image = newData.image || existingProduct.image;
  updates.href = newData.href || existingProduct.href;
  
  if (Object.keys(updates).length > 0 || updates.$push) {
    return await Product.findOneAndUpdate(
      { productId: existingProduct.productId },
      updates,
      { new: true }
    );
  }
  
  return existingProduct;
}

export const getColesSingleProduct = async (req: Request, res: Response) => {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res
      .status(400)
      .json({ error: "Product URL is required as a query parameter." });
  }

  try {
    const rawResult = await scrapeSingleProduct(url);
    
    if (rawResult) {
      const productData = normalizeProductData(rawResult, "Coles");
      
      const existingProduct = await Product.findOne({ productId: productData.productId });
      
      let savedProduct;
      if (existingProduct) {
        savedProduct = await updateProductWithPriceHistory(existingProduct, productData);
        console.log(`Updated Coles product: ${productData.title}`);
      } else {
        const newProduct = prepareProductForDB(productData);
        savedProduct = await Product.create(newProduct);
        console.log(`Saved new Coles product: ${productData.title}`);
      }
      
      res.status(200).json(savedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Scraping failed:", error);
    res.status(500).json({ error: "Failed to scrape product data." });
  }
};

export const getColesSpecialCatalog = async (req: Request, res: Response) => {
  try {
    const results = await scrapeColesSpecials();
    
    if (Array.isArray(results)) {
      const processedProducts = [];
      
      for (const product of results) {
        if (product) {
          const productData = normalizeProductData(product, "Coles");
          
          const existingProduct = await Product.findOne({ productId: productData.productId });
          
          let savedProduct;
          if (existingProduct) {
            savedProduct = await updateProductWithPriceHistory(existingProduct, productData);
          } else {
            const newProduct = prepareProductForDB(productData);
            savedProduct = await Product.create(newProduct);
          }
          
          processedProducts.push(savedProduct);
        }
      }
      
      console.log(`Processed ${processedProducts.length} Coles special products`);
      res.status(200).json(processedProducts);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to scrape Coles special catalog" });
  }
};

export const getIGASingleProduct = async (req: Request, res: Response) => {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res
      .status(400)
      .json({ error: "Product Url is required as a query parameter." });
  }
  
  try {
    const rawResult = await scrapeIgaSingleProduct(url);
    
    if (rawResult) {
      const productData = normalizeProductData(rawResult, "IGA");
      
      const existingProduct = await Product.findOne({ productId: productData.productId });
      
      let savedProduct;
      if (existingProduct) {
        savedProduct = await updateProductWithPriceHistory(existingProduct, productData);
        console.log(`Updated IGA product: ${productData.title}`);
      } else {
        const newProduct = prepareProductForDB(productData);
        savedProduct = await Product.create(newProduct);
        console.log(`Saved new IGA product: ${productData.title}`);
      }
      
      res.status(200).json(savedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to scrape IGA product" });
  }
};

export const getIGAhalfPrice = async (req: Request, res: Response) => {
  try {
    const results = await scrapeIgaHalfPrice();
    
    if (Array.isArray(results)) {
      const processedProducts = [];
      
      for (const product of results) {
        if (product) {
          const productData = normalizeProductData(product, "IGA");
          
          const existingProduct = await Product.findOne({ productId: productData.productId });
          
          let savedProduct;
          if (existingProduct) {
            savedProduct = await updateProductWithPriceHistory(existingProduct, productData);
          } else {
            const newProduct = prepareProductForDB(productData);
            savedProduct = await Product.create(newProduct);
          }
          
          processedProducts.push(savedProduct);
        }
      }
      
      console.log(`Processed ${processedProducts.length} IGA half-price products`);
      res.status(200).json(processedProducts);
    } else {
      res.status(200).json([]);
    }
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
    const rawResult = await scrapeWwSingleProduct(url);
    
    if (rawResult) {
      const productData = normalizeProductData(rawResult, "Woolworths");
      
      const existingProduct = await Product.findOne({ productId: productData.productId });
      
      let savedProduct;
      if (existingProduct) {
        savedProduct = await updateProductWithPriceHistory(existingProduct, productData);
        console.log(`Updated Woolworths product: ${productData.title}`);
      } else {
        const newProduct = prepareProductForDB(productData);
        savedProduct = await Product.create(newProduct);
        console.log(`Saved new Woolworths product: ${productData.title}`);
      }
      
      res.status(200).json(savedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to scrape Woolworths product" });
  }
};

export const getWWhalfPrice = async (req: Request, res: Response) => {
  try {
    const results = await scrapeWwHalfPrice();
    
    if (Array.isArray(results)) {
      const processedProducts = [];
      
      for (const product of results) {
        if (product) {
          const productData = normalizeProductData(product, "Woolworths");
          
          const existingProduct = await Product.findOne({ productId: productData.productId });
          
          let savedProduct;
          if (existingProduct) {
            savedProduct = await updateProductWithPriceHistory(existingProduct, productData);
          } else {
            const newProduct = prepareProductForDB(productData);
            savedProduct = await Product.create(newProduct);
          }
          
          processedProducts.push(savedProduct);
        }
      }
      
      console.log(`Processed ${processedProducts.length} Woolworths half-price products`);
      res.status(200).json(processedProducts);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to scrape Woolworths half-price specials" });
  }
};

