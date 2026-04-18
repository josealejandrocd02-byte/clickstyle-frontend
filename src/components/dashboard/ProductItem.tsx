import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { formatPrice } from "@/data/mockData";
import { memo } from "react";

const ProductItem = memo(({ product, onEdit, onDelete }: any) => {

  const imageUrl = product.imageUrl || product.image || "/placeholder.png";

  const handleEdit = (e: any) => {
    e.preventDefault(); // 🚫 evita navegación del Link
    onEdit(product);
  };

  const handleDelete = (e: any) => {
    e.preventDefault(); // 🚫 evita navegación
    onDelete(product.id);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative animate-fade-in overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      {/* 🖼️ Imagen */}
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        <img
          src={imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* 🔥 overlay suave */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />

        {/* ✏️ botones admin (solo hover) */}
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={handleEdit}
            className="p-2 rounded-full bg-white/90 shadow hover:bg-secondary"
          >
            <Pencil size={14} />
          </button>

          <button
            onClick={handleDelete}
            className="p-2 rounded-full bg-white/90 shadow text-red-500 hover:bg-red-100"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* 📦 Info */}
      <div className="p-3">
        <p className="text-xs text-muted-foreground">
          {product.categoryName || "Sin categoría"}
        </p>

        <h3 className="mt-0.5 text-sm font-medium leading-tight line-clamp-2">
          {product.name}
        </h3>

        <p className="mt-1.5 text-base font-semibold text-primary">
          {formatPrice(product.price)}
        </p>

        {/* 📦 stock sutil */}
        <p className="text-xs text-muted-foreground">
          Stock: {product.stock}
        </p>
      </div>
    </Link>
  );
}
);
export default ProductItem;