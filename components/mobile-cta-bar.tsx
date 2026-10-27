import Link from "next/link";
import { PhoneLink } from "@/components/contact-links";

export function MobileCtaBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-[#fbf7f0]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
      style={{ viewTransitionName: "mobile-cta" }}
    >
      <div className="grid grid-cols-2">
        <PhoneLink
          location="mobile_bar"
          className="inline-flex min-h-12 items-center justify-center border-r border-border text-base font-medium text-foreground"
        >
          Call
        </PhoneLink>
        <Link
          href="/contact"
          className="inline-flex min-h-12 items-center justify-center bg-burgundy text-base font-medium tracking-wide text-[#f7f1e6]"
        >
          Inquire
        </Link>
      </div>
    </div>
  );
}
