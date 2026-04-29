import axios from "axios";
import api from "@/api/client";

export const ORDER_STATUS = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  CANCELED: "CANCELED",
} as const;

export type OrderStatus =
  (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];



export interface OrderResponseDTO {
  id: string;

  productId: string;
  storeId: string;

  customerName: string;
  phone: string;

  quantity: number;
  price: number;

  status: string;

  paymentMethod: string;
  paymentStatus: string;

  shippingAddress: string;
  shippingCost: number;

  confirmed: boolean;

  createdAt: string;
}

export interface CreateOrderRequest {
  productId: string;

  userId?: string;

  customerName?: string;
  phone?: string;

  quantity?: number;
  paymentMethod?: string;
  shippingAddress?: string;
}

/* =========================
   📦 GET ORDERS BY STORE
========================= */
export const getOrdersByStore = async (storeId: string) => {
  const response = await api.get(`/orders/store/${storeId}`);
  return response.data as OrderResponseDTO[];
};

/* =========================
   👤 GET ORDERS BY USER
========================= */
export const getOrdersByUser = async (userId: string) => {
  const response = await api.get(`/orders/user/${userId}`);
  return response.data as OrderResponseDTO[];
};

/* =========================
   🛒 CREATE ORDER
========================= */
export const createOrder = async (data: CreateOrderRequest) => {
  const response = await api.post("/orders/create", data);
  return response.data as OrderResponseDTO;
};

/* =========================
   ✅ CONFIRM ORDER
========================= */
export const confirmOrder = async (id: string) => {
  const response = await api.put(`/orders/${id}/confirm`);
  return response.data as OrderResponseDTO;
};

/* =========================
   ❌ CANCEL ORDER
========================= */
export const cancelOrder = async (id: string) => {
  const response = await api.put(`/orders/${id}/cancel`);
  return response.data as OrderResponseDTO;
};