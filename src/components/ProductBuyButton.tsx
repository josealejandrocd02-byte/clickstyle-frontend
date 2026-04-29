import { useOrderIntent } from "@/hooks/useOrderIntent";

const ProductBuyButton = ({ product }: any) => {
  const { createIntent } = useOrderIntent();

  const handleBuy = async () => {
    try {
      // 🔥 1. guardar intento
      await createIntent({
        productId: product.id,
        storeId: product.storeId,
      });

    } catch (error) {
      console.error("Error guardando intento", error);
      // no bloquees la compra por esto
    }

    // 🔥 2. abrir WhatsApp
    const message = encodeURIComponent(
      `Hola, quiero comprar: ${product.name} - Precio: ${product.price}`
    );

    const phone = product.whatsappPhone; // o desde store
    const url = `https://wa.me/${phone}?text=${message}`;

    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleBuy}
      className="bg-green-500 text-white px-4 py-2 rounded-xl"
    >
      Comprar
    </button>
  );
};