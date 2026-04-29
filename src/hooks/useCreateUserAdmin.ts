import {
  createUser,
  CreateUserAdminDTO,
} from "@/services/adminUsersService";

import { useState } from "react";

export const useCreateUserAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (data: CreateUserAdminDTO) => {
    setLoading(true);
    setError(null);

    try {
      const res = await createUser(data);
      return res;
    } catch (err: any) {
      console.error("Error creando usuario", err);
      setError(err.response?.data?.message || "Error al crear usuario");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    create,
    loading,
    error,
  };
};