import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductFormData, Props } from "@/services/productService";

const ProductForm = ({
  form,
  setForm,
  onSave,
  onClose,
  editingId,
  categories,
  isLoading = false,
}: Props & { onClose: () => void }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image2Preview, setImage2Preview] = useState<string | null>(null);

  const [errors, setErrors] = useState<
    Partial<Record<keyof ProductFormData, string>>
  >({});

  const [initialForm, setInitialForm] = useState(form);

  useEffect(() => {
    setInitialForm(form);
  }, [editingId]);

  const sizesOptions = ["S", "M", "L", "XL", "XXL"];

  const colorsOptions = [
    { name: "Rojo", value: "red" },
    { name: "Negro", value: "black" },
    { name: "Blanco", value: "white" },
    { name: "Azul", value: "blue" },
    { name: "Verde", value: "green" },
    { name: "Gris", value: "gray" },
    { name: "Café", value: "#6B4423" },
  ];

  // 🔒 VALIDACIONES
  const validate = () => {
    const newErrors: Partial<Record<keyof ProductFormData, string>> = {};

    if (!form.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }

    if (!form.description.trim()) {
      newErrors.description = "La descripción es obligatoria";
    }

    if (!form.price || Number(form.price) <= 0) {
      newErrors.price = "Precio mayor a 0";
    }

    if (!form.stock || Number(form.stock) <= 0) {
      newErrors.stock = "Stock mayor a 0";
    }

    if (!form.categoryId) {
      newErrors.categoryId = "Selecciona una categoría";
    }

    if (!form.sizes || form.sizes.split(",").filter(Boolean).length === 0) {
      newErrors.sizes = "Selecciona al menos una talla";
    }

    if (!form.colors || form.colors.split(",").filter(Boolean).length === 0) {
      newErrors.colors = "Selecciona al menos un color";
    }

    if (!form.image && !form.imageUrl) {
      newErrors.image = "Sube al menos una imagen";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) onSave();
  };

  // ❌ CANCELAR INTELIGENTE
  const handleCancel = () => {
    const isDirty =
      JSON.stringify(form) !== JSON.stringify(initialForm) ||
      imagePreview ||
      image2Preview;

    if (isDirty) {
      const confirmClose = window.confirm(
        "Tienes cambios sin guardar. ¿Seguro que quieres salir?"
      );

      if (!confirmClose) return;
    }

    setImagePreview(null);
    setImage2Preview(null);
    setErrors({});

    onClose();
  };

  // 🖼 IMÁGENES
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, image: file });

    if (file) setImagePreview(URL.createObjectURL(file));

    if (errors.image) setErrors({ ...errors, image: "" });
  };

  const handleImage2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, image2: file });

    if (file) setImage2Preview(URL.createObjectURL(file));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="w-full h-full sm:h-auto sm:max-w-3xl bg-card sm:rounded-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <CardHeader className="border-b p-4 sm:p-6">
          <CardTitle>
            {editingId ? "Editar producto" : "Crear producto"}
          </CardTitle>
        </CardHeader>

        {/* BODY */}
        <CardContent className="space-y-4 p-4 sm:p-6">
          {/* NAME */}
          <div>
            <Input
              placeholder="Nombre"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name:
                    e.target.value.charAt(0).toUpperCase() +
                    e.target.value.slice(1),
                })
              }
              className={cn(errors.name && "border-destructive")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div>
            <Textarea
              placeholder="Descripción"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className={cn(errors.description && "border-destructive")}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description}
              </p>
            )}
          </div>

          {/* PRICE + STOCK */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Input
                type="number"
                placeholder="Precio"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
                className={cn(errors.price && "border-destructive")}
              />
              {errors.price && (
                <p className="text-sm text-red-500">
                  {errors.price}
                </p>
              )}
            </div>

            <div>
              <Input
                type="number"
                placeholder="Stock"
                value={form.stock}
                onChange={(e) =>
                  setForm({ ...form, stock: e.target.value })
                }
                className={cn(errors.stock && "border-destructive")}
              />
              {errors.stock && (
                <p className="text-sm text-red-500">
                  {errors.stock}
                </p>
              )}
            </div>
          </div>

          {/* CATEGORY */}
          <div>
            <select
              value={form.categoryId || ""}
              onChange={(e) =>
                setForm({ ...form, categoryId: e.target.value })
              }
              className={cn(
                "w-full h-11 border rounded-xl px-3 bg-background",
                errors.categoryId && "border-destructive"
              )}
            >
              <option value="">Categoría</option>
              {categories.map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-sm text-red-500">
                {errors.categoryId}
              </p>
            )}
          </div>

          {/* SIZES */}
          <div>
            <Label>Tallas</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {sizesOptions.map((size) => {
                const isActive = form.sizes?.split(",").includes(size);

                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      const current = form.sizes
                        ? form.sizes.split(",")
                        : [];

                      const updated = isActive
                        ? current.filter((s) => s !== size)
                        : [...current, size];

                      setForm({ ...form, sizes: updated.join(",") });
                    }}
                    className={cn(
                      "px-3 py-1 rounded-xl border text-sm",
                      isActive
                        ? "bg-primary text-white"
                        : "hover:bg-muted"
                    )}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
            {errors.sizes && (
              <p className="text-sm text-red-500">{errors.sizes}</p>
            )}
          </div>

          {/* COLORS */}
          <div>
            <Label>Colores</Label>
            <div className="flex gap-2 mt-2 flex-wrap">
              {colorsOptions.map((color) => {
                const isActive = form.colors
                  ?.split(",")
                  .includes(color.name);

                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => {
                      const current = form.colors
                        ? form.colors.split(",")
                        : [];

                      const updated = isActive
                        ? current.filter((c) => c !== color.name)
                        : [...current, color.name];

                      setForm({ ...form, colors: updated.join(",") });
                    }}
                    className={cn(
                      "h-8 w-8 rounded-full border",
                      isActive && "scale-110 border-primary"
                    )}
                  >
                    <div
                      className="h-full w-full rounded-full"
                      style={{ backgroundColor: color.value }}
                    />
                  </button>
                );
              })}
            </div>
            {errors.colors && (
              <p className="text-sm text-red-500">{errors.colors}</p>
            )}
          </div>

          {/* IMAGE */}
          {/* IMAGE 1 */}
            <div>
              <label className="cursor-pointer">
                <input type="file" hidden onChange={handleImageChange} />
                <div className="h-24 border-2 border-dashed rounded-xl flex items-center justify-center">
                  <Upload />
                </div>
              </label>
            </div>

            {/* IMAGE 2 */}
            <div>
              <label className="cursor-pointer">
                <input type="file" hidden onChange={handleImage2Change} />
                <div className="h-24 border-2 border-dashed rounded-xl flex items-center justify-center">
                  <Upload />
                </div>
              </label>
            </div>

            {/* PREVIEW */}
            <div className="flex gap-3">
              {(form.image || form.imageUrl) && (
                <img
                  src={
                    form.image
                      ? URL.createObjectURL(form.image)
                      : form.imageUrl
                  }
                  className="h-20 w-20 rounded-xl object-cover"
                />
              )}

              {(form.image2 || form.imageUrl2) && (
                <img
                  src={
                    form.image2
                      ? URL.createObjectURL(form.image2)
                      : form.imageUrl2
                  }
                  className="h-20 w-20 rounded-xl object-cover"
                />
              )}
            </div>
        </CardContent>

        {/* FOOTER */}
        <div className="border-t p-4 sm:p-6 flex gap-3">
          <Button variant="outline" onClick={handleCancel} className="w-full">
            Cancelar
          </Button>

          <Button onClick={handleSave} disabled={isLoading} className="w-full">
            {isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;