import type { ResolvedReel } from "@/lib/resolve-media";
import { sectionTitleClass } from "@/components/blocks";
import { Reveal } from "@/components/motion";

export function InstagramEmbed({ reel }: { reel: ResolvedReel }) {
  if (reel.placeholder || !reel.embedUrl) {
    return (
      <figure className="min-w-0">
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-[0_24px_24px_-24px_rgb(28_20_18/0.16)]">
          <div
            className="relative flex aspect-[9/16] flex-col justify-end bg-[radial-gradient(ellipse_at_30%_12%,rgb(166_132_70/0.16),transparent_55%),linear-gradient(180deg,#fffcf8,#f4ebdd)] p-4"
            aria-hidden="true"
          >
            <div className="pointer-events-none absolute inset-3 rounded-md border border-[color-mix(in_srgb,var(--gold)_45%,transparent)]" />
            <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-primary uppercase">Film coming</p>
            <p className="mt-2 font-heading text-2xl leading-tight text-foreground">{reel.title}</p>
          </div>
        </div>
        <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Film coming. {reel.title}.
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="min-w-0">
      <iframe
        src={reel.embedUrl}
        title={reel.title}
        width={320}
        height={560}
        className="aspect-[9/16] h-auto w-full rounded-lg border border-border bg-card"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
      />
      <figcaption className="mt-3 text-sm text-muted-foreground">{reel.title}</figcaption>
    </figure>
  );
}

export function ReelSection({
  headingId,
  reels,
  heading = "Watch a reel",
  intro = "Short films will appear here.",
}: {
  headingId: string;
  reels: ResolvedReel[];
  heading?: string;
  intro?: string;
}) {
  return (
    <Reveal as="section" labelledBy={headingId} className="section-block">
      <h2 id={headingId} className={sectionTitleClass}>
        {heading}
      </h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/80">{intro}</p>
      <ul className="mt-8 grid max-w-3xl items-start gap-6 sm:grid-cols-2">
        {reels.map((reel) => (
          <li key={reel.id}>
            <InstagramEmbed reel={reel} />
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
