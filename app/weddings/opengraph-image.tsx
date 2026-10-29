import { ogImage, ogSize } from "@/lib/og";

export const alt = "Music for every function of your Indian wedding. Beats16, Mumbai.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    title: "Weddings",
    eyebrow: "Beats16",
    background: "#C21E77",
    color: "#FFF4E2",
  });
}
