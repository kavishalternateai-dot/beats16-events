import type { CSSProperties } from "react";
import type { ResolvedMedia } from "@/lib/resolve-media";
import { BandhaniPattern } from "@/components/ornament/bandhani";
import { Equaliser } from "@/components/ornament/equaliser";
import { ratioClass, scriptClass, toneClass } from "@/components/tones";
import { cn } from "@/lib/utils";

export function PosterTile({
  item,
  className,
  fill = false,
}: {
  item: Pick<ResolvedMedia, "word" | "script" | "scriptFont" | "tone" | "ratio">;
  className?: string;
  fill?: boolean;
}) {
  const tone = toneClass[item.tone];
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative isolate flex h-full w-full min-w-0 flex-col overflow-hidden",
        fill ? "aspect-auto" : ratioClass(item.ratio),
        tone.bg,
        tone.text,
        className,
      )}
      style={{ containerType: "inline-size" } as CSSProperties}
    >
      <BandhaniPattern multi={item.tone === "bandhani"} />
      {item.script ? (
        <span
          className={cn(
            "pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden px-2 text-center leading-none opacity-20 [font-size:clamp(1.35rem,30cqw,5rem)]",
            scriptClass(item.scriptFont),
          )}
        >
          {item.script}
        </span>
      ) : null}
      <Equaliser onLight={item.tone === "haldi"} className="absolute top-3 left-3 z-[1] h-7" />
      <p className="relative z-[1] mt-auto max-w-full px-3 pb-4 font-display leading-[0.95] [overflow-wrap:anywhere] [font-size:clamp(1.05rem,16cqw,3.2rem)]">
        {item.word}
      </p>
    </div>
  );
}
