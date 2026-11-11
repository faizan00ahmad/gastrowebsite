import type { MetadataRoute } from "next";
import { articles, departments, procedures, seoLandings, specialists } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/about/",
    "/specialists/",
    "/departments/",
    "/procedures/",
    "/patient-guides/",
    "/blog/",
    "/contact/",
  ];

  const dynamicPaths = [
    ...specialists.map((s) => `/specialists/${s.slug}/`),
    ...departments.map((d) => `/departments/${d.slug}/`),
    ...procedures.map((p) => `/procedures/${p.slug}/`),
    ...articles.map((a) => `/blog/${a.slug}/`),
    ...seoLandings.map((p) => `/${p.slug}/`),
  ];

  const legal = ["/privacy-policy/", "/terms-and-conditions/"];

  const now = new Date();
  return [...staticPaths, ...dynamicPaths, ...legal].map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === "/" || path === "/blog/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/blog/") ? 0.6 : 0.8,
  }));
}
