import Image from "next/image";
import type { ResolvedMedia } from "@/lib/resolve-media";
import { PosterTile } from "@/components/poster-tile";
import { ratioClass } from "@/components/tones";
import { cn } from "@/lib/utils";

export function MediaFrame({
  item,
  priority = false,
  className,
  sizes = "(min-width: 1024px) 40rem, 100vw",
  controls = false,
  fill = false,
}: {
  item: ResolvedMedia;
  priority?: boolean;
  className?: string;
  sizes?: string;
  controls?: boolean;
  /** Stretch to the parent instead of locking an aspect ratio. */
  fill?: boolean;
}) {
  if (item.empty || !item.src) {
    return <PosterTile item={item} fill={fill} className={className} />;
  }

  if (item.kind === "video") {
    return (
      <div className={cn("relative overflow-hidden bg-kajal", fill ? "h-full w-full" : ratioClass(item.ratio), className)}>
        <video
          className="h-full w-full object-cover"
          controls={controls}
          playsInline
          muted
          loop
          preload="metadata"
          poster={item.poster ?? undefined}
          aria-label={item.alt}
        >
          {item.src.endsWith(".webm") ? <source src={item.src} type="video/webm" /> : null}
          <source src={item.src} type={item.src.endsWith(".webm") ? "video/webm" : "video/mp4"} />
        </video>
      </div>
    );
  }

  const remote = item.src.startsWith("https://");
  return (
    <div className={cn("relative max-w-full overflow-hidden bg-chandan", fill ? "h-full w-full" : ratioClass(item.ratio), className)}>
      <Image
        src={item.src}
        alt={item.alt}
        fill
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        sizes={sizes}
        unoptimized={remote}
        className="object-cover"
      />
    </div>
  );
}
