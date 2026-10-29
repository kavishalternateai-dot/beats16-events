import type { Metadata } from "next";
import { Suspense } from "react";
import { contactAfter, contactHero, contactReach, contactSeo } from "@/content/contact";
import { site } from "@/content/site";
import { EmailLink, PhoneLink } from "@/components/contact-links";
import { InstagramProfile } from "@/components/instagram-profile";
import { InquiryForm } from "@/components/inquiry-form";
import { JsonLd } from "@/components/json-ld";
import { BandhaniPattern } from "@/components/ornament/bandhani";
import { LineReveal } from "@/components/motion/line-reveal";
import { GoldThread } from "@/components/ornament/gold-thread";
import { breadcrumbJsonLd, contactPageJsonLd, organizationJsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: contactSeo.title,
  description: contactSeo.description,
  path: "/contact",
});

function one(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
}

async function InquiryFromQuery({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  return (
    <InquiryForm
      initial={{
        event: one(params.event),
        band: one(params.band),
        heard: one(params.heard),
        source: one(params.source),
        utmSource: one(params.utm_source),
        utmMedium: one(params.utm_medium),
        utmCampaign: one(params.utm_campaign),
      }}
    />
  );
}

export default function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <div className="pt-24">
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={contactPageJsonLd()} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <section className="site-wrap pb-8">
        <p className="eyebrow text-mor">{contactHero.eyebrow}</p>
        <GoldThread />
        <LineReveal as="h1" text={contactHero.h1} lineWords={[3, 2]} mobileLineWords={[2, 1, 2]} className="display-title mt-4" />
        <p className="mt-5 max-w-2xl text-lg leading-relaxed">{contactHero.subhead}</p>
      </section>
      <div className="site-wrap grid items-start gap-10 pb-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(16rem,0.9fr)]">
        <Suspense fallback={<InquiryForm />}>
          <InquiryFromQuery searchParams={searchParams} />
        </Suspense>
        <aside className="relative overflow-hidden rounded-3xl bg-neel p-6 text-cream md:p-8">
          <BandhaniPattern className="text-cream" />
          <div className="relative">
            <h2 className="font-display text-4xl leading-none">What happens next</h2>
            <ol className="mt-6 grid gap-5">
              {contactAfter.steps.map((step, index) => (
                <li key={step} className="grid grid-cols-[auto_1fr] gap-3">
                  <span className="font-display text-3xl leading-none text-sona">{String(index + 1).padStart(2, "0")}</span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm leading-relaxed text-cream/80">{contactAfter.note}</p>
          </div>
        </aside>
      </div>
      <section className="site-wrap pb-16" aria-labelledby="reach">
        <h2 id="reach" className="font-display text-4xl leading-none">
          {contactReach.heading}
        </h2>
        <ul className="mt-6 grid gap-3 text-lg">
          <li>
            <PhoneLink location="contact_page" className="inline-flex min-h-12 items-center underline underline-offset-4" />
            <span className="mt-1 block text-base"> {contactReach.call}</span>
          </li>
          <li>
            <EmailLink location="contact_page" className="inline-flex min-h-12 items-center underline underline-offset-4" />
          </li>
          <li className="min-h-12">
            <InstagramProfile />
          </li>
        </ul>
        <p className="mt-4">{contactReach.based}</p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed">{contactReach.focus}</p>
      </section>
      <noscript>
        <p className="site-wrap pb-10">
          If the form does not send, call {site.phoneDisplay} or email {site.email}.
        </p>
      </noscript>
    </div>
  );
}
