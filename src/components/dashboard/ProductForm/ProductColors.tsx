const colorsOptions = [
  { name: "Rojo", value: "red" },
  { name: "Negro", value: "black" },
];

const ProductColors = ({ form, setForm }: any) => {
  return (
    <div className="flex gap-2">
      {colorsOptions.map((color) => {
        const isActive = form.colors?.split(",").includes(color.name);

        return (
          <button
            key={color.name}
            onClick={() => {
              const current = form.colors
                ? form.colors.split(",")
                : [];

              const updated = isActive
                ? current.filter((c) => c !== color.name)
                : [...current, color.name];

              setForm({ ...form, colors: updated.join(",") });
            }}
            className="h-8 w-8 rounded-full border"
          >
            <div
              className="w-full h-full rounded-full"
              style={{ backgroundColor: color.value }}
            />
          </button>
        );
      })}
    </div>
  );
};

export default ProductColors;