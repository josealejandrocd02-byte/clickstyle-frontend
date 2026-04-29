import { useEffect, useState } from "react";
import {
  getOrdersByStore,
  getOrdersByUser,
  createOrder as createOrderApi,
  confirmOrder as confirmOrderApi,
  cancelOrder as cancelOrderApi,
  OrderResponseDTO,
  CreateOrderRequest,
} from "@/services/orderService";

export const useOrders = (storeId?: string, userId?: string) => {
  const [orders, setOrders] = useState<OrderResponseDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* =========================
     📦 LOAD ORDERS
  ========================= */
  const fetchOrders = async () => {
    if (!storeId && !userId) {
      setOrders([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let data: OrderResponseDTO[] = [];

      if (storeId) {
        data = await getOrdersByStore(storeId);
      } else if (userId) {
        data = await getOrdersByUser(userId);
      }

      setOrders(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error("Error cargando pedidos", err);
      setError(err?.message || "Error al cargar pedidos");
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [storeId, userId]);

  /* =========================
     🛒 CREATE
  ========================= */
  const createOrder = async (payload: CreateOrderRequest) => {
    try {
      setIsLoading(true);
      const newOrder = await createOrderApi(payload);

      setOrders((prev) => [newOrder, ...prev]);

      return newOrder;
    } catch (err: any) {
      console.error("Error creando pedido", err);
      setError(err?.message || "Error al crear pedido");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /* =========================
     ✅ CONFIRMAR
  ========================= */
  const confirmOrder = async (id: string) => {
    try {
      const updated = await confirmOrderApi(id);

      setOrders((prev) =>
        prev.map((o) => (o.id === id ? updated : o))
      );
    } catch (err: any) {
      console.error("Error confirmando pedido", err);
      setError(err?.message || "Error al confirmar pedido");
    }
  };

  /* =========================
     ❌ CANCELAR
  ========================= */
  const cancelOrder = async (id: string) => {
    try {
      const updated = await cancelOrderApi(id);

      setOrders((prev) =>
        prev.map((o) => (o.id === id ? updated : o))
      );
    } catch (err: any) {
      console.error("Error cancelando pedido", err);
      setError(err?.message || "Error al cancelar pedido");
    }
  };

  return {
    orders,
    isLoading,
    error,

    refetch: fetchOrders,

    createOrder,
    confirmOrder,
    cancelOrder,
  };
};