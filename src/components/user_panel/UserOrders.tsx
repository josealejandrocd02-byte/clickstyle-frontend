import { useEffect, useState } from "react";
import { useOrders } from "@/hooks/useOrders";
import { useUser } from "@/hooks/useUser";

import {
  Loader2,
  Package,
  CheckCircle,
  XCircle,
} from "lucide-react";

/* SOLO ESTADOS DE USUARIO */
const statusConfig = {
  ALL: {
    label: "Todos",
    icon: null,
    color: "",
  },
  PENDING: {
    label: "Pendiente",
    icon: Package,
    color: "text-yellow-500",
  },
  CONFIRMED: {
    label: "Confirmado",
    icon: CheckCircle,
    color: "text-blue-500",
  },
  CANCELED: {
    label: "Cancelado",
    icon: XCircle,
    color: "text-red-500",
  },
} as const;
type StatusFilter = keyof typeof statusConfig;

const UserOrders = () => {
  const { user } = useUser();

  const { orders, isLoading, error, refetch } = useOrders(
    undefined,
    user?.id
  );

  const [filter, setFilter] = useState<StatusFilter>("ALL");

  useEffect(() => {
    if (user?.id) {
      refetch();
    }
  }, [user?.id]);

  const filteredOrders =
    filter === "ALL"
      ? orders
      : orders.filter((o) => o.status === filter);

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="space-y-4">
      {/* 🔥 FILTROS */}
      <div className="flex gap-2 flex-wrap">
        {Object.keys(statusConfig).map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key as StatusFilter)}
            className={`px-3 py-1 rounded-lg text-sm border ${
              filter === key
                ? "bg-primary text-white"
                : "bg-background"
            }`}
          >
            {statusConfig[key as StatusFilter].label}
          </button>
        ))}
      </div>

      {/* 🔥 LISTA */}
      {filteredOrders.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No hay pedidos
        </p>
      ) : (
        filteredOrders.map((order) => {
          const config =
            statusConfig[order.status as StatusFilter] ||
            statusConfig.PENDING;

          const Icon = config.icon;

          return (
            <div
              key={order.id}
              className="border rounded-xl p-4 bg-card shadow-sm flex justify-between items-center"
            >
              {/* INFO */}
              <div className="space-y-1">
                <p className="font-semibold text-foreground">
                  Pedido #{order.id.slice(0, 8)}
                </p>

                <p className="text-sm text-muted-foreground">
                  Cantidad: {order.quantity}
                </p>

                <p className="text-sm text-muted-foreground">
                  Total: Bs. {order.price}
                </p>

                <p className="text-xs text-muted-foreground">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              {/* STATUS */}
              <div className={`flex items-center gap-2 ${config.color}`}>
                {Icon && <Icon size={18} />}
                <span className="text-sm font-medium">
                  {config.label}
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default UserOrders;