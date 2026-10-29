import { cn } from "@/lib/utils";

export function Toran({ className, tone = "sona" }: { className?: string; tone?: "sona" | "cream" }) {
  const fill = tone === "cream" ? "#FFF4E2" : "#C9A227";
  return (
    <svg viewBox="0 0 1200 14" preserveAspectRatio="none" aria-hidden="true" className={cn("block h-3 w-full", className)}>
      <g fill={fill}>
        {Array.from({ length: 40 }, (_, index) => {
          const x = index * 30 + 8;
          return <path key={index} d={`M${x} 1 L${x + 8} 13 L${x - 8} 13 Z`} />;
        })}
      </g>
    </svg>
  );
}
