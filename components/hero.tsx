import Link from "next/link";
import { Icon, WhatsAppGlyph } from "./icons";
import { SmartImage } from "./smart-image";
import { appointmentHref, opdHoursLabel, site } from "@/lib/site";
import { BOOKING_MESSAGE, whatsappLink } from "@/lib/whatsapp";
import { specialists } from "@/lib/content";

/**
 * Home section 1 (Roadmap §4): specialty identity and location in the first
 * screen, an authentic photograph, Book Appointment and WhatsApp / Call.
 */
export function Hero() {
  const lead = specialists[0];
  return (
    <section aria-labelledby="hero-title" className="hero__banner">
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__urdu urdu" lang="ur" dir="rtl">
            {site.urduTagline}
          </p>
          <h1 id="hero-title">Expert Care for Digestive &amp; Liver Health</h1>
          <p className="hero__identity">{site.descriptor}</p>
          <p className="hero__lead">
            Gastroenterology, hepatology and diagnostic &amp; therapeutic endoscopy at Gastro Plus Medical Complex.
          </p>
          <ul className="hero__facts">
            <li>
              <Icon name="pin" size={18} />
              {site.address.full}
            </li>
            <li>
              <Icon name="clock" size={18} />
              OPD: {opdHoursLabel()}
            </li>
          </ul>
          <div className="btn-row" style={{ marginTop: 26 }}>
            <Link href={appointmentHref()} className="btn btn--primary">
              <Icon name="calendar" size={18} />
              Book Appointment
            </Link>
            <a href={whatsappLink(BOOKING_MESSAGE)} target="_blank" rel="noopener noreferrer" className="btn btn--glass">
              <WhatsAppGlyph size={18} />
              WhatsApp
            </a>
            <a href={`tel:${site.phones[0].href}`} className="btn btn--glass">
              <Icon name="phone" size={18} />
              Call {site.phones[0].display}
            </a>
          </div>
        </div>

        <div className="hero__media">
          <div className="hero__media-frame">
            <SmartImage src={lead.photo} alt={`${lead.name}, ${lead.roles.join(", ")}`} eager />
          </div>
          <div className="hero__name-tag glass">
            <strong>{lead.name}</strong>
            <span>Lead Consultant · {lead.qualifications?.join(", ")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
