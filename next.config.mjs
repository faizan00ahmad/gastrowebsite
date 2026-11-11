/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static export: produces an `out/` folder that any static host can serve.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
