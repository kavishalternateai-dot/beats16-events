import type { Metadata } from "next";
import Link from "next/link";
import { aboutBeliefs, aboutBands, aboutClose, aboutCraft, aboutCraftIds, aboutEarlyMedia, aboutHero, aboutQuote, aboutScale, aboutScaleMedia, aboutSeo, aboutVideo } from "@/content/about";
import { MEDIA } from "@/content/media";
import { proofLines } from "@/content/site";
import { aboutEras } from "@/content/timeline";
import { AboutTimeline } from "@/components/about-timeline";
import { FounderQuote, FounderVideo } from "@/components/about-slots";
import { FounderPortrait } from "@/components/founder-portrait";
import { JsonLd } from "@/components/json-ld";
import { MediaFrame } from "@/components/media-frame";
import { LineReveal } from "@/components/motion/line-reveal";
import { ColorWipe } from "@/components/motion/pieces";
import { CountUp } from "@/components/count-up";
import { GoldThread } from "@/components/ornament/gold-thread";
import { buttonVariants } from "@/components/ui/button";
import { aboutPageJsonLd, breadcrumbJsonLd, organizationJsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { resolveMedia } from "@/lib/resolve-media";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: aboutSeo.title,
  description: aboutSeo.description,
  path: "/about",
});

const bandSurface = {
  haldi: "bg-haldi text-kajal",
  rani: "bg-rani-deep text-cream",
  neel: "bg-neel text-cream",
  bandhani: "bandhani-hero text-cream",
} as const;

const bandHero = {
  "/gauri": MEDIA.bands.gauri.hero,
  "/rdx": MEDIA.bands.rdx.hero,
  "/daastan-e-ghazal": MEDIA.bands.ghazal.hero,
  "/navratri": MEDIA.bands.navratri.hero,
} as const;

