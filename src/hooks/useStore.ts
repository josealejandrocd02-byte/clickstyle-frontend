import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyStore, updateStore, getMyPlanUsage } from "@/services/storeService";

export const useStore = () => {
  const queryClient = useQueryClient();

  // 📦 GET tienda
  const { data: store, isLoading } = useQuery({
    queryKey: ["my-store"],
    queryFn: getMyStore,
  });

  // 📊 GET plan usage
  const {
    data: planUsage,
    isLoading: isPlanLoading,
  } = useQuery({
    queryKey: ["plan-usage", store?.id],
    queryFn: () => getMyPlanUsage(store!.id),
    enabled: !!store?.id,
  });

  // 🔄 UPDATE tienda
  const update = useMutation({
    mutationFn: updateStore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-store"] });
    },
  });

  return {
    store,
    isLoading,

    // 📊 plan
    planUsage,
    isPlanLoading,

    // acciones
    updateStore: update.mutate,
    isUpdating: update.isPending,
  };
};