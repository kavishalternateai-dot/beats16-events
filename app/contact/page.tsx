import type { Metadata } from "next";
import { Suspense } from "react";
import { contactAfter, contactHero, contactReach, contactSeo } from "@/content/contact";
import { site } from "@/content/site";
import { PageContainer, PageHero } from "@/components/blocks";
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
      <PageHero eyebrow={contactHero.eyebrow} title={contactHero.h1} lede={contactHero.subhead} />

      <div className="mt-12 max-w-2xl">
        <Suspense fallback={<p>Loading the inquiry form…</p>}>
          <InquiryForm />
        </Suspense>
      </div>

      <section className="mt-16 max-w-3xl" aria-labelledby="about-pricing">
        <h2 id="about-pricing" className="font-heading text-3xl md:text-4xl">
          About pricing
        </h2>
        <p className="mt-4 text-lg leading-relaxed">{site.pricing}</p>
      </section>

      <section className="mt-16 max-w-3xl" aria-labelledby="after-inquiry">
        <h2 id="after-inquiry" className="font-heading text-3xl md:text-4xl">
          {contactAfter.heading}
        </h2>
        <ol className="mt-6 grid list-decimal gap-4 pl-5 leading-relaxed">
          {contactAfter.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{contactAfter.note}</p>
      </section>

      <section className="mt-16 max-w-3xl" aria-labelledby="other-ways">
        <h2 id="other-ways" className="font-heading text-3xl md:text-4xl">
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
      </section>
    </PageContainer>
  );
}
