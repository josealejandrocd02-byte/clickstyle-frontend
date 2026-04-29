import { Store, Pencil, ShieldCheck, Power, Settings } from "lucide-react";
import { StoreAdmin } from "@/services/adminStoresService";
import { Button } from "@/components/ui/button";

interface Props {
  store: StoreAdmin;
  onEdit: () => void;
  onManage: () => void; // 🔥 nuevo
}

const statusColor: Record<string, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-400",
  APPROVED: "bg-green-500/10 text-green-400",
  REJECTED: "bg-red-500/10 text-red-400",
};

const AdminStoreCard = ({ store, onEdit, onManage }: Props) => {
  return (
    <div className="group border border-border bg-card p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col gap-4">

      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-foreground flex gap-2 items-center">
            <Store size={16} className="text-muted-foreground" />
            {store.name}
          </p>

          <span
            className={`text-xs px-2 py-1 rounded-md mt-1 inline-block ${
              statusColor[store.status] || "bg-muted text-muted-foreground"
            }`}
          >
            {store.status}
          </span>
        </div>

        {/* 🔥 ACCIONES */}
        <div className="flex gap-2">

            {/* EDITAR */}
            <Button
              size="icon"
              variant="outline"
              className="hover:bg-muted/70 transition"
              onClick={onEdit}
              title="Editar datos"
            >
              <Pencil className="h-4 w-4" />
            </Button>

            {/* ADMIN / CONTROL */}
            <Button
              size="icon"
              variant="default"
              className="bg-primary text-white hover:opacity-90 transition"
              onClick={onManage}
              title="Administrar usuario"
            >
              <Settings className="h-4 w-4" />
            </Button>

          </div>
                </div>

      {/* DIVIDER */}
      <div className="h-px bg-border" />

      {/* ESTADOS */}
      <div className="flex gap-2 flex-wrap text-xs">

        {/* VERIFICACIÓN */}
        <span
          className={`flex items-center gap-1 px-2 py-1 rounded-md ${
            store.verified
              ? "bg-green-500/10 text-green-400"
              : "bg-muted text-muted-foreground"
          }`}
        >
          <ShieldCheck size={12} />
          {store.verified ? "Verificada" : "No verificada"}
        </span>

        {/* ACTIVACIÓN */}
        <span
          className={`flex items-center gap-1 px-2 py-1 rounded-md ${
            store.active
              ? "bg-blue-500/10 text-blue-400"
              : "bg-muted text-muted-foreground"
          }`}
        >
          <Power size={12} />
          {store.active ? "Activa" : "Inactiva"}
        </span>

        {/* PLAN */}
        <span
          className={`flex items-center gap-1 px-2 py-1 rounded-md ${
            !store.plan
              ? "bg-muted text-muted-foreground"
              : store.planExpired
              ? "bg-red-500/10 text-red-400"
              : "bg-green-500/10 text-green-400"
          }`}
        >
          {!store.plan
            ? "Sin plan"
            : store.planExpired
            ? `${store.plan.name} (Expirado)`
            : store.plan.name}
        </span>
      </div>

      {/* INFO PLAN */}
      {store.plan && (
        <div className="text-xs text-muted-foreground">
          {store.plan.productLimit} productos • ${store.plan.price} •{" "}
          {store.plan.durationDays} días
        </div>
      )}

      {/* EXPIRACIÓN */}
      {store.planExpiresAt && (
        <div className="text-xs text-muted-foreground">
          Expira el{" "}
          <span className="font-medium text-foreground">
            {new Date(store.planExpiresAt).toLocaleDateString()}
          </span>
        </div>
      )}
    </div>
  );
};

export default AdminStoreCard;