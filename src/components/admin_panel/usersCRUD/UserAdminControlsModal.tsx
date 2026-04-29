import { useState } from "react";
import { ShieldCheck, Power, User, Key } from "lucide-react";
import { Button } from "@/components/ui/button";

import { UserAdmin } from "@/services/adminUsersService";

interface Props {
  user: UserAdmin;
  onClose: () => void;
  onToggleActive?: (id: string) => Promise<void>;
  onVerify?: (id: string, verified: boolean) => Promise<void>;
  onResetPassword?: (id: string, newPassword: string) => Promise<void>;
}

const UserAdminControlsModal = ({
  user,
  onClose,
  onToggleActive,
  onVerify,
  onResetPassword,
}: Props) => {
  const [newPassword, setNewPassword] = useState("");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-card border border-border rounded-2xl shadow-lg">

          {/* HEADER */}
          <div className="p-5 border-b border-border">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <User className="h-5 w-5 text-muted-foreground" />
              Administración Usuario
            </h2>
            <p className="text-sm text-muted-foreground">
              {user.username} • {user.email}
            </p>
          </div>

          {/* BODY */}
          <div className="p-5 space-y-6">

            {/* 🔹 ESTADOS */}
            <div className="space-y-3">
              <p className="text-sm font-medium">Estado</p>

              {/* ACTIVO */}
              <div className="flex justify-between items-center">
                <span className="text-sm">Activo</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onToggleActive?.(user.id)}
                  className={`flex items-center gap-1 ${
                    user.isActive
                      ? "bg-blue-500/10 text-blue-400"
                      : ""
                  }`}
                >
                  <Power size={14} />
                  {user.isActive ? "Activo" : "Inactivo"}
                </Button>
              </div>

              {/* VERIFICADO */}
              <div className="flex justify-between items-center">
                <span className="text-sm">Verificado</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    onVerify?.(user.id, !user.emailVerified)
                  }
                  className={`flex items-center gap-1 ${
                    user.emailVerified
                      ? "bg-green-500/10 text-green-400"
                      : ""
                  }`}
                >
                  <ShieldCheck size={14} />
                  {user.emailVerified ? "Sí" : "No"}
                </Button>
              </div>
            </div>

            {/* 🔹 RESET PASSWORD */}
            <div className="space-y-3">
              <p className="text-sm font-medium flex items-center gap-2">
                <Key size={16} />
                Reiniciar contraseña
              </p>

              <input
                type="password"
                placeholder="Nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-border bg-background p-2 rounded-lg text-sm"
              />

              <Button
                variant="outline"
                className="w-full text-yellow-400 border-yellow-400/30 hover:bg-yellow-400/10"
                onClick={async () => {
                  if (!newPassword) return;
                  await onResetPassword?.(user.id, newPassword);
                  setNewPassword("");
                }}
              >
                🔑 Actualizar contraseña
              </Button>
            </div>
          </div>

          {/* FOOTER */}
          <div className="p-5 border-t border-border">
            <Button
              variant="secondary"
              className="w-full"
              onClick={onClose}
            >
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAdminControlsModal;