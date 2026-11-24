import { site } from "./site";

export const BOOKING_MESSAGE =
  "Assalam o Alaikum, I would like to request an appointment at Gastro Plus Medical Complex Multan.";

/** Builds a wa.me link to the single verified WhatsApp destination, optionally pre-filled. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function telLink(phone: string): string {
  return `tel:${phone}`;
}
