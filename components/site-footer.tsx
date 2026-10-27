import Link from "next/link";
import { footerNav, site } from "@/content/site";
import { EmailLink, PhoneLink } from "@/components/contact-links";
import { InstagramProfile } from "@/components/instagram-profile";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer
      className="border-t border-border bg-[#fbf7f0] text-foreground"
      style={{ viewTransitionName: "site-footer" }}
    >
      <div className="site-wrap grid gap-12 py-16 md:grid-cols-[1.3fr_1fr] md:py-20">
        <div>
          <p className="font-heading text-4xl tracking-tight text-primary">{site.shortName}</p>
          <p className="mt-2 text-xs font-semibold tracking-[0.16em] text-primary uppercase">{site.name}</p>
          <p className="mt-5 max-w-md leading-relaxed text-foreground/80">
            {site.city}. Indian weddings and traditional festivals, in India and abroad. Founded by {site.founder}.
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            We play Indian weddings and traditional festivals only. For other ceremonies, we decline.
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/80">{site.pricing}</p>
        </div>
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">Contact</h2>
            <ul className="mt-4 grid gap-2">
              <li>
                <PhoneLink location="footer" className="underline decoration-border underline-offset-4" />
              </li>
              <li>
                <EmailLink location="footer" className="underline decoration-border underline-offset-4" />
              </li>
              <li>
                <InstagramProfile />
              </li>
            </ul>
            <Link href="/contact" className={cn(buttonVariants({ size: "cta" }), "mt-6")}>
              Inquire
            </Link>
          </div>
          <div>
            <h2 className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">Pages</h2>
            <ul className="mt-4 grid gap-2 text-sm">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="underline-offset-4 motion-safe:transition-colors motion-safe:duration-200 hover:text-primary hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="site-wrap py-5 text-sm text-muted-foreground">{site.name}. Mumbai.</p>
      </div>
    </footer>
  );
}
