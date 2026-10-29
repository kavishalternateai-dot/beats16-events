"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const SHAPE = [
  { scale: 0.45, dur: 1.7, delay: 0 },
  { scale: 0.8, dur: 2.1, delay: 0.12 },
  { scale: 0.35, dur: 1.6, delay: 0.2 },
  { scale: 0.9, dur: 2.3, delay: 0.05 },
  { scale: 0.55, dur: 1.9, delay: 0.28 },
  { scale: 0.7, dur: 2.0, delay: 0.16 },
  { scale: 0.4, dur: 1.75, delay: 0.32 },
  { scale: 0.85, dur: 2.2, delay: 0.08 },
  { scale: 0.5, dur: 1.85, delay: 0.24 },
  { scale: 0.72, dur: 2.05, delay: 0.14 },
  { scale: 0.38, dur: 1.65, delay: 0.3 },
  { scale: 0.66, dur: 1.95, delay: 0.18 },
] as const;

const ON_DARK = ["bg-cream", "bg-haldi", "bg-sona", "bg-sindoor", "bg-cream", "bg-haldi"] as const;
const ON_LIGHT = ["bg-sindoor", "bg-mor", "bg-kajal", "bg-mehendi", "bg-sindoor", "bg-mor"] as const;

export function Equaliser({ className, onLight = false }: { className?: string; onLight?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      node.classList.toggle("is-off", !entry?.isIntersecting);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className={cn("eq-bars flex h-8 items-end gap-1", className)}>
      {SHAPE.map((bar, index) => (
        <span
          key={index}
          className={cn(
            "eq-bar w-1 origin-bottom rounded-full opacity-80",
            (onLight ? ON_LIGHT : ON_DARK)[index % (onLight ? ON_LIGHT.length : ON_DARK.length)],
          )}
          style={{
            height: "100%",
            transform: `scaleY(${bar.scale})`,
            ["--eq-dur" as string]: `${bar.dur}s`,
            ["--eq-delay" as string]: `${bar.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
