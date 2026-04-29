import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMyProducts,
  createOrUpdateProduct,
  deleteProduct,
} from "@/services/productService";
import { getRole } from "@/utils/storage";
import { getPublicProducts } from "@/services/publicService";

export const useProducts = () => {
  const queryClient = useQueryClient();
  const role = getRole() || "";

  // 🔁 helper para evitar repetir invalidaciones
  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ["products"] });
    queryClient.invalidateQueries({ queryKey: ["products-public"] });
    queryClient.invalidateQueries({
      queryKey: ["plan-usage"],
      exact: false,
    });
  };

  // 📦 MIS PRODUCTOS
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getMyProducts,
    enabled: role === "OWNER",
  });

  // 🌍 PRODUCTOS PÚBLICOS
  const {
    data: publicProducts = [],
    isLoading: isLoadingPublic,
    error: publicError,
  } = useQuery({
    queryKey: ["products-public"],
    queryFn: getPublicProducts,
  });

  // 💾 CREATE / UPDATE
  const saveProduct = useMutation({
    mutationFn: createOrUpdateProduct,
    onSuccess: invalidateAll,
  });

  // ❌ DELETE (optimistic UI)
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });

      const previousProducts =
        queryClient.getQueryData<any[]>(["products"]) || [];

      queryClient.setQueryData(["products"], (old: any[] = []) =>
        old.filter((p) => p.id !== id)
      );

      return { previousProducts };
    },

    onError: (_, __, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(["products"], context.previousProducts);
      }
      alert("Error al eliminar producto");
    },

    onSettled: invalidateAll,
  });

  return {
    // 📦 owner
    products,
    isLoading,
    error,

    // 🌍 public
    publicProducts,
    isLoadingPublic,
    publicError,

    // acciones
    saveProduct: saveProduct.mutate,
    isSaving: saveProduct.isPending,

    deleteProduct: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};