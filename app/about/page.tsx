import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { aboutSeo, aboutStory } from "@/content/about";
import { MEDIA } from "@/content/media";
import { proofLines, site } from "@/content/site";
import { InstagramProfile } from "@/components/instagram-profile";
import { JsonLd } from "@/components/json-ld";
import { MediaFrame } from "@/components/media-frame";
import { Mosaic } from "@/components/mosaic";
import { PlanActions } from "@/components/plan-actions";
import { ArchReveal, ColorWipe } from "@/components/motion/pieces";
import { ArchThread, GoldThread } from "@/components/ornament/gold-thread";
import { CountUp } from "@/components/count-up";
import { aboutPageJsonLd, breadcrumbJsonLd, organizationJsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { resolveGallery, resolveMedia } from "@/lib/resolve-media";

export const metadata: Metadata = pageMetadata({
  title: aboutSeo.title,
  description: aboutSeo.description,
  path: "/about",
});

const tileTone = ["bg-haldi text-kajal", "bg-rani-deep text-cream", "bg-neel text-cream"] as const;
const cardTone = ["bg-haldi text-kajal", "bg-rani-deep text-cream", "bg-neel text-cream", "bg-sindoor text-cream"] as const;

export default function AboutPage() {
  const began = aboutStory.sections.find((section) => section.kind === "prose" && section.heading === "How Beats16 began");
  const shaped = aboutStory.sections.find((section) => section.kind === "points");
  const family = aboutStory.sections.find((section) => section.kind === "cards");
  const where = aboutStory.sections.find((section) => section.kind === "prose" && section.instagram);
  const founder = resolveMedia(MEDIA.founder);

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={aboutPageJsonLd({ name: aboutStory.hero.h1, description: aboutSeo.description, path: "/about" })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <section className="site-wrap grid items-center gap-10 pt-28 pb-14 md:grid-cols-[minmax(16rem,24rem)_1fr] md:pt-32">
        <div className="relative">
          <ArchReveal curtainClass="bg-haldi" className="min-h-[28rem]">
            <MediaFrame item={founder} priority sizes="(min-width: 768px) 24rem, 80vw" className="min-h-[28rem]" />
          </ArchReveal>
          <ArchThread />
        </div>
        <div>
          <p className="eyebrow text-mor">{aboutStory.hero.eyebrow}</p>
          <GoldThread />
          <h1 className="display-title mt-4">{aboutStory.hero.h1}</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed">{aboutStory.hero.subhead}</p>
          {began && began.kind === "prose"
            ? began.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-4 max-w-xl leading-relaxed">
                  {paragraph}
                </p>
              ))
            : null}
          <PlanActions source="about-page" className="mt-8" />
        </div>
      </section>

      <section className="bg-chandan" aria-labelledby="official-mark">
        <div className="site-wrap flex flex-col items-center py-14 md:py-16">
          <GoldThread />
          <h2 id="official-mark" className="mt-4 text-center font-display text-4xl leading-none md:text-5xl">
            {site.name}
          </h2>
          <Image
            src="/brand/beats16-logo-original.jpg"
            alt="Tushar Sonigra's Beats 16 official mark"
            width={1079}
            height={769}
            className="mt-8 h-auto w-full max-w-2xl rounded-3xl"
          />
        </div>
      </section>

      {shaped && shaped.kind === "points" ? (
        <section aria-labelledby="shaped" className="py-6">
          <h2 id="shaped" className="sr-only">
            {shaped.heading}
          </h2>
          <div className="grid md:grid-cols-3">
            {shaped.points.map((point, index) => (
              <ColorWipe key={point.title} from={index % 2 ? "right" : "left"} className={tileTone[index]}>
                <div className="px-6 py-16 md:px-10 md:py-24">
                  <h3 className="font-display text-[clamp(2.4rem,4vw,3.6rem)] leading-[0.95]">{point.title}</h3>
                  <p className="mt-4 max-w-sm text-lg leading-relaxed">{point.text}</p>
                </div>
              </ColorWipe>
            ))}
          </div>
        </section>
      ) : null}

      <section className="site-wrap py-14" aria-labelledby="about-numbers">
        <h2 id="about-numbers" className="font-display text-4xl leading-none">
          The work in numbers
        </h2>
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
      </section>

      {family && family.kind === "cards" ? (
        <section className="site-wrap py-8" aria-labelledby="family">
          <h2 id="family" className="font-display text-4xl leading-none md:text-6xl">
            {family.heading}
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {family.cards.map((card, index) => (
              <li key={card.href}>
                <Link href={card.href} className={`lift-card block rounded-3xl p-6 ${cardTone[index]}`}>
                  <h3 className="font-display text-4xl leading-none">{card.title}</h3>
                  <p className="mt-3 leading-relaxed">{card.text}</p>
                  <span className="mt-4 inline-flex min-h-11 items-center font-medium">{card.link} →</span>
                </Link>
              </li>
            ))}
          </ul>
          {family.note ? (
            <p id="independent-bands" className="mt-5 scroll-mt-28">
              {family.note}
            </p>
          ) : null}
        </section>
      ) : null}

      <section className="site-wrap py-12" aria-labelledby="about-photos">
        <h2 id="about-photos" className="font-display text-4xl leading-none">
          Photographs
        </h2>
        <Mosaic items={resolveGallery("about")} label="Photographs" />
      </section>

      {where && where.kind === "prose" ? (
        <section className="site-wrap max-w-3xl py-8" aria-labelledby="where">
          <h2 id="where" className="font-display text-4xl leading-none">
            {where.heading}
          </h2>
          {where.body ? <p className="mt-4 leading-relaxed">{where.body}</p> : null}
          <p className="mt-4 text-lg">
            <InstagramProfile />
          </p>
          {where.link ? (
            <p className="mt-4">
              <Link href={where.link.href} className="font-medium text-mor underline underline-offset-4">
                {where.link.label}
              </Link>
            </p>
          ) : null}
        </section>
      ) : null}
    </>
  );
}
