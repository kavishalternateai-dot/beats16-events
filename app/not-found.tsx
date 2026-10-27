import Link from "next/link";
import { PageContainer, PageHero } from "@/components/blocks";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Page not found | Beats16",
  description: "That page is not on the Beats16 site. Visit the inquiry form, or call +91 9820133078.",
  path: "/404",
  index: false,
});

export default function NotFound() {
  return (
    <PageContainer>
      <PageHero
        eyebrow="404"
        title="That page is not here."
        lede="The address may be old, or the page was never on this site. The inquiry form is the surest next step."
        actions={
          <Link href="/contact" className="font-semibold text-primary underline underline-offset-2">
            Go to the inquiry form
          </Link>
        }
      />
    </PageContainer>
  );
}
