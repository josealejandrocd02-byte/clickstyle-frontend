import { useEffect, useState } from "react";
import {
  getOrdersByStore,
  confirmOrder as confirmOrderApi,
  cancelOrder as cancelOrderApi,
  Order,
  OrderStatus,
  ORDER_STATUS,
} from "@/services/orderService";

export const useOrders = (storeId?: string) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /* =========================
     LOAD ORDERS
  ========================= */
  const fetchOrders = async () => {
    if (!storeId) {
      setOrders([]); // 🔥 clave
      return;
    }

    setIsLoading(true);
    try {
      const data = await getOrdersByStore(storeId);
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando pedidos", error);
      setOrders([]); // 🔥 fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (storeId) {
      fetchOrders();
    } else {
      setOrders([]);
    }
  }, [storeId]);

  /* =========================
     CONFIRMAR
  ========================= */
  const confirmOrder = async (id: string) => {
    try {
      await confirmOrderApi(id);

      setOrders((prev) =>
        Array.isArray(prev)
          ? prev.map((o) =>
              o.id === id
                ? {
                    ...o,
                    status: ORDER_STATUS.CONFIRMED as OrderStatus,
                    confirmed: true,
                  }
                : o
            )
          : []
      );
    } catch (error) {
      console.error("Error confirmando pedido", error);
    }
  };

  /* =========================
     CANCELAR
  ========================= */
  const cancelOrder = async (id: string) => {
    try {
      await cancelOrderApi(id);

      setOrders((prev) =>
        Array.isArray(prev)
          ? prev.map((o) =>
              o.id === id
                ? {
                    ...o,
                    status: ORDER_STATUS.CANCELED as OrderStatus,
                  }
                : o
            )
          : []
      );
    } catch (error) {
      console.error("Error cancelando pedido", error);
    }
  };

  return {
    orders: Array.isArray(orders) ? orders : [], // 🔥 blindaje final
    isLoading,
    confirmOrder,
    cancelOrder,
    refetch: fetchOrders,
  };
};