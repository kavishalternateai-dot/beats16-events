import type { CSSProperties } from "react";
import type { ResolvedMedia } from "@/lib/resolve-media";
import { bentoClass, chooseMosaic } from "@/lib/mosaic-layout";
import { MediaFrame } from "@/components/media-frame";
import { cn } from "@/lib/utils";

export function Mosaic({ items, label }: { items: ResolvedMedia[]; label: string }) {
  const tiles = chooseMosaic(items);

  return (
    <ul
      className={cn(
        "mt-8 grid grid-cols-2 gap-3 md:grid-cols-6 md:[grid-auto-rows:minmax(8.5rem,auto)]",
        tiles.length === 3 && "md:grid-rows-2",
      )}
      aria-label={label}
    >
      {tiles.map((item, index) => (
        <li
          key={item.id}
          className={cn(
            "mosaic-tile group relative min-h-36 min-w-0 overflow-hidden",
            index === tiles.length - 1 && tiles.length % 2 === 1 ? "max-md:col-span-2" : "",
            bentoClass(tiles.length, index),
          )}
          style={{ "--tile-delay": `${index * 0.06}s` } as CSSProperties}
        >
          <MediaFrame item={item} fill className="mosaic-media h-full min-h-36 w-full" sizes="(min-width: 768px) 30vw, 45vw" />
          <span className="mosaic-caption pointer-events-none absolute inset-x-3 bottom-3 z-[2] translate-y-2 rounded-full bg-kajal/80 px-3 py-1 text-sm text-cream opacity-0">
            {item.word}
          </span>
          <span className="mosaic-ring pointer-events-none absolute inset-0 z-[2] opacity-0" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}
