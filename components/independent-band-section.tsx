import { independentBand } from "@/content/bands";
import { MediaSlot } from "@/components/media-slot";
import { ReelSection } from "@/components/instagram-embed";
import { ShowreelForm } from "@/components/showreel-form";
import { resolveReels, resolveVisual } from "@/lib/resolve-media";

export function IndependentBandSection() {
  const reels = resolveReels(independentBand.id);

  return (
    <section id="independent-bands" aria-labelledby="independent-bands-title" className="section-block scroll-mt-28">
      <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">{independentBand.eyebrow}</p>
      <h2 id="independent-bands-title" className="mt-3 max-w-3xl font-heading text-3xl leading-tight md:text-4xl">
        {independentBand.title}
      </h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/80">{independentBand.lede}</p>
      <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,22rem)] lg:gap-16">
        <div className="grid max-w-2xl gap-4 text-lg leading-relaxed">
          {independentBand.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <MediaSlot slot={resolveVisual("independent-hero")} />
      </div>
      <div className="mt-10 max-w-xl">
        <ShowreelForm defaultBand="independent" />
      </div>
      <ReelSection headingId="independent-reels" reels={reels} />
    </section>
  );
}
