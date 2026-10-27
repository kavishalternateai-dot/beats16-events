import { independentBand } from "@/content/bands";
import { PlaceholderMedia } from "@/components/placeholder-media";
import { ReelSection } from "@/components/instagram-embed";
import { ShowreelForm } from "@/components/showreel-form";
import { resolveReels } from "@/lib/resolve-media";

export function IndependentBandSection() {
  const reels = resolveReels(independentBand.id);

  return (
    <section id="independent-bands" aria-labelledby="independent-bands-title" className="mt-20 scroll-mt-28">
      <p className="text-sm font-semibold tracking-[0.14em] text-primary uppercase">{independentBand.eyebrow}</p>
      <h2 id="independent-bands-title" className="mt-3 max-w-3xl font-heading text-3xl tracking-tight md:text-5xl">
        {independentBand.title}
      </h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed">{independentBand.lede}</p>
      <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="grid gap-4 leading-relaxed">
          {independentBand.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <PlaceholderMedia label={independentBand.mediaLabel} pattern={independentBand.mediaPattern} />
        </div>
        <ShowreelForm defaultBand="independent" />
      </div>
      <ReelSection headingId="independent-reels" reels={reels} />
    </section>
  );
}
