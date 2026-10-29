import type { Metadata } from "next";
import Link from "next/link";
import { corporateFaqs, corporateSeo, corporateStory } from "@/content/corporate";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { PlanActions } from "@/components/plan-actions";
import { ColorWipe } from "@/components/motion/pieces";
import { LineReveal } from "@/components/motion/line-reveal";
import { GoldThread } from "@/components/ornament/gold-thread";
import { Steps } from "@/components/steps";
import { BandhaniPattern } from "@/components/ornament/bandhani";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: corporateSeo.title,
  description: corporateSeo.description,
  path: "/corporate-cultural",
});

const occasionTone = ["bg-mehendi", "bg-mor", "bg-neel", "bg-rani-deep"] as const;

export default function CorporatePage() {
  const points = corporateStory.sections.find((section) => section.kind === "points");
  const cards = corporateStory.sections.find((section) => section.kind === "cards");
  const organisers = corporateStory.sections.find((section) => section.kind === "prose" && section.heading.startsWith("Working"));
  const steps = corporateStory.sections.find((section) => section.kind === "steps");

  return (
    <>
      <JsonLd data={serviceJsonLd({ name: corporateStory.hero.h1, description: corporateSeo.description, path: "/corporate-cultural" })} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Corporate & cultural", path: "/corporate-cultural" },
        ])}
      />
      <JsonLd data={faqJsonLd(corporateFaqs)} />
      <section className="relative overflow-hidden bg-neel text-cream">
        <BandhaniPattern className="text-cream" />
        <div className="site-wrap relative pt-28 pb-16 md:pt-32">
          <p className="eyebrow text-cream">{corporateStory.hero.eyebrow}</p>
          <LineReveal
            as="h1"
            text={corporateStory.hero.h1}
            lineWords={[4, 2, 2]}
            className="display-title mt-4 max-w-4xl"
          />
          <p className="mt-5 max-w-xl text-lg leading-relaxed">{corporateStory.hero.subhead}</p>
          <PlanActions source="corporate-cultural-page" onDark className="mt-8" />
        </div>
      </section>

      {points && points.kind === "points" ? (
        <section className="site-wrap py-14" aria-labelledby="occasions">
          <GoldThread />
          <h2 id="occasions" className="mt-2 font-display text-4xl leading-none md:text-6xl">
            {points.heading}
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {points.points.map((point, index) => (
              <li key={point.title}>
                <ColorWipe from={index % 2 ? "right" : "left"} className={`rounded-3xl p-7 text-cream ${occasionTone[index] ?? "bg-neel"}`}>
                  <h3 className="font-display text-4xl leading-none">{point.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed">{point.text}</p>
                </ColorWipe>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {cards && cards.kind === "cards" ? (
        <section className="bg-chandan py-14" aria-labelledby="band-matcher">
          <div className="site-wrap">
            <h2 id="band-matcher" className="font-display text-4xl leading-none md:text-6xl">
              {cards.heading}
            </h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {cards.cards.map((card) => (
                <li key={card.href}>
                  <Link
                    href={card.href}
                    className={`lift-card block rounded-3xl p-6 ${
                      card.href === "/gauri"
                        ? "bg-haldi text-kajal"
                        : card.href === "/rdx"
                          ? "bg-rani-deep text-cream"
                          : card.href === "/daastan-e-ghazal"
                            ? "bg-neel text-cream"
                            : "bg-sindoor text-cream"
                    }`}
                  >
                    <h3 className="font-display text-3xl leading-none">{card.title}</h3>
                    <p className="mt-3 leading-relaxed">{card.text}</p>
                    <span className="mt-4 inline-flex min-h-11 items-center font-medium">{card.link} →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {organisers && organisers.kind === "prose" && organisers.body ? (
        <section className="site-wrap max-w-3xl py-12" aria-labelledby="organisers">
          <h2 id="organisers" className="font-display text-4xl leading-none">
            {organisers.heading}
          </h2>
          <p className="mt-4 leading-relaxed">{organisers.body}</p>
        </section>
      ) : null}

      {steps && steps.kind === "steps" ? <Steps heading={steps.heading} steps={steps.steps} /> : null}

      <div className="site-wrap py-12">
        <FaqList items={corporateFaqs} heading={corporateStory.faqHeading} ruleClassName="border-neel" />
      </div>
    </>
  );
}
