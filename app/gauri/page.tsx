import type { Metadata } from "next";
import { BandView } from "@/components/band-view";
import { getBandPage } from "@/content/bands";
import { pageMetadata } from "@/lib/seo";

const band = getBandPage("gauri");

export const metadata: Metadata = pageMetadata({
  title: band.metaTitle,
  description: band.metaDescription,
  path: band.href,
});

export default function GauriPage() {
  return <BandView bandId="gauri" />;
}
