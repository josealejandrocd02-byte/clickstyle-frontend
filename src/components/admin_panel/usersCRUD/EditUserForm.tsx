import { useEffect, useState } from "react";
import { UserAdmin } from "@/services/adminUsersService";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

/* HELPERS */
const capitalizeWords = (value: string) =>
  value.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

const formatBoliviaPhone = (value: string) => {
  let numbers = value.replace(/\D/g, "");

  if (numbers.startsWith("591")) numbers = numbers.slice(3);

  numbers = numbers.slice(0, 8);

  return numbers ? "+591 " + numbers : "";
};

/* COMPONENT */
interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (user: UserAdmin) => Promise<void>;
  initialData: UserAdmin | null;
}

const EditUserForm = ({
  open,
  onClose,
  onSave,
  initialData,
}: Props) => {
  const [form, setForm] = useState<UserAdmin | null>(null);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        firstName: initialData.firstName ?? "",
        lastName: initialData.lastName ?? "",
        phone: initialData.phone ?? "",
      });
      setErrors({});
    }
  }, [initialData]);

  if (!open || !form) return null;

  /* VALIDATE */
  const validate = () => {
    const newErrors: any = {};

    if (!form.firstName?.trim()) {
      newErrors.firstName = "Nombre obligatorio";
    }

    if (!form.lastName?.trim()) {
      newErrors.lastName = "Apellido obligatorio";
    }

    if (!form.phone?.trim()) {
      newErrors.phone = "Teléfono obligatorio";
    } else if (!/^\+591\s\d{8}$/.test(form.phone)) {
      newErrors.phone = "Formato: +591 7XXXXXXX";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* SAVE */
  const handleSave = async () => {
    if (!validate()) return;

    await onSave(form);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg"
      >
        <Card>
          <CardHeader>
            <CardTitle>Editar Usuario</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            {/* USERNAME */}
            <div>
              <Label>Username</Label>
              <Input value={form.username} disabled />
            </div>

            {/* EMAIL */}
            <div>
              <Label>Email</Label>
              <Input value={form.email} disabled />
            </div>

            {/* NOMBRE */}
            <div>
              <Label>Nombre</Label>
              <Input
                value={form.firstName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    firstName: capitalizeWords(e.target.value),
                  })
                }
              />
              {errors.firstName && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.firstName}
                </p>
              )}
            </div>

            {/* APELLIDO */}
            <div>
              <Label>Apellido</Label>
              <Input
                value={form.lastName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    lastName: capitalizeWords(e.target.value),
                  })
                }
              />
              {errors.lastName && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.lastName}
                </p>
              )}
            </div>

            {/* TELÉFONO */}
            <div>
              <Label>Teléfono</Label>
              <Input
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: formatBoliviaPhone(e.target.value),
                  })
                }
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* ROL */}
            <div>
              <Label>Rol</Label>
              <select
                className="w-full border rounded p-2"
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
              >
                <option value="ADMIN">Administrador</option>
                <option value="OWNER">Vendedor</option>
                <option value="USER">Cliente</option>
              </select>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full"
              >
                Cancelar
              </Button>

              <Button onClick={handleSave} className="w-full">
                Guardar
              </Button>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditUserForm;