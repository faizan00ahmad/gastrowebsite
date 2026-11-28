"use client";

import { useEffect, useRef, useState } from "react";

interface SmartImageProps {
  /** Empty or undefined shows the fallback straight away (no request is made). */
  src?: string;
  alt: string;
  eager?: boolean;
  /**
   * What to show if the file is missing:
   * "logo" shows the GPMC logo (portraits); "none" renders nothing so the
   * parent's patterned background shows through (banners, cards).
   */
  fallback?: "logo" | "none";
}

/**
 * Photo with a graceful fallback, so pages never show a broken image while
 * real photography is still being added to /public/images.
 * The effect also catches load errors that fired before React hydrated.
 */
export function SmartImage({ src, alt, eager, fallback = "logo" }: SmartImageProps) {
  const [failed, setFailed] = useState(!src);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    if (fallback === "none") return null;
    return (
      <span className="smart-image-fallback" role={alt ? "img" : undefined} aria-label={alt || undefined}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/gpmc-logo.png" alt="" width={240} height={300} />
      </span>
    );
  }

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      className="smart-image"
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );

  // JPGs get a WebP twin from scripts/optimize-images.mjs (Roadmap §12); the JPG stays as fallback.
  const webp = src && /^\/images\/.+\.jpe?g$/i.test(src) ? src.replace(/\.jpe?g$/i, ".webp") : null;
  if (!webp) return img;
  return (
    <picture className="smart-picture">
      <source srcSet={webp} type="image/webp" />
      {img}
    </picture>
  );
}
