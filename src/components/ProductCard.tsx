import { Link } from "react-router-dom";
import { type Product, formatPrice, getStoreById } from "@/data/mockData";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const store = getStoreById(product.storeId);

  return (
    <Link
      to={`/product/${product.id}`}
      className="group animate-fade-in overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="aspect-[3/4] overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <p className="text-xs text-muted-foreground">{store?.name}</p>
        <h3 className="mt-0.5 text-sm font-medium leading-tight text-foreground line-clamp-2">
          {product.name}
        </h3>
        <p className="mt-1.5 font-display text-base font-semibold text-primary">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
