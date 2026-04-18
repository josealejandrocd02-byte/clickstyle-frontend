import { useEffect, useState } from "react";
import { getMe, updateUser, UserDTO, UpdateUserDTO, changePassword, ChangePasswordDTO, changeUsername, ChangeUsernameDTO } from "@/services/userService";

export const useUser = () => {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // 🔹 obtener usuario
  const fetchUser = async () => {
    try {
      setLoading(true);
      const data = await getMe();
      setUser(data);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 actualizar usuario
  const update = async (data: UpdateUserDTO) => {
    try {
      setIsUpdating(true);
      const updated = await updateUser(data);

      // 🔥 opción 1: usar respuesta directa
      setUser(updated);

      // 🔥 opción 2 (más seguro si backend no devuelve todo):
      // await fetchUser();

      return updated;
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const changePasswordFn = async (data: ChangePasswordDTO) => {
  try {
    setIsUpdating(true);
    const res = await changePassword(data);
    return res;
  } finally {
    setIsUpdating(false);
  }
};
const changeUsernameFn = async (data: ChangeUsernameDTO) => {
  try {
    setIsUpdating(true);
    const res = await changeUsername(data);

    // opcional: refrescar usuario
    await fetchUser();

    return res;
  } finally {
    setIsUpdating(false);
  }
};
  return {
    user,
    loading,
    update,
    isUpdating,
    refresh: fetchUser,
    changePassword: changePasswordFn,
    changeUsername:changeUsernameFn,
  };
};