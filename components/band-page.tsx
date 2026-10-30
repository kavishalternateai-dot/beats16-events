import Link from "next/link";
import { getBandPage, type BandPage } from "@/content/bands";
import { MEDIA, type MediaBandKey, type MediaTone } from "@/content/media";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { MediaFrame } from "@/components/media-frame";
import { JsonLd } from "@/components/json-ld";
import { Mosaic } from "@/components/mosaic";
import { BandEnquireBar } from "@/components/band-enquire-bar";
import { PlanActions } from "@/components/plan-actions";
import { PosterTile } from "@/components/poster-tile";
import { ReelStrip } from "@/components/reel-strip";
import { ShowreelCard, ShowreelHeroButton, ShowreelProvider } from "@/components/showreel-gate";
import { bandInterestLabel } from "@/content/forms";
import { Steps } from "@/components/steps";
import { toneClass } from "@/components/tones";
import { BandhaniPattern } from "@/components/ornament/bandhani";
import { GoldThread } from "@/components/ornament/gold-thread";
import { LineReveal } from "@/components/motion/line-reveal";
import { FadeUp, ArchReveal } from "@/components/motion/pieces";
import { breadcrumbJsonLd, faqJsonLd, organizationJsonLd, performingGroup, serviceJsonLd } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { resolveMedia, resolveReelUrls, resolveShowreel } from "@/lib/resolve-media";
import type { StorySection } from "@/content/story";

const mediaKey: Record<BandPage["id"], MediaBandKey> = {
  gauri: "gauri",
  rdx: "rdx",
  "daastan-e-ghazal": "ghazal",
  navratri: "navratri",
};

const visuals: Record<
  BandPage["id"],
  {
    tone: MediaTone;
    chips: string[];
    pairs: { href: string; name: string; text: string }[];
    rule: string;
  }
> = {
  gauri: {
    tone: "haldi",
    chips: ["Pheras", "Rituals"],
    pairs: [
      { href: "/rdx", name: "RDX", text: "For the sangeet, when the party wants to move." },
      { href: "/daastan-e-ghazal", name: "Daastan-e-Ghazal", text: "For a quieter evening beside the rituals." },
    ],
    rule: "border-haldi",
  },
  rdx: {
    tone: "rani",
    chips: ["Sangeet", "Private events"],
    pairs: [
      { href: "/gauri", name: "Gauri", text: "For the rituals and the pheras." },
      { href: "/daastan-e-ghazal", name: "Daastan-e-Ghazal", text: "For a listening evening in the same wedding." },
    ],
    rule: "border-rani",
  },
  "daastan-e-ghazal": {
    tone: "neel",
    chips: ["Ghazal", "Mehfil"],
    pairs: [
      { href: "/gauri", name: "Gauri", text: "For the rituals, when the wedding needs calm." },
      { href: "/rdx", name: "RDX", text: "For the sangeet, when the floor should fill." },
    ],
    rule: "border-neel",
  },
  navratri: {
    tone: "bandhani",
    chips: ["Garba", "Dandiya"],
    pairs: [
      { href: "/gauri", name: "Gauri", text: "Wedding rituals and pheras." },
      { href: "/rdx", name: "RDX", text: "Sangeet nights and private events." },
    ],
    rule: "border-sindoor",
  },
};

function findSection<K extends StorySection["kind"]>(sections: StorySection[], kind: K) {
  return sections.find((section): section is Extract<StorySection, { kind: K }> => section.kind === kind);
}

