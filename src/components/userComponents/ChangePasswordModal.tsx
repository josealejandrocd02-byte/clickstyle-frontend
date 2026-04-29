import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._+\-])[A-Za-z\d@$!%*?&._+\-]{6,}$/;

type FormState = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type ShowState = {
  current: boolean;
  new: boolean;
  confirm: boolean;
};

// ✅ COMPONENTE FUERA (FIX PRINCIPAL DEL BUG)
const InputField = ({
  label,
  value,
  onChange,
  visible,
  toggle,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  visible: boolean;
  toggle: () => void;
}) => (
  <div>
    <Label>{label}</Label>

    <div className="relative">
      <Input
        type={visible ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="pr-10"
      />

      <button
        type="button"
        onClick={toggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black dark:hover:text-white"
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  </div>
);

const ChangePasswordModal = ({ onClose }: any) => {
  const { changePassword } = useUser();

  const [form, setForm] = useState<FormState>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState<ShowState>({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ VALIDACIÓN
  const validate = () => {
    if (
      !form.currentPassword ||
      !form.newPassword ||
      !form.confirmPassword
    ) {
      return "Todos los campos son obligatorios";
    }

    if (form.newPassword !== form.confirmPassword) {
      return "Las contraseñas no coinciden";
    }

    if (!passwordRegex.test(form.newPassword)) {
      return "La contraseña debe tener mayúscula, minúscula, número y símbolo (mín. 6 caracteres)";
    }

    return null;
  };

  // ✅ SUBMIT
  const handleSave = async () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    try {
      setLoading(true);
      setError("");

      await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      onClose();
    } catch (e: any) {
      setError(
        e?.response?.data?.message || "Error al cambiar contraseña"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Cambiar contraseña
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* CONTRASEÑA ACTUAL */}
            <InputField
              label="Contraseña actual"
              value={form.currentPassword}
              visible={show.current}
              toggle={() =>
                setShow((prev) => ({
                  ...prev,
                  current: !prev.current,
                }))
              }
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  currentPassword: e.target.value,
                }))
              }
            />

            {/* NUEVA CONTRASEÑA */}
            <InputField
              label="Nueva contraseña"
              value={form.newPassword}
              visible={show.new}
              toggle={() =>
                setShow((prev) => ({
                  ...prev,
                  new: !prev.new,
                }))
              }
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
            />

            {/* CONFIRMAR */}
            <InputField
              label="Confirmar contraseña"
              value={form.confirmPassword}
              visible={show.confirm}
              toggle={() =>
                setShow((prev) => ({
                  ...prev,
                  confirm: !prev.confirm,
                }))
              }
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
            />

            {/* ERROR */}
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            {/* BOTÓN */}
            <Button
              onClick={handleSave}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                "Actualizar contraseña"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChangePasswordModal;