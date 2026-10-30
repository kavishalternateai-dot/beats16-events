"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PhoneLink } from "@/components/contact-links";

const HIDDEN_ON = ["/contact", "/thank-you", "/gauri", "/rdx", "/daastan-e-ghazal", "/navratri"];

export function MobileCtaBar() {
  const path = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => node.classList.add("is-in"), 1500);
    return () => window.clearTimeout(timer);
  }, [path]);

  if (HIDDEN_ON.includes(path)) return null;

  return (
    <div
      ref={ref}
      className="mobile-cta fixed inset-x-0 bottom-0 z-40 pb-[env(safe-area-inset-bottom)] md:hidden"
      style={{ viewTransitionName: "mobile-cta" }}
    >
      <div className="grid h-12 grid-cols-2">
        <PhoneLink location="mobile_bar" className="inline-flex h-12 items-center justify-center bg-kajal text-base font-medium text-cream">
          Call
        </PhoneLink>
        <Link href="/contact?source=mobile-bar#inquiry-form" className="inline-flex h-12 items-center justify-center bg-sindoor px-2 text-center text-sm font-medium leading-tight text-cream">
          Plan your music
        </Link>
      </div>
    </div>
  );
}
