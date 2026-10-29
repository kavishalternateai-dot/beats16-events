import type { CSSProperties } from "react";
import type { ResolvedMedia } from "@/lib/resolve-media";
import { BandhaniPattern } from "@/components/ornament/bandhani";
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
  const onHaldi = item.tone === "haldi";
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
      <BandhaniPattern strong={onHaldi || Boolean(item.script)} multi={item.tone === "bandhani"} />
      {item.script ? (
        <span
          className={cn(
            "pointer-events-none flex min-h-0 flex-1 items-center justify-center overflow-hidden px-4 py-5 text-center leading-[1.25] opacity-35 [font-size:clamp(1.6rem,18cqw,4.25rem)]",
            scriptClass(item.scriptFont),
          )}
        >
          {item.script}
        </span>
      ) : (
        <span className="min-h-6 flex-1" />
      )}
      <p
        className={cn(
          "relative z-[1] mt-auto max-w-full shrink-0 px-4 pt-2 pb-4 font-display leading-[1.05] [overflow-wrap:anywhere] [font-size:clamp(1.15rem,14cqw,3rem)]",
          item.tone === "bandhani" && "bg-sindoor",
        )}
      >
        {item.word}
      </p>
    </div>
  );
}
