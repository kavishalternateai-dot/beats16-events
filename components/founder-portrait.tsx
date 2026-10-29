import type { ResolvedMedia } from "@/lib/resolve-media";
import { MediaFrame } from "@/components/media-frame";
import { ArchMask } from "@/components/ornament/arch";
import { ArchThread } from "@/components/ornament/gold-thread";

export function FounderPortrait({
  item,
  priority = false,
  sizes,
}: {
  item: ResolvedMedia;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full min-w-0 max-w-full overflow-hidden max-md:max-h-[55vh]">
      <ArchMask className="absolute inset-0">
        <MediaFrame item={item} priority={priority} quality={priority ? 60 : undefined} fill className="h-full w-full" sizes={sizes} />
      </ArchMask>
      <ArchThread />
    </div>
  );
}
