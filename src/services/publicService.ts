import api from "@/api/client";
/* 🔥 VARIANT (igual que backend) */
export interface Variant {
  id: string;
  size: string;
  color: string;
  stock: number;
}

/* 📦 PUBLIC PRODUCT */
export interface PublicProduct {
  id: string;

  name: string;
  description: string;
  price: number;

  imageUrl?: string;
  imageUrl2?: string;

  categoryName?: string;

  // 🔥 AHORA SON ARRAYS (NO string)
  sizes: string[];
  colors: string[];

  // 📦 STOCK
  stock: number;
  inStock: boolean;

  // 🔥 CLAVE: variantes reales
  variants: Variant[];

  // 🏪 STORE
  storeId: string;
  storeName: string;
  storeWhatsapp: string;

  storeLogoUrl?: string;
  storeVerified?: boolean;
}

export const getPublicProducts = async () => {
  const response = await api.get("/public/products");
  return response.data;
};

export const getPublicProductById = async (id: string) => { 
  const response = await api.get(`/public/products/${id}`);
  return response.data;
};