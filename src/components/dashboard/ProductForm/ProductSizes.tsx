const sizesOptions = ["S", "M", "L", "XL", "XXL"];
import { cn } from "@/lib/utils";
const ProductSizes = ({ form, setForm }: any) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {sizesOptions.map((size) => {
        const isActive = form.sizes?.split(",").includes(size);

        return (
          <button
            key={size}
            onClick={() => {
              const current = form.sizes ? form.sizes.split(",") : [];

              const updated = isActive
                ? current.filter((s) => s !== size)
                : [...current, size];

              setForm({ ...form, sizes: updated.join(",") });
            }}
            className={cn(
                                  "px-3 py-1 rounded-xl border text-sm",
                                  isActive
                                    ? "bg-primary text-white"
                                    : "hover:bg-muted"
                                )}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
};

export default ProductSizes;