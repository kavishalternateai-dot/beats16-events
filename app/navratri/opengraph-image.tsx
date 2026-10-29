import { ogImage, ogSize } from "@/lib/og";

export const alt = "Navratri garba and dandiya band by Beats16.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    title: "Navratri",
    eyebrow: "Garba · Dandiya",
    background: "#D7263D",
    color: "#FFF4E2",
  });
}
