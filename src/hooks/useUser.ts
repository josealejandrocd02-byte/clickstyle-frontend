import { useEffect, useState } from "react";
import { getMe, updateUser, UserDTO, UpdateUserDTO, changePassword, ChangePasswordDTO,ChangeEmailDTO,changeEmail, checkUsername, checkEmailExists } from "@/services/userService";

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

const changeEmailFn = async (data: ChangeEmailDTO) => {
  try {
    setIsUpdating(true);
    const res = await changeEmail(data);

    // 🔄 refrescar usuario (importante porque cambió email)
    await fetchUser();

    return res;
  } finally {
    setIsUpdating(false);
  }
};

const checkUsernameFn = async (username: string) => {
  return await checkUsername(username);
};

const checkEmailFn = async (email: string) => {
  return await checkEmailExists(email);
};

  return {
    user,
    loading,
    update,
    isUpdating,
    refresh: fetchUser,
    changePassword: changePasswordFn,
    changeEmail: changeEmailFn, 
    checkUsername: checkUsernameFn,
    checkEmail: checkEmailFn,
  };
};