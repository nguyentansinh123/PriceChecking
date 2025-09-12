export interface ProductDetails {
  title: string;
  price: string;
  originalPrice?: string | null;
  image: string;
  productId: string;
  href?: string | null;
  source?: string;
  store?: 'Coles' | 'IGA' | 'Woolworths' | 'Other';
  // Additional fields that might be useful
  weight?: string | null;
  description?: string | null;
  ingredients?: string | null;
  nutrition?: Array<{
    nutrient: string;
    perServe?: string;
    per100g?: string;
  }> | null;
}