import api from "@/api/client";

export interface UserDTO {
  id: string;
  username: string;
  email: string;
  role: string;

  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  phone?: string;
  profileImageUrl?: string;
}

/* 👤 GET usuario logeado */
export const getMe = async (): Promise<UserDTO> => {
  const res = await api.get("/users/me");
  return res.data;
};

/* ✏️ UPDATE usuario */
export const updateUser = async (data: UpdateUserDTO) => {
  const res = await api.put("/users/me", data);
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

export interface ChangeUsernameDTO {
  password: string;
  newUsername: string;
}

export const changeUsername = async (data: ChangeUsernameDTO) => {
  console.log(data);
  const res = await api.put("/users/change-username", data);
  
  
  return res.data;
};