export function BandScreen({ bandId }: { bandId: BandPage["id"] }) {
  const band = getBandPage(bandId);
  const visual = visuals[bandId];
  const media = MEDIA.bands[mediaKey[bandId]];
  const heroMedia = resolveMedia(media.hero);
  const photos = media.photos.map((photo) => resolveMedia(photo));
  const reels = resolveReelUrls(media.reels, media.reelEnvKeys);
  const showreel = resolveShowreel(bandId);
  const pace = bandId === "daastan-e-ghazal" ? 1.25 : 1;
  const wordStagger = bandId === "rdx" ? 0.05 : undefined;
  const tone = toneClass[visual.tone];
  const points = findSection(band.story.sections, "points");
  const steps = findSection(band.story.sections, "steps");
  const prose = band.story.sections.filter((section) => section.kind === "prose");
  const showreelCopy = findSection(band.story.sections, "showreel");
  const crumbs = [
    { name: "Home", path: "/" },
    { name: band.name, path: band.href },
  ];
  const group = performingGroup(bandId);

  const page = (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={serviceJsonLd({ name: band.name, description: band.metaDescription, path: band.href })} />
      {group ? <JsonLd data={{ "@context": "https://schema.org", ...group }} /> : null}
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(band.story.faqs)} />
      <section data-band-hero className={`relative overflow-hidden ${visual.tone === "bandhani" ? "bg-sindoor text-cream" : `${tone.bg} ${tone.text}`}`}>
        {visual.tone === "bandhani" ? null : <BandhaniPattern />}
        {visual.tone !== "haldi" && visual.tone !== "bandhani" ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-kajal/75 to-transparent" />
        ) : null}
        <div className="site-wrap relative grid items-end gap-8 pt-28 pb-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.75fr)] md:pt-32 md:pb-16">
          <div className="relative z-[1] min-w-0 max-w-full">
            <Breadcrumbs items={crumbs} />
            <p className="eyebrow mt-6 max-w-full">{band.story.hero.eyebrow}</p>
            <GoldThread className="mt-3" delay={0.08} />
            <LineReveal
              as="h1"
              text={band.story.hero.h1}
              lineWords={bandId === "gauri" ? [2, 2, 2] : bandId === "rdx" ? [2, 2, 2] : bandId === "daastan-e-ghazal" ? [3, 2] : [3, 2]}
              className="display-title band-display mt-3"
              delay={0.05}
              pace={pace}
              wordStagger={wordStagger ?? 0.045}
            />
            <FadeUp hero delay={0.42} pace={pace} className="mt-5 max-w-xl">
              <p className="text-lg leading-relaxed">{band.story.hero.subhead}</p>
            </FadeUp>
            <ul className="mt-5 flex flex-wrap gap-2">
              {visual.chips.map((chip) => (
                <li key={chip} className={`eyebrow rounded-full border px-3 py-2 ${tone.chip}`}>
                  {chip}
                </li>
              ))}
            </ul>
            <FadeUp hero delay={0.55} pace={pace} className="mt-8">
              <PlanActions source={`${bandId}-cta`} band={bandInterestLabel[bandId]} primary={band.story.hero.cta} onDark={visual.tone !== "haldi"} onSindoor={visual.tone === "sindoor" || visual.tone === "bandhani"} />
              {showreel ? <ShowreelHeroButton /> : null}
            </FadeUp>
          </div>
          <div className={cn("relative min-w-0 max-w-full", visual.tone === "haldi" && "rounded-[2rem] bg-chandan p-3 md:p-5")}>
          <ArchReveal className="min-h-64 md:min-h-80" curtainClass={visual.tone === "haldi" ? "bg-chandan" : tone.bg} pace={pace}>
            {heroMedia.empty ? (
              <PosterTile
                item={heroMedia}
                className={cn("min-h-64 rounded-3xl md:min-h-80", visual.tone === "haldi" && "gauri-poster")}
              />
            ) : (
              <MediaFrame item={heroMedia} priority className="min-h-64 rounded-3xl md:min-h-80" sizes="(min-width: 768px) 40vw, 100vw" />
            )}
          </ArchReveal>
          </div>
        </div>
      </section>

      <section className="site-wrap py-12 md:py-16" aria-labelledby={`${bandId}-reels`}>
        <LineReveal as="h2" id={`${bandId}-reels`} text={bandId === "navratri" ? "See a Navratri night" : `See ${band.name}`} className="font-display text-4xl leading-none" pace={pace} wordStagger={wordStagger} />
        <div className="mt-6">
          <ReelStrip urls={reels} toneClassName={visual.tone === "bandhani" ? "bg-sindoor text-cream" : `${tone.bg} ${tone.text}`} />
        </div>
      </section>

      {points && bandId !== "navratri" ? (
        <section className="bg-chandan py-14 md:py-20" aria-labelledby={`${bandId}-made`}>
          <div className="site-wrap">
            <h2 id={`${bandId}-made`} className="font-display text-4xl leading-none md:text-5xl">
              {points.heading}
            </h2>
            {points.intro ? <p className="mt-4 max-w-2xl leading-relaxed">{points.intro}</p> : null}
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {points.points.map((point) => (
                <li key={point.title} className="rounded-3xl bg-cream p-6">
                  <h3 className="font-display text-3xl leading-none">{point.title}</h3>
                  <p className="mt-3 leading-relaxed">{point.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {bandId === "navratri" && points ? (
        <section className="site-wrap grid gap-4 py-12 md:grid-cols-2" aria-labelledby="navratri-garba">
          <h2 id="navratri-garba" className="font-display text-4xl leading-none md:col-span-2 md:text-5xl">
            {points.heading}
          </h2>
          {points.points.slice(0, 2).map((point) => (
            <article key={point.title} className={`rounded-3xl p-8 ${point.title === "Dandiya" ? "bg-mor text-cream" : "bg-sindoor text-cream"}`}>
              <h2 className="font-display text-5xl leading-none">{point.title}</h2>
              <p className="mt-4 max-w-md leading-relaxed">{point.text}</p>
            </article>
          ))}
          {points.points[2] ? (
            <p className="md:col-span-2 max-w-2xl leading-relaxed">{points.points[2].text}</p>
          ) : null}
        </section>
      ) : null}

      <section className="site-wrap py-12" aria-labelledby={`${bandId}-photos`}>
        <h2 id={`${bandId}-photos`} className="font-display text-4xl leading-none">
          From the floor
        </h2>
        <Mosaic items={photos} label={`${band.name} photographs`} />
      </section>

      {showreel ? <ShowreelCard /> : null}

      <section className="site-wrap py-8" aria-labelledby={`${bandId}-pairs`}>
        <h2 id={`${bandId}-pairs`} className="font-display text-4xl leading-none">
          {bandId === "navratri" ? "More from Beats16" : "Pairs well with"}
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {visual.pairs.map((pair) => (
            <li key={pair.href}>
              <Link href={pair.href} className="lift-card block rounded-3xl bg-chandan p-6">
                <span className="font-display text-3xl leading-none">{pair.name}</span>
                <span className="mt-3 block leading-relaxed">{pair.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {prose.map((section) => (
        <section key={section.heading} className="site-wrap max-w-3xl py-6" aria-labelledby={section.heading}>
          <h2 className="font-display text-4xl leading-none">{section.heading}</h2>
          <div className="mt-4 grid gap-4">
            {(section.paragraphs ?? (section.body ? [section.body] : [])).map((paragraph) => (
              <p key={paragraph} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}

      {steps ? <Steps heading={steps.heading} steps={steps.steps} /> : null}

      <div className="site-wrap py-8">
        <FaqList items={band.story.faqs} heading={band.story.faqHeading} headingId={`${bandId}-faq`} ruleClassName={visual.rule} />
      </div>

      <BandEnquireBar bandId={bandId} />
    </>
  );

  if (!showreel) return page;

  return (
    <ShowreelProvider
      bandId={bandId}
      body={showreelCopy?.body ?? ""}
      poster={heroMedia}
      url={showreel.url}
      external={showreel.external}
      filename={showreel.filename}
    >
      {page}
    </ShowreelProvider>
  );
}
