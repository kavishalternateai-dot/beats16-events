import { cn } from "@/lib/utils";

export function WaveEdge({
  fill = "var(--sindoor)",
  className,
  flip = false,
}: {
  fill?: string;
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("block h-8 w-full md:h-12", flip && "-scale-y-100", className)}
    >
      <path
        fill={fill}
        d="M0 30C160 46 280 10 460 18C660 28 760 48 960 30C1140 14 1280 26 1440 18V48H0Z"
      />
    </svg>
  );
}

export function BrushEdge({
  fill = "var(--kesar-cream)",
  className,
}: {
  fill?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 1440 36"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("block h-6 w-full md:h-9", className)}
    >
      <path
        fill={fill}
        d="M0 18C80 6 120 28 220 16C340 2 420 24 540 14C700 0 780 30 940 16C1100 2 1220 26 1440 12V36H0Z"
      />
    </svg>
  );
}
