import { UserCog, ShieldCheck } from "lucide-react";
import { useState } from "react";
import EditUser from "../userComponents/EditUser";
import { UserDTO } from "@/services/userService";
import { useAdmin } from "@/hooks/useAdmin";
import UserHeader from "../userComponents/UserHeader";

interface Props {
  user: UserDTO | null;
  isLoading: boolean;
  onUserUpdated?: () => void;
}

const AdminHeader = ({ user, isLoading  }: Props) => {
  const { stats, loading: statsLoading } = useAdmin();

  if (isLoading) {
    return (
      <div className="rounded-xl border border-border p-6 animate-pulse bg-card">
        <div className="h-20 w-20 bg-muted rounded-full mb-4" />
        <div className="h-6 w-40 bg-muted rounded mb-2" />
        <div className="h-4 w-60 bg-muted rounded" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm p-6">

      {/* 🔝 HEADER */}

      <UserHeader/>


   

      {/* 📊 STATS */}
        <div className="mt-6 grid grid-cols-3 gap-4">

        <div className="p-4 rounded-xl bg-muted/40 border border-border text-center">
            <p className="text-lg font-semibold text-foreground">
            {statsLoading ? "..." : stats?.stores ?? 0}
            </p>
            <p className="text-xs text-muted-foreground">Tiendas</p>
        </div>

        <div className="p-4 rounded-xl bg-muted/40 border border-border text-center">
            <p className="text-lg font-semibold text-foreground">
            {statsLoading ? "..." : stats?.pending ?? 0}
            </p>
            <p className="text-xs text-muted-foreground">Pendientes</p>
        </div>

        <div className="p-4 rounded-xl bg-muted/40 border border-border text-center">
            <p className="text-lg font-semibold text-foreground">
            {statsLoading ? "..." : stats?.users ?? 0}
            </p>
            <p className="text-xs text-muted-foreground">Usuarios</p>
        </div>

        </div>

    </div>
  );
};

export default AdminHeader;