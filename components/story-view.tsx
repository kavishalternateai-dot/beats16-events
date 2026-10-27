import Link from "next/link";
import type { ShowreelBandId } from "@/content/forms";
import type { PageStory } from "@/content/story";
import { site } from "@/content/site";
import { InquiryClose, PageContainer, PageHero, ProofStrip } from "@/components/blocks";
import { InstagramProfile } from "@/components/instagram-profile";
import { FaqList } from "@/components/faq-list";
import { ReelSection } from "@/components/instagram-embed";
import { JsonLd } from "@/components/json-ld";
import { ShowreelForm } from "@/components/showreel-form";
import { buttonVariants } from "@/components/ui/button";
import { aboutPageJsonLd, breadcrumbJsonLd, faqJsonLd, organizationJsonLd, serviceJsonLd } from "@/lib/schema";
import { resolveReels } from "@/lib/resolve-media";
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
          if (section.compact && section.heading) {
            return (
              <section key={section.heading} className="mt-16" aria-labelledby={id}>
                <ProofStrip items={section.items} label={section.heading} labelId={id} />
                {section.body ? <p className="mt-4 max-w-3xl leading-relaxed">{section.body}</p> : null}
              </section>
            );
          }
          return (
            <section key={section.heading ?? "proof"} className="mt-16" aria-labelledby={id}>
              {section.heading ? (
                <h2 id={id} className="font-heading text-3xl md:text-4xl">
                  {section.heading}
                </h2>
              ) : null}
              <div className={section.heading ? "mt-6" : undefined}>
                <ProofStrip items={section.items} />
              </div>
              {section.body ? <p className="mt-4 max-w-3xl leading-relaxed">{section.body}</p> : null}
            </section>
          );
        }

        if (section.kind === "points") {
          return (
            <section key={section.heading} className="mt-16" aria-labelledby={headingId(section.heading)}>
              <h2 id={headingId(section.heading)} className="font-heading text-3xl md:text-4xl">
                {section.heading}
              </h2>
              {section.intro ? <p className="mt-4 max-w-3xl text-lg leading-relaxed">{section.intro}</p> : null}
              <ul className="mt-6 grid gap-5 md:grid-cols-2">
                {section.points.map((point) => (
                  <li key={point.title} className="jewel-card p-6">
                    <h3 className="font-heading text-2xl">{point.title}</h3>
                    <p className="mt-2 leading-relaxed">{point.text}</p>
                  </li>
                ))}
              </ul>
              {section.note ? <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{section.note}</p> : null}
            </section>
          );
        }

        if (section.kind === "cards") {
          return (
            <section key={section.heading} className="mt-16" aria-labelledby={headingId(section.heading)}>
              <h2 id={headingId(section.heading)} className="font-heading text-3xl md:text-4xl">
                {section.heading}
              </h2>
              {section.intro ? <p className="mt-4 max-w-3xl text-lg leading-relaxed">{section.intro}</p> : null}
              <ul className="mt-6 grid gap-5 md:grid-cols-2">
                {section.cards.map((card) => (
                  <li key={card.href} className="jewel-card p-6">
                    <h3 className="font-heading text-2xl">
                      <Link href={card.href} className="underline-offset-2 hover:underline">
                        {card.title}
                      </Link>
                    </h3>
                    <p className="mt-3 leading-relaxed">{card.text}</p>
                    <Link href={card.href} className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-primary">
                      {card.link}
                    </Link>
                  </li>
                ))}
              </ul>
              {section.note ? (
                <p id="independent-bands" className="mt-4 scroll-mt-28 text-sm leading-relaxed text-muted-foreground">
                  {section.note}
                </p>
              ) : null}
            </section>
          );
        }

        if (section.kind === "steps") {
          return (
            <section key={section.heading} className="mt-16" aria-labelledby={headingId(section.heading)}>
              <h2 id={headingId(section.heading)} className="font-heading text-3xl md:text-4xl">
                {section.heading}
              </h2>
              <ol className="mt-6 grid max-w-3xl list-decimal gap-4 pl-5 leading-relaxed">
                {section.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              {section.note ? <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{section.note}</p> : null}
            </section>
          );
        }

        if (section.kind === "prose") {
          const paragraphs = section.paragraphs ?? (section.body ? [section.body] : []);
          return (
            <section key={section.heading} className="mt-16 max-w-3xl" aria-labelledby={headingId(section.heading)}>
              <h2 id={headingId(section.heading)} className="font-heading text-3xl md:text-4xl">
                {section.heading}
              </h2>
              <div className="mt-4 grid gap-4">
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
            </section>
          );
        }

        if (section.kind === "reel") {
          return <ReelSection key={section.heading} headingId={headingId(section.heading)} heading={section.heading} intro={section.body} reels={reels} />;
        }

        if (section.kind === "showreel" && bandId) {
          return (
            <div key={section.heading} className="mt-16 max-w-xl">
              <ShowreelForm defaultBand={bandId} heading={section.heading} intro={section.body} note={section.note} />
            </div>
          );
        }

        if (section.kind === "pricing") {
          return (
            <section key={section.heading} className="mt-16 max-w-3xl" aria-labelledby={headingId(section.heading)}>
              <h2 id={headingId(section.heading)} className="font-heading text-3xl md:text-4xl">
                {section.heading}
              </h2>
              <p className="mt-4 text-lg leading-relaxed">{site.pricing}</p>
            </section>
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
