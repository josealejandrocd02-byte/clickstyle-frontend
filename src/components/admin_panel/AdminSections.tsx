import { useState } from "react";
import AdminStoresList from "./storesCRUD/AdminStoresList";
import AdminUsers from "./usersCRUD/AdminUsers";
import AdminPlans from "./planCRUD/AdminPlans";
import { StoreAdmin } from "@/services/adminStoresService";

type TabType = "stores" | "plans" | "users";

interface Props {
  stores: StoreAdmin[];
  loadingStores: boolean;
  onApprove: (id: string) => Promise<void>;
  onReject: (id: string) => Promise<void>;
  onToggleActive: (id: string) => Promise<void>;
  onVerify: (id: string, verified: boolean) => Promise<void>;
  onAssignPlan: (storeId: string, planId: string) => Promise<void>;
  onRenewPlan: (storeId: string) => Promise<void>;
  onCreateStore: (data: {
    name: string;
    description: string;
    whatsappPhone: string;
    userId: string;
  }) => Promise<void>;
}

const AdminSections = ({
  stores,
  loadingStores,
  onApprove,
  onReject,
  onToggleActive,
  onVerify,
  onAssignPlan,
  onRenewPlan,
  onCreateStore,
}: Props) => {
  const [activeTab, setActiveTab] = useState<TabType>("stores");

  const tabs = [
    { id: "stores", label: "Tiendas" },
    { id: "plans", label: "Planes" },
    { id: "users", label: "Usuarios" },
  ];

  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm">
      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === tab.id
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4">
        {activeTab === "stores" && (
          <AdminStoresList
            stores={stores}
            loading={loadingStores}
            onApprove={onApprove}
            onReject={onReject}
            onToggleActive={onToggleActive}
            onVerify={onVerify}
            onAssignPlan={onAssignPlan}
            onCreate={onCreateStore}
            onRenewPlan={onRenewPlan}
          />
        )}

        {activeTab === "plans" && <AdminPlans />}
        {activeTab === "users" && <AdminUsers />}
      </div>
    </div>
  );
};

export default AdminSections;