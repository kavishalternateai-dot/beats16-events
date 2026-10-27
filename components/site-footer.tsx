import Link from "next/link";
import { footerNav, site } from "@/content/site";
import { EmailLink, PhoneLink } from "@/components/contact-links";
import { InstagramProfile } from "@/components/instagram-profile";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className="bg-burgundy text-[#f7f1e6]" style={{ viewTransitionName: "site-footer" }}>
      <div className="h-px bg-gold" />
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-14 md:grid-cols-[1.3fr_1fr] md:px-6">
        <div>
          <p className="font-heading text-4xl tracking-tight">{site.shortName}</p>
          <p className="mt-2 text-xs font-semibold tracking-[0.16em] text-[#e4c88a] uppercase">{site.name}</p>
          <p className="mt-5 max-w-md leading-relaxed text-[#f7f1e6]/88">
            {site.city}. Indian weddings and traditional festivals, in India and abroad. Founded by {site.founder}.
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[#f7f1e6]/72">
            We play Indian weddings and traditional festivals only. For other ceremonies, we decline.
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[#f7f1e6]/88">{site.pricing}</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="text-xs font-semibold tracking-[0.16em] text-[#e4c88a] uppercase">Contact</h2>
            <ul className="mt-4 grid gap-2">
              <li>
                <PhoneLink location="footer" className="underline decoration-[#e4c88a]/70 underline-offset-4" />
              </li>
              <li>
                <EmailLink location="footer" className="underline decoration-[#e4c88a]/70 underline-offset-4" />
              </li>
              <li>
                <InstagramProfile tone="dark" />
              </li>
            </ul>
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "cta" }), "mt-6 bg-[#f7f1e6] text-[#3c1520] hover:bg-white")}
            >
              Inquire
            </Link>
          </div>
          <div>
            <h2 className="text-xs font-semibold tracking-[0.16em] text-[#e4c88a] uppercase">Pages</h2>
            <ul className="mt-4 grid gap-2 text-sm">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="underline-offset-4 motion-safe:transition-colors motion-safe:duration-200 hover:text-[#e4c88a] hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-[#f7f1e6]/15">
        <p className="mx-auto w-full max-w-6xl px-4 py-4 text-sm text-[#f7f1e6]/70 md:px-6">
          {site.name}. Mumbai.
        </p>
      </div>
    </footer>
  );
}
