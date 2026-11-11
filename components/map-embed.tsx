import { site } from "@/lib/site";

/** Google Maps embed by address query; no API key required. */
export function MapEmbed() {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`;
  return (
    <iframe
      src={src}
      title={`Map showing ${site.name}`}
      className="map-frame"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}
