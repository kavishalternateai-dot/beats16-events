import Link from "next/link";
import { bandNav } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Page not found | Beats16",
  description: "That page is not on the Beats16 site. Visit the inquiry form, or call +91 9820133078.",
  path: "/404",
  index: false,
});

export default function NotFound() {
  return (
    <div className="site-wrap pt-32 pb-16">
      <p className="eyebrow text-sindoor">404</p>
      <h1 className="display-title mt-4">That page is not here.</h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed">
        The address may be old, or the page was never on this site.
      </p>
      <ul className="mt-8 flex flex-wrap gap-3">
        {bandNav.map((band) => (
          <li key={band.href}>
            <Link href={band.href} className="inline-flex min-h-11 items-center rounded-full bg-chandan px-4 font-medium">
              {band.label}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/contact" className="inline-flex min-h-11 items-center rounded-full bg-sindoor px-4 font-medium text-cream">
            Plan your music
          </Link>
        </li>
      </ul>
    </div>
  );
}
