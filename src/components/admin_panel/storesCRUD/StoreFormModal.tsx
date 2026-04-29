import { useUsersAdmin } from "@/hooks/useUsersAdmin";
import { StoreAdmin } from "@/services/adminStoresService";
import { Store, User, Lock, Unlock } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  store?: StoreAdmin;
  onClose: () => void;
  onSave?: (data: {
    name: string;
    description: string;
    whatsappPhone: string;
    userId: string;
  }) => void;
}


const capitalizeWords = (value: string) =>
  value.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

const formatBoliviaPhone = (value: string) => {
  let numbers = value.replace(/\D/g, "");

  if (numbers.startsWith("591")) {
    numbers = numbers.slice(3);
  }

  numbers = numbers.slice(0, 8);

  return "+591 " + numbers;
};
const StoreFormModal = ({ store, onClose, onSave }: Props) => {
  const { users, ownersWithoutStore, loading, refresh } = useUsersAdmin();

  const isEdit = !!store;

  const defaultForm = {
    name: "",
    description: "",
    whatsappPhone: "",
    userId: "",
  };

  const [form, setForm] = useState(defaultForm);
  const [isLocked, setIsLocked] = useState(isEdit);
  const [errors, setErrors] = useState<any>({});

  // 🔁 cargar datos
  useEffect(() => {
    if (store) {
      setForm({
        name: store.name,
        description: store.description,
        whatsappPhone: store.whatsappPhone,
        userId: store.userId || "",
      });
      setIsLocked(true);
    } else {
      setForm(defaultForm);
      setIsLocked(false);
    }

    setErrors({});
  }, [store]);

  const availableUsers = isEdit ? users : ownersWithoutStore;

  const handleClose = () => {
    setForm(defaultForm);
    setErrors({});
    onClose();
  };

  const validate = () => {
    const newErrors: any = {};

    if (!form.name.trim()) {
      newErrors.name = "Nombre obligatorio";
    } else if (form.name.length < 3) {
      newErrors.name = "Mínimo 3 caracteres";
    }

    if (!form.description.trim()) {
      newErrors.description = "Descripción obligatoria";
    } else if (form.description.length < 5) {
      newErrors.description = "Muy corta";
    }

    if (!form.whatsappPhone.trim()) {
      newErrors.whatsappPhone = "WhatsApp obligatorio";
    } else if (!/^\+591\s\d{8}$/.test(form.whatsappPhone)) {
      newErrors.whatsappPhone = "Formato: +591 7XXXXXXX";
    }

    if (!form.userId) {
      newErrors.userId = "Selecciona un usuario";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (isLocked && isEdit) return; // 🔒 protección extra
    if (!validate()) return;

    await onSave?.(form);

    if (!isEdit) {
      await refresh();
    }

    handleClose();
  };
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
              <Store className="h-5 w-5 text-muted-foreground" />
              {isEdit ? store.name : "Nueva tienda"}
            </h2>
            <p className="text-sm text-muted-foreground">
              Datos básicos
            </p>
          </div>

          {/* BODY */}
          <div className="p-5 space-y-5">

            {/* INFO */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">Información básica</p>

                {isEdit && (
                  <button
                    onClick={() => setIsLocked(!isLocked)}
                    className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-muted"
                  >
                    {isLocked ? <Lock size={14} /> : <Unlock size={14} />}
                    {isLocked ? "Bloqueado" : "Editable"}
                  </button>
                )}
              </div>

              <input
                placeholder="Nombre"
                value={form.name}
                disabled={isLocked}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: capitalizeWords(e.target.value),
                  })
                }
                className="w-full border p-2 rounded-lg bg-background disabled:opacity-50"
              />

              <input
                placeholder="Descripción"
                value={form.description}
                disabled={isLocked}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: capitalizeWords(e.target.value),
                  })
                }
                className="w-full border p-2 rounded-lg bg-background disabled:opacity-50"
              />

              <input
              placeholder="WhatsApp"
              value={form.whatsappPhone}
              disabled={isLocked}
              onChange={(e) =>
                setForm({
                  ...form,
                  whatsappPhone: formatBoliviaPhone(e.target.value),
                })
              }
              className="w-full border p-2 rounded-lg bg-background disabled:opacity-50"
            />
            </div>

            {/* USER */}
            <div className="space-y-2">
              <p className="text-sm font-medium flex items-center gap-2">
                <User size={16} />
                Usuario
              </p>

              <select
                value={form.userId}
                disabled={isLocked}
                onChange={(e) =>
                  setForm({ ...form, userId: e.target.value })
                }
                className="w-full border p-2 rounded-lg bg-background disabled:opacity-50"
              >
                <option value="">
                  {loading ? "Cargando..." : "Seleccionar usuario"}
                </option>

                {availableUsers.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.username} • {u.email}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* FOOTER */}
          <div className="p-5 border-t flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg bg-muted"
            >
              Cancelar
            </button>

            <button
              disabled={isLocked && isEdit}
              onClick={handleSave}
              className="flex-1 px-4 py-2 rounded-lg bg-primary text-white disabled:opacity-50"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreFormModal;