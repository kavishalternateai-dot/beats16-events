import { ogImage, ogSize } from "@/lib/og";

export const alt = "Thank you. Beats16 has received your inquiry.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    title: "Thank you",
    eyebrow: "Inquiry received",
    background: "#F4A300",
    color: "#1A0F0A",
  });
}
