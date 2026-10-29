"use client";

import { m, useReducedMotion } from "motion/react";
import type { ResolvedMedia } from "@/lib/resolve-media";
import { chooseMosaic } from "@/lib/mosaic-layout";
import { dur, ease, inViewMobile, rise, stagger } from "@/lib/motion";
import { useMotionReady } from "@/components/motion";
import { MediaFrame } from "@/components/media-frame";
import { cn } from "@/lib/utils";

export function Mosaic({ items, label }: { items: ResolvedMedia[]; label: string }) {
  const ready = useMotionReady();
  const reduce = useReducedMotion();
  const play = ready && reduce === false;
  const tiles = chooseMosaic(items);
  const compact = tiles.length <= 3;

  return (
    <ul
      className={
        compact
          ? "mt-8 grid grid-cols-3 gap-3"
          : "mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-6 md:overflow-visible"
      }
      aria-label={label}
    >
      {tiles.map((item, index) => (
        <m.li
          key={item.id}
          className={cn(
            "mosaic-tile group relative overflow-hidden",
            compact ? "min-w-0" : "w-[70%] shrink-0 snap-start md:w-auto",
            !compact && (item.col === 4 ? "md:col-span-4" : "md:col-span-2"),
          )}
          style={compact ? undefined : { gridRow: `span ${item.row}` }}
          initial={play ? { opacity: 0, y: rise, scale: reduce ? 1 : 1.04 } : false}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={inViewMobile}
          transition={{
            duration: reduce !== false ? dur.micro : dur.medium,
            delay: play ? index * stagger.tight : 0,
            ease: ease.silk,
          }}
        >
          <MediaFrame item={item} className="mosaic-media h-full min-h-48 md:min-h-0" sizes="(min-width: 768px) 30vw, 70vw" />
          <span className="mosaic-caption pointer-events-none absolute inset-x-3 bottom-3 translate-y-2 rounded-full bg-kajal/80 px-3 py-1 text-sm text-cream opacity-0">
            {item.word}
          </span>
          <span className="mosaic-ring pointer-events-none absolute inset-0 opacity-0" aria-hidden="true" />
        </m.li>
      ))}
    </ul>
  );
}
