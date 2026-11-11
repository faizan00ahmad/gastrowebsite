import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName, WhatsAppGlyph } from "./icons";
import { JsonLd } from "./json-ld";
import { SmartImage } from "./smart-image";
import { breadcrumbJsonLd } from "@/lib/seo";
import { BOOKING_MESSAGE, whatsappLink } from "@/lib/whatsapp";

export function Section({
  id,
  tight,
  children,
  className = "",
}: {
  id?: string;
  tight?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`section ${tight ? "section--tight" : ""} ${className}`.trim()}>
      <div className="container">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <header className={`section-head ${align === "left" ? "section-head--left" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </header>
  );
}

export interface Crumb {
  name: string;
  path: string;
}

/**
 * Inner-page banner from the reference: large title with uppercase breadcrumbs beneath.
 * Also emits BreadcrumbList structured data.
 */
export function PageHero({
  title,
  description,
  crumbs,
  eyebrow,
  image = "/images/banners/default.jpg",
}: {
  title: string;
  description?: string;
  crumbs: Crumb[];
  /** Short tag above the title. Use only when it adds information (e.g. a category). */
  eyebrow?: string;
  /** Banner photo under /public. Falls back to the brand pattern if the file is missing. */
  image?: string;
}) {
  const all: Crumb[] = [{ name: "Gastro Plus Medical Complex", path: "/" }, ...crumbs];
  return (
    <section className="page-banner">
      <div className="page-banner__pattern" aria-hidden="true" />
      <div className="page-banner__media" aria-hidden="true">
        <SmartImage src={image} alt="" eager fallback="none" />
      </div>
      <div className="container">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        <nav aria-label="Breadcrumb" className="breadcrumbs">
          {all.map((c, i) => (
            <span key={c.path} style={{ display: "contents" }}>
              {i < all.length - 1 ? (
                <Link href={c.path}>{c.name}</Link>
              ) : (
                <span aria-current="page">{c.name}</span>
              )}
              {i < all.length - 1 && <span aria-hidden="true">&gt;</span>}
            </span>
          ))}
        </nav>
        {description && <p>{description}</p>}
      </div>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </section>
  );
}

export function IconTile({ name, soft }: { name: IconName; soft?: boolean }) {
  return (
    <span className={`tile-icon ${soft ? "tile-icon--soft" : ""}`} aria-hidden="true">
      <Icon name={name} size={26} />
    </span>
  );
}

/** Primary booking + WhatsApp call-to-action pair. */
export function BookingButtons({ compact }: { compact?: boolean }) {
  return (
    <div className="btn-row">
      <Link href="/contact/#book" className={`btn btn--primary ${compact ? "btn--sm" : ""}`}>
        <Icon name="calendar" size={18} />
        Book Appointment
      </Link>
      <a
        href={whatsappLink(BOOKING_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn btn--wa ${compact ? "btn--sm" : ""}`}
      >
        <WhatsAppGlyph size={18} />
        WhatsApp Us
      </a>
    </div>
  );
}

export function CtaBanner() {
  return (
    <Section>
      <div className="cta-banner">
        <div>
          <h2>Need Expert Gastroenterology Care?</h2>
          <p>
            Schedule your appointment today and receive personalized care from our experienced
            specialists.
          </p>
        </div>
        <BookingButtons />
      </div>
    </Section>
  );
}
