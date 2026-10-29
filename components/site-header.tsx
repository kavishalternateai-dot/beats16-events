"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { bandNav, primaryNav, site } from "@/content/site";
import { BrandLockup } from "@/components/brand-lockup";
import { PhoneLink } from "@/components/contact-links";
import { Toran } from "@/components/ornament/toran";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const bandHrefs: readonly string[] = bandNav.map((item) => item.href);

function isCurrent(pathname: string, href: string) {
  return pathname === href;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bandsOpen, setBandsOpen] = useState(false);
  const bandsRef = useRef<HTMLDivElement>(null);
  const bandOn = bandHrefs.includes(pathname);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!bandsOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setBandsOpen(false);
        return;
      }
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      const items = bandsRef.current?.querySelectorAll<HTMLAnchorElement>("a");
      if (!items?.length) return;
      event.preventDefault();
      const list = Array.from(items);
      const index = list.findIndex((item) => item === document.activeElement);
      const next =
        event.key === "ArrowDown"
          ? list[(index + 1 + list.length) % list.length]
          : list[(index - 1 + list.length) % list.length];
      next?.focus();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [bandsOpen]);

  const ink = solid ? "text-kajal" : "text-cream";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        solid ? "bg-cream text-kajal shadow-[0_1px_0_var(--sona)]" : "bg-kajal/70 text-cream backdrop-blur-md",
      )}
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="site-wrap flex items-center gap-4 py-3 lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto]">
        <Link href="/" className="min-w-0" aria-label={`${site.name}, home`}>
          <BrandLockup tone={solid ? "dark" : "light"} />
        </Link>
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <li>
              <Link
                href="/weddings"
                aria-current={isCurrent(pathname, "/weddings") ? "page" : undefined}
                className={cn("inline-flex min-h-11 items-center text-sm", isCurrent(pathname, "/weddings") && "underline decoration-sona decoration-2 underline-offset-8")}
              >
                Weddings
              </Link>
            </li>
            <li>
              <div
                ref={bandsRef}
                className="relative"
                onMouseEnter={() => setBandsOpen(true)}
                onMouseLeave={() => setBandsOpen(false)}
              >
                <button
                  type="button"
                  className={cn(
                    "inline-flex min-h-11 items-center gap-1 text-sm",
                    bandOn && "underline decoration-sona decoration-2 underline-offset-8",
                  )}
                  aria-expanded={bandsOpen}
                  aria-controls="bands-menu"
                  aria-haspopup="true"
                  aria-current={bandOn ? "page" : undefined}
                  onClick={() => setBandsOpen((open) => !open)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      setBandsOpen(true);
                      requestAnimationFrame(() => {
                        bandsRef.current?.querySelector("a")?.focus();
                      });
                    }
                  }}
                >
                  Bands
                  <span aria-hidden="true">{bandsOpen ? "▴" : "▾"}</span>
                </button>
                <ul
                  id="bands-menu"
                  hidden={!bandsOpen}
                  className="absolute left-1/2 z-20 mt-1 min-w-56 -translate-x-1/2 rounded-2xl bg-cream p-2 text-kajal shadow-lg"
                >
                  {bandNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        role="menuitem"
                        aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                        className="block rounded-xl px-3 py-3 font-display text-2xl leading-none hover:bg-chandan"
                        onClick={() => setBandsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            {primaryNav.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-11 items-center text-sm",
                    isCurrent(pathname, item.href) && "underline decoration-sona decoration-2 underline-offset-8",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <PhoneLink location="header" className={cn("hidden text-sm underline-offset-4 hover:underline lg:inline", ink)} />
          <Link href="/contact?source=header#inquiry-form" className={cn(buttonVariants({ size: "cta" }), "hidden rounded-full lg:inline-flex")}>
            Plan your music
          </Link>
          <button
            type="button"
            className="inline-flex min-h-11 items-center rounded-full border border-current px-4 text-sm lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {solid ? <Toran /> : null}
      {menuOpen ? (
        <div id="mobile-nav" className="fixed inset-0 z-50 flex flex-col bg-neel text-cream lg:hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <BrandLockup tone="light" markClassName="h-9" />
            <button type="button" className="min-h-11 px-3 text-lg" onClick={() => setMenuOpen(false)}>
              Close
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-1 flex-col gap-2 overflow-y-auto px-6 pb-28">
            <Link href="/weddings" className="font-display text-5xl leading-none" onClick={() => setMenuOpen(false)} aria-current={isCurrent(pathname, "/weddings") ? "page" : undefined}>
              Weddings
            </Link>
            <p className="eyebrow mt-4 text-cream/80">Bands</p>
            {bandNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-display text-4xl leading-none"
                aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {primaryNav.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="mt-2 font-display text-4xl leading-none"
                aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact?source=mobile-menu#inquiry-form" className={cn(buttonVariants({ size: "cta" }), "mt-6 w-fit rounded-full")} onClick={() => setMenuOpen(false)}>
              Plan your music
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export function SiteHeaderFallback() {
  return (
    <div className="fixed inset-x-0 top-0 z-40 bg-kajal/70">
      <div className="site-wrap flex h-16 items-center">
        <BrandLockup tone="light" markClassName="h-8" />
      </div>
    </div>
  );
}
