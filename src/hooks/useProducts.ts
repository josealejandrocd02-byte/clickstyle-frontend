import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getMyProducts, 
  createOrUpdateProduct, 
  deleteProduct 
} from "@/services/productService";

export const useProducts = () => {
  const queryClient = useQueryClient();

  // 📦 GET productos
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getMyProducts,
  });

  // 💾 CREATE / UPDATE
  const saveProduct = useMutation({
    mutationFn: createOrUpdateProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });

      queryClient.invalidateQueries({
        queryKey: ["plan-usage"],
        exact: false,
      });
    },
  });

  // ❌ DELETE (🔥 aquí va tu lógica)
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,

    // 🚀 optimistic update
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });

      const previousProducts = queryClient.getQueryData<any[]>(["products"]);

      queryClient.setQueryData(["products"], (old: any) =>
        old?.filter((p: any) => p.id !== id)
      );

      return { previousProducts };
    },

    // ❌ rollback si falla
    onError: (err, id, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(["products"], context.previousProducts);
      }
      alert("Error al eliminar producto");
    },

    // 🔄 siempre refrescar
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });

      queryClient.invalidateQueries({
        queryKey: ["plan-usage"],
        exact: false,
      });
    },
  });

  return {
    products,
    isLoading,
    error,

    // acciones
    saveProduct: saveProduct.mutate,
    isSaving: saveProduct.isPending,

    deleteProduct: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};