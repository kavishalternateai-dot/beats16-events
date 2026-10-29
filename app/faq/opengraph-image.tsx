import { ogImage, ogSize } from "@/lib/og";

export const alt = "Beats16 FAQs for weddings, sangeet, ghazal and Navratri.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    title: "Questions",
    eyebrow: "Beats16 FAQs",
    background: "#FFF4E2",
    color: "#1A0F0A",
  });
}
