"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav, site } from "@/content/site";
import { PhoneLink } from "@/components/contact-links";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function NavLinks({
  pathname,
  onNavigate,
  id,
}: {
  pathname: string;
  onNavigate?: () => void;
  id?: string;
}) {
  return (
    <nav id={id} aria-label="Primary">
      <ul className="flex flex-col gap-1 lg:flex-row lg:flex-wrap lg:justify-center lg:gap-x-7 lg:gap-y-2">
        {primaryNav.map((item) => {
          const current = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={current ? "page" : undefined}
                onClick={onNavigate}
                className={cn(
                  "inline-flex min-h-11 items-center border-b-2 border-transparent px-0.5 text-sm motion-safe:transition-colors motion-safe:duration-200 hover:text-primary lg:min-h-10",
                  current ? "border-gold font-semibold text-primary" : "text-foreground",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="h-11 min-h-11 lg:hidden"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((current) => !current)}
      >
        {open ? "Close" : "Menu"}
      </Button>
      <div id="mobile-nav" hidden={!open} className="absolute inset-x-0 top-full border-t border-border bg-[#fbf7f0] shadow-[0_16px_30px_-20px_rgb(28_20_18/0.25)] lg:hidden">
        <div className="site-wrap grid gap-2 py-4">
          <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
          <PhoneLink
            location="mobile_menu"
            className="inline-flex min-h-11 items-center text-sm underline underline-offset-2"
          />
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className={cn(buttonVariants({ size: "cta" }), "w-full")}
          >
            Inquire
          </Link>
        </div>
      </div>
    </>
  );
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-40 border-b border-border bg-[#fbf7f0]/95 backdrop-blur-md"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="site-wrap relative flex items-center gap-4 py-3 lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-8 lg:py-3.5">
        <Link href="/" className="min-w-0 justify-self-start" aria-label={`${site.name}, home`}>
          <span className="block font-heading text-[1.65rem] leading-none tracking-tight text-primary">{site.shortName}</span>
          <span className="mt-1 block text-[0.68rem] tracking-[0.16em] text-muted-foreground uppercase">Events & Entertainment</span>
        </Link>
        <div className="hidden min-w-0 lg:block">
          <NavLinks pathname={pathname} />
        </div>
        <div className="ml-auto flex items-center gap-4 lg:ml-0 lg:justify-self-end">
          <div className="hidden items-center gap-5 lg:flex">
            <PhoneLink location="header" className="text-sm underline underline-offset-2" />
            <Link href="/contact" className={cn(buttonVariants({ size: "cta" }))}>
              Inquire
            </Link>
          </div>
          <MobileMenu key={pathname} pathname={pathname} />
        </div>
      </div>
    </header>
  );
}

export function SiteHeaderFallback() {
  return (
    <div className="border-b border-border bg-background">
      <div className="site-wrap flex h-[4.25rem] items-center">
        <span className="font-heading text-2xl">{site.shortName}</span>
      </div>
    </div>
  );
}
