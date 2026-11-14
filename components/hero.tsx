import Link from "next/link";
import { Icon, WhatsAppGlyph, type IconName } from "./icons";
import { SmartImage } from "./smart-image";
import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

/** Trust strip, exactly as listed in the blueprint (Section 3). */
const trustStrip: { label: string; icon: IconName }[] = [
  { label: "OPD Services", icon: "clock" },
  { label: "Expert Consultants", icon: "user" },
  { label: "Advanced Endoscopy Suite", icon: "scan" },
  { label: "Diagnostic Laboratory", icon: "flask" },
  { label: "Ultrasound Services", icon: "activity" },
  { label: "Pharmacy", icon: "pill" },
  { label: "Short Stay Care", icon: "bed" },
  { label: "IPD / Admission Services", icon: "heart" },
];

/** Section 3 hero: heading, subheading, two buttons, trust strip, CEO portrait. */
export function Hero() {
  return (
    <section aria-labelledby="hero-title">
      <div className="hero__banner">
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="hero__urdu urdu" lang="ur" dir="rtl">
              {site.urduTagline}
            </p>
            <h1 id="hero-title">
              Excellence in Gastroenterology
              <span>&amp; Comprehensive Healthcare</span>
            </h1>
            <p className="hero__lead">
              Advanced digestive healthcare, endoscopy services, diagnostics, and patient-centered medical care
              delivered by experienced specialists in Multan.
            </p>
            <div className="btn-row" style={{ marginTop: 24 }}>
              <Link href="/contact/#book" className="btn btn--primary">
                <Icon name="calendar" size={18} />
                Book Appointment
              </Link>
              <Link href="/specialists/" className="btn btn--glass">
                Meet Our Specialists
              </Link>
            </div>
            <ul className="hero__chips" aria-label="Services available">
              {trustStrip.map((c) => (
                <li key={c.label} className="glass hero-chip">
                  <Icon name={c.icon} size={26} />
                  {c.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="hero__media">
            <div className="hero__media-frame">
              <SmartImage
                src="/images/dr-umair-khan-sherwani.jpg"
                alt="Dr. Umair Khan Sherwani, Gastroenterologist, Hepatologist and Interventional Endoscopist"
                eager
              />
            </div>
            <div className="hero__name-tag glass">
              <strong>Dr. Umair Khan Sherwani</strong>
              <span>Gastroenterologist | Hepatologist | Interventional Endoscopist</span>
              <span className="hero__name-tag-sub">MBBS (KEMU), FCPS Gastroenterology</span>
            </div>
          </div>
        </div>

        <div className="hero__strip">
          <div className="container hero__strip-inner">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <WhatsAppGlyph size={20} />
              {site.phones[0].display}
            </a>
            <a href={`tel:${site.phones[1].href}`}>
              <Icon name="phone" size={18} />
              {site.phones[1].display}
            </a>
            <span>
              <Icon name="pin" size={18} />
              {site.address.full}
            </span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="info-boxes">
          <div className="info-box">
            <h2>Appointments</h2>
            {site.phones.map((p) => (
              <p key={p.href}>
                <a href={`tel:${p.href}`}>{p.display}</a>
              </p>
            ))}
          </div>
          <div className="info-box">
            <h2>Find Your Specialist</h2>
            <Link href="/contact/#book" className="btn btn--primary btn--sm">
              Book Appointment
            </Link>
          </div>
          <div className="info-box info-box--brand">
            <h2>Working Hours</h2>
            <p>{site.hours.days}</p>
            <p style={{ opacity: 0.85 }}>{site.hours.time || "Call to confirm timings"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
