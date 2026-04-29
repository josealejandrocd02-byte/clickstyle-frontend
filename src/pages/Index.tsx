import { useState, useMemo } from "react";

import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import Header from "@/components/Header";
import EmptyState from "@/components/EmptyState";

import { usePublic } from "@/hooks/usePublic";

const Index = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const { products, isLoadingProducts } = usePublic();

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const name = p.name?.toLowerCase() || "";
      const searchValue = search.toLowerCase();

      const matchesSearch = name.includes(searchValue);

      const matchesCategory =
        category === "All" ||
        (p.categoryName &&
          p.categoryName.toLowerCase() === category.toLowerCase());

      const matchesPrice =
        maxPrice === "" || p.price <= Number(maxPrice);

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, search, category, maxPrice]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <div className="animate-fade-in">
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Discover Local Fashion
          </h1>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Browse clothing from stores with active plans — buy via WhatsApp.
          </p>
        </div>

        {/* 🔎 SEARCH + PRICE */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} />
          </div>

          <div className="w-full sm:w-40">
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Max price
            </label>
            <input
              type="number"
              min={0}
              value={maxPrice}
              onChange={(e) => {
                const value = e.target.value;
                setMaxPrice(value ? Math.max(0, Number(value)) : "");
              }}
              placeholder="No limit"
              className="h-11 w-full rounded-lg border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
            />
          </div>
        </div>

        {/* 🏷 CATEGORIES */}
        <div className="mt-5">
          <CategoryFilter selected={category} onSelect={setCategory} />
        </div>

        {/* 📦 LOADING */}
        {isLoadingProducts ? (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;