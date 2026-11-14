import type { Metadata } from "next";
import { site } from "./site";
import type { Article, Specialist } from "./content";

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
    url: `${site.url}/`,
    telephone: site.phones.map((p) => p.display),
    ...(site.email ? { email: site.email } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    medicalSpecialty: [
      { "@type": "MedicalSpecialty", name: "Gastroenterology" },
      { "@type": "MedicalSpecialty", name: "Hepatology" },
    ],
    sameAs: site.social.map((s) => s.href),
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
    dateModified: article.published,
    url: absoluteUrl(`/blog/${article.slug}`),
    author: { "@type": "Organization", name: site.name },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: absoluteUrl(`/blog/${article.slug}`),
  };
}
