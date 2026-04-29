import { useState, useEffect } from "react";
import { Plan } from "@/services/adminPlan";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (plan: Plan) => Promise<void>;
  initialData?: Plan | null;
}

const emptyForm = {
  name: "",
  productLimit: "",
  price: "",
  durationDays: "",
};

const PlanForm = ({ open, onClose, onSave, initialData }: Props) => {
  const [form, setForm] = useState<any>(emptyForm);
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  // ✅ cargar datos (edit) o reset (create)
  useEffect(() => {
    if (open) {
      if (initialData) {
        setForm({
          name: initialData.name || "",
          productLimit: String(initialData.productLimit || ""),
          price: String(initialData.price || ""),
          durationDays: String(initialData.durationDays || ""),
        });
      } else {
        setForm(emptyForm);
      }
      setErrors({});
    }
  }, [open, initialData]);

  // ✅ reset al cerrar
  const handleClose = () => {
    setForm(emptyForm);
    setErrors({});
    onClose();
  };

  // ✅ validación
  const validate = () => {
    const newErrors: any = {};

    if (!form.name.trim()) newErrors.name = "Nombre requerido";

    if (!form.productLimit || Number(form.productLimit) <= 0) {
      newErrors.productLimit = "Debe ser mayor a 0";
    }

    if (!form.price || Number(form.price) <= 0) {
      newErrors.price = "Precio inválido";
    }

    if (!form.durationDays || Number(form.durationDays) <= 0) {
      newErrors.durationDays = "Días inválidos";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ guardar
  const handleSave = async () => {
    if (!validate()) return;

    setLoading(true);

    await onSave({
      name: form.name.trim(),
      productLimit: Number(form.productLimit),
      price: Number(form.price),
      durationDays: Number(form.durationDays),
    });

    setLoading(false);
    handleClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div className="w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <Card className="border bg-card shadow-lg">

          <CardHeader>
            <CardTitle>
              {initialData ? "Editar Plan" : "Crear Plan"}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            {/* NAME */}
            <div>
              <Label>Nombre</Label>
              <Input
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: "" });
                }}
                className={cn(errors.name && "border-destructive")}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* PRODUCT LIMIT */}
            <div>
              <Label>Productos</Label>
              <Input
                type="number"
                value={form.productLimit}
                placeholder="Ej: 50"
                onChange={(e) => {
                  setForm({ ...form, productLimit: e.target.value });
                  if (errors.productLimit)
                    setErrors({ ...errors, productLimit: "" });
                }}
                className={cn(errors.productLimit && "border-destructive")}
              />
              {errors.productLimit && (
                <p className="text-sm text-red-500">{errors.productLimit}</p>
              )}
            </div>

            {/* PRICE */}
            <div>
              <Label>Precio (Bs)</Label>
              <Input
                type="number"
                value={form.price}
                placeholder="Ej: 30"
                onChange={(e) => {
                  setForm({ ...form, price: e.target.value });
                  if (errors.price) setErrors({ ...errors, price: "" });
                }}
                className={cn(errors.price && "border-destructive")}
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price}</p>
              )}
            </div>

            {/* DAYS */}
            <div>
              <Label>Días</Label>
              <Input
                type="number"
                value={form.durationDays}
                placeholder="Ej: 30"
                onChange={(e) => {
                  setForm({ ...form, durationDays: e.target.value });
                  if (errors.durationDays)
                    setErrors({ ...errors, durationDays: "" });
                }}
                className={cn(errors.durationDays && "border-destructive")}
              />
              {errors.durationDays && (
                <p className="text-sm text-red-500">
                  {errors.durationDays}
                </p>
              )}
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 pt-2">

              <Button
                variant="outline"
                onClick={handleClose}
                className="w-full"
              >
                Cancelar
              </Button>

              <Button
                onClick={handleSave}
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  "Guardar"
                )}
              </Button>

            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlanForm;