import { useQuery } from "@tanstack/react-query";
import {
  getPublicProducts,
  getPublicProductById,
  PublicProduct,
} from "@/services/publicService";

/* 🌍 HOOK PÚBLICO */
export const usePublic = (productId?: string) => {
  const {
    data: products = [],
    isLoading: isLoadingProducts,
    error: productsError,
  } = useQuery<PublicProduct[]>({
    queryKey: ["public-products"],
    queryFn: getPublicProducts,
  });

  const {
    data: product,
    isLoading: isLoadingProduct,
    error: productError,
  } = useQuery<PublicProduct>({
    queryKey: ["public-product", productId],
    queryFn: () => getPublicProductById(productId!),
    enabled: !!productId,

    placeholderData: () =>
      products.length
        ? products.find((p) => p.id === productId)
        : undefined,
  });

  return {
    products,
    isLoadingProducts,
    productsError,

    product,
    isLoadingProduct,
    productError,
  };
};