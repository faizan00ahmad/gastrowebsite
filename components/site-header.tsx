"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "./icons";
import { appointmentHref, navItems, site } from "@/lib/site";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

/**
 * Roadmap §2. Desktop: quiet utility strip (location + main number), then
 * logo, the nine menu items and one primary "Book Appointment" button.
 * Mobile: logo + hamburger; Call / WhatsApp / Book live in the bottom action bar.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const main = site.phones[0];

  return (
    <>
      <div className="utility">
        <div className="container utility__inner">
          <span>
            <Icon name="pin" size={14} />
            {site.address.full}
          </span>
          <a href={`tel:${main.href}`}>
            <Icon name="phone" size={14} />
            {main.display}
          </a>
        </div>
      </div>

      <header className={`site-header${compact ? " site-header--compact" : ""}`}>
        <div className="container site-header__inner">
          <Link href="/" className="brand" aria-label={`${site.name} home`}>
            {/* Original GPMC logo, unaltered */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/gpmc-logo.png" alt="" width={56} height={56} className="brand__logo" />
            <span className="brand__text">
              <span className="brand__name">Gastro Plus</span>
              <span className="brand__sub">Medical Complex Multan</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="nav-links">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href={appointmentHref()} className="btn btn--primary header-cta">
            Book Appointment
          </Link>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} size={26} />
          </button>
        </div>

        {open && (
          <nav id="mobile-menu" aria-label="Mobile" className="container mobile-panel">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined}>
                {item.label}
                <Icon name="arrow" size={16} />
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
