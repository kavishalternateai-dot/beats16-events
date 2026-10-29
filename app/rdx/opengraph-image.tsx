import { ogImage, ogSize } from "@/lib/og";

export const alt = "RDX by Beats16. Wireless band for sangeet and private events.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    title: "RDX",
    eyebrow: "Sangeet · Private events",
    background: "#C21E77",
    color: "#FFF4E2",
  });
}
