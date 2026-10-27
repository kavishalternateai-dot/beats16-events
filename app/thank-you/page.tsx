import type { Metadata } from "next";
import Link from "next/link";
import { thankYouCopy, thankYouSeo } from "@/content/contact";
import { site } from "@/content/site";
import { PageContainer, PageHero, sectionTitleClass } from "@/components/blocks";
import { Reveal } from "@/components/motion";
import { EmailLink, PhoneLink } from "@/components/contact-links";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: thankYouSeo.title,
  description: thankYouSeo.description,
  path: "/thank-you",
  index: false,
});

export default function ThankYouPage() {
  return (
    <PageContainer>
      <PageHero eyebrow={thankYouCopy.eyebrow} title={thankYouCopy.h1} lede={thankYouCopy.lead} />
      <Reveal className="mt-8 max-w-3xl">
        <p className="text-lg leading-relaxed">{thankYouCopy.body}</p>
      </Reveal>
      <Reveal as="section" className="section-rhythm max-w-3xl" labelledBy="prepare">
        <h2 id="prepare" className={sectionTitleClass}>
          {thankYouCopy.prepareHeading}
        </h2>
        <p className="mt-4 leading-relaxed">{thankYouCopy.prepare}</p>
        <ul className="mt-4 grid list-disc gap-2 pl-5 leading-relaxed">
          {thankYouCopy.prepareItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Reveal>
      <p className="mt-8 max-w-3xl text-lg leading-relaxed">{site.pricing}</p>
      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
        {thankYouCopy.add} Email <EmailLink location="thank_you" className="underline underline-offset-2" /> or call{" "}
        <PhoneLink location="thank_you" className="underline underline-offset-2" />.
      </p>
      <p className="mt-8">
        <Link href={thankYouCopy.bandsHref} className="font-semibold text-primary underline underline-offset-2">
          {thankYouCopy.bandsLabel}
        </Link>
      </p>
    </PageContainer>
  );
}
