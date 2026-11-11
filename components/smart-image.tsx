"use client";

import { useEffect, useRef, useState } from "react";

interface SmartImageProps {
  src: string;
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
  const [failed, setFailed] = useState(false);
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

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      className="smart-image"
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      loading={eager ? "eager" : "lazy"}
    />
  );
}
