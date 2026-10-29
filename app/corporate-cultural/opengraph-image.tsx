import { ogImage, ogSize } from "@/lib/og";

export const alt = "Corporate and cultural event bands from Beats16, Mumbai.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    title: "Corporate & cultural",
    eyebrow: "Beats16",
    background: "#231A4F",
    color: "#FFF4E2",
  });
}
