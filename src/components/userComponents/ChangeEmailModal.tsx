import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  Eye,
  EyeOff,
  Mail,
  Check,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useUser } from "@/hooks/useUser";

const emailRegex = /^\S+@\S+\.\S+$/;

type FormState = {
  newEmail: string;
  password: string;
};

const ChangeEmailModal = ({ onClose }: any) => {
  const { changeEmail, checkEmail } = useUser();

  const [form, setForm] = useState<FormState>({
    newEmail: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 estado validación email
  const [emailStatus, setEmailStatus] = useState<
    "idle" | "checking" | "valid" | "taken"
  >("idle");

  // ✅ VALIDACIÓN LOCAL + BACKEND (DEBOUNCE)
  useEffect(() => {
    if (!form.newEmail) {
      setEmailStatus("idle");
      return;
    }

    if (!emailRegex.test(form.newEmail)) {
      setEmailStatus("idle");
      return;
    }

    setEmailStatus("checking");

    const delay = setTimeout(async () => {
      try {
        const exists = await checkEmail(form.newEmail);
        setEmailStatus(exists ? "taken" : "valid");
      } catch {
        setEmailStatus("idle");
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [form.newEmail]);

  // ✅ VALIDACIÓN FINAL
  const validate = () => {
    if (!form.newEmail || !form.password) {
      return "Todos los campos son obligatorios";
    }

    if (!emailRegex.test(form.newEmail)) {
      return "Email inválido";
    }

    if (emailStatus === "taken") {
      return "Este email ya está en uso";
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

      await changeEmail({
        newEmail: form.newEmail,
        password: form.password,
      });

      alert("Email actualizado. Verifica tu correo 📧");
      onClose();
    } catch (e: any) {
      setError(
        e?.response?.data?.message || "Error al cambiar email"
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
              <Mail className="h-5 w-5" />
              Cambiar email
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            {/* EMAIL */}
            <div>
              <Label>Nuevo email</Label>

              <div className="relative">
                <Input
                  type="email"
                  value={form.newEmail}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      newEmail: e.target.value,
                    }))
                  }
                  className="pr-10"
                />

                {/* ICONO ESTADO */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {emailStatus === "checking" && (
                    <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                  )}
                  {emailStatus === "valid" && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                  {emailStatus === "taken" && (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>

              {/* MENSAJE */}
              {emailStatus === "taken" && (
                <p className="text-xs text-red-500 mt-1">
                  Este email ya está en uso
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <Label>Contraseña</Label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="pr-10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black dark:hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            {/* BOTÓN */}
            <Button
              onClick={handleSave}
              disabled={
                loading ||
                emailStatus === "checking" ||
                emailStatus === "taken"
              }
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                "Actualizar email"
              )}
            </Button>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChangeEmailModal;