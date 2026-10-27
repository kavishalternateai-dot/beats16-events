import Image from "next/image";
import portrait from "@/assets/tushar-sonigra.jpg";
import { cn } from "@/lib/utils";

const alt = "Portrait of Tushar Sonigra, founder of Beats16 Events & Entertainment.";

export function FounderPortrait({
  priority = false,
  settle = true,
  className,
}: {
  priority?: boolean;
  /** Skip the entrance shift when this figure is position: sticky. */
  settle?: boolean;
  className?: string;
}) {
  return (
    <figure className={cn(settle && "portrait-enter", "w-full", className)}>
      <div className="overflow-hidden rounded-lg border border-border bg-card p-2 shadow-[0_24px_24px_-24px_rgb(28_20_18/0.16),0_1px_2px_rgb(28_20_18/0.04)]">
        <Image
          src={portrait}
          alt={alt}
          priority={priority}
          sizes="(min-width: 1024px) 22rem, 80vw"
          quality={82}
          className="aspect-[3/4] h-auto w-full rounded-md object-cover object-top"
        />
      </div>
      <figcaption className="mt-3 text-foreground">
        <span className="block font-heading text-xl leading-tight">Tushar Sonigra</span>
        <span className="mt-1 block text-xs font-semibold tracking-[0.16em] text-primary uppercase">Founder</span>
      </figcaption>
    </figure>
  );
}
