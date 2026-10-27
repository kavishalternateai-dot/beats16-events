import Link from "next/link";
import {
  homeAbout,
  homeBands,
  homeClose,
  homeFaqs,
  homeFaqHeading,
  homeHero,
  homeProof,
  homeWeddings,
} from "@/content/home";
import { PageContainer, PageHero, ProofStrip, sectionTitleClass } from "@/components/blocks";
import { Reveal } from "@/components/motion";
import { FounderPortrait } from "@/components/founder-portrait";
import { EmailLink, PhoneLink } from "@/components/contact-links";
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
      <section className="relative overflow-hidden bg-burgundy text-[#f7f1e6]">
        <div className="h-px bg-gold" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_88%_0%,rgba(228,200,138,0.18),transparent_54%)]"
        />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-12 md:px-6 md:py-16 lg:grid-cols-[minmax(0,1.25fr)_minmax(15rem,19rem)] lg:gap-14">
          <PageHero
            tone="dark"
            eyebrow={homeHero.eyebrow}
            title={homeHero.h1}
            lede={homeHero.subhead}
            actions={
              <div className="flex flex-col items-start gap-3">
                <Link
                  href={homeHero.ctaHref}
                  className={cn(buttonVariants({ size: "cta" }), "bg-[#f7f1e6] text-[#3c1520] hover:bg-white")}
                >
                  {homeHero.cta}
                </Link>
                <p className="text-sm text-[#f7f1e6]/75">{homeHero.note}</p>
              </div>
            }
          />
          <FounderPortrait tone="dark" priority />
        </div>
      </section>
    <PageContainer className="pt-10 md:pt-12">
      <section className="mt-1" aria-labelledby="proof-heading">
        <h2 id="proof-heading" className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
          {homeProof.label}
        </h2>
        <div className="mt-3">
          <ProofStrip items={homeProof.items} />
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{homeProof.support}</p>
      </section>

      <Reveal as="section" className="section-rhythm" labelledBy="bands-heading">
        <h2 id="bands-heading" className={sectionTitleClass}>
          {homeBands.heading}
        </h2>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed">{homeBands.intro}</p>
        <ul className="mt-5 grid gap-4 md:grid-cols-2">
          {homeBands.cards.map((band) => (
            <li key={band.href} className="jewel-card p-5 md:p-6">
              <h3 className="font-heading text-2xl">
                <Link href={band.href} className="link-draw">
                  {band.name}
                </Link>
              </h3>
              <p className="mt-2.5 leading-relaxed">{band.text}</p>
              <Link href={band.href} className="link-draw mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-primary">
                {band.link}
              </Link>
            </li>
          ))}
        </ul>
        <p id="independent-bands" className="mt-4 scroll-mt-28 text-sm leading-relaxed text-muted-foreground">
          {homeBands.independent}
        </p>
      </Reveal>

      <Reveal className="section-rhythm">
        <section className="jewel-card p-6 md:p-8" aria-labelledby="weddings-heading">
          <h2 id="weddings-heading" className={sectionTitleClass}>
            {homeWeddings.heading}
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed">{homeWeddings.body}</p>
          <p className="mt-4 text-sm font-semibold tracking-[0.08em] uppercase">{homeWeddings.functions}</p>
          <Link href={homeWeddings.href} className="link-draw mt-3 inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-2">
            {homeWeddings.link}
          </Link>
        </section>
      </Reveal>

      <Reveal as="section" className="section-rhythm" labelledBy="about-heading">
        <h2 id="about-heading" className={sectionTitleClass}>
          {homeAbout.heading}
        </h2>
        <p className="mt-3 max-w-3xl leading-relaxed">{homeAbout.body}</p>
        <Link href={homeAbout.href} className="link-draw mt-3 inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-2">
          {homeAbout.link}
        </Link>
      </Reveal>

      <FaqList items={homeFaqs} heading={homeFaqHeading} />
      <p className="mt-4">
        <Link href="/faq" className="link-draw font-semibold text-primary underline underline-offset-2">
          See all FAQs
        </Link>
      </p>

      <Reveal as="aside" className="closing-panel closing-rhythm px-6 py-9 md:px-12 md:py-12">
        <h2 className={cn(sectionTitleClass, "leading-tight text-[#f7f1e6]")}>{homeClose.heading}</h2>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-[#f7f1e6]/88">{homeClose.body}</p>
        <Link
          href={homeClose.ctaHref}
          className={cn(buttonVariants({ size: "cta" }), "mt-6 bg-[#f7f1e6] text-[#3c1520] hover:bg-white")}
        >
          {homeClose.cta}
        </Link>
        <p className="mt-4 text-sm leading-relaxed text-[#f7f1e6]/88">
          Call <PhoneLink location="home_cta" className="underline underline-offset-2" />
          {" · "}
          Email <EmailLink location="home_cta" className="underline underline-offset-2" />
        </p>
      </Reveal>
    </PageContainer>
    </>
  );
}
