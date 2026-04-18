import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const ProductBasicInfo = ({ form, setForm, errors }: any) => {
  return (
    <>
      <Input
        placeholder="Nombre"
        value={form.name}
        onChange={(e) =>
          setForm({
            ...form,
            name:
              e.target.value.charAt(0).toUpperCase() +
              e.target.value.slice(1),
          })
        }
        className={cn(errors.name && "border-destructive")}
      />

      <Textarea
        placeholder="Descripción"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
        className={cn(errors.description && "border-destructive")}
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          type="number"
          placeholder="Precio"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <Input
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) =>
            setForm({ ...form, stock: e.target.value })
          }
        />
      </div>
    </>
  );
};

export default ProductBasicInfo;