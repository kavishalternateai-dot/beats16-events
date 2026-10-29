import { ogImage, ogSize } from "@/lib/og";

export const alt = "Beats16 Events & Entertainment, Mumbai. Indian weddings and festivals.";
export const size = ogSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return ogImage({
    title: "Live music for weddings and Navratri",
    eyebrow: "Beats16 · Mumbai",
    background: "#D7263D",
    color: "#FFF4E2",
  });
}
