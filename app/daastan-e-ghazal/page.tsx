import type { Metadata } from "next";
import { BandView } from "@/components/band-view";
import { getBandPage } from "@/content/bands";
import { pageMetadata } from "@/lib/seo";

const band = getBandPage("daastan-e-ghazal");

export const metadata: Metadata = pageMetadata({
  title: band.metaTitle,
  description: band.metaDescription,
  path: band.href,
});

export default function DaastanPage() {
  return <BandView bandId="daastan-e-ghazal" />;
}
