import type { Metadata } from "next";
import Link from "next/link";
import { aboutSeo, aboutStory } from "@/content/about";
import { InquiryClose, PageContainer, PageHero, SplitHero } from "@/components/blocks";
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
      <SplitHero
        media={<FounderPortrait priority />}
        copy={
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
        }
      />
      <StorySections story={aboutStory} />
      <InquiryClose
        title={aboutStory.close.heading}
        text={aboutStory.close.body}
        cta={aboutStory.close.cta}
        href={aboutStory.close.ctaHref}
      />
    </PageContainer>
  );
}
