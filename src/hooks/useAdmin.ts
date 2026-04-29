import { useEffect, useState } from "react";
import {
  getAllStores,
  updateStoreStatus,
  toggleStoreActive,
  verifyStore,
  StoreAdmin,
  assignPlanToStore,
  renewStorePlan,
  createStore,
} from "@/services/adminStoresService";
import { AdminStats, getAdminStats } from "@/services/adminUsersService";

export const useAdmin = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [stores, setStores] = useState<StoreAdmin[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    try {
      setLoading(true);

      const [statsData, storesData] = await Promise.all([
        getAdminStats(),
        getAllStores()
      ]);

      setStats(statsData);
      setStores(storesData);

    } finally {
      setLoading(false);
    }
  };

  // 🔥 APROBAR / RECHAZAR
const changeStatus = async (id: string, status: string) => {
  await updateStoreStatus(id, status);
  await fetchAll();
};

// 🔥 ACTIVAR
const toggleActive = async (id: string) => {
  await toggleStoreActive(id);
  await fetchAll();
};

// 🔥 VERIFICAR
const setVerified = async (id: string, verified: boolean) => {
  await verifyStore(id, verified);
  await fetchAll();
};
// 💰 ASIGNAR PLAN
const assignPlan = async (storeId: string, planId: string) => {
  await assignPlanToStore(storeId, planId);
  await fetchAll();
};

// 🔄 RENOVAR PLAN
const renewPlan = async (storeId: string) => {
  await renewStorePlan(storeId);
  await fetchAll();
};

const createStoreAdmin = async (data: {
  name: string;
  description: string;
  whatsappPhone: string;
  userId: string;
}) => {
  await createStore(data);
  await fetchAll();
};

  useEffect(() => {
    fetchAll();
  }, []);

  return {
  stats,
  stores,
  loading,
  refresh: fetchAll,

  changeStatus,
  toggleActive,
  setVerified,
  assignPlan,
  renewPlan,
  createStoreAdmin,
};
};