import { site } from "./site";

export const BOOKING_MESSAGE =
  "Assalam o Alaikum, I would like to book an appointment at Gastro Plus Medical Complex Multan.";

/** Builds a wa.me link, optionally pre-filled with a message. No backend required. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function telLink(phone: string): string {
  return `tel:${phone}`;
}
