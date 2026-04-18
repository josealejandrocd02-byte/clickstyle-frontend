import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
      <Skeleton className="aspect-[3/4] w-full" />
      <div className="p-3">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="mt-2 h-4 w-full" />
        <Skeleton className="mt-2 h-5 w-20" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
