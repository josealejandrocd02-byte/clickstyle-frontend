import AdminHeader from "@/components/admin_panel/AdminHeader";
import AdminSections from "@/components/admin_panel/AdminSections";
import Header from "@/components/Header";
import { useUser } from "@/hooks/useUser";
import { useAdmin } from "@/hooks/useAdmin";

const AdminDashboard = () => {
  const { user, loading: userLoading, refresh } = useUser();

  const {
    stores,
    loading,
    changeStatus,
    toggleActive,
    setVerified,
    assignPlan,        
    renewPlan,         
    createStoreAdmin,  
  } = useAdmin();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-6 space-y-6">
        <h1 className="text-2xl font-bold text-foreground">
          Panel Admin
        </h1>

        <AdminHeader
          user={user}
          isLoading={userLoading}
          onUserUpdated={refresh}
        />

        <AdminSections
          stores={stores}
          loadingStores={loading}
          onApprove={(id: string) => changeStatus(id, "APPROVED")}
          onReject={(id: string) => changeStatus(id, "REJECTED")}
          onToggleActive={toggleActive}
          onVerify={setVerified}
          onAssignPlan={assignPlan}
          onRenewPlan={renewPlan}
          onCreateStore={createStoreAdmin}
        />
      </main>
    </div>
  );
};

export default AdminDashboard;