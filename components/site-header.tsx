"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon, WhatsAppGlyph } from "./icons";
import { navItems, site } from "@/lib/site";
import { BOOKING_MESSAGE, whatsappLink } from "@/lib/whatsapp";

const socialIcon = {
  Facebook: "facebook",
  Instagram: "instagram",
  YouTube: "youtube",
  LinkedIn: "linkedin",
} as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

/**
 * Blueprint Section 1 (dark top information bar) + Section 2 (main header),
 * laid out like the reference: brand row, then a sticky glass nav bar.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Section 1: top information bar */}
      <div className="topbar">
        <div className="container topbar__inner">
          <ul className="topbar__info">
            <li>
              <Icon name="pin" size={14} />
              {site.address.full}
            </li>
            <li>
              <Icon name="phone" size={14} />
              {site.phones.map((p, i) => (
                <span key={p.href}>
                  {i > 0 && ", "}
                  <a href={`tel:${p.href}`}>{p.display}</a>
                </span>
              ))}
            </li>
            <li className="topbar__hide-sm">
              <Icon name="clock" size={14} />
              {site.hours.days}
            </li>
          </ul>
          <ul className="topbar__social">
            {site.social.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}>
                  <Icon name={socialIcon[s.name]} size={14} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Section 2: brand row */}
      <div className="header-top">
        <div className="container header-top__inner">
          <Link href="/" className="brand" aria-label={`${site.name} home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/gpmc-logo.png" alt="" width={60} height={60} className="brand__logo" />
            <span className="brand__text">
              <span className="brand__name">GASTRO PLUS</span>
              <span className="brand__sub">Medical Complex Multan</span>
              <span className="brand__urdu urdu" lang="ur" dir="rtl">
                {site.urduName}
              </span>
            </span>
          </Link>

          <div className="header-contacts">
            <div className="header-contact">
              <WhatsAppGlyph size={34} className="header-contact__icon" />
              <div>
                <small>WhatsApp Support</small>
                <a href={whatsappLink(BOOKING_MESSAGE)} target="_blank" rel="noopener noreferrer">
                  {site.phones[0].display}
                </a>
              </div>
            </div>
            <div className="header-contact">
              <Icon name="phone" size={32} className="header-contact__icon" />
              <div>
                <small>Contact Us</small>
                {site.phones.map((p) => (
                  <a key={p.href} href={`tel:${p.href}`}>
                    {p.display}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: menu + Book Appointment + WhatsApp icon */}
      <header className="header-nav">
        <div className="container header-nav__inner">
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} size={24} />
          </button>

          <nav aria-label="Primary" className="nav-links">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="nav-blocks">
            <a
              href={whatsappLink(BOOKING_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-block nav-block--wa"
              aria-label="Chat on WhatsApp"
            >
              <WhatsAppGlyph size={20} />
              <span className="nav-block__label">WhatsApp</span>
            </a>
            <Link href="/contact/#book" className="nav-block nav-block--brand">
              <Icon name="calendar" size={18} />
              Book Appointment
            </Link>
          </div>
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
