import { UserCog, ShieldCheck } from "lucide-react";
import { useState } from "react";
import EditUser from "./EditUser";
import { useUser } from "@/hooks/useUser";

const UserHeader = () => {
  const { user, loading, refresh } = useUser();
  const [openUser, setOpenUser] = useState(false);

  if (loading) {
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
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">
          
          {/* 👤 AVATAR */}
          <img
            src={user.profileImageUrl || "/user-default.png"}
            alt="user"
            className="h-20 w-20 rounded-full object-cover border border-border shadow"
          />

          {/* 📛 INFO */}
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              {user.firstName} {user.lastName}
            </h1>

            <div className="flex items-center gap-2 mt-1">
              
              {/* 🧑 ROLE */}
              <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">
                {user.role}
              </span>

              {/* ✅ STATUS */}
              <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-400">
                <ShieldCheck size={12} />
                Activo
              </span>
            </div>
          </div>
        </div>

        {/* ⚙️ EDIT */}
        <button
          onClick={() => setOpenUser(true)}
          className="bg-muted hover:bg-muted/70 transition p-2 rounded-lg"
        >
          <UserCog size={20} />
        </button>
      </div>

      {/* 📊 EXTRA INFO SEGÚN ROL */}
      <div className="mt-6 grid grid-cols-2 gap-4">

        {/* 📧 EMAIL */}
        <div className="p-4 rounded-xl bg-muted/40 border border-border text-center">
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="text-sm font-medium text-foreground truncate">
            {user.email}
          </p>
        </div>

        {/* 📅 CREATED */}
        <div className="p-4 rounded-xl bg-muted/40 border border-border text-center">
          <p className="text-sm text-muted-foreground">Cuenta</p>
          <p className="text-sm font-medium text-foreground">
            Activa
          </p>
        </div>

      </div>

      {/* 🧩 MODAL */}
      {openUser && (
        <EditUser
          onClose={() => {
            setOpenUser(false);
            refresh(); // 🔥 refresca user correctamente
          }}
        />
      )}
    </div>
  );
};

export default UserHeader;