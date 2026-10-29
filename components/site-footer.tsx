import Link from "next/link";
import { footerFocus, footerNav, site, WHATSAPP_NUMBER } from "@/content/site";
import { EmailLink, PhoneLink } from "@/components/contact-links";
import { InstagramProfile } from "@/components/instagram-profile";
import { Toran } from "@/components/ornament/toran";

export function SiteFooter() {
  const whatsapp = WHATSAPP_NUMBER?.replace(/[^\d]/g, "") ?? "";

  return (
    <footer className="bg-neel text-cream" style={{ viewTransitionName: "site-footer" }}>
      <div className="h-px bg-sona" />
      <div className="site-wrap grid gap-12 py-16 md:grid-cols-[1.2fr_1fr] md:py-20">
        <div>
          <p className="font-display text-6xl leading-none">{site.shortName}</p>
          <p className="mt-6 max-w-md font-display text-3xl leading-tight">Let&apos;s make it sound like your family.</p>
          <p className="mt-6 max-w-md text-cream/85">{footerFocus}</p>
        </div>
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="eyebrow text-cream/80">Contact</h2>
            <ul className="mt-4 grid gap-2">
              <li>
                <PhoneLink location="footer" className="underline decoration-sona/70 underline-offset-4" />
              </li>
              <li>
                <EmailLink location="footer" className="underline decoration-sona/70 underline-offset-4" />
              </li>
              <li>
                <InstagramProfile tone="dark" />
              </li>
              {whatsapp ? (
                <li>
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    className="underline decoration-sona/70 underline-offset-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow text-cream/80">Pages</h2>
            <ul className="mt-4 grid gap-2 text-sm">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="underline-offset-4 hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Toran tone="cream" />
      <p className="site-wrap py-5 text-sm text-cream/70">{site.name}. Mumbai.</p>
    </footer>
  );
}
