import Image from "next/image";
import portrait from "@/assets/tushar-sonigra.jpg";
import { cn } from "@/lib/utils";

const alt = "Portrait of Tushar Sonigra, founder of Beats16 Events & Entertainment.";

export function FounderPortrait({
  tone = "light",
  priority = false,
  settle = true,
  className,
}: {
  tone?: "light" | "dark";
  priority?: boolean;
  /** Skip the entrance shift when this figure is position: sticky. */
  settle?: boolean;
  className?: string;
}) {
  const onDark = tone === "dark";

  return (
    <figure className={cn(settle && "portrait-enter", "mx-auto w-full max-w-[17rem] lg:mx-0 lg:max-w-none", className)}>
      <div className="bg-[#2a1218] p-2.5 shadow-[0_28px_50px_-32px_rgb(0_0_0/0.7)] sm:p-3">
        <Image
          src={portrait}
          alt={alt}
          priority={priority}
          sizes="(min-width: 1024px) 20rem, 70vw"
          quality={82}
          className="aspect-[3/4] h-auto w-full object-cover object-top"
        />
      </div>
      <figcaption className={cn("mt-3", onDark ? "text-[#f7f1e6]" : "text-foreground")}>
        <span className="block font-heading text-xl leading-tight">Tushar Sonigra</span>
        <span
          className={cn(
            "mt-1 block text-xs font-semibold tracking-[0.16em] uppercase",
            onDark ? "text-[#e4c88a]" : "text-primary",
          )}
        >
          Founder
        </span>
      </figcaption>
    </figure>
  );
}
