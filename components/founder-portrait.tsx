import { getImageProps } from "next/image";
import { preload } from "react-dom";
import type { ResolvedMedia } from "@/lib/resolve-media";
import { MediaFrame } from "@/components/media-frame";
import { ArchMask } from "@/components/ornament/arch";
import { ArchThread } from "@/components/ornament/gold-thread";

const MOBILE_CROP = "/media/tushar-sonigra-mobile.jpg";
const PORTRAIT_SIZES = "(max-width: 767px) min(92vw, 44vh), 22rem";

export function FounderPortrait({
  item,
  priority = false,
  sizes = PORTRAIT_SIZES,
}: {
  item: ResolvedMedia;
  priority?: boolean;
  sizes?: string;
}) {
  if (item.empty || !item.src) {
    return (
      <div className="relative mx-auto aspect-[4/5] w-full min-w-0 max-w-full overflow-hidden max-md:max-h-[55vh]">
        <ArchMask className="absolute inset-0">
          <MediaFrame item={item} fill className="h-full w-full" sizes={sizes} />
        </ArchMask>
        <ArchThread />
      </div>
    );
  }

  const mobileSrc = item.src === "/media/tushar-sonigra.jpg" ? MOBILE_CROP : item.src;
  const shared = { alt: item.alt, sizes, fill: true as const };
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...shared, src: item.src, quality: 75 });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...shared, src: mobileSrc, quality: 60 });

  if (priority && mobile) {
    const hrefOf = (srcSet: string) => srcSet.split(",")[0]?.trim().split(/\s+/)[0] ?? rest.src;
    preload(hrefOf(mobile), {
      as: "image",
      fetchPriority: "high",
      media: "(max-width: 767px)",
      imageSrcSet: mobile,
      imageSizes: sizes,
    });
    if (desktop && mobileSrc !== item.src) {
      preload(hrefOf(desktop), {
        as: "image",
        fetchPriority: "high",
        media: "(min-width: 768px)",
        imageSrcSet: desktop,
        imageSizes: sizes,
      });
    }
  }

  return (
    <div className="relative mx-auto aspect-[4/5] w-full min-w-0 max-w-full overflow-hidden max-md:max-h-[55vh]">
      <ArchMask className="absolute inset-0">
        <div className="relative h-full w-full">
          <picture>
            {mobileSrc !== item.src && desktop ? <source media="(min-width: 768px)" srcSet={desktop} sizes={sizes} /> : null}
            <img
              {...rest}
              alt={item.alt}
              srcSet={mobile}
              sizes={sizes}
              fetchPriority={priority ? "high" : "auto"}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              className="object-cover"
            />
          </picture>
        </div>
      </ArchMask>
      <ArchThread />
    </div>
  );
}
