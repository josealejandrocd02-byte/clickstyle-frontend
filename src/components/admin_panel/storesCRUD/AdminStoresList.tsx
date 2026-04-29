import { useState } from "react";
import { StoreAdmin } from "@/services/adminStoresService";
import AdminStoreCard from "./AdminStoreCard";
import StoreAdminControlsModal from "./StoreAdminControlsModal";
import StoreFormModal from "./StoreFormModal";
import { Plus } from "lucide-react";

type TabType =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "EXPIRED"
  | "NO_PLAN";

type Props = {
  stores: StoreAdmin[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onToggleActive: (id: string) => void;
  onVerify: (id: string, verified: boolean) => void;
  onAssignPlan: (storeId: string, planId: string) => void;
  onRenewPlan: (storeId: string) => void;
  loading?: boolean;

  // 👇 agrega esto
  onCreate: (data: {
    name: string;
    description: string;
    whatsappPhone: string;
    userId: string;
  }) => Promise<void>;
};

const tabs: TabType[] = [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "EXPIRED",
  "NO_PLAN",
];

const AdminStoresList = ({
  stores,
  loading,
  onCreate,
  ...actions
}: Props) => {
  const [activeTab, setActiveTab] = useState<TabType>("PENDING");

  const [editingStore, setEditingStore] =
    useState<StoreAdmin | null>(null);

  const [adminStore, setAdminStore] =
    useState<StoreAdmin | null>(null);

  // 🆕 estado para crear
  const [creatingStore, setCreatingStore] = useState(false);

  const filteredStores = stores.filter((s) => {
    if (activeTab === "EXPIRED") return !!s.plan && s.planExpired;
    if (activeTab === "NO_PLAN") return !s.plan;
    return s.status === activeTab;
  });

  return (
    <div className="space-y-4">

      {/* HEADER ACTIONS */}
      <div className="flex justify-between items-center">
        {/* TABS */}
        <div className="flex gap-2 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                activeTab === tab
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              {tab === "PENDING" && "Pendientes"}
              {tab === "APPROVED" && "Aprobadas"}
              {tab === "REJECTED" && "Rechazadas"}
              {tab === "EXPIRED" && "Planes expirados"}
              {tab === "NO_PLAN" && "Sin plan"}
            </button>
          ))}
        </div>

        {/* 🆕 BOTÓN CREAR */}
        <button
          onClick={() => setCreatingStore(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white"
        >
          <Plus size={16} />
          Nueva tienda
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-sm text-muted-foreground">
          Cargando tiendas...
        </div>
      )}

      {/* EMPTY */}
      {!loading && filteredStores.length === 0 && (
        <div className="text-sm text-muted-foreground">
          No hay tiendas en esta sección
        </div>
      )}

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredStores.map((store) => (
          <AdminStoreCard
            key={store.id}
            store={store}
            onEdit={() => setEditingStore(store)}
            onManage={() => setAdminStore(store)}
          />
        ))}
      </div>

      {/* 🔹 MODAL CREAR */}
      {creatingStore && (
        <StoreFormModal
          onClose={() => setCreatingStore(false)}
          onSave={async (data) => {
            await onCreate(data); // 🔥 conecta backend
            setCreatingStore(false);
          }}
        />
      )}

      {/* 🔹 MODAL EDITAR */}
      {editingStore && (
        <StoreFormModal
          store={editingStore}
          onClose={() => setEditingStore(null)}
          onSave={(data) => {
            console.log("Editar:", data);
            setEditingStore(null);
          }}
        />
      )}

      {/* 🔹 MODAL ADMIN */}
      {adminStore && (
        <StoreAdminControlsModal
          store={adminStore}
          onClose={() => setAdminStore(null)}
          {...actions}
        />
      )}
    </div>
  );
};

export default AdminStoresList;