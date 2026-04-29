import api from "@/api/client";

export interface Plan {
  id?: string;
  name: string;
  productLimit: number;
  price: number;
  durationDays: number;
}

// ✅ CREAR
export const createPlan = async (plan: Plan): Promise<Plan> => {
  const res = await api.post("/admin/plans/create", plan);
  return res.data;
};

// 📄 LISTAR TODOS
export const getPlans = async (): Promise<Plan[]> => {
  const res = await api.get("/admin/plans/all-plans");
  return res.data;
};

// 🔍 OBTENER UNO
export const getPlanById = async (id: string): Promise<Plan> => {
  const res = await api.get(`/admin/plans/get/${id}`);
  return res.data;
};

// ✏️ ACTUALIZAR
export const updatePlan = async (id: string, plan: Plan): Promise<Plan> => {
  const res = await api.put(`/admin/plans/update/${id}`, plan);
  return res.data;
};

// ❌ ELIMINAR
export const deletePlan = async (id: string): Promise<void> => {
  await api.delete(`/admin/plans/delet/${id}`);
};