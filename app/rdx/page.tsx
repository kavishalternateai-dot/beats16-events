import type { Metadata } from "next";
import { BandScreen } from "@/components/band-page";
import { getBandPage } from "@/content/bands";
import { pageMetadata } from "@/lib/seo";

const band = getBandPage("rdx");

export const metadata: Metadata = pageMetadata({
  title: band.metaTitle,
  description: band.metaDescription,
  path: band.href,
});

export default function RdxPage() {
  return <BandScreen bandId="rdx" />;
}
