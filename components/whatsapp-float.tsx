import { WhatsAppGlyph } from "./icons";
import { BOOKING_MESSAGE, whatsappLink } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(BOOKING_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float"
      aria-label="Chat with Gastro Plus on WhatsApp"
    >
      <WhatsAppGlyph size={24} />
      <span>WhatsApp Us</span>
    </a>
  );
}
