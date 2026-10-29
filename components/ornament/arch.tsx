import { useId } from "react";
import { cn } from "@/lib/utils";

export function ArchMask({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const id = `arch-${useId().replace(/:/g, "")}`;
  return (
    <div className={cn("relative h-full w-full", className)}>
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id={id} clipPathUnits="objectBoundingBox">
            <path d="M0,1 L0,0.4 C0,0.12 0.2,0.02 0.5,0.02 C0.8,0.02 1,0.12 1,0.4 L1,1 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="h-full w-full" style={{ clipPath: `url(#${id})` }}>
        {children}
      </div>
    </div>
  );
}
