import type { ResolvedMedia } from "@/lib/resolve-media";
import { BandhaniPattern } from "@/components/ornament/bandhani";
import { ratioClass, scriptClass, toneClass } from "@/components/tones";
import { cn } from "@/lib/utils";

export function PosterTile({
  item,
  className,
}: {
  item: Pick<ResolvedMedia, "word" | "script" | "scriptFont" | "tone" | "ratio">;
  className?: string;
}) {
  const tone = toneClass[item.tone];
  return (
    <div
      aria-hidden="true"
      className={cn("relative isolate overflow-hidden", ratioClass(item.ratio), tone.bg, tone.text, className)}
    >
      <BandhaniPattern />
      {item.script ? (
        <span
          className={cn(
            "pointer-events-none absolute inset-0 flex items-center justify-center text-center text-[clamp(3.2rem,18vw,7rem)] leading-none opacity-20",
            scriptClass(item.scriptFont),
          )}
        >
          {item.script}
        </span>
      ) : null}
        <p className="relative z-[1] flex h-full items-end p-5 font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-none">
        {item.word}
      </p>
    </div>
  );
}
