import Link from "next/link";
import type { ShowreelBandId } from "@/content/forms";
import type { PageStory } from "@/content/story";
import { site } from "@/content/site";
import { InquiryClose, PageContainer, PageHero, ProofStrip, SplitHero, sectionTitleClass } from "@/components/blocks";
import { Reveal } from "@/components/motion";
import { MediaGallery, MediaSlot } from "@/components/media-slot";
import { heroSlotId } from "@/content/media";
import { resolveReels, resolveVisual, resolveVisuals } from "@/lib/resolve-media";
import { InstagramProfile } from "@/components/instagram-profile";
import { FaqList } from "@/components/faq-list";
import { ReelSection } from "@/components/instagram-embed";
import { JsonLd } from "@/components/json-ld";
import { ShowreelForm } from "@/components/showreel-form";
import { buttonVariants } from "@/components/ui/button";
import { aboutPageJsonLd, breadcrumbJsonLd, faqJsonLd, organizationJsonLd, serviceJsonLd } from "@/lib/schema";
import { cn } from "@/lib/utils";

export function StoryView({
  story,
  path,
  name,
  description,
  bandId,
  schema = "service",
}: {
  story: PageStory;
  path: string;
  name: string;
  description: string;
  bandId?: ShowreelBandId;
  schema?: "service" | "about";
}) {
  const reels = bandId ? resolveReels(bandId) : [];
  const liveReels = reels.filter((reel) => reel.embedUrl);
  const heroId = heroSlotId(path);

  return (
    <PageContainer>
      {schema === "about" ? <JsonLd data={organizationJsonLd()} /> : null}
      {schema === "about" ? (
        <JsonLd data={aboutPageJsonLd({ name: story.hero.h1, description, path })} />
      ) : (
        <JsonLd data={serviceJsonLd({ name: story.hero.h1, description, path })} />
      )}
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name, path },
        ])}
      />
      {story.faqs.length > 0 ? <JsonLd data={faqJsonLd(story.faqs)} /> : null}
      {liveReels.map((reel) => (
        <JsonLd
          key={reel.id}
          data={{
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: reel.title,
            description: story.sections.find((section) => section.kind === "reel" && "body" in section)
              ? (story.sections.find((section) => section.kind === "reel") as { body: string }).body
              : reel.title,
            embedUrl: reel.embedUrl,
            url: reel.permalink,
          }}
        />
      ))}
      <SplitHero
        media={heroId ? <MediaSlot slot={resolveVisual(heroId)} priority /> : undefined}
        copy={
          <PageHero
            eyebrow={story.hero.eyebrow}
            title={story.hero.h1}
            lede={story.hero.subhead}
            actions={
              story.hero.cta ? (
                <div className="flex flex-col items-start gap-3">
                  <Link
                    href={story.hero.ctaHref}
                    className={cn(buttonVariants({ size: "cta" }), "h-auto whitespace-normal px-5 py-2.5 text-center")}
                  >
                    {story.hero.cta}
                  </Link>
                  {story.hero.note ? <p className="text-sm text-muted-foreground">{story.hero.note}</p> : null}
                </div>
              ) : undefined
            }
          />
        }
      />

      <StorySections story={story} bandId={bandId} />

      {story.faqs.length > 0 ? <FaqList items={story.faqs} heading={story.faqHeading} /> : null}
      <InquiryClose title={story.close.heading} text={story.close.body} cta={story.close.cta} href={story.close.ctaHref} />
    </PageContainer>
  );
}

