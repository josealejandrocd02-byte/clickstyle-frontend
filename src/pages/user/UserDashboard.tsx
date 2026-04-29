import { useState } from "react";
import { useUser } from "@/hooks/useUser";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Header from "@/components/Header";
import UserHeader from "@/components/userComponents/UserHeader";
import UserOrders from "../../components/user_panel/UserOrders";

const UserDashboard = () => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="animate-spin h-6 w-6 text-gray-400" />
      </div>
    );
  }

  if (!user) {
    return <p className="text-center mt-10">Error cargando usuario</p>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-6 space-y-6">
        <h1 className="text-2xl font-bold text-foreground">
          Panel Usuario
        </h1>

        <UserHeader />

        {/* SOLO PEDIDOS */}
        <div className="rounded-xl border border-border bg-card shadow-sm p-6">
          <UserOrders />
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;