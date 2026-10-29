import { ogImage, ogSize } from "@/lib/og";

export const alt = "About Beats16. Indian wedding and festival music from Mumbai.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    title: "About Beats16",
    eyebrow: "Mumbai",
    background: "#FFF4E2",
    color: "#1A0F0A",
  });
}
