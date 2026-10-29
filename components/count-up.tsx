"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";
import { useMotionReady } from "@/components/motion";

function format(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

export function CountUp({ value, className }: { value: string; className?: string }) {
  const ready = useMotionReady();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const match = /^(\d[\d,]*)(\+)?$/.exec(value.trim());
  const target = match ? Number(match[1].replace(/,/g, "")) : null;
  const [shown, setShown] = useState<number | null>(null);
  const [plusOn, setPlusOn] = useState(false);
  const play = ready && reduce === false && target != null;

  useEffect(() => {
    if (!play || !inView || target == null) return;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: ease.silk,
      onUpdate: (latest) => setShown(Math.round(latest)),
      onComplete: () => setPlusOn(true),
    });
    return () => controls.stop();
  }, [inView, play, target]);

  if (target == null) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      <span className={play ? "sr-only" : undefined}>{value}</span>
      {play ? (
        <span aria-hidden="true">
          {format(shown ?? 0)}
          <span style={{ opacity: plusOn ? 1 : 0 }}>+</span>
        </span>
      ) : null}
    </span>
  );
}
