import { cn } from "@/lib/utils";

const ProductCategory = ({ form, setForm, categories, errors }: any) => {
  return (
    <select
      value={form.categoryId || ""}
      onChange={(e) =>
        setForm({ ...form, categoryId: e.target.value })
      }
      className={cn(
        "w-full h-11 border rounded-xl px-3",
        errors.categoryId && "border-destructive"
      )}
    >
      <option value="">Categoría</option>
      {categories.map((c: any) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  );
};

export default ProductCategory;