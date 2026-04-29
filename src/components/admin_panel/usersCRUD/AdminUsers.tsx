import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Pencil, Trash, ShieldCheck, Power, Plus, Settings } from "lucide-react";

import { useUsersAdmin } from "@/hooks/useUsersAdmin";
import { useCreateUserAdmin } from "@/hooks/useCreateUserAdmin";

import DeleteUserModal from "./DeleteUserModal";

import { UserAdmin, CreateUserAdminDTO } from "@/services/adminUsersService";
import CreateUserForm from "./CreateUserForm";
import EditUserForm from "./EditUserForm";
import UserAdminControlsModal from "./UserAdminControlsModal";

const AdminUsers = () => {
  const {
    users,
    loading,
    update,
    toggleActive,
    verify,
    remove,
    refresh,
  } = useUsersAdmin();

  const { create } = useCreateUserAdmin();

  const [selected, setSelected] = useState<UserAdmin | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [controlUser, setControlUser] = useState<UserAdmin | null>(null);
  const currentUser = users.find(u => u.id === controlUser?.id);

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <div className="space-y-4">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Usuarios</h2>

        <Button
          onClick={() => {
            setOpenCreate(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Crear Usuario
        </Button>
      </div>

      {/* LISTA */}
      <div className="space-y-2">
        {users.map((u) => (
          <div
            key={u.id}
            className="border p-4 rounded-xl flex justify-between"
          >
            <div>
              <p className="font-bold">{u.username}</p>
              <p className="text-sm text-muted-foreground">
                {u.email}
              </p>

              <div className="text-xs mt-1 flex gap-2">
                <span className="bg-muted px-2 py-1 rounded">
                  {u.role}
                </span>

                <span
                  className={`px-2 py-1 rounded ${
                    u.isActive
                      ? "bg-green-500/20 text-green-500"
                      : "bg-red-500/20 text-red-500"
                  }`}
                >
                  {u.isActive ? "Activo" : "Inactivo"}
                </span>

                <span
                  className={`px-2 py-1 rounded ${
                    u.emailVerified
                      ? "bg-blue-500/20 text-blue-500"
                      : "bg-yellow-500/20 text-yellow-500"
                  }`}
                >
                  {u.emailVerified ? "Verificado" : "No verificado"}
                </span>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">

              {/* EDIT */}
              <Button
                size="icon"
                className="p-2 rounded-lg bg-muted hover:bg-muted/70 transition"
                variant="outline"
                onClick={() => {
                  setSelected(u);
                  setOpenEdit(true);
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>

              <Button
                size="icon"
                onClick={() => setControlUser(u)}
                className="p-2 rounded-lg bg-primary text-white hover:opacity-90 transition"
              >
                <Settings size={16} />
              </Button>


              {/* DELETE */}
              <Button
                size="icon"
                variant="destructive"
                onClick={() => setDeleteId(u.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>

            </div>
          </div>
        ))}
      </div>

      {/* 🟢 CREATE */}
      <CreateUserForm
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreate={async (data: CreateUserAdminDTO) => {
          await create(data);
          await refresh(); 
        }}
      />

      {/* EDIT */}
      <EditUserForm
        open={openEdit}
        onClose={() => {
          setOpenEdit(false);
          setSelected(null);
        }}
        initialData={selected}
        onSave={async (data: UserAdmin) => {
          if (!selected) return;
          await update(selected.id, data);
        }}
      />

      {/* DELETE */}
      <DeleteUserModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => {
          if (deleteId) await remove(deleteId);
          setDeleteId(null);
        }}
      />

      {controlUser && currentUser && (
        <UserAdminControlsModal
          user={currentUser} // 🔥 SIEMPRE actualizado
          onClose={() => setControlUser(null)}
          onToggleActive={toggleActive}
          onVerify={verify}
          onResetPassword={async (id, password) => {
            console.log("reset password", id, password);
          }}
        />
      )}

    </div>
  );
};

export default AdminUsers;