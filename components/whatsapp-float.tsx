import Link from "next/link";
import { Icon, WhatsAppGlyph } from "./icons";
import { appointmentHref, site } from "@/lib/site";
import { BOOKING_MESSAGE, whatsappLink } from "@/lib/whatsapp";

/**
 * Roadmap §2–3 floating elements. Desktop: one floating WhatsApp button.
 * Mobile: a persistent bottom bar with Call, WhatsApp and Book Appointment
 * (the floating button is hidden there so the two never overlap).
 */
export function WhatsAppFloat() {
  return (
    <>
      <a
        href={whatsappLink(BOOKING_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        aria-label="Chat with GPMC on WhatsApp"
      >
        <WhatsAppGlyph size={24} />
        <span>WhatsApp</span>
      </a>

      <nav className="action-bar" aria-label="Quick actions">
        <a href={`tel:${site.phones[0].href}`}>
          <Icon name="phone" size={20} />
          Call
        </a>
        <a href={whatsappLink(BOOKING_MESSAGE)} target="_blank" rel="noopener noreferrer">
          <WhatsAppGlyph size={20} />
          WhatsApp
        </a>
        <Link href={appointmentHref()} className="action-bar__book">
          <Icon name="calendar" size={20} />
          Book Appointment
        </Link>
      </nav>
    </>
  );
}
