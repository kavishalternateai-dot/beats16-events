import { ogImage, ogSize } from "@/lib/og";

export const alt = "Gauri by Beats16. Music for Indian wedding rituals and pheras.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    title: "Gauri",
    eyebrow: "Pheras · Rituals",
    background: "#F4A300",
    color: "#1A0F0A",
  });
}
