import ProductItem from "./ProductItem";

const ProductList = ({ products, isLoading, onEdit, onDelete }: any) => {
  
  if (isLoading) {
    return <p className="mt-6">Loading products...</p>;
  }

  if (products.length === 0) {
    return <p className="mt-6">No products yet</p>;
  }

  return (
    <div className="mt-6 grid gap-6 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4"
    >
      {products.map((p: any) => (
        <ProductItem
          key={p.id}
          product={p}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductList;