/**
 * Central site configuration. Edit values here once and every page,
 * footer, schema block and contact link updates automatically.
 *
 * Details that are not confirmed are left empty on purpose: the UI hides
 * them instead of showing a guess. Fill them in to make them appear.
 */

export interface NavItem {
  label: string;
  href: string;
}

export type SocialName = "Facebook" | "Instagram" | "YouTube" | "LinkedIn";

export interface SocialLink {
  name: SocialName;
  href: string;
}

export interface Phone {
  label: string;
  display: string;
  href: string;
}

interface SiteConfig {
  name: string;
  shortName: string;
  /** Urdu name and tagline, shown with the logo and in the hero. */
  urduName: string;
  urduTagline: string;
  url: string;
  locale: string;
  description: string;
  address: { street: string; locality: string; region: string; country: string; full: string };
  mapQuery: string;
  phones: Phone[];
  whatsappNumber: string;
  /** Leave empty until the official address is confirmed; it is hidden when empty. */
  email: string;
  hours: {
    days: string;
    /** Leave empty until confirmed; the site then says "call to confirm timings". */
    time: string;
  };
  social: SocialLink[];
  /** Public page where patients can read and leave Google reviews. */
  googleReviewsUrl: string;
}

const mapQuery = "Gastro Plus Medical Complex Multan, Chowk Rasheedabad, Khanewal Road, Multan";

export const site: SiteConfig = {
  name: "Gastro Plus Medical Complex Multan",
  shortName: "Gastro Plus",
  urduName: "گیسٹرو پلس میڈیکل کمپلیکس ملتان",
  urduTagline: "معدہ، جگر اور آنتوں کے امراض کا خصوصی مرکز",
  // Set NEXT_PUBLIC_SITE_URL at build time for the production domain.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.gastroplusmultan.com").replace(/\/$/, ""),
  locale: "en_PK",
  description:
    "Gastro Plus Medical Complex, Khanewal Road, Multan: FCPS gastroenterologist consultations, endoscopy, colonoscopy, ERCP, liver care, laboratory and ultrasound in one place.",
  address: {
    street: "Chowk Rasheedabad, Khanewal Road",
    locality: "Multan",
    region: "Punjab",
    country: "PK",
    full: "Chowk Rasheedabad, Khanewal Road, Multan",
  },
  mapQuery,
  phones: [
    { label: "Mobile & WhatsApp", display: "+92 300 4139320", href: "+923004139320" },
    { label: "Landline", display: "+92 312 4139320", href: "+923124139320" },
  ],
  whatsappNumber: "923004139320",
  email: "", // TODO: add the official email address
  hours: {
    days: "Monday – Saturday",
    time: "", // TODO: add confirmed clinic timings, e.g. "10:00 AM – 8:00 PM"
  },
  // Facebook profile taken from the clinic's own post link. TODO: add Instagram, YouTube, LinkedIn when available.
  social: [{ name: "Facebook", href: "https://www.facebook.com/100083268912246" }],
  googleReviewsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`,
};

/** "Monday – Saturday, 10:00 AM – 8:00 PM" or a prompt to call when timings are not confirmed. */
export function hoursLabel(): string {
  return site.hours.time ? `${site.hours.days}, ${site.hours.time}` : `${site.hours.days} (call to confirm timings)`;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about/" },
  { label: "Our Specialists", href: "/specialists/" },
  { label: "Departments", href: "/departments/" },
  { label: "Procedures", href: "/procedures/" },
  { label: "Patient Guides", href: "/patient-guides/" },
  { label: "Health Blog", href: "/blog/" },
  { label: "Contact", href: "/contact/" },
];
