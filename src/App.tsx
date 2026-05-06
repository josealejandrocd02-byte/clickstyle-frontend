import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";

import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import StorePage from "./pages/StorePage";
import StoresPage from "./pages/StoresPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserDashboard from "./pages/user/UserDashboard";

import { getRole } from "@/utils/storage";
import { isAuthenticated } from "./utils/isTokenValid";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SellerDashboard from "./pages/seller/SellerDashboard ";

const queryClient = new QueryClient();

// 🔥 1. Emitimos un evento global en lugar de usar Context
const RequireAuth = () => {
  useEffect(() => {
    window.dispatchEvent(new Event("openLogin"));
  }, []);
  return <Navigate to="/" replace />;
};

/* 🔐 PROTECTED */
const ProtectedRoute = ({ children, roles }: any) => {
  if (!isAuthenticated()) {
    return <RequireAuth />;
  }

  const role = getRole();

  if (roles && !roles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // 🔥 2. Escuchamos el evento para abrir el modal desde cualquier parte
  useEffect(() => {
    const handleOpen = () => setIsLoginOpen(true);
    window.addEventListener("openLogin", handleOpen);
    
    return () => window.removeEventListener("openLogin", handleOpen);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          {/* 🔥 3. Pasamos la función onClose como Prop al modal */}
          {isLoginOpen && <LoginPage onClose={() => setIsLoginOpen(false)} />}

          <Routes>
            {/* 🌐 PUBLIC */}
            <Route path="/" element={<Index />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/store/:id" element={<StorePage />} />
            <Route path="/stores" element={<StoresPage />} />

            {/* 🔐 AUTH */}
            <Route path="/register" element={<RegisterPage />} />

            {/* 👤 USER PANEL */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute roles={["USER", "OWNER"]}>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />

            {/* 🏪 STORE PANEL */}
            <Route
              path="/store/dashboard"
              element={
                <ProtectedRoute roles={["OWNER"]}>
                  <SellerDashboard />
                </ProtectedRoute>
              }
            />

            {/* 👑 ADMIN */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={["ADMIN"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* ❌ */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;