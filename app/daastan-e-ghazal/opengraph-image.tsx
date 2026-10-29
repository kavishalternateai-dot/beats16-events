import { ogImage, ogSize } from "@/lib/og";

export const alt = "Daastan-e-Ghazal by Beats16. Live ghazal evenings.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    title: "Daastan-e-Ghazal",
    eyebrow: "Ghazal evenings",
    background: "#231A4F",
    color: "#FFF4E2",
  });
}
