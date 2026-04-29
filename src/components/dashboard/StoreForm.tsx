import { useEffect, useState } from "react";
import { useStore } from "@/hooks/useStore";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Store as StoreIcon,
  Loader2,
  Upload,
  Instagram,
  Facebook,
} from "lucide-react";

import { cn } from "@/lib/utils";

const StoreForm = ({ onClose }: { onClose: () => void }) => {
  const { store, updateStore, isUpdating } = useStore();

  const [form, setForm] = useState({
    name: "",
    description: "",
    whatsappPhone: "+591 ",
    instagramUrl: "",
    facebookUrl: "",
    logo: null as File | null,
    banner: null as File | null,
    logoUrl: "",
    bannerUrl: "",
  });

  const [errors, setErrors] = useState<any>({});

  // 🔥 detectar cambios
  const [initialForm, setInitialForm] = useState(form);

  /* =========================
     LOAD DATA
  ========================= */
  useEffect(() => {
    if (store) {
      const data = {
        name: store.name,
        description: store.description,
        whatsappPhone: store.whatsappPhone || "+591 ",
        instagramUrl: store.instagramUrl || "",
        facebookUrl: store.facebookUrl || "",
        logo: null,
        banner: null,
        logoUrl: store.logoUrl || "",
        bannerUrl: store.bannerUrl || "",
      };

      setForm(data);
      setInitialForm(data);
    }
  }, [store]);

  /* =========================
     VALIDATION
  ========================= */
  const validate = () => {
    const newErrors: any = {};

    if (!form.name.trim()) {
      newErrors.name = "Nombre obligatorio";
    }

    if (!form.description.trim()) {
      newErrors.description = "Descripción obligatoria";
    }

    if (!/^\+591\s\d{7,8}$/.test(form.whatsappPhone)) {
      newErrors.whatsappPhone = "Formato válido: +591 7XXXXXXX";
    }

    if (!form.logo && !form.logoUrl) {
      newErrors.logo = "Logo obligatorio";
    }

    if (!form.banner && !form.bannerUrl) {
      newErrors.banner = "Banner obligatorio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* =========================
     SAVE
  ========================= */
  const handleSave = () => {
    if (validate()) {
      updateStore(form);
      onClose();
    }
  };

  /* =========================
     CANCEL (INTELIGENTE)
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

    setErrors({});
    onClose();
  };

  /* =========================
     IMAGE HANDLER
  ========================= */
  const handleImageChange = (e: any, field: "logo" | "banner") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setForm({
      ...form,
      [field]: file,
    });

    setErrors({ ...errors, [field]: "" });
  };

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
              <StoreIcon className="h-5 w-5" />
              Edit Store
            </CardTitle>
          </CardHeader>

          {/* BODY */}
          <CardContent className="space-y-5">

            {/* NAME */}
            <div>
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name:
                      e.target.value.charAt(0).toUpperCase() +
                      e.target.value.slice(1),
                  })
                }
                className={cn(errors.name && "border-red-500")}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* DESCRIPTION */}
            <div>
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>

            {/* WHATSAPP */}
            <div>
              <Label>WhatsApp</Label>
              <Input
                value={form.whatsappPhone}
                onChange={(e) => {
                  let value = e.target.value;

                  if (!value.startsWith("+591")) {
                    value = "+591 ";
                  }

                  setForm({ ...form, whatsappPhone: value });
                }}
              />
              {errors.whatsappPhone && (
                <p className="text-sm text-red-500">{errors.whatsappPhone}</p>
              )}
            </div>

            {/* SOCIALS */}
            <Input
              placeholder="Instagram URL"
              value={form.instagramUrl}
              onChange={(e) =>
                setForm({ ...form, instagramUrl: e.target.value })
              }
            />


            <Input
              placeholder="Facebook URL"
              value={form.facebookUrl}
              onChange={(e) =>
                setForm({ ...form, facebookUrl: e.target.value })
              }
            />

            {/* IMAGES */}
            <div className="grid grid-cols-2 gap-3">

              {/* LOGO */}
              <label className="cursor-pointer">
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleImageChange(e, "logo")}
                />

             {errors.logo && (
                <p className="text-sm text-red-500">{errors.logo}</p>
              )}
                <div className="h-20 border-2 border-dashed rounded-xl flex items-center justify-center">
                  <Upload />
                </div>
              </label>

              {/* BANNER */}
              <label className="cursor-pointer">
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleImageChange(e, "banner")}
                />
                <div className="h-20 border-2 border-dashed rounded-xl flex items-center justify-center">
                  <Upload />
                </div>
              </label>

            </div>

            {/* PREVIEW */}
            <div className="flex gap-3">
              {(form.logo || form.logoUrl) && (
                <img
                  src={
                    form.logo
                      ? URL.createObjectURL(form.logo)
                      : form.logoUrl
                  }
                  className="h-20 w-20 rounded-full object-cover"
                />
              )}


              {(form.banner || form.bannerUrl) && (
                <img
                  src={
                    form.banner
                      ? URL.createObjectURL(form.banner)
                      : form.bannerUrl
                  }
                  className="h-20 w-32 rounded-xl object-cover"
                />
              )}
            </div>

            {/* FOOTER */}
            <div className="flex gap-3 pt-2">

              <Button
                variant="outline"
                className="w-full"
                onClick={handleCancel}
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
    </div>
  );
};

export default StoreForm;