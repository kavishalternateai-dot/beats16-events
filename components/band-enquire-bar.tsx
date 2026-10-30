"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { bandInterestLabel } from "@/content/forms";
import { PhoneLink } from "@/components/contact-links";
import { trackEvent } from "@/lib/analytics";

const BANDS = ["gauri", "rdx", "daastan-e-ghazal", "navratri"] as const;
type BandId = (typeof BANDS)[number];

const enquireCopy: Record<BandId, string> = {
  gauri: "Enquire for Gauri",
  rdx: "Enquire for RDX",
  "daastan-e-ghazal": "Enquire for Daastan\u2011e\u2011Ghazal",
  navratri: "Enquire for Navratri",
};

const bandCell: Record<BandId, string> = {
  gauri: "bg-haldi text-kajal focus-visible:ring-kajal",
  rdx: "bg-rani-deep text-cream focus-visible:ring-cream",
  "daastan-e-ghazal": "border-t-2 border-sona bg-neel text-cream focus-visible:ring-cream",
  navratri: "border-t-2 border-mor bg-sindoor text-cream focus-visible:ring-cream",
};

export function BandEnquireBar({ bandId }: { bandId: BandId }) {
  const [reduce, setReduce] = useState(false);
  const [show, setShow] = useState(false);
  const [typing, setTyping] = useState(false);
  const [sheet, setSheet] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const visible = new Map<Element, boolean>();
    const collect = () =>
      [
        document.querySelector("[data-band-hero]"),
        document.querySelector("footer"),
        ...document.querySelectorAll("[data-sticky-hide]"),
        ...document.querySelectorAll("#inquiry-form, #showreel"),
      ].filter((node): node is Element => Boolean(node));

    const update = () => {
      const hero = document.querySelector("[data-band-hero]");
      const covered = [...document.querySelectorAll("footer, [data-sticky-hide]")];
      const gates = [...document.querySelectorAll("#inquiry-form, #showreel")];
      const heroGone = hero ? visible.get(hero) === false : false;
      const footerIn = covered.some((node) => visible.get(node) === true);
      const gateIn = gates.some((gate) => visible.get(gate) === true);
      setShow(heroGone && !footerIn && !gateIn);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target, entry.isIntersecting);
        update();
      },
      { threshold: 0 },
    );
    for (const node of collect()) observer.observe(node);
    const onShowreel = () => setSheet(document.body.dataset.showreelOpen === "true");
    window.addEventListener("beats16-showreel", onShowreel);
    return () => {
      observer.disconnect();
      window.removeEventListener("beats16-showreel", onShowreel);
    };
  }, []);

  useEffect(() => {
    const field = (node: EventTarget | null) =>
      node instanceof HTMLInputElement || node instanceof HTMLSelectElement || node instanceof HTMLTextAreaElement;
    const onIn = (event: FocusEvent) => {
      if (field(event.target)) setTyping(true);
    };
    const onOut = () => {
      requestAnimationFrame(() => setTyping(field(document.activeElement)));
    };
    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    return () => {
      document.removeEventListener("focusin", onIn);
      document.removeEventListener("focusout", onOut);
    };
  }, []);

  const hidden = !show || typing || sheet;
  const label = bandInterestLabel[bandId];
  const href = `/contact?${new URLSearchParams({ band: label, source: `${bandId}-sticky` }).toString()}#inquiry-form`;
  const motion = reduce ? (hidden ? "hidden" : "") : hidden ? "translate-y-full" : "translate-y-0";

  return (
    <nav
      aria-label={`Enquire about ${enquireCopy[bandId].replace("Enquire for ", "")}`}
      aria-hidden={hidden}
      inert={hidden}
      className={`fixed inset-x-0 bottom-0 z-40 md:hidden ${reduce ? "" : "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"} ${motion}`}
    >
      <div className="grid grid-cols-[1fr_30%]">
        <Link
          href={href}
          onClick={() => trackEvent("sticky_enquire_click", { band: bandId })}
          className={`inline-flex min-h-14 items-center justify-center px-3 pb-[env(safe-area-inset-bottom)] text-center text-base leading-tight font-medium whitespace-nowrap focus-visible:ring-3 focus-visible:outline-none ${bandCell[bandId]}`}
        >
          {enquireCopy[bandId]}
        </Link>
        <PhoneLink location={`${bandId}-sticky`} className="inline-flex min-h-14 items-center justify-center bg-kajal pb-[env(safe-area-inset-bottom)] text-base font-medium text-cream focus-visible:ring-3 focus-visible:ring-cream focus-visible:outline-none">
          Call
        </PhoneLink>
      </div>
    </nav>
  );
}
