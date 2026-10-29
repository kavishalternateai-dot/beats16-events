import Link from "next/link";
import { PhoneLink } from "@/components/contact-links";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PlanActions({
  source,
  primary = "Plan your music",
  onDark = false,
  onSindoor = false,
  className,
}: {
  source: string;
  primary?: string;
  onDark?: boolean;
  onSindoor?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap", className)}>
      <Link
        href={`/contact?source=${source}#inquiry-form`}
        className={cn(
          buttonVariants({ size: "cta" }),
          "enquiry-cta h-auto min-h-11 max-w-full rounded-full px-7 py-2 text-center tracking-wide whitespace-normal",
          onSindoor && "bg-kajal text-cream hover:bg-kajal/90",
        )}
      >
        {primary}
      </Link>
      <PhoneLink
        location={source}
        className={cn(
          buttonVariants({ size: "cta", variant: "outline" }),
          "h-auto min-h-11 max-w-full rounded-full px-6 py-2 text-center whitespace-normal",
          onDark || onSindoor
            ? "border-cream/70 bg-transparent text-cream hover:bg-cream hover:text-kajal"
            : "border-kajal/30 bg-transparent text-kajal hover:bg-kajal hover:text-cream",
        )}
      >
        Call Tushar ji
      </PhoneLink>
    </div>
  );
}
