import Link from "next/link";
import { Icon } from "./icons";
import { BookingButtons } from "./primitives";
import { site } from "@/lib/site";

/** Patterned booking card for the sticky sidebar on detail pages. */
export function AsideBooking({ title = "Book an Appointment" }: { title?: string }) {
  return (
    <section className="aside-booking" aria-labelledby="aside-booking-title">
      <h2 id="aside-booking-title">{title}</h2>
      <p>Speak to our team today. We confirm appointments by phone or WhatsApp.</p>
      <div className="aside-booking__phones">
        {site.phones.map((p) => (
          <a key={p.href} href={`tel:${p.href}`}>
            <Icon name="phone" size={16} />
            {p.display}
          </a>
        ))}
      </div>
      <BookingButtons compact />
    </section>
  );
}

/** List of related links (other procedures, departments, articles). */
export function AsideLinks({
  title,
  links,
  current,
}: {
  title: string;
  links: { label: string; href: string }[];
  current?: string;
}) {
  return (
    <nav className="glass aside-links" aria-label={title}>
      <h2>{title}</h2>
      <ul>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} aria-current={l.href === current ? "page" : undefined}>
              {l.label}
              <Icon name="arrow" size={15} />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
