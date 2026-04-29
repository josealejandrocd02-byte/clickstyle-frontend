import api from "@/api/client";

export interface UserAdmin {
  id: string;
  username: string;
  email: string;
  role: string;

  firstName?: string;
  lastName?: string;
  phone?: string;

  isActive: boolean;
  emailVerified: boolean;
}
export interface AdminStats {
  stores: number;
  pending: number;
  users: number;
}

export interface CreateUserAdminDTO {
  username: string;
  email: string;
  password: string;

  firstName?: string;
  lastName?: string;
  phone?: string;

  role?: string;       // "USER" | "ADMIN" | "OWNER"
  isActive?: boolean;
  verified?: boolean;
}

export const createUser = async (
  data: CreateUserAdminDTO
): Promise<UserAdmin> => { 
  const res = await api.post("/admin/users/create", data);
  return res.data;
};



export const getAdminStats = async (): Promise<AdminStats> => {
  const res = await api.get("/admin/users/stats");
  return res.data;
};
// 📄 LISTAR
export const getUsers = async (): Promise<UserAdmin[]> => {
  const res = await api.get("/admin/users");
  return res.data;
};
export const getOwnersWithoutStore = async (): Promise<UserAdmin[]> => {
  const res = await api.get("/admin/users/owners-without-store");
  return res.data;
};

// 🔍 OBTENER
export const getUserById = async (id: string): Promise<UserAdmin> => {
  const res = await api.get(`/admin/users/${id}`);
  return res.data;
};

// ✏️ EDITAR
export const updateUser = async (
  id: string,
  user: UserAdmin
): Promise<UserAdmin> => {
  const res = await api.put(`/admin/users/${id}`, user);
  return res.data;
};

// 🔄 ACTIVAR / DESACTIVAR
export const toggleUserActive = async (id: string): Promise<UserAdmin> => {
  const res = await api.patch(`/admin/users/${id}/toggle-active`);
  return res.data;
};

// 🔐 CAMBIAR ROL
export const changeUserRole = async (
  id: string,
  role: string
): Promise<UserAdmin> => {
  const res = await api.patch(`/admin/users/${id}/role`, null, {
    params: { role },
  });
  return res.data;
};

// ✅ VERIFICAR EMAIL
export const verifyUser = async (
  id: string,
  verified: boolean
): Promise<UserAdmin> => {
  const res = await api.patch(`/admin/users/${id}/verify`, null, {
    params: { verified },
  });
  return res.data;
};

// ❌ ELIMINAR
export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/admin/users/${id}`);
};