export default function AboutPage() {
  const founder = resolveMedia(MEDIA.founder);
  const early = resolveMedia(aboutEarlyMedia);
  const scale = resolveMedia(aboutScaleMedia);
  const craft = aboutCraftIds.map((id) => resolveMedia(MEDIA.gallery.find((item) => item.id === id)!));

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={aboutPageJsonLd({ name: aboutHero.h1, description: aboutSeo.description, path: "/about" })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />

      <section className="site-wrap grid items-center gap-10 pt-28 pb-8 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:pt-32 md:pb-12">
        <div className="min-w-0 max-w-full">
          <FounderPortrait item={founder} priority sizes="(min-width: 768px) 22rem, 90vw" />
        </div>
        <div className="min-w-0 max-w-full">
          <p className="eyebrow text-mor">{aboutHero.eyebrow}</p>
          <GoldThread />
          <LineReveal as="h1" text={aboutHero.h1} lineWords={[5, 5]} className="display-title mt-4" delay={0.05} />
          {aboutHero.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 max-w-xl text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
          <div className="mt-8 max-w-xl min-w-0">
            <MediaFrame item={early} className="rounded-3xl" sizes="(min-width: 768px) 36rem, 100vw" />
          </div>
        </div>
      </section>

      <section className="site-wrap py-12 md:py-16" aria-labelledby="about-craft">
        <h2 id="about-craft" className="max-w-3xl font-display text-[clamp(2rem,5vw,3.5rem)] leading-[0.98] [overflow-wrap:anywhere]">
          {aboutCraft.heading}
        </h2>
        <div className="mt-6 grid max-w-3xl gap-4">
          {aboutCraft.paragraphs.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-3">
          {craft.map((item) => (
            <li key={item.id} className="min-w-0 overflow-hidden">
              <MediaFrame item={item} className="rounded-3xl" sizes="(min-width: 640px) 30vw, 100vw" />
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-cream py-12 md:py-16" aria-labelledby="about-bands">
        <div className="site-wrap">
          <h2 id="about-bands" className="max-w-3xl font-display text-[clamp(2rem,5vw,3.5rem)] leading-[0.98] [overflow-wrap:anywhere]">
            {aboutBands.heading}
          </h2>
          {aboutBands.intro.map((paragraph) => (
            <p key={paragraph} className="mt-4 max-w-3xl text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {aboutBands.cards.map((card) => (
              <li key={card.href} className="min-w-0">
                <Link href={card.href} className={cn("lift-card block h-full overflow-hidden rounded-3xl", bandSurface[card.tone])}>
                  <div className="aspect-[16/9] overflow-hidden">
                    <MediaFrame item={resolveMedia(bandHero[card.href])} fill className="h-full w-full" sizes="(min-width: 768px) 40vw, 100vw" />
                  </div>
                  <div className="p-6">
                    <p className="eyebrow opacity-80">{card.reason}</p>
                    <h3 className="mt-2 font-display text-[clamp(2rem,4vw,3rem)] leading-none [overflow-wrap:anywhere]">{card.title}</h3>
                    <p className="mt-3 leading-relaxed">{card.text}</p>
                    <span className="mt-4 inline-flex min-h-11 items-center font-medium">{card.link} →</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <p id="independent-bands" className="mt-6 max-w-3xl scroll-mt-28 text-lg leading-relaxed">
            {aboutBands.independent}
          </p>
        </div>
      </section>

      <section className="site-wrap py-14 md:py-20" aria-labelledby="about-scale">
        <h2 id="about-scale" className="max-w-3xl font-display text-[clamp(2rem,5vw,3.5rem)] leading-[0.98] [overflow-wrap:anywhere]">
          {aboutScale.heading}
        </h2>
        <div className="mt-6 grid max-w-3xl gap-4">
          {aboutScale.paragraphs.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
        <dl className="mt-8 grid gap-6 sm:grid-cols-3">
          {proofLines.map((item) => (
            <div key={item.value}>
              <dt className="font-display text-5xl leading-none text-sindoor">
                <CountUp value={item.value} />
              </dt>
              <dd className="mt-2">{item.detail}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 min-w-0 overflow-hidden">
          <MediaFrame item={scale} className="rounded-3xl" sizes="(min-width: 768px) 72rem, 100vw" />
        </div>
      </section>

      <AboutTimeline eras={aboutEras} />

      <section aria-labelledby="about-beliefs">
        <div className="site-wrap py-12 md:py-16">
          <h2 id="about-beliefs" className="max-w-4xl font-display text-[clamp(2rem,5vw,3.5rem)] leading-[0.98] [overflow-wrap:anywhere]">
            {aboutBeliefs.heading}
          </h2>
          <div className="mt-6 grid max-w-3xl gap-4">
            {aboutBeliefs.intro.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-3">
          {aboutBeliefs.points.map((point, index) => (
            <ColorWipe key={point.title} from={index % 2 ? "right" : "left"} className={point.tone}>
              <div className="px-6 py-14 md:px-10 md:py-20">
                <h3 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-[0.95] [overflow-wrap:anywhere]">{point.title}</h3>
                <p className="mt-4 max-w-sm text-lg leading-relaxed">{point.text}</p>
              </div>
            </ColorWipe>
          ))}
        </div>
        <p className="site-wrap py-10 text-lg leading-relaxed md:py-14">{aboutBeliefs.close}</p>
      </section>

      <section className="site-wrap pb-16" aria-labelledby="about-close">
        <h2 id="about-close" className="max-w-3xl font-display text-[clamp(2rem,5vw,3.5rem)] leading-[0.98] [overflow-wrap:anywhere]">
          {aboutClose.heading}
        </h2>
        <div className="mt-6 grid max-w-3xl gap-4">
          {aboutClose.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
        <FounderQuote quote={aboutQuote} />
        <FounderVideo src={aboutVideo} />
        <Link
          href={aboutClose.ctaHref}
          className={cn(buttonVariants({ size: "cta" }), "mt-8 h-auto min-h-11 max-w-full rounded-full px-7 py-2 text-center whitespace-normal")}
        >
          {aboutClose.cta}
        </Link>
      </section>
    </>
  );
}
