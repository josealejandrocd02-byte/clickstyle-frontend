import axios from "axios";

export const ORDER_STATUS = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  CANCELED: "CANCELED",
} as const;

export type OrderStatus =
  (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];


export interface Order {
  id: string;
  productId: string;
  storeId: string;

  productName?: string;
  imageUrl?: string;

  customerName?: string;
  phone?: string;

  quantity: number;
  price: number;

  status: OrderStatus;

  paymentMethod?: string;
  paymentStatus?: string;

  shippingAddress?: string;
  shippingCost?: number;

  confirmed: boolean;

  createdAt: string;
}
const API = "/api/orders";

/* =========================
   📦 LISTAR PEDIDOS
========================= */
export const getOrdersByStore = async (storeId: string): Promise<Order[]> => {
  const res = await axios.get(`/api/orders/store/${storeId}`);

  const data = res.data;

  // 🔥 NORMALIZAR SIEMPRE
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.content)) return data.content;
  if (Array.isArray(data?.data)) return data.data;

  return []; // fallback seguro
};
/* =========================
   🛒 CREAR PEDIDO
========================= */
export const createOrder = async (productId: string) => {
  const res = await axios.post(`${API}/create`, { productId });
  return res.data;
};

/* =========================
   ✅ CONFIRMAR
========================= */
export const confirmOrder = async (id: string) => {
  const res = await axios.put(`${API}/${id}/confirm`);
  return res.data;
};

/* =========================
   ❌ CANCELAR
========================= */
export const cancelOrder = async (id: string) => {
  const res = await axios.put(`${API}/${id}/cancel`);
  return res.data;
};