import api from "@/api/client";

export const getCategories = async () => {
  const res = await api.get("/categories/listCategories");
  return res.data;
};