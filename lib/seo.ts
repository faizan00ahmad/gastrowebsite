import type { Metadata } from "next";
import { site } from "./site";
import type { Article, Procedure, Specialist } from "./content";

/** Only the approved production build is indexed (Roadmap §11). */
export const indexable = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

interface MetaInput {
  title: string;
  description: string;
  /** Path relative to the site root, e.g. "/about/". */
  path: string;
  type?: "website" | "article";
}

/** Normalises a path so it always ends in a slash (matches `trailingSlash: true`). */
export function canonicalPath(path: string): string {
  if (path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

export function absoluteUrl(path: string): string {
  return `${site.url}${canonicalPath(path)}`;
}

export function buildMetadata({ title, description, path, type = "website" }: MetaInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/* ------------------------------------------------------------------ */
/* Structured data (JSON-LD)                                           */
/* ------------------------------------------------------------------ */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: site.shortName,
    description: site.description,
    url: `${site.url}/`,
    logo: `${site.url}/images/gpmc-logo.png`,
    telephone: site.phones.map((p) => p.display),
    ...(site.email ? { email: site.email } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "15:00",
      closes: "21:00",
    },
    medicalSpecialty: ["Gastroenterologic", "Dentistry"],
    sameAs: [site.googleBusinessUrl, ...site.social.map((s) => s.href)].filter(Boolean),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function physicianJsonLd(specialist: Specialist) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: specialist.name,
    url: absoluteUrl(`/specialists/${specialist.slug}`),
    medicalSpecialty: specialist.specialty,
    ...(specialist.photo ? { image: `${site.url}${specialist.photo}` } : {}),
    jobTitle: [specialist.title, ...specialist.roles].join(", "),
    description: `${specialist.roles.join(", ")}. ${specialist.positions.map((p) => `${p.role}, ${p.place}`).join(". ")}.`,
    hasCredential: (specialist.qualifications ?? []).map((q) => ({
      "@type": "EducationalOccupationalCredential",
      name: q,
    })),
    hospitalAffiliation: specialist.positions
      .filter((p) => p.external)
      .map((p) => ({ "@type": "Hospital", name: p.place })),
    worksFor: { "@id": `${site.url}/#organization` },
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function articleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.published,
    dateModified: article.updated,
    url: absoluteUrl(`/blog/${article.slug}`),
    author: { "@type": "Organization", name: article.author },
    ...(article.reviewedBy ? { reviewedBy: { "@type": "Person", name: article.reviewedBy } } : {}),
    citation: article.references.map((r) => r.href),
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: absoluteUrl(`/blog/${article.slug}`),
  };
}

export function procedureJsonLd(proc: Procedure) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: proc.title,
    ...(proc.alsoKnownAs ? { alternateName: proc.alsoKnownAs } : {}),
    description: proc.whatItIs,
    url: absoluteUrl(`/procedures/${proc.slug}`),
    preparation: proc.preparation.join(" "),
    followup: proc.recovery.join(" "),
    howPerformed: proc.during.join("; "),
    citation: proc.references.map((r) => r.href),
  };
}
