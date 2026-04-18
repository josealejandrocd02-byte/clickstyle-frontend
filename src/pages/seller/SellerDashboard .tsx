import Header from "@/components/Header";
import { Plus, ShoppingCart, X } from "lucide-react";
import { useState } from "react";

import ProductForm from "@/components/dashboard/ProductForm/ProductForm";
import ProductList from "@/components/dashboard/ProductList";

import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import { deleteProduct } from "@/services/productService";
import { useQueryClient } from "@tanstack/react-query";

import { useStore } from "@/hooks/useStore";
import OwnerStoreHeader from "@/components/dashboard/OwnerStoreHeader";
import FloatingSocials from "@/components/dashboard/FloatingSocials";
import ViewOrders from "@/components/dashboard/ViewOrders";
import { useOrders } from "@/hooks/useOrders";

const initialForm = {
  name: "",
  description: "",
  price: "",
  stock: "",
  categoryId: "",
  sizes: "",
  colors: "",
  image: null as File | null,
  image2: null as File | null,
  imageUrl: "",
  imageUrl2: "",
};

const SellerDashboard = () => {
  const { data: categories = [] } = useCategories();
  const { 
  products, 
  isLoading, 
  saveProduct, 
  isSaving,
  deleteProduct,
  isDeleting 
} = useProducts();
  const { store, isLoading: isStoreLoading, planUsage } = useStore();

  const [form, setForm] = useState(initialForm);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // 🔥 NUEVO
  const [deleteId, setDeleteId] = useState<string | null>(null);
  

  const [openOrders, setOpenOrders] = useState(false);
  const { orders, confirmOrder, cancelOrder } = useOrders(store?.id);


  const handleSave = () => {
    saveProduct({
      ...form,
      id: editingId,
    });

    handleCancel();
  };

  const handleEdit = (product: any) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      categoryId: product.categoryId || "",
      sizes: product.sizes || "",
      colors: product.colors || "",
      image: null,
      image2: null,
      imageUrl: product.imageUrl,
      imageUrl2: product.imageUrl2,
    });

    setEditingId(product.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowForm(false);
  };

  // 🔥 ABRIR MODAL
  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  // 🔥 CONFIRMAR ELIMINACIÓN
const confirmDelete = () => {
  if (!deleteId) return;

  deleteProduct(deleteId);
  setDeleteId(null);
};

  const productToDelete = products.find((p) => p.id === deleteId);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <OwnerStoreHeader
        store={store}
        isLoading={isStoreLoading}
        usedProducts={planUsage?.usedProducts}
        productLimit={planUsage?.productLimit}
      />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">

{/* HEADER */}
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

  {/* LEFT */}
  <div>
    <h2 className="text-2xl font-bold tracking-tight">
      Productos
    </h2>
    <p className="text-sm text-muted-foreground">
      Administra tu catálogo y pedidos
    </p>
  </div>

  {/* RIGHT ACTIONS */}
  <div className="flex items-center gap-2">

    {/* 🛒 PEDIDOS */}
    <button
      onClick={() => setOpenOrders(true)}
      className="relative flex items-center gap-2 px-4 h-10 rounded-xl border bg-background hover:bg-muted transition"
    >
      <ShoppingCart size={17} />
      Pedidos

      {/* 🔴 BADGE (opcional) */}
      {orders.length > 0 && (
        <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white px-2 py-0.5 rounded-full">
          {orders.length}
        </span>
      )}
    </button>

    {/* ➕ ADD PRODUCT */}
    <button
      onClick={() => setShowForm((prev) => !prev)}
      className={`flex items-center gap-2 px-4 h-10 rounded-xl text-white transition ${
        showForm
          ? "bg-gray-600 hover:bg-gray-700"
          : "bg-primary hover:bg-primary/90"
      }`}
    >
      {showForm ? <X size={16} /> : <Plus size={16} />}
      {showForm ? "Cancelar" : "Nuevo producto"}
    </button>

  </div>
</div>



        {/* MODAL FORM */}
        {showForm && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={handleCancel}
          >
            <div
              className="w-full max-w-lg relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCancel}
                className="absolute -top-10 right-0 text-white"
              >
                <X />
              </button>

              <ProductForm
                editingId={editingId}
                form={form}
                onClose={handleCancel}
                setForm={setForm}
                onSave={handleSave}
                categories={categories}
                isLoading={isSaving}
              />
            </div>
          </div>
        )}

        {/* LIST */}
        <ProductList
          products={products}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* 🔥 MODAL DELETE PRO */}
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            
            <div className="bg-card w-full max-w-md rounded-2xl shadow-xl p-6 space-y-4 animate-in fade-in zoom-in-95">
              
              <h3 className="text-lg font-semibold text-center">
                ¿Eliminar producto?
              </h3>

              <p className="text-sm text-muted-foreground text-center">
                {productToDelete?.name
                  ? (
                    <>
                      Estás eliminando{" "}
                      <strong>{productToDelete.name}</strong>.
                    </>
                  )
                  : "Esta acción no se puede deshacer."}
              </p>

              <div className="flex gap-3 pt-2">
                
                {/* CANCEL */}
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 h-10 rounded-xl border hover:bg-muted transition"
                  disabled={isDeleting}
                >
                  Cancelar
                </button>

                {/* DELETE */}
                <button
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="flex-1 h-10 rounded-xl bg-red-600 text-white hover:bg-red-700 transition flex items-center justify-center gap-2"
                >
                  {isDeleting && (
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  )}
                  Eliminar
                </button>

              </div>

            </div>
          </div>
        )}

        {/* SOCIAL FLOAT */}
        <FloatingSocials
          phone={store?.whatsappPhone}
          instagram={store?.instagramUrl}
          facebook={store?.facebookUrl}
        />
        <ViewOrders
          open={openOrders}
          onClose={() => setOpenOrders(false)}
          orders={orders}
          onConfirm={confirmOrder}
          onCancel={cancelOrder}
        />
      </main>
    </div>
  );
};

export default SellerDashboard;