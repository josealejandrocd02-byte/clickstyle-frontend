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

  const [errors, setErrors] = useState<any>({});
  const [initialForm, setInitialForm] = useState(form);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setInitialForm(form);
  }, [editingId]);

  const sizesOptions = ["S", "M", "L", "XL", "XXL"];

  const colorsOptions = [
    "ROJO",
    "NEGRO",
    "BLANCO",
    "AZUL",
    "VVERDE",
    "GRIS",
    "CAFE",
  ];

  // 🔒 VALIDACIÓN
  const validate = () => {
    const newErrors: any = {};

    if (!form.name.trim()) newErrors.name = "El nombre es obligatorio";
    if (!form.description.trim())
      newErrors.description = "La descripción es obligatoria";

    if (!form.price || Number(form.price) <= 0)
      newErrors.price = "Precio mayor a 0";

    if (!form.categoryId)
      newErrors.categoryId = "Selecciona una categoría";

    if (!form.variants || form.variants.length === 0) {
      newErrors.variants = "Agrega al menos una variante";
    } else {
      if (!form.variants || form.variants.length === 0) {
        newErrors.variants = "Agrega al menos una variante";
      } else {
        if (
          form.variants.some((v) => {
            const stock = Number(v.stock); // 🔥 normalizamos
            return !v.size || !v.color || isNaN(stock) || stock < 0;
          })
        ) {
          newErrors.variants = "Datos inválidos en variantes";
        }
      }

      const set = new Set(
        form.variants.map((v) => `${v.size}-${v.color}`)
      );

      if (set.size !== form.variants.length) {
        newErrors.variants = "Variantes duplicadas";
      }
    }

    if (!form.image && !form.imageUrl) {
      newErrors.image = "Sube al menos una imagen";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
  setSubmitted(true);

  if (validate()) {
    onSave();
  }
};

  const handleCancel = () => {
  onClose();
  };

  // 🖼 IMÁGENES
  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, image: file });
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleImage2Change = (e: any) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, image2: file });
    if (file) setImage2Preview(URL.createObjectURL(file));
  };

  // 🔥 VARIANTES
  const updateVariant = (index: number, key: string, value: any) => {
    const updated = [...form.variants];
    updated[index] = { ...updated[index], [key]: value };
    setForm({ ...form, variants: updated });
  };

  const addVariant = () => {
  setForm({
    ...form,
    variants: [
      ...form.variants,
      { size: "", color: "", stock: "" } // ✅ vacío
    ],
  });
};

  const removeVariant = (index: number) => {
    setForm({
      ...form,
      variants: form.variants.filter((_, i) => i !== index),
    });
  };

return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    
    <div className="w-full h-full sm:h-auto sm:max-w-3xl bg-card sm:rounded-2xl shadow-xl flex flex-col overflow-hidden">

      {/* HEADER */}
      <CardHeader className="border-b px-6 py-4">
        <CardTitle className="text-lg font-semibold">
          {editingId ? "Editar producto" : "Crear producto"}
        </CardTitle>
      </CardHeader>

      {/* BODY */}
      <CardContent className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">

        {/* INFO BASICA */}
        <div className="grid sm:grid-cols-2 gap-4">
          
          <Input
          placeholder="Nombre del producto"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className={cn("h-11", submitted && errors.name && "border-red-500")}
        />

        {submitted && errors.name && (
          <p className="text-red-500 text-sm">{errors.name}</p>
        )}

          <Input
            type="number"
            placeholder="Precio"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
            className="h-11"
          />
            {submitted && errors.price && (
            <p className="text-red-500 text-sm">{errors.price}</p>
          )}
        </div>

        <Textarea
          placeholder="Descripción del producto"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="min-h-[100px]"
        />
        {submitted && errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}

        {/* CATEGORIA */}
        <select
          value={form.categoryId || ""}
          onChange={(e) =>
            setForm({ ...form, categoryId: e.target.value })
          }
          className="w-full h-11 border rounded-xl px-3 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((c: any) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {submitted && errors.categoryId && (
            <p className="text-red-500 text-sm">{errors.categoryId}</p>
          )}

        {/* VARIANTES */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Variantes</Label>

          {form.variants.map((v, i) => (
            <div
              key={i}
              className="grid grid-cols-4 gap-2 items-center p-3 border rounded-xl bg-muted/30"
            >
              <select
                value={v.size}
                onChange={(e) =>
                  updateVariant(i, "size", e.target.value)
                }
                className="h-10 rounded-lg border px-2"
              >
                <option value="">Talla</option>
                {sizesOptions.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>

              <select
                value={v.color}
                onChange={(e) =>
                  updateVariant(i, "color", e.target.value)
                }
                className="h-10 rounded-lg border px-2"
              >
                <option value="">Color</option>
                {colorsOptions.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <Input
                  type="number"
                  placeholder="Stock"
                  value={v.stock === "" ? "" : v.stock}
                  onFocus={(e) => {
                    // 🔥 limpia el 0 automáticamente
                    if (v.stock === 0) {
                      updateVariant(i, "stock", "");
                    }
                  }}
                  onChange={(e) => {
                    const value = e.target.value;

                    updateVariant(
                      i,
                      "stock",
                      value === "" ? "" : Number(value)
                    );
                  }}
                  className="h-10"
                />

              <button
                onClick={() => removeVariant(i)}
                className="h-10 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                ✕
              </button>
            </div>
          ))}

          <Button
            onClick={addVariant}
            variant="outline"
            className="w-full h-10"
          >
            + Agregar variante
          </Button>

          {errors.variants && (
            <p className="text-red-500 text-sm">
              {errors.variants}
            </p>
          )}
        </div>

        {/* IMÁGENES */}
        <div className="grid sm:grid-cols-2 gap-4">
          
          <label className="cursor-pointer">
            <div className="h-28 border-2 border-dashed rounded-xl flex items-center justify-center hover:bg-muted transition">
              <span className="text-sm text-muted-foreground">
                Subir imagen principal
              </span>
            </div>
            <input type="file" hidden onChange={handleImageChange} />
          </label>

          <label className="cursor-pointer">
            <div className="h-28 border-2 border-dashed rounded-xl flex items-center justify-center hover:bg-muted transition">
              <span className="text-sm text-muted-foreground">
                Subir imagen secundaria
              </span>
            </div>
            <input type="file" hidden onChange={handleImage2Change} />
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
              className="h-20 w-20 rounded-xl object-cover border"
            />
          )}

          {(form.image2 || form.imageUrl2) && (
            <img
              src={
                form.image2
                  ? URL.createObjectURL(form.image2)
                  : form.imageUrl2
              }
              className="h-20 w-20 rounded-xl object-cover border"
            />
          )}

          {submitted && errors.image && (
            <p className="text-red-500 text-sm">{errors.image}</p>
          )}
        </div>
      </CardContent>

      {/* FOOTER */}
      <div className="border-t p-4 flex gap-3">
        <Button
          onClick={handleCancel}
          variant="outline"
          className="w-full"
        >
          Cancelar
        </Button>

        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Guardando..." : "Guardar"}
        </Button>
      </div>

    </div>
  </div>
);
};

export default ProductForm;