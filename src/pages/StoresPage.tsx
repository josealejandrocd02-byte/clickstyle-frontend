import Header from "@/components/Header";
import StoreCard from "@/components/StoreCard";
import { stores } from "@/data/mockData";

const StoresPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6">
        <h1 className="font-display text-3xl font-bold text-foreground">Stores</h1>
        <p className="mt-1 text-sm text-muted-foreground">Browse local clothing stores.</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default StoresPage;
