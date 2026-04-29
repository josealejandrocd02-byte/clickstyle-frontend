import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Store } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";
import { usePublic } from "@/hooks/usePublic";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { product, isLoadingProduct, productError } = usePublic(id);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        ID inválido
      </div>
    );
  }

  if (isLoadingProduct) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="mx-auto max-w-6xl px-4 py-24 text-center">
          <div className="inline-block h-8 w-8 rounded-full border-2 border-muted border-t-foreground animate-spin mb-4" />
          <p className="text-sm text-muted-foreground">
            Cargando producto...
          </p>
        </div>
      </div>
    );
  }

  if (productError || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="mx-auto max-w-6xl px-4 py-24 text-center">
          <p className="text-lg font-medium text-foreground mb-4">
            Producto no encontrado.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm underline"
          >
            <ArrowLeft className="h-4 w-4" /> Volver
          </Link>
        </div>
      </div>
    );
  }

  // 🖼 imágenes
  const images = [product.imageUrl, product.imageUrl2].filter(Boolean) as string[];
  const mainImage = selectedImage || images[0];

  // 🔥 derivados desde variantes (fuente real)
  const sizes = [...new Set(product.variants.map(v => v.size))];
  const colors = [...new Set(product.variants.map(v => v.color))];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-6 grid lg:grid-cols-2 gap-8">

        {/* 🖼 IMÁGENES */}
        <div className="relative">

          {/* 🔙 BACK */}
          <Link
            to="/"
            className="absolute top-4 left-4 z-10 flex items-center gap-2 
              bg-white/80 dark:bg-black/50 backdrop-blur-md 
              px-3 py-2 rounded-full shadow-sm text-sm hover:scale-105 transition"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          {/* imagen principal */}
          <div className="w-full h-[60vh] sm:h-[70vh] lg:h-[500px] bg-muted rounded-2xl overflow-hidden">
            {mainImage ? (
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Sin imagen
              </div>
            )}
          </div>

          {/* thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {images.map((img) => (
                <button
                  key={img}
                  onClick={() => setSelectedImage(img)}
                  className={cn(
                    "min-w-[70px] h-[70px] rounded-xl overflow-hidden border transition",
                    selectedImage === img
                      ? "border-foreground scale-105"
                      : "border-border opacity-70"
                  )}
                >
                  <img
                    src={img}
                    alt="thumb"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 📄 INFO */}
        <div className="space-y-5">

          <h1 className="text-2xl font-bold">{product.name}</h1>

          {product.description && (
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          )}

          {/* precio */}
          <p className="text-3xl font-bold">${product.price}</p>

          {/* stock */}
          <div>
            {product.inStock ? (
              <span className="text-green-600 text-sm font-medium">
                Disponible
              </span>
            ) : (
              <span className="text-red-500 text-sm font-medium">
                Agotado
              </span>
            )}
          </div>

          {/* TALLAS */}
          {sizes.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Tallas</p>
              <div className="flex gap-2 flex-wrap">
                {sizes.map((s) => {
                  const hasStock = product.variants.some(
                    v => v.size === s && v.stock > 0
                  );

                  return (
                    <span
                      key={s}
                      className={cn(
                        "px-3 py-1 rounded-lg text-sm border transition",
                        hasStock
                          ? "hover:bg-muted"
                          : "opacity-40 line-through"
                      )}
                    >
                      {s}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* COLORES */}
          {colors.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Colores</p>
              <div className="flex gap-2 flex-wrap">
                {colors.map((c) => {
                  const hasStock = product.variants.some(
                    v => v.color === c && v.stock > 0
                  );

                  return (
                    <span
                      key={c}
                      className={cn(
                        "px-3 py-1 rounded-lg text-sm border transition",
                        hasStock
                          ? "hover:bg-muted"
                          : "opacity-40 line-through"
                      )}
                    >
                      {c}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* 🏪 STORE */}
          <div className="p-4 border rounded-xl flex items-center gap-4">
            <div className="h-12 w-12 rounded-full overflow-hidden bg-muted flex items-center justify-center border">
              {product.storeLogoUrl ? (
                <img
                  src={product.storeLogoUrl}
                  alt={product.storeName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Store className="h-5 w-5 text-muted-foreground" />
              )}
            </div>

            <div className="flex-1">
              <p className="text-xs text-muted-foreground uppercase">
                Vendido por
              </p>
              <div className="flex items-center gap-2">
                <p className="font-medium">{product.storeName}</p>
                {product.storeVerified && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-[2px] rounded-full">
                    Verificada
                  </span>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 📱 CTA MOBILE */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/80 backdrop-blur-md border-t lg:hidden">
        <WhatsAppButton
          phone={product.storeWhatsapp}
          productName={product.name}
          price={product.price}
          fullWidth
        />
      </div>
    </div>
  );
};

export default ProductDetail;