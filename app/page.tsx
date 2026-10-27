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
import { PageContainer, PageHero, ProofStrip } from "@/components/blocks";
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
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-14 md:px-6 md:py-20 lg:grid-cols-[minmax(0,1.25fr)_minmax(15rem,19rem)] lg:gap-16">
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
          <FounderPortrait tone="dark" priority className="rise-delay" />
        </div>
      </section>
    <PageContainer className="pt-12 md:pt-16">
      <section className="mt-2" aria-labelledby="proof-heading">
        <h2 id="proof-heading" className="text-sm font-semibold text-muted-foreground">
          {homeProof.label}
        </h2>
        <div className="mt-3">
          <ProofStrip items={homeProof.items} />
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{homeProof.support}</p>
      </section>

      <section className="mt-16" aria-labelledby="bands-heading">
        <h2 id="bands-heading" className="font-heading text-3xl md:text-4xl">
          {homeBands.heading}
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed">{homeBands.intro}</p>
        <ul className="mt-6 grid gap-5 md:grid-cols-2">
          {homeBands.cards.map((band) => (
            <li key={band.href} className="jewel-card p-6 md:p-7">
              <h3 className="font-heading text-2xl">
                <Link href={band.href} className="underline-offset-2 hover:underline">
                  {band.name}
                </Link>
              </h3>
              <p className="mt-3 leading-relaxed">{band.text}</p>
              <Link href={band.href} className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-primary">
                {band.link}
              </Link>
            </li>
          ))}
        </ul>
        <p id="independent-bands" className="mt-4 scroll-mt-28 text-sm leading-relaxed text-muted-foreground">
          {homeBands.independent}
        </p>
      </section>

      <section className="jewel-card mt-16 p-6 md:p-10" aria-labelledby="weddings-heading">
        <h2 id="weddings-heading" className="font-heading text-3xl md:text-4xl">
          {homeWeddings.heading}
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed">{homeWeddings.body}</p>
        <p className="mt-4 text-sm font-semibold tracking-wide">{homeWeddings.functions}</p>
        <Link href={homeWeddings.href} className="mt-4 inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-2">
          {homeWeddings.link}
        </Link>
      </section>

      <section className="mt-16" aria-labelledby="about-heading">
        <h2 id="about-heading" className="font-heading text-3xl md:text-4xl">
          {homeAbout.heading}
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed">{homeAbout.body}</p>
        <Link href={homeAbout.href} className="mt-4 inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-2">
          {homeAbout.link}
        </Link>
      </section>

      <FaqList items={homeFaqs} heading={homeFaqHeading} />
      <p className="mt-4">
        <Link href="/faq" className="font-semibold text-primary underline underline-offset-2">
          See all FAQs
        </Link>
      </p>

      <aside className="closing-panel mt-20 px-6 py-10 md:px-12 md:py-14">
        <h2 className="font-heading text-3xl leading-tight text-[#f7f1e6] md:text-4xl">{homeClose.heading}</h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#f7f1e6]/88">{homeClose.body}</p>
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
      </aside>
    </PageContainer>
    </>
  );
}
