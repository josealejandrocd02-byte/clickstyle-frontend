import api from "@/api/client";

export const login = async (username: string, password: string) => {
  const response = await api.post("/auth/login", {
    username,
    password,
  });
  return response.data;
};

// 🔥 NUEVO: register seller
export const registerSeller = async (data: {
  username: string;
  email: string;
  password: string;
  storeName: string;
  description: string;
  whatsapp: string;
}) => {
  const response = await api.post("/auth/register-seller", {
    user: {
      username: data.username,
      email: data.email,
      password: data.password,
    },
    store: {
      name: data.storeName,
      description: data.description,
      whatsappPhone: data.whatsapp,
    },
  });

  return response.data;
};