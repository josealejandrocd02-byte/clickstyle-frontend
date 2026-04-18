import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import StorePage from "./pages/StorePage.tsx";
import StoresPage from "./pages/StoresPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import { getRole, getToken, removeRole, removeToken } from "@/utils/storage";
import RegisterPage from "./pages/RegisterPage.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import SellerDashboard from "./pages/seller/SellerDashboard .tsx";
import { isAuthenticated, isTokenValid } from "./utils/isTokenValid.ts";


interface Props {
  children: JSX.Element;
  role?: string;
}
const queryClient = new QueryClient();

const ProtectedRoute = ({ children, role }: Props) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  const userRole = getRole();

  if (role && userRole !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

const RoleRedirect = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  const role = getRole();

  if (role === "ADMIN") return <Navigate to="/admin" />;
  if (role === "OWNER") return <Navigate to="/dashboard" />;

  return <Navigate to="/login" />;
};



const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>
          {/* 🌐 PÚBLICAS */}
          <Route path="/" element={<Index />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/store/:id" element={<StorePage />} />
          <Route path="/stores" element={<StoresPage />} />

          {/* 🔐 AUTH */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* 🔁 REDIRECT AUTOMÁTICO */}
          <Route path="/redirect" element={<RoleRedirect />} />

          {/* 👑 ADMIN */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 🏪 SELLER */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="OWNER">
                <SellerDashboard />
              </ProtectedRoute>
            }
          />

          {/* ❌ NOT FOUND */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
