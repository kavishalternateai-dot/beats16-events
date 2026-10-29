"use client";

import { usePathname } from "next/navigation";
import { ToranDraw } from "@/components/ornament/gold-thread";
import { PlanActions } from "@/components/plan-actions";

export function CtaBand() {
  const pathname = usePathname();
  if (pathname === "/thank-you" || pathname === "/about") return null;

  return (
    <div>
      <ToranDraw />
      <section aria-labelledby="cta-band-title" className="cta-band relative bg-sindoor text-cream">
        <div className="site-wrap py-14 pb-24 md:py-16 md:pb-16">
          <h2 id="cta-band-title" className="max-w-3xl font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.95]">
            Tell us about your celebration.
          </h2>
          <PlanActions source="prefooter" onSindoor className="mt-8" />
        </div>
      </section>
    </div>
  );
}
