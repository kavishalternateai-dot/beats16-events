import type { Metadata } from "next";
import Link from "next/link";
import { weddingFaqs, weddingFaqHeading, weddingsSeo, weddingsStory } from "@/content/weddings";
import { MEDIA } from "@/content/media";
import { FaqList } from "@/components/faq-list";
import { FunctionTimeline } from "@/components/function-timeline";
import { JsonLd } from "@/components/json-ld";
import { MediaFrame } from "@/components/media-frame";
import { Mosaic } from "@/components/mosaic";
import { PlanActions } from "@/components/plan-actions";
import { Steps } from "@/components/steps";
import { LineReveal } from "@/components/motion/line-reveal";
import { FadeUp } from "@/components/motion/pieces";
import { GoldThread } from "@/components/ornament/gold-thread";
import { BandhaniPattern } from "@/components/ornament/bandhani";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { resolveGallery, resolveMedia } from "@/lib/resolve-media";

export const metadata: Metadata = pageMetadata({
  title: weddingsSeo.title,
  description: weddingsSeo.description,
  path: "/weddings",
});

const links = {
  Mehendi: { href: "/weddings", link: "Plan this function" },
  Sangeet: { href: "/rdx", link: "Meet RDX" },
  Pheras: { href: "/gauri", link: "Meet Gauri" },
  Reception: { href: "/weddings", link: "Plan this function" },
} as const;

export default function WeddingsPage() {
  const points = weddingsStory.sections.find((section) => section.kind === "points");
  const cards = weddingsStory.sections.find((section) => section.kind === "cards");
  const steps = weddingsStory.sections.find((section) => section.kind === "steps");
  const planners = weddingsStory.sections.find((section) => section.kind === "prose" && section.heading.startsWith("Working"));
  const hero = resolveMedia(MEDIA.weddingsHero);

  return (
    <>
      <JsonLd data={serviceJsonLd({ name: weddingsStory.hero.h1, description: weddingsSeo.description, path: "/weddings" })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Weddings", path: "/weddings" }])} />
      <JsonLd data={faqJsonLd(weddingFaqs)} />
      <section className="relative overflow-hidden bg-rani-deep text-cream">
        <BandhaniPattern />
        <div className="site-wrap grid items-center gap-8 pt-28 pb-14 md:grid-cols-2 md:pt-32">
          <div>
            <p className="eyebrow">{weddingsStory.hero.eyebrow}</p>
            <GoldThread className="mt-3" delay={0.2} />
            <LineReveal as="h1" text={weddingsStory.hero.h1} className="display-title mt-3" delay={0.35} />
            <FadeUp delay={0.55} distance={16} className="mt-5 max-w-xl">
              <p className="text-lg leading-relaxed">{weddingsStory.hero.subhead}</p>
            </FadeUp>
            <FadeUp delay={0.7} distance={16}>
              <PlanActions source="weddings-page" onDark className="mt-8" />
            </FadeUp>
          </div>
          <MediaFrame item={hero} priority className="min-h-72 rounded-3xl" sizes="(min-width: 768px) 40vw, 100vw" />
        </div>
      </section>

      {points && points.kind === "points" ? (
        <section className="site-wrap py-14 md:py-20" aria-labelledby="wedding-functions">
          <GoldThread />
          <LineReveal as="h2" id="wedding-functions" text={points.heading} className="mt-2 font-display text-4xl leading-none md:text-6xl" />
          {points.intro ? <p className="mt-4 max-w-2xl leading-relaxed">{points.intro}</p> : null}
          <FunctionTimeline
            items={points.points.map((point) => ({
              title: point.title,
              tone: point.title === "Mehendi" ? "haldi" : point.title === "Sangeet" ? "rani" : point.title === "Pheras" ? "mehendi" : "sindoor",
              line: point.text,
              href: links[point.title as keyof typeof links]?.href ?? "/contact",
              link: links[point.title as keyof typeof links]?.link ?? "Plan your music",
            }))}
          />
          {points.note ? <p className="mt-5">{points.note}</p> : null}
        </section>
      ) : null}

      {cards && cards.kind === "cards" ? (
        <section className="bg-chandan py-14 md:py-20" aria-labelledby="pick-sound">
          <div className="site-wrap">
            <h2 id="pick-sound" className="font-display text-4xl leading-none md:text-6xl">
              Pick the sound
            </h2>
            {cards.intro ? <p className="mt-4 max-w-2xl">{cards.intro}</p> : null}
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {cards.cards.map((card) => (
                <li key={card.href}>
                  <Link
                    href={card.href}
                    className={`lift-card block h-full rounded-3xl p-6 ${
                      card.title === "Gauri" ? "bg-haldi text-kajal" : card.title === "RDX" ? "bg-rani-deep text-cream" : "bg-neel text-cream"
                    }`}
                  >
                    <h3 className="font-display text-4xl leading-none">{card.title}</h3>
                    <p className="mt-3 leading-relaxed">{card.text}</p>
                    <span className="mt-6 inline-flex min-h-11 items-center font-medium">{card.link} →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="site-wrap py-14" aria-labelledby="wedding-gallery">
        <h2 id="wedding-gallery" className="font-display text-4xl leading-none md:text-6xl">
          From the floor
        </h2>
        <Mosaic items={resolveGallery("wedding")} label="Wedding photographs and films" />
      </section>

      {steps && steps.kind === "steps" ? <Steps heading={steps.heading} steps={steps.steps} /> : null}

      {planners && planners.kind === "prose" && planners.body ? (
        <section className="site-wrap max-w-3xl py-6" aria-labelledby="planners">
          <h2 id="planners" className="font-display text-4xl leading-none">
            {planners.heading}
          </h2>
          <p className="mt-4 leading-relaxed">{planners.body}</p>
        </section>
      ) : null}

      <div className="site-wrap py-12">
        <FaqList items={weddingFaqs} heading={weddingFaqHeading} ruleClassName="border-haldi" />
      </div>
    </>
  );
}
