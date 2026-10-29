import { useId } from "react";
import { cn } from "@/lib/utils";

/** Shared jharokha outline, in object-bounding-box units (0–1). */
export const ARCH_D = "M0.06,1 L0.06,0.42 C0.06,0.14 0.22,0.04 0.5,0.04 C0.78,0.04 0.94,0.14 0.94,0.42 L0.94,1";

export function ArchMask({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const id = `arch-${useId().replace(/:/g, "")}`;
  return (
    <div className={cn("relative h-full w-full max-w-full", className)}>
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id={id} clipPathUnits="objectBoundingBox">
            <path d={`${ARCH_D} Z`} />
          </clipPath>
        </defs>
      </svg>
      <div className="h-full w-full max-w-full" style={{ clipPath: `url(#${id})` }}>
        {children}
      </div>
    </div>
  );
}
