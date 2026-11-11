"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./icons";
import type { GalleryImage } from "@/lib/content";

/** Facebook's official post embed. Only public posts render. */
function FacebookPost({ url }: { url: string }) {
  const src = `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(url)}&show_text=true&width=500`;
  return (
    <div className="glass gallery__embed">
      <iframe
        src={src}
        title="Gastro Plus Medical Complex on Facebook"
        width={500}
        height={640}
        loading="lazy"
        allow="encrypted-media; picture-in-picture; web-share"
        style={{ border: 0, overflow: "hidden", width: "100%", maxWidth: 500 }}
      />
      <a href={url} target="_blank" rel="noopener noreferrer" className="link-arrow">
        View on Facebook <Icon name="arrow" size={16} />
      </a>
    </div>
  );
}

/** Photo grid with an accessible lightbox (native <dialog>, Esc to close, arrow keys to navigate). */
export function Gallery({ images, facebookPosts }: { images: GalleryImage[]; facebookPosts: string[] }) {
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (active !== null && !d.open) d.showModal();
    if (active === null && d.open) d.close();
  }, [active]);

  const step = (dir: 1 | -1) =>
    setActive((i) => (i === null ? i : (i + dir + images.length) % images.length));

  return (
    <>
      {images.length > 0 && (
        <ul className="gallery__grid">
          {images.map((img, i) => (
            <li key={img.src}>
              <button type="button" className="gallery__item" onClick={() => setActive(i)} aria-label={`Open photo: ${img.alt}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.alt} loading="lazy" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {facebookPosts.length > 0 && (
        <div className="gallery__embeds">
          {facebookPosts.map((url) => (
            <FacebookPost key={url} url={url} />
          ))}
        </div>
      )}

      <dialog
        ref={dialog}
        className="lightbox"
        onClose={() => setActive(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        onClick={(e) => e.target === e.currentTarget && setActive(null)}
      >
        {active !== null && images[active] && (
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[active].src} alt={images[active].alt} />
            <figcaption>{images[active].alt}</figcaption>
          </figure>
        )}
        <button type="button" className="lightbox__close" onClick={() => setActive(null)} aria-label="Close photo">
          <Icon name="close" size={22} />
        </button>
        {images.length > 1 && (
          <>
            <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => step(-1)} aria-label="Previous photo">
              <Icon name="arrow" size={22} />
            </button>
            <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => step(1)} aria-label="Next photo">
              <Icon name="arrow" size={22} />
            </button>
          </>
        )}
      </dialog>
    </>
  );
}