export function StorySections({
  story,
  bandId,
}: {
  story: PageStory;
  bandId?: ShowreelBandId;
}) {
  const reels = bandId ? resolveReels(bandId) : [];

  return (
    <>
      {story.sections.map((section) => {
        if (section.kind === "proof") {
          const id = section.heading ? headingId(section.heading) : undefined;
          return (
            <Reveal as="section" key={section.heading ?? "proof"} className="section-block" labelledBy={id}>
              {section.heading ? (
                <h2 id={id} className={sectionTitleClass}>
                  {section.heading}
                </h2>
              ) : null}
              <div className={section.heading ? "mt-8" : undefined}>
                <ProofStrip items={section.items} />
              </div>
              {section.body ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/80">{section.body}</p> : null}
            </Reveal>
          );
        }

        if (section.kind === "points") {
          const columns = section.points.length % 3 === 0 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2";
          return (
            <Reveal as="section" key={section.heading} className="section-block" labelledBy={headingId(section.heading)}>
              <h2 id={headingId(section.heading)} className={sectionTitleClass}>
                {section.heading}
              </h2>
              {section.intro ? <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/80">{section.intro}</p> : null}
              <ul className={cn("mt-8 grid items-stretch gap-5", columns)}>
                {section.points.map((point) => (
                  <li key={point.title} className="jewel-card p-6 md:p-7">
                    <h3 className="font-heading text-2xl leading-tight">{point.title}</h3>
                    <p className="mt-3 leading-relaxed text-foreground/80">{point.text}</p>
                  </li>
                ))}
              </ul>
              {section.note ? <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">{section.note}</p> : null}
            </Reveal>
          );
        }

        if (section.kind === "cards") {
          const columns = section.cards.length % 2 === 1 ? "sm:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2";
          return (
            <Reveal as="section" key={section.heading} className="section-block" labelledBy={headingId(section.heading)}>
              <h2 id={headingId(section.heading)} className={sectionTitleClass}>
                {section.heading}
              </h2>
              {section.intro ? <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/80">{section.intro}</p> : null}
              <ul className={cn("mt-8 grid items-stretch gap-5", columns)}>
                {section.cards.map((card) => (
                  <li key={card.href} className="jewel-card flex flex-col p-6 md:p-7">
                    <h3 className="font-heading text-2xl leading-tight">
                      <Link href={card.href} className="underline-offset-2 hover:underline">
                        {card.title}
                      </Link>
                    </h3>
                    <p className="mt-3 leading-relaxed text-foreground/80">{card.text}</p>
                    <Link href={card.href} className="mt-auto inline-flex min-h-11 items-center pt-4 text-sm font-semibold text-primary">
                      {card.link}
                    </Link>
                  </li>
                ))}
              </ul>
              {section.note ? (
                <p id="independent-bands" className="mt-5 scroll-mt-28 text-sm leading-relaxed text-muted-foreground">
                  {section.note}
                </p>
              ) : null}
            </Reveal>
          );
        }

        if (section.kind === "steps") {
          return (
            <Reveal as="section" key={section.heading} className="section-block" labelledBy={headingId(section.heading)}>
              <h2 id={headingId(section.heading)} className={sectionTitleClass}>
                {section.heading}
              </h2>
              <ol className="mt-8 grid max-w-2xl list-decimal gap-4 pl-5 text-lg leading-relaxed">
                {section.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              {section.note ? <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">{section.note}</p> : null}
            </Reveal>
          );
        }

        if (section.kind === "gallery") {
          return (
            <MediaGallery
              key={section.heading}
              headingId={headingId(section.heading)}
              heading={section.heading}
              intro={section.intro}
              slots={resolveVisuals(section.slotIds)}
            />
          );
        }

        if (section.kind === "prose") {
          const paragraphs = section.paragraphs ?? (section.body ? [section.body] : []);
          return (
            <Reveal as="section" key={section.heading} className="section-block" labelledBy={headingId(section.heading)}>
              <h2 id={headingId(section.heading)} className={sectionTitleClass}>
                {section.heading}
              </h2>
              <div className="mt-4 grid max-w-2xl gap-4">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.link ? (
                <p className="mt-4">
                  <Link
                    href={section.link.href}
                    className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-2"
                  >
                    {section.link.label}
                  </Link>
                </p>
              ) : null}
              {section.instagram ? (
                <p className="mt-6 text-lg leading-relaxed">
                  <InstagramProfile />
                </p>
              ) : null}
            </Reveal>
          );
        }

        if (section.kind === "reel") {
          return <ReelSection key={section.heading} headingId={headingId(section.heading)} heading={section.heading} intro={section.body} reels={reels} />;
        }

        if (section.kind === "showreel" && bandId) {
          return (
            <Reveal key={section.heading} className="section-block max-w-xl">
              <ShowreelForm defaultBand={bandId} heading={section.heading} intro={section.body} note={section.note} />
            </Reveal>
          );
        }

        if (section.kind === "pricing") {
          return (
            <Reveal as="section" key={section.heading} className="section-block" labelledBy={headingId(section.heading)}>
              <h2 id={headingId(section.heading)} className={sectionTitleClass}>
                {section.heading}
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed">{site.pricing}</p>
            </Reveal>
          );
        }

        return null;
      })}
    </>
  );
}

function headingId(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
