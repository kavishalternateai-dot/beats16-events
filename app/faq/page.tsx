import type { Metadata } from "next";
import Link from "next/link";
import { faqPageClose, faqPageGroups, faqPageHero, faqPageItems, faqPageSeo } from "@/content/faq-page";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { PlanActions } from "@/components/plan-actions";
import { GoldThread } from "@/components/ornament/gold-thread";
import { Toran } from "@/components/ornament/toran";
import { BandhaniPattern } from "@/components/ornament/bandhani";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: faqPageSeo.title,
  description: faqPageSeo.description,
  path: "/faq",
});

const chips = [
  { href: "#about-beats16", label: "About", rule: "border-mor" },
  { href: "#wedding-music", label: "Weddings", rule: "border-haldi" },
  { href: "#ghazal", label: "Ghazal", rule: "border-neel" },
  { href: "#navratri", label: "Navratri", rule: "border-sindoor" },
  { href: "#booking", label: "Pricing & booking", rule: "border-sona" },
] as const;

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqPageItems)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }])} />
      <section className="relative overflow-hidden pt-28 pb-10">
        <BandhaniPattern className="text-sindoor" />
        <div className="site-wrap relative">
          <Toran />
          <p className="eyebrow mt-6 text-mor">{faqPageHero.eyebrow}</p>
          <GoldThread />
          <h1 className="display-title mt-4 max-w-4xl">{faqPageHero.h1}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed">{faqPageHero.subhead}</p>
          <PlanActions source="faq-page" primary={faqPageHero.cta} className="mt-8" />
        </div>
      </section>
      <nav aria-label="FAQ groups" className="sticky top-16 z-30 border-y border-sona/40 bg-cream/95 backdrop-blur">
        <ul className="site-wrap flex gap-2 overflow-x-auto py-3">
          {chips.map((chip) => (
            <li key={chip.href}>
              <a href={chip.href} className={`eyebrow inline-flex min-h-11 items-center rounded-full border-b-4 px-3 ${chip.rule}`}>
                {chip.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="site-wrap grid gap-14 py-12">
        {faqPageGroups.map((group, index) => (
          <div key={group.id} id={group.id} className="scroll-mt-36">
            <FaqList
              items={group.items}
              heading={group.title}
              headingId={`faq-${group.id}`}
              ruleClassName={chips[index]?.rule ?? "border-sindoor"}
            />
          </div>
        ))}
      </div>
      <section className="site-wrap pb-16">
        <h2 className="font-display text-4xl leading-none">{faqPageClose.heading}</h2>
        <p className="mt-4 max-w-2xl leading-relaxed">{faqPageClose.body}</p>
        <p className="mt-4">
          <Link href={faqPageClose.ctaHref} className="font-medium text-mor underline underline-offset-4">
            {faqPageClose.cta}
          </Link>
        </p>
      </section>
    </>
  );
}
