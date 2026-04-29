import {
  changeUserRole,
  deleteUser,
  getUsers,
  toggleUserActive,
  updateUser,
  UserAdmin,
  verifyUser,
  getOwnersWithoutStore,
} from "@/services/adminUsersService";

import { useEffect, useState } from "react";

export const useUsersAdmin = () => {
  const [users, setUsers] = useState<UserAdmin[]>([]);
  const [ownersWithoutStore, setOwnersWithoutStore] = useState<UserAdmin[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async (silent = false) => {
  if (!silent) setLoading(true);

  try {
    const data = await getUsers();
    setUsers(data);
  } finally {
    if (!silent) setLoading(false);
  }
};

  const loadOwnersWithoutStore = async () => {
    try {
      const data = await getOwnersWithoutStore();
      setOwnersWithoutStore(data);
    } catch (error) {
      console.error("Error cargando owners sin tienda", error);
    }
  };

  useEffect(() => {
    loadUsers();
    loadOwnersWithoutStore();
  }, []);

  return {
    users,
    ownersWithoutStore,
    loading,

    refresh: async () => {
      await loadUsers();
      await loadOwnersWithoutStore();
    },

    refreshOwners: loadOwnersWithoutStore,

    update: async (id: string, user: UserAdmin) => {
      await updateUser(id, user);
      await loadUsers();
    },

    toggleActive: async (id: string) => {
      await toggleUserActive(id);
      await loadUsers(true); // 🔥 sin bloquear UI
    },

    verify: async (id: string, verified: boolean) => {
      await verifyUser(id, verified);
      await loadUsers(true); // 🔥 sin flash
    },

    changeRole: async (id: string, role: string) => {
      await changeUserRole(id, role);
      await loadUsers();

      if (role === "OWNER") {
        await loadOwnersWithoutStore();
      }
    },

    
    remove: async (id: string) => {
      await deleteUser(id);
      await loadUsers();
      await loadOwnersWithoutStore();
    },
  };
};