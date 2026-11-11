/**
 * Public site URL used for canonical links, Open Graph, sitemap and robots.
 * Priority: NEXT_PUBLIC_SITE_URL (set this to the custom domain in Vercel),
 * then Vercel's production URL (set automatically on Vercel builds),
 * then the placeholder domain for local builds.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://www.gastroplusmultan.com");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static export: produces an `out/` folder. Vercel serves it as a static site.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
};

export default nextConfig;
