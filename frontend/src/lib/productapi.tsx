import { axiosInstance } from "./axios";
import type { ProductDetails } from "../types/productTypes";

export interface ProductReturnType {
  success: boolean;
  message: string;
  products?: ProductDetails[];
  product?: ProductDetails;
}

export const getColesSingleProduct = async (productId: string): Promise<ProductReturnType> => {
  const response = await axiosInstance.get(`/product/coles/singleProduct?id=${productId}`);
  return response.data;
};

export const getWoolworthsSingleProduct = async (productId: string): Promise<ProductReturnType> => {
  const response = await axiosInstance.get(`/product/WW/singleProduct?id=${productId}`);
  return response.data;
};

export const getIGASingleProduct = async (productId: string): Promise<ProductReturnType> => {
  const response = await axiosInstance.get(`/product/IGA/singleProduct?id=${productId}`);
  return response.data;
};

export const getColesSpecialCatalog = async (): Promise<ProductReturnType> => {
  const response = await axiosInstance.get("/product/coles/specialCatalog");
  return response.data;
};

export const getColesHalfPrice = async (): Promise<ProductReturnType> => {
  const response = await axiosInstance.get("/product/coles/halfPrice");
  return response.data;
};

export const getIGAHalfPrice = async (): Promise<ProductReturnType> => {
  const response = await axiosInstance.get("/product/IGA/SpecialCatalog");
  return response.data;
};

export const getWoolworthsHalfPrice = async (): Promise<ProductReturnType> => {
  const response = await axiosInstance.get("/product/WW/halfPrice");
  return response.data;
};

export const searchProducts = async (query: string): Promise<ProductReturnType> => {
  const response = await axiosInstance.get(`/product/search?q=${encodeURIComponent(query)}`);
  return response.data;
};

export const getAllProducts = async (page: number = 1, limit: number = 10): Promise<ProductReturnType> => {
  const response = await axiosInstance.get(`/product/products?page=${page}&limit=${limit}`);
  return response.data;
};

export const compareProducts = async (productIds: string[]): Promise<ProductReturnType> => {
  const response = await axiosInstance.post("/product/compare", { productIds });
  return response.data;
};

export const getWatchlistProducts = async (): Promise<ProductReturnType> => {
  const response = await axiosInstance.get("/product/watchlist");
  return response.data;
};

export const addToWatchlist = async (productId: string): Promise<ProductReturnType> => {
  const response = await axiosInstance.post("/product/watchlist/add", { productId });
  return response.data;
};

export const removeFromWatchlist = async (productId: string): Promise<ProductReturnType> => {
  const response = await axiosInstance.delete(`/product/watchlist/remove/${productId}`);
  return response.data;
};
