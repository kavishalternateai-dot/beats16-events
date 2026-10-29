import type { MediaRatio, MediaTone } from "@/content/media";
import { cn } from "@/lib/utils";

export const toneClass: Record<MediaTone, { bg: string; text: string; chip: string }> = {
  haldi: { bg: "bg-haldi", text: "text-kajal", chip: "border-kajal/25 text-kajal" },
  rani: { bg: "bg-rani-deep", text: "text-cream", chip: "border-cream/40 text-cream" },
  neel: { bg: "bg-neel", text: "text-cream", chip: "border-sona/60 text-cream" },
  sindoor: { bg: "bg-sindoor", text: "text-cream", chip: "border-cream/40 text-cream" },
  mor: { bg: "bg-mor", text: "text-cream", chip: "border-cream/40 text-cream" },
  mehendi: { bg: "bg-mehendi", text: "text-cream", chip: "border-cream/40 text-cream" },
  bandhani: { bg: "bandhani-hero", text: "text-cream", chip: "border-cream/40 text-cream" },
};

export function ratioClass(ratio: MediaRatio) {
  switch (ratio) {
    case "16:9":
      return "aspect-video";
    case "4:5":
      return "aspect-[4/5]";
    case "9:16":
      return "aspect-[9/16]";
    case "1:1":
      return "aspect-square";
    case "3:2":
      return "aspect-[3/2]";
  }
}

export function scriptClass(font?: "devanagari" | "gujarati") {
  return cn(font === "gujarati" ? "font-gujarati" : "font-devanagari");
}
