import type { Metadata } from "next";
import { Suspense } from "react";
import { contactAfter, contactHero, contactReach, contactSeo } from "@/content/contact";
import { site } from "@/content/site";
import { heroSlotId } from "@/content/media";
import { PageContainer, PageHero, SplitHero, sectionTitleClass } from "@/components/blocks";
import { Reveal } from "@/components/motion";
import { MediaSlot } from "@/components/media-slot";
import { resolveVisual } from "@/lib/resolve-media";
import { EmailLink, PhoneLink } from "@/components/contact-links";
import { InstagramProfile } from "@/components/instagram-profile";
import { InquiryForm } from "@/components/inquiry-form";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, contactPageJsonLd, organizationJsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: contactSeo.title,
  description: contactSeo.description,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PageContainer>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={contactPageJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <SplitHero
        media={<MediaSlot slot={resolveVisual(heroSlotId("/contact") ?? "contact-hero")} priority />}
        copy={<PageHero eyebrow={contactHero.eyebrow} title={contactHero.h1} lede={contactHero.subhead} />}
      />

      <Reveal className="section-block max-w-2xl">
        <Suspense fallback={<p>Loading the inquiry form…</p>}>
          <InquiryForm />
        </Suspense>
      </Reveal>

      <Reveal as="section" className="section-block" labelledBy="about-pricing">
        <h2 id="about-pricing" className={sectionTitleClass}>
          About pricing
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed">{site.pricing}</p>
      </Reveal>

      <Reveal as="section" className="section-block" labelledBy="after-inquiry">
        <h2 id="after-inquiry" className={sectionTitleClass}>
          {contactAfter.heading}
        </h2>
        <ol className="mt-6 grid max-w-2xl list-decimal gap-4 pl-5 text-lg leading-relaxed">
          {contactAfter.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{contactAfter.note}</p>
      </Reveal>

      <Reveal as="section" className="section-block" labelledBy="other-ways">
        <h2 id="other-ways" className={sectionTitleClass}>
          {contactReach.heading}
        </h2>
        <div className="mt-4 grid gap-3 text-lg leading-relaxed">
          <p>
            Call: <PhoneLink location="contact_page" className="underline underline-offset-2" /> — {contactReach.call}
          </p>
          <p>
            Email: <EmailLink location="contact_page" className="underline underline-offset-2" />
          </p>
          <p>
            <InstagramProfile />
          </p>
          <p>{contactReach.based}</p>
        </div>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">{contactReach.focus}</p>
      </Reveal>
    </PageContainer>
  );
}
