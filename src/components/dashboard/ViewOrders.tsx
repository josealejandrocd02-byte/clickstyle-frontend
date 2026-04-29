import { X, Check, Truck, Ban } from "lucide-react";
import { Order, ORDER_STATUS } from "@/services/orderService";

interface Props {
  open: boolean;
  onClose: () => void;
  orders: Order[];
  onConfirm: (id: string) => void;
  onCancel: (id: string) => void;
}

const ViewOrders = ({
  open,
  onClose,
  orders,
  onConfirm,
  onCancel,
}: Props) => {
  const safeOrders = Array.isArray(orders) ? orders : [];

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-full sm:w-96 bg-card z-50 shadow-xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-lg">Pedidos</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* LIST */}
        <div className="p-4 space-y-3 overflow-y-auto h-full pb-20">
          {safeOrders.length === 0 && (
            <p className="text-sm text-muted-foreground text-center">
              No hay pedidos
            </p>
          )}

          {safeOrders.map((order) => (
            <div
              key={order.id}
              className="border rounded-xl p-3 space-y-2 bg-muted/30"
            >
              <p className="text-sm font-semibold">
                Pedido #{order.id.slice(0, 6)}
              </p>

              <p className="text-xs text-muted-foreground">
                Estado: {order.status}
              </p>

              <p className="text-sm font-medium">Bs {order.price}</p>

              <div className="flex gap-2 pt-2">
                {order.status === ORDER_STATUS.PENDING && (
                  <>
                    <button
                      onClick={() => onConfirm(order.id)}
                      className="flex-1 bg-green-600 text-white rounded-lg py-1 text-sm flex items-center justify-center gap-1"
                    >
                      <Check size={14} />
                      Confirmar
                    </button>

                    <button
                      onClick={() => onCancel(order.id)}
                      className="flex-1 bg-red-600 text-white rounded-lg py-1 text-sm flex items-center justify-center gap-1"
                    >
                      <Ban size={14} />
                      Cancelar
                    </button>
                  </>
                )}

                {order.status === ORDER_STATUS.CONFIRMED && (
                  <button className="flex-1 bg-blue-600 text-white rounded-lg py-1 text-sm flex items-center justify-center gap-1">
                    <Truck size={14} />
                    Enviar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewOrders;