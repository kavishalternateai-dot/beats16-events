"use client";

import { useEffect, useId, useRef, useState } from "react";
import { m, useReducedMotion } from "motion/react";
import { dur, ease } from "@/lib/motion";
import { useMotionReady } from "@/components/motion";
import { cn } from "@/lib/utils";

let active = false;
const waiters: Array<() => void> = [];

function acquire(run: () => void) {
  if (!active) {
    active = true;
    run();
    return;
  }
  waiters.push(run);
}

function release() {
  const next = waiters.shift();
  if (next) next();
  else active = false;
}

function useThreadDraw(delay = 0) {
  const ready = useMotionReady();
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const [run, setRun] = useState(false);
  const granted = useRef(false);

  useEffect(() => {
    if (!ready || reduce !== false) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || granted.current) return;
        observer.disconnect();
        acquire(() => {
          granted.current = true;
          setRun(true);
        });
      },
      { threshold: 0.6 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ready, reduce]);

  useEffect(() => {
    if (!run) return;
    const timer = window.setTimeout(() => release(), (delay + dur.long + dur.short) * 1000);
    return () => window.clearTimeout(timer);
  }, [run, delay]);

  const drawn = !ready || reduce !== false;
  return { ref, drawn, run, reduce };
}

export function GoldThread({ className, delay = 0 }: { className?: string; delay?: number }) {
  const { ref, drawn, run } = useThreadDraw(delay);
  const show = drawn || run;

  return (
    <svg ref={ref} viewBox="0 0 120 16" aria-hidden="true" className={cn("block h-4 w-28", className)}>
      <m.path
        d="M4 8 H116"
        stroke="#C9A227"
        strokeWidth="1.5"
        fill="none"
        vectorEffect="non-scaling-stroke"
        initial={false}
        animate={{ pathLength: show ? 1 : 0, opacity: show ? 1 : 1 }}
        transition={{ duration: drawn ? 0 : dur.long, ease: ease.curtain, delay: drawn ? 0 : delay }}
      />
      <m.circle
        cx="60"
        cy="8"
        r="2.2"
        fill="#C9A227"
        initial={false}
        animate={{ scale: show ? 1 : 0 }}
        transition={{ duration: drawn ? 0 : dur.short, ease: ease.silk, delay: drawn ? 0 : delay + dur.long }}
        style={{ originX: "60px", originY: "8px" }}
      />
    </svg>
  );
}

export function ArchThread({ className }: { className?: string }) {
  const { ref, drawn, run } = useThreadDraw(0);
  const show = drawn || run;
  const id = useId().replace(/:/g, "");

  return (
    <svg
      ref={ref}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    >
      <m.path
        id={id}
        d="M6,100 L6,42 C6,14 22,4 50,4 C78,4 94,14 94,42 L94,100"
        stroke="#C9A227"
        strokeWidth="1.5"
        fill="none"
        vectorEffect="non-scaling-stroke"
        initial={false}
        animate={{ pathLength: show ? 1 : 0, opacity: show ? 1 : 1 }}
        transition={{ duration: drawn ? 0 : dur.long, ease: ease.curtain }}
      />
    </svg>
  );
}

export function ToranDraw({ className }: { className?: string }) {
  const { ref, drawn, run } = useThreadDraw(0);
  const show = drawn || run;
  const peaks = Array.from({ length: 18 }, (_, index) => {
    const x = 8 + index * 16;
    return `M${x} 14 L${x + 8} 2 L${x + 16} 14`;
  }).join(" ");

  return (
    <svg ref={ref} viewBox="0 0 304 16" preserveAspectRatio="none" aria-hidden="true" className={cn("block h-4 w-full", className)}>
      <m.path
        d={peaks}
        stroke="#C9A227"
        strokeWidth="1.5"
        fill="none"
        vectorEffect="non-scaling-stroke"
        initial={false}
        animate={{ pathLength: show ? 1 : 0, opacity: show ? 1 : 1 }}
        transition={{ duration: drawn ? 0 : dur.long, ease: ease.curtain }}
      />
    </svg>
  );
}
