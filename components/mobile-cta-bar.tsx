import Link from "next/link";
import { PhoneLink } from "@/components/contact-links";

export function MobileCtaBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/70 bg-[#f7f1e6] pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_30px_-24px_rgb(28_20_18/0.8)] md:hidden"
      style={{ viewTransitionName: "mobile-cta" }}
    >
      <div className="grid grid-cols-2">
        <PhoneLink
          location="mobile_bar"
          className="inline-flex min-h-12 items-center justify-center border-r border-gold/40 text-base font-medium text-[#3c1520]"
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
