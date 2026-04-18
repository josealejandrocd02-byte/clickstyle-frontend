import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";

import { getProductById, getStoreById, formatPrice, buildWhatsAppUrl } from "@/data/mockData";
import WhatsAppButton from "@/components/WhatsAppButton";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const store = product ? getStoreById(product.storeId) : undefined;

  if (!product || !store) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 text-center">
          <p className="text-muted-foreground">Product not found.</p>
          <Link to="/" className="mt-4 inline-block text-sm text-primary underline">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6">
        <Link to="/" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft size={16} /> Back
        </Link>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="aspect-[3/4] overflow-hidden rounded-lg bg-secondary">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm text-muted-foreground">{product.category}</p>
            <h1 className="mt-1 font-display text-3xl font-bold text-foreground">{product.name}</h1>
            <p className="mt-3 font-display text-2xl font-semibold text-primary">
              {formatPrice(product.price)}
            </p>

            <div className="mt-4 rounded-lg border bg-card p-4">
              <Link to={`/store/${store.id}`} className="text-sm font-medium text-foreground hover:underline">
                {store.name}
              </Link>
              <p className="mt-0.5 text-xs text-muted-foreground">{store.description}</p>
            </div>

            <div className="mt-6">
              <WhatsAppButton
                url={buildWhatsAppUrl(store.phone, product.name, product.price)}
                fullWidth
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
