import api from "@/api/client";
import { Dispatch, SetStateAction } from "react";

/* 📦 FORM COMPLETO */
export interface VariantForm {
  size: string;
  color: string;
  stock: number | ""; // ✅ clave
}

export interface ProductFormData {
  id?: string;

  name: string;
  description: string;
  price: string;

  categoryId?: string;

  // 🔥 NUEVO
  variants: VariantForm[];

  // 🖼 imágenes
  image: File | null;
  image2: File | null;

  // 👀 preview
  imageUrl: string;
  imageUrl2: string;
}

export interface Props {
  form: ProductFormData;
  setForm: Dispatch<SetStateAction<ProductFormData>>; // ✅ FIX
  onSave: () => void;
  editingId: string | null;
  categories: string[];
  isLoading?: boolean;
}

/* 📦 GET */
export const getMyProducts = async () => {
  const response = await api.get("/products/my-products");
  return response.data;
};

/* 💾 CREATE / UPDATE */
export const createOrUpdateProduct = async (form: ProductFormData) => {
  const data = new FormData();

  data.append("name", form.name);
  data.append("description", form.description);
  data.append("price", form.price);

  if (form.categoryId) {
    data.append("categoryId", form.categoryId);
  }

  // 🔥 CLAVE: enviar variantes como JSON
  data.append("variants", JSON.stringify(form.variants));

  // 🖼 imagen principal
  if (form.image) {
    data.append("image", form.image);
  }

  // 🖼 segunda imagen
  if (form.image2) {
    data.append("image2", form.image2);
  }

  if (form.variants.length === 0) {
  throw new Error("Debes agregar al menos una variante");
  }

  const isInvalidStock = (stock: any) => {
  if (stock === "") return true;
    const num = Number(stock);
    return isNaN(num) || num < 0;
  };

  if (form.variants.some(v => isInvalidStock(v.stock))) {
    throw new Error("Stock inválido");
  }
  if (form.id) {
    return api.put(`/products/updateproduct/${form.id}`, data);
  }

  return api.post("/products/createproduct", data);
};

/* ❌ DELETE */
export const deleteProduct = async (id: string) => {
  return api.delete(`/products/delete/${id}`);
};

