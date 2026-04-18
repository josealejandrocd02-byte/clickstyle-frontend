import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { getStoreById, getProductsByStore } from "@/data/mockData";

const StorePage = () => {
  const { id } = useParams<{ id: string }>();
  const store = getStoreById(id || "");
  const storeProducts = store ? getProductsByStore(store.id) : [];

  if (!store) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 text-center">
          <p className="text-muted-foreground">Store not found.</p>
          <Link to="/" className="mt-4 inline-block text-sm text-primary underline">Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6">
        <Link to="/stores" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft size={16} /> All Stores
        </Link>

        <div className="flex items-center gap-4">
          <img src={store.logo} alt={store.name} className="h-16 w-16 rounded-full object-cover" />
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">{store.name}</h1>
            <p className="text-sm text-muted-foreground">{store.description}</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {storeProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default StorePage;
