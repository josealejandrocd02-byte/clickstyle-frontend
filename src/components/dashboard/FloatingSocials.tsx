import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";

interface Props {
  phone?: string;
  instagram?: string;
  facebook?: string;
}

const FloatingSocials = ({ phone, instagram, facebook }: Props) => {
  // ✅ mensaje NORMAL (sin encode aquí)
  const message = "Hola, quiero saber más sobre tus productos";

  // ✅ limpiar teléfono (solo números)
  const cleanPhone = phone?.replace(/\D/g, "");

  // ✅ encode SOLO aquí
  const encodedMessage = encodeURIComponent(message);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">

      {/* WHATSAPP */}
      {cleanPhone && (
        <a
          href={`https://wa.me/${cleanPhone}?text=${encodedMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
          aria-label="Contactar por WhatsApp"
        >
          <FaWhatsapp size={26} />
        </a>
      )}

      {/* INSTAGRAM */}
      {instagram && (
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white shadow-lg transition-transform hover:scale-110"
          aria-label="Ir a Instagram"
        >
          <FaInstagram size={24} />
        </a>
      )}

      {/* FACEBOOK */}
      {facebook && (
        <a
          href={facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-lg transition-transform hover:scale-110"
          aria-label="Ir a Facebook"
        >
          <FaFacebookF size={22} />
        </a>
      )}

    </div>
  );
};

export default FloatingSocials;