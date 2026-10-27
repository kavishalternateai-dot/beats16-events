import type { ResolvedReel } from "@/lib/resolve-media";
import { sectionTitleClass } from "@/components/blocks";
import { Reveal } from "@/components/motion";

export function InstagramEmbed({ reel }: { reel: ResolvedReel }) {
  if (reel.placeholder || !reel.embedUrl) {
    return (
      <figure className="w-[min(100%,20rem)] shrink-0">
        <div className="bg-[#2a1218] p-2">
        <div
          className="relative flex aspect-[9/16] flex-col justify-end bg-[#3c1520] p-4 text-[#f7f1e6] pattern-dots"
          aria-hidden="true"
        >
          <div className="pointer-events-none absolute inset-3 border border-[#e4c88a]/50" />
          <p className="text-xs tracking-[0.14em] uppercase">Placeholder reel</p>
          <p className="mt-2 font-heading text-2xl leading-tight">{reel.title}</p>
          <p className="mt-3 text-sm leading-relaxed text-[#f6f1e8]/90">
            Placeholder — add the real Instagram reel link.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-[#f7f1e6]/75">
            Slot {reel.id}. Set {reel.envKey}, or paste the permalink in content/media.ts.
          </p>
        </div>
        </div>
        <figcaption className="mt-2 text-sm text-muted-foreground">
          Placeholder — add the real Instagram reel link. {reel.title}.
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="w-[min(100%,20rem)] shrink-0">
      <iframe
        src={reel.embedUrl}
        title={reel.title}
        width={320}
        height={560}
        className="h-[560px] w-full rounded-md border border-border bg-card"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
      />
      <figcaption className="mt-2 text-sm text-muted-foreground">{reel.title}</figcaption>
    </figure>
  );
}

export function ReelSection({
  headingId,
  reels,
  heading = "Watch a reel",
  intro = "The player sits on this page. When a real reel link is in the config, it loads as Instagram’s own embed. Empty slots stay labeled as placeholders. This site does not add follow buttons or profile links.",
}: {
  headingId: string;
  reels: ResolvedReel[];
  heading?: string;
  intro?: string;
}) {
  return (
    <Reveal as="section" labelledBy={headingId} className="section-rhythm">
      <h2 id={headingId} className={sectionTitleClass}>
        {heading}
      </h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed">{intro}</p>
      <ul className="mt-8 flex gap-5 overflow-x-auto pb-2">
        {reels.map((reel) => (
          <li key={reel.id}>
            <InstagramEmbed reel={reel} />
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
