import Link from "next/link";
import {
  homeAbout,
  homeBands,
  homeClose,
  homeFaqs,
  homeFaqHeading,
  homeGallery,
  homeHero,
  homeProof,
  homeWeddings,
} from "@/content/home";
import { InquiryClose, PageContainer, PageHero, ProofStrip, SplitHero, sectionTitleClass } from "@/components/blocks";
import { Reveal } from "@/components/motion";
import { FounderPortrait } from "@/components/founder-portrait";
import { MediaGallery } from "@/components/media-slot";
import { resolveVisuals } from "@/lib/resolve-media";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { buttonVariants } from "@/components/ui/button";
import { faqJsonLd, organizationJsonLd } from "@/lib/schema";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={faqJsonLd(homeFaqs)} />
      <div className="hero-wash">
        <div className="site-wrap py-16 md:py-20">
          <SplitHero
            media={<FounderPortrait priority />}
            copy={
              <PageHero
                eyebrow={homeHero.eyebrow}
                title={homeHero.h1}
                lede={homeHero.subhead}
                actions={
                  <div className="flex flex-col items-start gap-3">
                    <Link href={homeHero.ctaHref} className={cn(buttonVariants({ size: "cta" }))}>
                      {homeHero.cta}
                    </Link>
                    <p className="text-sm text-muted-foreground">{homeHero.note}</p>
                  </div>
                }
              />
            }
          />
        </div>
      </div>
      <PageContainer compactTop>
        <Reveal as="section" className="section-block" labelledBy="proof-heading">
          <h2 id="proof-heading" className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
            {homeProof.label}
          </h2>
          <div className="mt-6">
            <ProofStrip items={homeProof.items} />
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/80">{homeProof.support}</p>
        </Reveal>

        <MediaGallery
          headingId="home-gallery"
          heading={homeGallery.heading}
          intro={homeGallery.intro}
          slots={resolveVisuals(homeGallery.slotIds)}
        />

        <Reveal as="section" className="section-block" labelledBy="bands-heading">
          <h2 id="bands-heading" className={sectionTitleClass}>
            {homeBands.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/80">{homeBands.intro}</p>
          <ul className="mt-8 grid items-stretch gap-5 md:grid-cols-2">
            {homeBands.cards.map((band) => (
              <li key={band.href} className="jewel-card flex flex-col p-6 md:p-7">
                <h3 className="font-heading text-2xl leading-tight">
                  <Link href={band.href} className="underline-offset-2 hover:underline">
                    {band.name}
                  </Link>
                </h3>
                <p className="mt-3 leading-relaxed text-foreground/80">{band.text}</p>
                <Link href={band.href} className="mt-auto inline-flex min-h-11 items-center pt-4 text-sm font-semibold text-primary">
                  {band.link}
                </Link>
              </li>
            ))}
          </ul>
          <p id="independent-bands" className="mt-5 scroll-mt-28 text-sm leading-relaxed text-muted-foreground">
            {homeBands.independent}
          </p>
        </Reveal>

        <Reveal as="section" className="jewel-card section-block p-6 md:p-10" labelledBy="weddings-heading">
          <h2 id="weddings-heading" className={sectionTitleClass}>
            {homeWeddings.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/80">{homeWeddings.body}</p>
          <p className="mt-5 text-sm font-semibold tracking-wide text-primary">{homeWeddings.functions}</p>
          <Link href={homeWeddings.href} className="mt-4 inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-2">
            {homeWeddings.link}
          </Link>
        </Reveal>

        <Reveal as="section" className="section-block" labelledBy="about-heading">
          <h2 id="about-heading" className={sectionTitleClass}>
            {homeAbout.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed">{homeAbout.body}</p>
          <Link href={homeAbout.href} className="mt-4 inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-2">
            {homeAbout.link}
          </Link>
        </Reveal>

        <FaqList items={homeFaqs} heading={homeFaqHeading} />
        <p className="mt-4">
          <Link href="/faq" className="font-semibold text-primary underline underline-offset-2">
            See all FAQs
          </Link>
        </p>

        <InquiryClose
          title={homeClose.heading}
          text={homeClose.body}
          cta={homeClose.cta}
          href={homeClose.ctaHref}
          contactLocation="home_cta"
        />
      </PageContainer>
    </>
  );
}
