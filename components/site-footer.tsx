import Link from "next/link";
import { Icon, type IconName } from "./icons";
import { appointmentHref, directionsUrl, opdHoursLabel, site, type SocialName } from "@/lib/site";
import { BOOKING_MESSAGE, whatsappLink } from "@/lib/whatsapp";

const socialIcon: Record<SocialName, IconName> = {
  Google: "google",
  Facebook: "facebook",
  Instagram: "instagram",
  LinkedIn: "linkedin",
  YouTube: "youtube",
  TikTok: "tiktok",
  X: "x",
};

/**
 * Roadmap §3: one footer on every page. Four short columns and a legal strip;
 * no overview paragraph, no service cards, no second booking form.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  const social = site.googleBusinessUrl
    ? [{ name: "Google" as const, href: site.googleBusinessUrl }, ...site.social]
    : site.social;

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-identity">
          <Link href="/" className="footer-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/gpmc-logo.png" alt="" width={52} height={52} />
            <span>{site.name}</span>
          </Link>
          <p>{site.descriptor}.</p>
          <p className="footer-identity__loc">
            <Icon name="pin" size={15} />
            Khanewal Road, Multan
          </p>
        </div>

        <nav aria-label="Explore GPMC">
          <h2>Explore GPMC</h2>
          <ul className="footer-links">
            <li><Link href="/about/">About GPMC</Link></li>
            <li><Link href="/specialists/">Specialists</Link></li>
            <li><Link href="/departments/">Departments</Link></li>
            <li><Link href="/procedures/">Procedures</Link></li>
            <li><Link href="/patient-resources/">Patient Resources</Link></li>
            <li><Link href="/blog/">Health Blog</Link></li>
            <li><Link href="/careers/">Careers</Link></li>
          </ul>
        </nav>

        <nav aria-label="Patient and appointment">
          <h2>Patient &amp; Appointment</h2>
          <ul className="footer-links">
            <li><Link href={appointmentHref()}>Book Appointment</Link></li>
            <li><a href={`tel:${site.phones[0].href}`}>Call</a></li>
            <li>
              <a href={whatsappLink(BOOKING_MESSAGE)} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
            <li><Link href="/patient-resources/#rights">Patient Rights</Link></li>
            <li><Link href="/patient-resources/#preparation">Preparation Guides</Link></li>
            <li><Link href="/patient-resources/#faqs">FAQs</Link></li>
          </ul>
        </nav>

        <div>
          <h2>Contact &amp; Legal</h2>
          <ul className="footer-links footer-links--plain">
            <li>{site.address.full}</li>
            {site.phones.map((p) => (
              <li key={p.href}>
                <small>{p.label}</small>
                <a href={`tel:${p.href}`}>{p.display}</a>
              </li>
            ))}
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            )}
            <li>
              <small>OPD hours</small>
              <Link href="/contact/#hours">{opdHoursLabel()}</Link>
            </li>
            <li>
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                Map &amp; directions
              </a>
            </li>
            {site.regulatory.number && (
              <li>
                {site.regulatory.label}: {site.regulatory.number}
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom__inner">
          <span>© {year} Gastro Plus Medical Complex. All Rights Reserved.</span>
          <nav aria-label="Legal">
            <Link href="/privacy-policy/">Privacy Policy</Link>
            <span aria-hidden="true">|</span>
            <Link href="/terms-and-conditions/">Terms &amp; Conditions</Link>
          </nav>
          {social.length > 0 && (
            <ul className="footer-social" aria-label="GPMC on social media">
              {social.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`GPMC on ${s.name}`}>
                    <Icon name={socialIcon[s.name]} size={17} />
                  </a>
                </li>
              ))}
            </ul>
          )}
          <a href="#top" className="back-to-top">
            <Icon name="arrowUp" size={15} />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
