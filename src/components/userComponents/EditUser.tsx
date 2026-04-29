import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, User, Lock,Mail  } from "lucide-react";
import { useEffect, useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import ChangeEmailModal from "./ChangeEmailModal";

/* =========================
   HELPERS
========================= */

const capitalizeWords = (value: string) => {
  return value
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatBoliviaPhone = (value: string) => {
  let numbers = value.replace(/\D/g, "");

  if (numbers.startsWith("591")) {
    numbers = numbers.slice(3);
  }

  numbers = numbers.slice(0, 8);

  return "+591 " + numbers;
};

/* =========================
   COMPONENT
========================= */

interface Props {
  onClose: () => void;
}

const EditUser = ({ onClose }: Props) => {
  const { user, loading, update, isUpdating, } = useUser();

  const [openPassword, setOpenPassword] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [initialForm, setInitialForm] = useState(form);

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    phone?: string;
  }>({});

  /* 🔹 cargar datos */
  useEffect(() => {
    if (user) {
      const data = {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
      };

      setForm(data);
      setInitialForm(data);
    }
  }, [user]);

  /* =========================
     VALIDATE
  ========================= */
  const validate = () => {
    const newErrors: typeof errors = {};

    // FIRST NAME
    if (!form.firstName.trim()) {
      newErrors.firstName = "Nombre obligatorio";
    } else if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/.test(form.firstName)) {
      newErrors.firstName = "Solo letras";
    } else if (!/^[A-ZÁÉÍÓÚÑ]/.test(form.firstName)) {
      newErrors.firstName = "Debe iniciar con mayúscula";
    }

    // LAST NAME
    if (!form.lastName.trim()) {
      newErrors.lastName = "Apellido obligatorio";
    } else if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/.test(form.lastName)) {
      newErrors.lastName = "Solo letras";
    } else if (!/^[A-ZÁÉÍÓÚÑ]/.test(form.lastName)) {
      newErrors.lastName = "Debe iniciar con mayúscula";
    }

    // PHONE
    if (!form.phone.trim()) {
      newErrors.phone = "Teléfono obligatorio";
    } else if (!/^\+591\s\d{8}$/.test(form.phone)) {
      newErrors.phone = "Formato válido: +591 7XXXXXXX";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* =========================
     SAVE
  ========================= */
  const handleSave = async () => {
    if (!validate()) return;

    await update(form);
    onClose();
  };

  /* =========================
     CANCEL
  ========================= */
  const handleCancel = () => {
    const isDirty =
      JSON.stringify(form) !== JSON.stringify(initialForm);

    if (isDirty) {
      const confirmClose = window.confirm(
        "Tienes cambios sin guardar. ¿Seguro que quieres salir?"
      );

      if (!confirmClose) return;
    }

    onClose();
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleCancel}
    >
      <div
        className="w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="border bg-card shadow-lg">

          {/* HEADER */}
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Edit Profile
            </CardTitle>
          </CardHeader>

          {/* BODY */}
          <CardContent className="space-y-5">

            {/* USERNAME */}
            <div>
              <Label>Username</Label>
              <Input value={user?.username || ""} disabled />
            </div>

            {/* EMAIL */}
            <div>
              <Label>Email</Label>
              <Input value={user?.email || ""} disabled />
            </div>

            {/* FIRST NAME */}
            <div>
              <Label>First Name</Label>
              <Input
                value={form.firstName}
                onChange={(e) => {
                  const value = capitalizeWords(e.target.value);
                  setForm({ ...form, firstName: value });

                  if (errors.firstName) {
                    setErrors({ ...errors, firstName: "" });
                  }
                }}
                className={cn(errors.firstName && "border-destructive")}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">
                  {errors.firstName}
                </p>
              )}
            </div>

            {/* LAST NAME */}
            <div>
              <Label>Last Name</Label>
              <Input
                value={form.lastName}
                onChange={(e) => {
                  const value = capitalizeWords(e.target.value);
                  setForm({ ...form, lastName: value });

                  if (errors.lastName) {
                    setErrors({ ...errors, lastName: "" });
                  }
                }}
                className={cn(errors.lastName && "border-destructive")}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">
                  {errors.lastName}
                </p>
              )}
            </div>

            {/* PHONE */}
            <div>
              <Label>Phone</Label>
              <Input
                value={form.phone}
                onChange={(e) => {
                  const value = formatBoliviaPhone(e.target.value);
                  setForm({ ...form, phone: value });

                  if (errors.phone) {
                    setErrors({ ...errors, phone: "" });
                  }
                }}
                className={cn(errors.phone && "border-destructive")}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setOpenPassword(true)}
              >
                <Lock className="h-4 w-4 mr-2" />
                Password
              </Button>
              <Button
              variant="outline"
              className="flex-1"
              onClick={() => setOpenEmail(true)}
            >
              <Mail className="h-4 w-4 mr-2" />
              Cambiar Email
            </Button>
            </div>



            {/* FOOTER */}
            <div className="flex gap-3 pt-2">

              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="w-full"
              >
                Cancelar
              </Button>

              <Button
                onClick={handleSave}
                disabled={isUpdating}
                className="w-full"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  "Guardar cambios"
                )}
              </Button>

            </div>

          </CardContent>
        </Card>
      </div>

      {/* PASSWORD MODAL */}
      {openPassword && (
        <ChangePasswordModal
          onClose={() => setOpenPassword(false)}
        />
      )}

      {openEmail && (
        <ChangeEmailModal onClose={() => setOpenEmail(false)} />
      )}
    </div>
  );
};

export default EditUser;