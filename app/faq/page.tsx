import type { Metadata } from "next";
import Link from "next/link";
import { faqPageClose, faqPageGroups, faqPageHero, faqPageItems, faqPageSeo } from "@/content/faq-page";
import { InquiryClose, PageContainer, PageHero } from "@/components/blocks";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { buttonVariants } from "@/components/ui/button";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: faqPageSeo.title,
  description: faqPageSeo.description,
  path: "/faq",
});

export default function FaqPage() {
  return (
    <PageContainer>
      <JsonLd data={faqJsonLd(faqPageItems)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
      <PageHero
        eyebrow={faqPageHero.eyebrow}
        title={faqPageHero.h1}
        lede={faqPageHero.subhead}
        actions={
          <Link
            href={faqPageHero.ctaHref}
            className={cn(buttonVariants({ size: "cta" }), "h-auto whitespace-normal px-5 py-2.5 text-center")}
          >
            {faqPageHero.cta}
          </Link>
        }
      />
      {faqPageGroups.map((group) => (
        <FaqList key={group.id} items={group.items} heading={group.title} headingId={`faq-${group.id}`} />
      ))}
      <InquiryClose
        title={faqPageClose.heading}
        text={faqPageClose.body}
        cta={faqPageClose.cta}
        href={faqPageClose.ctaHref}
      />
    </PageContainer>
  );
}
