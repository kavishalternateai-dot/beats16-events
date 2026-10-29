import { ogImage, ogSize } from "@/lib/og";

export const alt = "Contact Beats16 about a wedding or Navratri.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    title: "Plan your music",
    eyebrow: "Contact Beats16",
    background: "#0E6E6E",
    color: "#FFF4E2",
  });
}
