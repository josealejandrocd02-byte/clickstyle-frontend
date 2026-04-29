import api from "@/api/client";

/* 📦 DTO que viene del backend */
export interface StoreDTO {
  id: string;
  name: string;
  description: string;
  whatsappPhone: string;

  // 🔥 NUEVO
  instagramUrl?: string;
  facebookUrl?: string;

  status: string;
  statusLabel: string;
  verified: boolean;

  logoUrl?: string;
  bannerUrl?: string;
  hasPlan?: boolean;
  planName?: string;
}

/* 🧾 FORM del frontend */
export interface StoreFormData {
  name: string;
  description: string;
  whatsappPhone: string;

  // 🔥 NUEVO
  instagramUrl: string;
  facebookUrl: string;

  logo: File | null;
  banner: File | null;

  logoUrl?: string;   // preview
  bannerUrl?: string; // preview
}

/* 📦 GET mi tienda */
export const getMyStore = async (): Promise<StoreDTO> => {
  const response = await api.get("/stores/my-store");
  return response.data;
};

/* 🔄 UPDATE tienda (logo + banner + datos) */
export const updateStore = async (form: StoreFormData) => {
  const data = new FormData();

  data.append("name", form.name);
  data.append("description", form.description);
  data.append("whatsappPhone", form.whatsappPhone);

  // 🔥 NUEVO
  if (form.instagramUrl) {
    data.append("instagramUrl", form.instagramUrl);
  }

  if (form.facebookUrl) {
    data.append("facebookUrl", form.facebookUrl);
  }

  // 🖼 solo si existe
  if (form.logo) {
    data.append("logo", form.logo);
  }

  if (form.banner) {
    data.append("banner", form.banner);
  }

  return api.put("/stores/update", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getMyPlanUsage = async (storeId: string) => {
  const response = await api.get(`/stores/${storeId}/plan-usage`);
  return response.data;
};