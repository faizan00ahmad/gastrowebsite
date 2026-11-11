import Link from "next/link";
import { Icon, WhatsAppGlyph } from "./icons";
import { departments } from "@/lib/content";
import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

const socialIcon = {
  Facebook: "facebook",
  Instagram: "instagram",
  YouTube: "youtube",
  LinkedIn: "linkedin",
} as const;

/** Footer from the reference design: contact circles, four columns, centred copyright. */
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-contacts">
          <div className="footer-contact">
            <span className="footer-contact__icon" aria-hidden="true">
              <Icon name="pin" size={34} />
            </span>
            <div>
              <small>Hospital Address</small>
              <p>{site.address.full}</p>
            </div>
          </div>
          <div className="footer-contact">
            <span className="footer-contact__icon" aria-hidden="true">
              <WhatsAppGlyph size={34} />
            </span>
            <div>
              <small>WhatsApp Support</small>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                {site.phones[0].display}
              </a>
            </div>
          </div>
          <div className="footer-contact">
            <span className="footer-contact__icon" aria-hidden="true">
              <Icon name="phone" size={32} />
            </span>
            <div>
              <small>Contact Us</small>
              {site.phones.map((p) => (
                <a key={p.href} href={`tel:${p.href}`}>
                  {p.display}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-grid">
          <div>
            <h2>Hospital Overview</h2>
            <p className="urdu" lang="ur" dir="rtl" style={{ textAlign: "left", marginBottom: 8, color: "var(--brand-300)" }}>
              {site.urduName}
            </p>
            <p>
              A gastroenterology and liver centre on Khanewal Road, Multan, led by an FCPS gastroenterologist, with
              endoscopy, laboratory, ultrasound, pharmacy and short-stay beds in the same building.
            </p>
            <div className="footer-social">
              {site.social.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}>
                  <Icon name={socialIcon[s.name]} size={17} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2>Departments</h2>
            <ul className="footer-links">
              {departments.map((d) => (
                <li key={d.slug}>
                  <Link href={`/departments/${d.slug}/`}>{d.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Patient Resources</h2>
            <ul className="footer-links">
              <li><Link href="/about/">About Us</Link></li>
              <li><Link href="/specialists/">Our Specialists</Link></li>
              <li><Link href="/procedures/">Procedures</Link></li>
              <li><Link href="/patient-guides/">Patient Guides</Link></li>
              <li><Link href="/blog/">Health Blog</Link></li>
              <li><Link href="/contact/#book">Book Appointment</Link></li>
            </ul>
          </div>

          <div>
            <h2>Contact Information</h2>
            <ul className="footer-links footer-contact-list">
              <li>{site.address.full}</li>
              {site.phones.map((p) => (
                <li key={p.href}>
                  <a href={`tel:${p.href}`}>{p.display}</a>
                </li>
              ))}
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
              )}
            </ul>
            <div className="timings" style={{ marginTop: 18 }}>
              <div className="timings__row">
                <span>{site.hours.days}</span>
                <span>{site.hours.time || "Call to confirm"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {year} {site.name}. All Rights Reserved.</span>
        <nav aria-label="Legal">
          <Link href="/privacy-policy/">Privacy Policy</Link>
          <Link href="/terms-and-conditions/">Terms &amp; Conditions</Link>
        </nav>
      </div>
    </footer>
  );
}
