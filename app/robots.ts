import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { indexable } from "@/lib/seo";

export const dynamic = "force-static";

/** Staging/preview builds block crawlers; set NEXT_PUBLIC_ALLOW_INDEXING=true on the approved production site. */
export default function robots(): MetadataRoute.Robots {
  if (!indexable) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
