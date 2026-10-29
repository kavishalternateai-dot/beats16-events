import type { Metadata } from "next";
import Link from "next/link";
import { thankYouCopy, thankYouSeo } from "@/content/contact";
import { bandNav } from "@/content/site";
import { EmailLink, PhoneLink } from "@/components/contact-links";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: thankYouSeo.title,
  description: thankYouSeo.description,
  path: "/thank-you",
  index: false,
});

const dots = [
  { left: "8%", delay: "0s", color: "#F4A300", size: "10px" },
  { left: "18%", delay: "0.15s", color: "#D7263D", size: "8px" },
  { left: "30%", delay: "0.05s", color: "#E0218A", size: "12px" },
  { left: "44%", delay: "0.2s", color: "#C9A227", size: "9px" },
  { left: "58%", delay: "0.1s", color: "#F4A300", size: "11px" },
  { left: "70%", delay: "0.18s", color: "#0E6E6E", size: "8px" },
  { left: "82%", delay: "0.08s", color: "#D7263D", size: "10px" },
  { left: "92%", delay: "0.22s", color: "#E0218A", size: "7px" },
];

const bandTone: Record<string, string> = {
  "/gauri": "bg-haldi text-kajal",
  "/rdx": "bg-rani-deep text-cream",
  "/daastan-e-ghazal": "bg-neel text-cream",
  "/navratri": "bg-sindoor text-cream",
};

export default function ThankYouPage() {
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-48 overflow-hidden">
        {dots.map((dot) => (
          <span
            key={dot.left}
            className="confetti-dot absolute top-0 rounded-full"
            style={{ left: dot.left, width: dot.size, height: dot.size, background: dot.color, animationDelay: dot.delay }}
          />
        ))}
      </div>
      <div className="site-wrap relative pt-28 pb-16">
        <p className="eyebrow text-mor">{thankYouCopy.eyebrow}</p>
        <h1 className="display-title mt-4 max-w-4xl">{thankYouCopy.h1}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed">{thankYouCopy.lead}</p>
        <p className="mt-4 max-w-2xl leading-relaxed">{thankYouCopy.body}</p>
        <h2 className="mt-10 font-display text-4xl leading-none">{thankYouCopy.prepareHeading}</h2>
        <p className="mt-4">{thankYouCopy.prepare}</p>
        <ul className="mt-4 grid list-disc gap-2 pl-5">
          {thankYouCopy.prepareItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-8">
          {thankYouCopy.add} Email <EmailLink location="thank_you" className="underline underline-offset-2" /> or call{" "}
          <PhoneLink location="thank_you" className="underline underline-offset-2" />.
        </p>
        <h2 className="mt-12 font-display text-4xl leading-none">{thankYouCopy.bandsLabel}</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {bandNav.map((band) => (
            <li key={band.href}>
              <Link href={band.href} className={`lift-card block rounded-3xl p-5 font-display text-3xl leading-none ${bandTone[band.href] ?? "bg-chandan text-kajal"}`}>
                {band.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
