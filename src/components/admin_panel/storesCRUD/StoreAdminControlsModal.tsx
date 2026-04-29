import { StoreAdmin } from "@/services/adminStoresService";
import {
  Store,
  Check,
  X,
  ShieldCheck,
  Power,
  Layers,
} from "lucide-react";
import { usePlans } from "@/hooks/usePlans";
import { useEffect, useState } from "react";

interface Props {
  store: StoreAdmin;
  onClose: () => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onToggleActive?: (id: string) => void;
  onVerify?: (id: string, verified: boolean) => void;
  onAssignPlan?: (storeId: string, planId: string) => void;
  onRenewPlan?: (storeId: string) => void;
}

const StoreAdminControlsModal = ({
  store,
  onClose,
  onApprove,
  onReject,
  onToggleActive,
  onVerify,
  onAssignPlan,
  onRenewPlan,
}: Props) => {
  const { plans } = usePlans();
    const [active, setActive] = useState(store.active);
    const [verified, setVerified] = useState(store.verified);
    

    useEffect(() => {
    setActive(store.active);
    setVerified(store.verified);
    }, [store]);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-card border border-border rounded-2xl shadow-lg">

          {/* HEADER */}
          <div className="p-5 border-b border-border">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Store className="h-5 w-5 text-muted-foreground" />
              Administración
            </h2>
            <p className="text-sm text-muted-foreground">
              {store.name}
            </p>
          </div>

          {/* BODY */}
          <div className="p-5 space-y-6">

            {/* 🔹 MODERACIÓN */}
            {store.status === "PENDING" && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Moderación</p>

                <div className="flex gap-3">
                  <button
                    onClick={() => onApprove?.(store.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition"
                  >
                    <Check size={16} /> Aprobar
                  </button>

                  <button
                    onClick={() => onReject?.(store.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                  >
                    <X size={16} /> Rechazar
                  </button>
                </div>
              </div>
            )}

            {/* 🔹 ESTADOS */}
            <div className="space-y-3">
              <p className="text-sm font-medium">Estado</p>

                {/* ACTIVO */}
                <div className="flex justify-between items-center">
                <span className="text-sm">Activo</span>
                <button
                    onClick={async () => {
                    await onToggleActive?.(store.id);
                    setActive((prev) => !prev); // 🔥 UI inmediata
                    }}
                    className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 transition ${
                    active
                        ? "bg-blue-500/10 text-blue-400"
                        : "bg-muted text-muted-foreground"
                    }`}
                >
                    <Power size={14} />
                    {active ? "Activo" : "Inactivo"}
                </button>
                </div>

                {/* VERIFICADO */}
                <div className="flex justify-between items-center">
                <span className="text-sm">Verificado</span>
                <button
                    onClick={async () => {
                    await onVerify?.(store.id, !verified);
                    setVerified((prev) => !prev); // 🔥 UI inmediata
                    }}
                    className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 transition ${
                    verified
                        ? "bg-green-500/10 text-green-400"
                        : "bg-muted text-muted-foreground"
                    }`}
                >
                    <ShieldCheck size={14} />
                    {verified ? "Sí" : "No"}
                </button>
                </div>
            </div>

            {/* 🔹 PLAN */}
            <div className="space-y-3">
              <p className="text-sm font-medium flex items-center gap-2">
                <Layers size={16} />
                Plan
              </p>

              <div className="text-xs text-muted-foreground">
                {store.plan
                  ? `${store.plan.name} ${
                      store.planExpired ? "(Expirado)" : ""
                    }`
                  : "Sin plan"}
              </div>

              {/* RENOVAR */}
              {store.plan && store.planExpired && (
                <button
                  onClick={() => onRenewPlan?.(store.id)}
                  className="w-full px-3 py-2 rounded-lg bg-green-500/10 text-green-400 text-sm hover:bg-green-500/20 transition"
                >
                  🔄 Renovar plan
                </button>
              )}

              {/* CAMBIAR PLAN */}
              <select
                className="w-full border border-border bg-background p-2 rounded-lg text-sm"
                value={store.plan?.id || ""}
                onChange={(e) => {
                    const value = e.target.value;
                    if (!value) return; // 🔒 seguridad extra
                    onAssignPlan?.(store.id, value);
                }}
                >
                <option value="" disabled>
                    Cambiar plan
                </option>

                {plans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                    {plan.name} • ${plan.price}
                    </option>
                ))}
                </select>

              {/* EXPIRACIÓN */}
              {store.planExpiresAt && (
                <p className="text-xs text-muted-foreground">
                  Expira:{" "}
                  {new Date(
                    store.planExpiresAt
                  ).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div className="p-5 border-t border-border">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 rounded-lg bg-muted hover:bg-muted/70 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreAdminControlsModal;