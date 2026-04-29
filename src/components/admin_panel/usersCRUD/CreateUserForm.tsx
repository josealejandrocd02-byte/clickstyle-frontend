import { useState, useEffect } from "react";
import { CreateUserAdminDTO } from "@/services/adminUsersService";
import { useUser } from "@/hooks/useUser";
import { Loader2, Check, X } from "lucide-react";

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
  value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

const formatBoliviaPhone = (value: string) => {
  let numbers = value.replace(/\D/g, "");
  if (numbers.startsWith("591")) numbers = numbers.slice(3);
  numbers = numbers.slice(0, 8);
  return "+591 " + numbers;
};

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._+\-])[A-Za-z\d@$!%*?&._+\-]{6,}$/;

const emailRegex = /^\S+@\S+\.\S+$/;

const defaultForm: CreateUserAdminDTO = {
  username: "",
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  phone: "",
  role: "USER",
  isActive: false,
  verified: false,
};

/* COMPONENT */

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (data: CreateUserAdminDTO) => Promise<void>;
}

const CreateUserForm = ({ open, onClose, onCreate }: Props) => {

  const [form, setForm] = useState<CreateUserAdminDTO>(defaultForm);
const [errors, setErrors] = useState<any>({});
const { checkEmail, checkUsername } = useUser();

const [usernameStatus, setUsernameStatus] = useState<
  "idle" | "checking" | "valid" | "taken"
>("idle");

const [emailStatus, setEmailStatus] = useState<
  "idle" | "checking" | "valid" | "taken"
>("idle");

/* 🔑 FUNCIÓN CENTRAL DE VALIDACIÓN */
const buildErrors = (
  form: CreateUserAdminDTO,
  usernameStatus: string,
  emailStatus: string
) => {
  const errors: any = {};

  if (!form.username.trim()) {
    errors.username = "Username obligatorio";
  } else if (form.username.length < 4) {
    errors.username = "Mínimo 4 caracteres";
  } else if (usernameStatus === "taken") {
    errors.username = "Username ya en uso";
  }

  if (!form.email.trim()) {
    errors.email = "Email obligatorio";
  } else if (!emailRegex.test(form.email)) {
    errors.email = "Email inválido";
  } else if (emailStatus === "taken") {
    errors.email = "Email ya en uso";
  }

  if (!form.password.trim()) {
    errors.password = "Password obligatorio";
  } else if (!passwordRegex.test(form.password)) {
    errors.password =
      "Mín 6 caracteres, mayúscula, número y símbolo";
  }

  if (!form.firstName.trim()) {
    errors.firstName = "Nombre obligatorio";
  }

  if (!form.lastName.trim()) {
    errors.lastName = "Apellido obligatorio";
  }

  if (!form.phone.trim()) {
    errors.phone = "Teléfono obligatorio";
  } else if (!/^\+591\s\d{8}$/.test(form.phone)) {
    errors.phone = "Formato: +591 7XXXXXXX";
  }

  return errors;
};

/* RESET */
useEffect(() => {
  if (!open) {
    setForm(defaultForm);
    setErrors({});
    setUsernameStatus("idle");
    setEmailStatus("idle");
  }
}, [open]);

/* USERNAME CHECK (SIN RACE CONDITIONS) */
useEffect(() => {
  let active = true;

  if (!form.username || form.username.length < 4) {
    setUsernameStatus("idle");
    return;
  }

  setUsernameStatus("checking");

  const delay = setTimeout(async () => {
    try {
      const exists = await checkUsername(form.username);
      if (active) {
        setUsernameStatus(exists ? "taken" : "valid");
      }
    } catch {
      if (active) setUsernameStatus("idle");
    }
  }, 400);

  return () => {
    active = false;
    clearTimeout(delay);
  };
}, [form.username]);

/* EMAIL CHECK (SIN RACE CONDITIONS) */
useEffect(() => {
  let active = true;

  if (!form.email || !emailRegex.test(form.email)) {
    setEmailStatus("idle");
    return;
  }

  setEmailStatus("checking");

  const delay = setTimeout(async () => {
    try {
      const exists = await checkEmail(form.email);
      if (active) {
        setEmailStatus(exists ? "taken" : "valid");
      }
    } catch {
      if (active) setEmailStatus("idle");
    }
  }, 400);

  return () => {
    active = false;
    clearTimeout(delay);
  };
}, [form.email]);

/* VALIDACIÓN ÚNICA Y CONSISTENTE */
useEffect(() => {
  const newErrors = buildErrors(form, usernameStatus, emailStatus);
  setErrors(newErrors);
}, [form, usernameStatus, emailStatus]);

/* UPDATE LIMPIO */
const updateField = (field: keyof CreateUserAdminDTO, value: any) => {
  setForm((prev) => ({
    ...prev,
    [field]: value,
  }));
};

/* VALIDATE FINAL */
const validate = () => {
  const newErrors = buildErrors(form, usernameStatus, emailStatus);
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

/* CREATE */
const handleCreate = async () => {
  if (!validate()) return;
  await onCreate(form);
  handleClose();
};

/* CLOSE */
const handleClose = () => {
  setForm(defaultForm);
  setErrors({});
  setUsernameStatus("idle");
  setEmailStatus("idle");
  onClose();
};

/* UI helper */
const StatusIcon = ({ status }: any) => {
  if (status === "checking")
    return <Loader2 className="h-4 w-4 animate-spin text-gray-400" />;
  if (status === "valid")
    return <Check className="h-4 w-4 text-green-500" />;
  if (status === "taken")
    return <X className="h-4 w-4 text-red-500" />;
  return null;
};

if (!open) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Crear Usuario</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            {/* USERNAME */}
            <div>
            <Label>Username</Label>
            <div className="relative">
              <Input
                value={form.username}
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
                className={`pr-10 ${
                  errors.username ? "border-red-500" : ""
                }`}
              />

              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <StatusIcon status={usernameStatus} />
              </div>
            </div>

            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username}
              </p>
            )}
          </div>

            {/* EMAIL */}
            <div>
              <Label>Email</Label>
              <div className="relative">
                <Input
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="pr-10"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <StatusIcon status={emailStatus} />
                </div>
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
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
                onClick={handleClose}
                className="w-full"
              >
                Cancelar
              </Button>

              <Button
                onClick={handleCreate}
                className="w-full"
                disabled={
                  usernameStatus === "checking" ||
                  emailStatus === "checking" ||
                  usernameStatus === "taken" ||
                  emailStatus === "taken"
                }
              >
                Crear
              </Button>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateUserForm;