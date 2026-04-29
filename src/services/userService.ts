import api from "@/api/client";

export interface UserDTO {
  id: string;
  username: string;
  email: string;
  role: string;

  firstName?: string;
  lastName?: string;
  phone?: string;
  profileImageUrl: string;
}

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  phone?: string;
  profileImageUrl?: string;
}

/* 👤 GET usuario logeado */
export const getMe = async (): Promise<UserDTO> => {
  const res = await api.get("/users/get_me");
  return res.data;
};

/* ✏️ UPDATE usuario */
export const updateUser = async (data: UpdateUserDTO) => {
  const res = await api.put("/users/update_me", data);
  return res.data;
};

export interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
}

export const changePassword = async (data: ChangePasswordDTO) => {
  const res = await api.put("/users/change-password", data);
  return res.data;
};

export interface ChangeEmailDTO {
  newEmail: string;
  password: string;
}

export const changeEmail = async (data: ChangeEmailDTO) => {
  const res = await api.put("/users/change-email", data);
  return res.data;
};

/* 🔍 CHECK username */
export const checkUsername = async (username: string): Promise<boolean> => {
  const res = await api.get("/users/check-username", {
    params: { username },
  });
  return res.data; // true = ya existe
};

/* 🔍 CHECK email */
export const checkEmailExists = async (email: string): Promise<boolean> => {
  const res = await api.get("/users/check-email", {
    params: { email },
  });
  return res.data; // true = ya existe
};