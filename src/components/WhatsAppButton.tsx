import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  url: string;
  label?: string;
  fullWidth?: boolean;
}

const WhatsAppButton = ({ url, label = "Buy via WhatsApp", fullWidth = false }: WhatsAppButtonProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-6 py-3.5 text-sm font-bold text-whatsapp-foreground shadow-md transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 ${
        fullWidth ? "w-full" : ""
      }`}
    >
      <MessageCircle size={20} />
      {label}
    </a>
  );
};

export default WhatsAppButton;
