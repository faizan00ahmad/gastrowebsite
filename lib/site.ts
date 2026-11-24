/**
 * One source of truth (Roadmap §7): address, phone numbers, WhatsApp destination,
 * OPD hours and social profile URLs live here. Every page and component reads
 * from this file, so a number or timing is changed in one place only.
 *
 * Details that are not confirmed are left empty on purpose: the UI hides
 * them instead of showing a guess. Fill them in to make them appear.
 */

export interface NavItem {
  label: string;
  href: string;
}

export type SocialName = "Google" | "Facebook" | "Instagram" | "LinkedIn" | "YouTube" | "TikTok" | "X";

export interface SocialLink {
  name: SocialName;
  href: string;
}

export interface Phone {
  label: string;
  display: string;
  href: string;
  /** True only for numbers tested as WhatsApp-enabled. */
  whatsapp: boolean;
}

interface SiteConfig {
  name: string;
  shortName: string;
  /** One-line specialty identity used in the hero, footer and metadata. */
  descriptor: string;
  urduName: string;
  urduTagline: string;
  url: string;
  locale: string;
  description: string;
  address: { street: string; locality: string; region: string; country: string; full: string };
  mapQuery: string;
  phones: Phone[];
  /** Single verified primary WhatsApp destination (digits only). */
  whatsappNumber: string;
  /** Leave empty until GPMC provides an actively monitored address; hidden when empty. */
  email: string;
  /** GPMC OPD hours supplied by management. Specialist/department schedules may differ. */
  opdHours: { days: string; time: string };
  /**
   * Official profiles only (Roadmap §6): never a platform homepage or a guessed handle.
   * Add Google Business Profile, Instagram, LinkedIn, YouTube, TikTok and X once GPMC confirms the URLs.
   */
  social: SocialLink[];
  /** Official Google Business Profile URL. Empty = a Google Maps search link is used for directions only. */
  googleBusinessUrl: string;
  /** PHC / regulatory registration. Shown in the footer only once verified. */
  regulatory: { label: string; number: string };
}

const mapQuery = "Gastro Plus Medical Complex Multan, Chowk Rasheedabad, Khanewal Road, Multan";

export const site: SiteConfig = {
  name: "Gastro Plus Medical Complex",
  shortName: "GPMC",
  descriptor: "Specialist gastroenterology, liver and endoscopy care in Multan",
  urduName: "گیسٹرو پلس میڈیکل کمپلیکس ملتان",
  urduTagline: "معدہ، جگر اور آنتوں کے امراض کا خصوصی مرکز",
  // Set NEXT_PUBLIC_SITE_URL at build time for the production domain.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.gastroplusmultan.com").replace(/\/$/, ""),
  locale: "en_PK",
  description:
    "Gastro Plus Medical Complex (GPMC), Khanewal Road, Multan: specialist-led gastroenterology, hepatology and endoscopy, including upper GI endoscopy, colonoscopy and ERCP.",
  address: {
    street: "Chowk Rasheedabad, Khanewal Road",
    locality: "Multan",
    region: "Punjab",
    country: "PK",
    full: "Chowk Rasheedabad, Khanewal Road, Multan",
  },
  mapQuery,
  phones: [
    { label: "Main number (call & WhatsApp)", display: "+92 300 4139320", href: "+923004139320", whatsapp: true },
    // Roadmap §7: keep as a call line until WhatsApp on this number is tested.
    { label: "Second number (calls)", display: "+92 312 4139320", href: "+923124139320", whatsapp: false },
  ],
  whatsappNumber: "923004139320",
  email: "",
  opdHours: { days: "Monday – Friday", time: "3:00 PM – 9:00 PM" },
  social: [{ name: "Facebook", href: "https://www.facebook.com/100083268912246" }],
  googleBusinessUrl: "",
  regulatory: { label: "", number: "" },
};

/** "Monday – Friday, 3:00 PM – 9:00 PM" */
export function opdHoursLabel(): string {
  return `${site.opdHours.days}, ${site.opdHours.time}`;
}

/** Directions link: the official Google Business Profile when set, otherwise a Maps search. */
export const directionsUrl =
  site.googleBusinessUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

/** Final nine-item menu, in the approved order (Roadmap §2). */
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About GPMC", href: "/about/" },
  { label: "Specialists", href: "/specialists/" },
  { label: "Departments", href: "/departments/" },
  { label: "Procedures", href: "/procedures/" },
  { label: "Patient Resources", href: "/patient-resources/" },
  { label: "Health Blog", href: "/blog/" },
  { label: "Careers", href: "/careers/" },
  { label: "Contact & Appointment", href: "/contact/" },
];

/**
 * Link to the one shared Appointment Request form, with the originating
 * department or specialist preselected (Roadmap §5, appointment journey step 2).
 */
export function appointmentHref(pre?: { department?: string; specialist?: string }): string {
  const q = new URLSearchParams();
  if (pre?.department) q.set("department", pre.department);
  if (pre?.specialist) q.set("specialist", pre.specialist);
  const qs = q.toString();
  return `/contact/${qs ? `?${qs}` : ""}#book`;
}
