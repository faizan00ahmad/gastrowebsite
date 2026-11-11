import type { Metadata, Viewport } from "next";
// Fonts are installed from npm (Fontsource) and bundled with the site, so the
// build never downloads from Google Fonts and the site makes no font requests to Google.
import "@fontsource/rajdhani/600.css";
import "@fontsource/rajdhani/700.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// Nastaliq script for the Urdu name and tagline.
import "@fontsource/noto-nastaliq-urdu/500.css";
import "@fontsource/noto-nastaliq-urdu/700.css";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { JsonLd } from "@/components/json-ld";
import { organizationJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Gastroenterology & Endoscopy in Multan`,
    template: `%s | ${site.shortName} Multan`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "gastroenterologist in Multan",
    "endoscopy in Multan",
    "colonoscopy in Multan",
    "ERCP in Multan",
    "liver specialist in Multan",
    "gastro clinic Multan",
    "Gastro Plus Medical Complex",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  icons: { icon: "/images/gpmc-logo.png", apple: "/images/gpmc-logo.png" },
  formatDetection: { email: false, address: false, telephone: true },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    siteName: site.name,
    locale: site.locale,
    type: "website",
    url: site.url,
    images: [{ url: "/images/gpmc-logo.png", alt: site.name }],
  },
};

export const viewport: Viewport = {
  themeColor: "#7a1116",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <WhatsAppFloat />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
