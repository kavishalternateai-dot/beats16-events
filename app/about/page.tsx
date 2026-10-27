import type { Metadata } from "next";
import Link from "next/link";
import { aboutSeo, aboutStory } from "@/content/about";
import { InquiryClose, PageContainer, PageHero } from "@/components/blocks";
import { FounderPortrait } from "@/components/founder-portrait";
import { JsonLd } from "@/components/json-ld";
import { StorySections } from "@/components/story-view";
import { buttonVariants } from "@/components/ui/button";
import { aboutPageJsonLd, breadcrumbJsonLd, organizationJsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: aboutSeo.title,
  description: aboutSeo.description,
  path: "/about",
});

export default function AboutPage() {
  return (
    <PageContainer>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={aboutPageJsonLd({ name: aboutStory.hero.h1, description: aboutSeo.description, path: "/about" })} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,20rem)] lg:gap-x-16">
        <PageHero
          eyebrow={aboutStory.hero.eyebrow}
          title={aboutStory.hero.h1}
          lede={aboutStory.hero.subhead}
          actions={
            <div className="flex flex-col items-start gap-3">
              <Link
                href={aboutStory.hero.ctaHref}
                className={cn(buttonVariants({ size: "cta" }), "h-auto whitespace-normal px-5 py-2.5 text-center")}
              >
                {aboutStory.hero.cta}
              </Link>
              <p className="text-sm text-muted-foreground">{aboutStory.hero.note}</p>
            </div>
          }
        />
        <FounderPortrait priority className="lg:sticky lg:top-28 lg:col-start-2 lg:row-start-1 lg:row-span-2" />
        <div className="lg:col-start-1">
          <StorySections story={aboutStory} />
        </div>
      </div>
      <InquiryClose
        title={aboutStory.close.heading}
        text={aboutStory.close.body}
        cta={aboutStory.close.cta}
        href={aboutStory.close.ctaHref}
      />
    </PageContainer>
  );
}
