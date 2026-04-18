import { Link } from "react-router-dom";
import { type Store, getProductsByStore } from "@/data/mockData";

interface StoreCardProps {
  store: Store;
}

const StoreCard = ({ store }: StoreCardProps) => {
  const productCount = getProductsByStore(store.id).length;

  return (
    <Link
      to={`/store/${store.id}`}
      className="group flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <img
        src={store.logo}
        alt={store.name}
        className="h-16 w-16 rounded-full object-cover ring-2 ring-border transition-all group-hover:ring-primary"
        loading="lazy"
      />
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-lg font-semibold text-foreground">{store.name}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground line-clamp-1">{store.description}</p>
        <p className="mt-1 text-xs font-medium text-primary">{productCount} products</p>
      </div>
    </Link>
  );
};

export default StoreCard;
