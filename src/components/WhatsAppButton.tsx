import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppButtonProps {
  phone?: string;
  productName?: string;
  price?: number;
  label?: string;
  fullWidth?: boolean;
}

const WhatsAppButton = ({
  phone,
  productName,
  price,
  label = "Comprar Ahora",
  fullWidth = false,
}: WhatsAppButtonProps) => {
  if (!phone) return null;

  // 🔥 limpiar número
  const cleanPhone = phone.replace(/\D/g, "");

  const message = `Hola, me interesa el producto: ${productName} - $${price}`;
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  return (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className={`
      group inline-flex items-center justify-center gap-2
      rounded-2xl
      bg-whatsapp
      px-6 py-4
      text-sm font-semibold
      text-whatsapp-foreground
      shadow-md shadow-black/10
      transition-all duration-200
      active:scale-[0.98]
      hover:shadow-lg hover:-translate-y-0.5
      focus:outline-none focus:ring-2 focus:ring-whatsapp/40
      ${fullWidth ? "w-full" : ""}
    `}
  >
    {/* icono */}
    <span className="flex items-center justify-center">
      <FaWhatsapp
        size={20}
        className="transition-transform duration-200 group-hover:scale-110"
      />
    </span>

    {/* texto */}
    <span className="tracking-tight">
      {label}
    </span>
  </a>
);
};

export default WhatsAppButton;