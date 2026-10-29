import Image from "next/image";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function BrandLockup({
  tone = "light",
  markClassName = "h-8 md:h-10",
}: {
  tone?: "light" | "dark";
  markClassName?: string;
}) {
  return (
    <span className="flex min-w-0 items-center gap-2">
      <span className="shrink-0 rounded-md bg-cream px-1.5 py-1 ring-1 ring-sona/50">
        <Image
          src="/brand/beats16-wordmark@2x.png"
          alt=""
          width={301}
          height={174}
          className={cn("w-auto", markClassName)}
        />
      </span>
      <span
        className={cn(
          "max-w-[8.5rem] font-display text-[0.72rem] leading-[1.05] sm:max-w-[11rem] sm:text-sm lg:max-w-[12.5rem] lg:text-[1.05rem]",
          tone === "light" ? "text-cream" : "text-kajal",
        )}
      >
        {site.name}
      </span>
    </span>
  );
}
