import dynamic from "next/dynamic";
import Link from "next/link";
import { homeBands, homeFaqs, homeFaqHeading, homeFunctions, homeGallery, homeHero, homeMeet } from "@/content/home";
import { MEDIA } from "@/content/media";
import { instagramHandle, instagramProfileUrl, proofLines } from "@/content/site";
const BandPanel = dynamic(() => import("@/components/band-panel").then((mod) => mod.BandPanel));
const Mosaic = dynamic(() => import("@/components/mosaic").then((mod) => mod.Mosaic));
const CountUp = dynamic(() => import("@/components/count-up").then((mod) => mod.CountUp));
import { FaqList } from "@/components/faq-list";
import { FunctionTimeline } from "@/components/function-timeline";
import { HomeHero } from "@/components/home-hero";
import { MediaFrame } from "@/components/media-frame";
import { JsonLd } from "@/components/json-ld";
import { LineReveal } from "@/components/motion/line-reveal";
import { ArchReveal } from "@/components/motion/pieces";
import { ArchThread, GoldThread } from "@/components/ornament/gold-thread";
import { Ticker } from "@/components/ornament/ticker";
import { faqJsonLd, organizationJsonLd } from "@/lib/schema";
import { resolveGallery, resolveMedia } from "@/lib/resolve-media";

const teaserIds = ["home-kinds", "home-functions", "home-which-band", "home-price"];

const panelMedia = {
  "/gauri": MEDIA.bands.gauri.hero,
  "/rdx": MEDIA.bands.rdx.hero,
  "/daastan-e-ghazal": MEDIA.bands.ghazal.hero,
  "/navratri": MEDIA.bands.navratri.hero,
} as const;

const panelTone = {
  "/gauri": "haldi",
  "/rdx": "rani",
  "/daastan-e-ghazal": "neel",
  "/navratri": "bandhani",
} as const;

const panelChips = {
  "/gauri": ["Pheras", "Rituals"],
  "/rdx": ["Sangeet", "Private events"],
  "/daastan-e-ghazal": ["Ghazal", "Mehfil"],
  "/navratri": ["Garba", "Dandiya"],
} as const;

const panelPromise = {
  "/gauri": "Music that lets the pheras lead.",
  "/rdx": "The band that follows the party.",
  "/daastan-e-ghazal": "An evening made for listening.",
  "/navratri": "Nine nights. One circle. Live.",
} as const;

export default function HomePage() {
  const instagram = instagramProfileUrl();
  const handle = instagramHandle();
  const founder = resolveMedia(MEDIA.founder);
  const teaser = homeFaqs.filter((item) => teaserIds.includes(item.id));

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={faqJsonLd(teaser)} />
      <HomeHero
        media={resolveMedia(MEDIA.homeHero)}
        eyebrow={homeHero.eyebrow}
        title={homeHero.h1}
        subhead={homeHero.subhead}
      />
      <Ticker />

      <section aria-labelledby="bands-heading">
        <div className="site-wrap py-12 md:py-16">
          <GoldThread />
          <LineReveal as="h2" id="bands-heading" text={homeBands.heading} className="mt-2 font-display text-4xl leading-none md:text-6xl" />
          <p className="mt-4 max-w-xl leading-relaxed">{homeBands.intro}</p>
        </div>
        {homeBands.cards.map((band, index) => (
          <BandPanel
            key={band.href}
            name={band.name}
            href={band.href}
            promise={panelPromise[band.href]}
            chips={[...panelChips[band.href]]}
            link={band.link}
            media={resolveMedia(panelMedia[band.href])}
            tone={panelTone[band.href]}
            flip={index % 2 === 1}
          />
        ))}
        <p id="independent-bands" className="site-wrap scroll-mt-28 py-8 text-lg">
          {homeBands.independent}
        </p>
      </section>

      <section className="bg-cream py-14 md:py-20" aria-labelledby="functions-heading">
        <div className="site-wrap">
          <GoldThread />
          <LineReveal as="h2" id="functions-heading" text="Your wedding, function by function." className="mt-2 font-display text-4xl leading-none md:text-6xl" />
          <FunctionTimeline items={homeFunctions} />
          <p className="mt-5 text-sm">Haldi or baraat too? Tell us.</p>
        </div>
      </section>

      <section className="site-wrap py-14 md:py-20" aria-labelledby="gallery-heading">
          <GoldThread />
          <LineReveal as="h2" id="gallery-heading" text={homeGallery.heading} className="font-display text-4xl leading-none md:text-6xl" />
        <Mosaic items={resolveGallery("home")} label="Photographs and films" />
        {instagram ? (
          <p className="mt-6">
            <a href={instagram} className="font-medium underline underline-offset-4" target="_blank" rel="noopener noreferrer">
              More on Instagram @{handle}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        ) : null}
      </section>

      <section className="bg-chandan py-14 md:py-20" aria-labelledby="founder-heading">
        <div className="site-wrap grid items-center gap-10 md:grid-cols-[minmax(16rem,22rem)_1fr]">
          <div className="relative mx-auto max-w-sm">
            <ArchReveal curtainClass="bg-haldi">
              <MediaFrame item={founder} sizes="(min-width: 768px) 22rem, 80vw" className="min-h-[26rem]" />
            </ArchReveal>
            <ArchThread />
          </div>
          <div>
            <GoldThread />
            <LineReveal as="h2" id="founder-heading" text={homeMeet.heading} className="mt-2 font-display text-5xl leading-none md:text-6xl" />
            <p className="mt-6 max-w-xl text-lg leading-relaxed">{homeMeet.lines[0]}</p>
            <p className="mt-3 max-w-xl text-lg leading-relaxed">{homeMeet.lines[1]}</p>
            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              {proofLines.slice(0, 2).map((item) => (
                <div key={item.value}>
                  <dt className="font-display text-5xl leading-none text-sindoor">
                    <CountUp value={item.value} />
                  </dt>
                  <dd className="mt-2 text-sm">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="site-wrap py-14 md:py-20">
        <FaqList items={teaser} heading={homeFaqHeading} />
        <p className="mt-6">
          <Link href="/faq" className="font-medium text-mor underline underline-offset-4">
            See all FAQs
          </Link>
        </p>
      </section>
    </>
  );
}
