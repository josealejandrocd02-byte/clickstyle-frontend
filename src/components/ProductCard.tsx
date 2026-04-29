import { useNavigate } from "react-router-dom";
import { PublicProduct } from "@/services/publicService";

interface Props {
  product: PublicProduct;
}

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!product?.id) return;
    navigate(`/product/${product.id}`);
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      className="group relative cursor-pointer rounded-2xl bg-card overflow-hidden border border-border/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-out focus:outline-none focus:ring-4 focus:ring-ring/20"
    >
      {/* IMAGE */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
            No image
          </div>
        )}

        {/* Subtle gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* INFO */}
      <div className="p-5 space-y-2">
        <p className="text-[10px] font-medium tracking-[0.18em] uppercase text-muted-foreground">
          {product.categoryName || "Sin categoría"}
        </p>

        <h3 className="text-base font-medium text-foreground leading-snug line-clamp-2 group-hover:text-foreground/80 transition-colors">
          {product.name}
        </h3>

        <div className="pt-1 flex items-baseline gap-1">
          <span className="text-lg font-semibold tracking-tight text-foreground">
            ${product.price}
          </span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
