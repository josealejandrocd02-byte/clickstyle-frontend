import api from "@/api/client";
import { Plan } from "./adminPlan";
export interface StoreAdmin {
  id: string;
  userId: string;
  name: string;
  description: string;
  whatsappPhone: string;

  status: string;
  statusLabel: string;

  verified: boolean;
  active: boolean;

  // 🔥 nuevo modelo
  plan: Plan | null;

  planExpired: boolean;
  planExpiresAt: string | null;
}

export const getAllStores = async (): Promise<StoreAdmin[]> => {
  const res = await api.get("/admin/stores");
  return res.data;
};

export interface CreateStoreDTO {
  name: string;
  description: string;
  whatsappPhone: string;
  userId: string;
}

export const createStore = async (data: CreateStoreDTO) => {
  const res = await api.post("/admin/stores/createStore", data);
  return res.data;
};

// 🔥 CAMBIAR STATUS (APPROVED / REJECTED)
export const updateStoreStatus = async (id: string, status: string) => {
  const res = await api.patch(`/admin/stores/${id}/status`, null, {
    params: { status },
  });
  return res.data;
};

// 🔥 ACTIVAR / DESACTIVAR
export const toggleStoreActive = async (id: string) => {
  const res = await api.patch(`/admin/stores/${id}/active`);
  return res.data;
};

// 🔥 VERIFICAR
export const verifyStore = async (id: string, verified: boolean) => {
  const res = await api.patch(`/admin/stores/${id}/verify`, null, {
    params: { verified },
  });
  return res.data;
};

// 💰 ASIGNAR PLAN
export const assignPlanToStore = async (storeId: string, planId: string) => {
  const res = await api.post(`/admin/stores/${storeId}/assign-plan`, null, {
    params: { planId },
  });
  return res.data;
};

// 🔄 RENOVAR PLAN
export const renewStorePlan = async (storeId: string) => {
  const res = await api.post(`/admin/stores/${storeId}/renew-plan`);
  return res.data;
};