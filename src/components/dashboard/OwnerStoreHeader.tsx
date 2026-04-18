import { Pencil, Package, TrendingUp, Star, ShieldCheck, UserCog } from "lucide-react";
import StoreForm from "./StoreForm";
import { useState } from "react";
import EditUser from "../userComponents/EditUser";

interface Props {
  store: {
    name: string;
    description: string;
    logoUrl?: string;
    bannerUrl?: string;

    status: string;
    statusLabel: string;
    verified: boolean;
  } | null;

  isLoading: boolean;

  salesCount?: number;
  usedProducts: number;
  productLimit: number;
}

const OwnerStoreHeader = ({
  store,
  isLoading,
  salesCount = 0,
  usedProducts= 0,
  productLimit= 0,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  if (isLoading) {
    return (
      <div className="rounded-xl border p-6 animate-pulse">
        <div className="h-40 bg-muted rounded mb-4" />
        <div className="h-6 w-40 bg-muted rounded mb-2" />
        <div className="h-4 w-60 bg-muted rounded" />
      </div>
    );
  }

  if (!store) return null;

  // 🎨 colores por estado
  const statusColors: Record<string, string> = {
    ACTIVE: "bg-green-100 text-green-600",
    INACTIVE: "bg-gray-200 text-gray-600",
    SUSPENDED: "bg-red-100 text-red-600",
  };

  return (
    <div className="rounded-xl overflow-hidden border bg-card shadow-sm">

      {/* 🖼 BANNER */}
      <div className="relative h-40 bg-muted">
        <img
          src={store.bannerUrl || "/banner-placeholder.jpg"}
          alt="banner"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30" />

        <button
          onClick={() => setOpen(true)}
          className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
        >
          <Pencil size={24} />
        </button>
        <button
          onClick={() => setOpenUser(true)}
          className="absolute top-12 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
        >
          <UserCog size={24} />
        </button>

        {open && <StoreForm onClose={() => setOpen(false)} />}
      </div>

      {/* INFO */}
      <div className="relative px-6 pb-6">

        <div className="-mt-12 flex items-end gap-4">

          {/* LOGO */}
          <img
            src={store.logoUrl || "/placeholder.png"}
            alt={store.name}
            className="h-24 w-24 rounded-full object-cover border-4 border-background shadow"
          />

          {/* TEXT */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold flex items-center gap-2 flex-wrap">
              {store.name}

              {/* ✅ VERIFICADA */}
              {store.verified && (
                <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 backdrop-blur">
                  <ShieldCheck size={12} />
                  Verificada
                </span>
              )}


              {/* 🔥 STATUS */}
              <span
                className={`text-xs px-3 py-1 rounded-full backdrop-blur ${
                  statusColors[store.status] || "bg-gray-500/10 text-gray-500"
                }`}
              >
                {store.statusLabel}
              </span>
            </h1>

            <p className="text-sm text-muted-foreground">
              {store.description}
            </p>
          </div>
        </div>

        {/* 📊 STATS */}
        <div className="mt-6 grid grid-cols-3 gap-4">

          <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
            <Package className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-semibold">{usedProducts}/{productLimit}</p>
              <p className="text-xs text-muted-foreground">Productos</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
            <TrendingUp className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-semibold">{salesCount}</p>
              <p className="text-xs text-muted-foreground">Ventas</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
            <Star className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-semibold">5.0</p>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
          </div>

          {openUser && <EditUser onClose={() => setOpenUser(false)} />}

        </div>

      </div>
    </div>
  );
};

export default OwnerStoreHeader;