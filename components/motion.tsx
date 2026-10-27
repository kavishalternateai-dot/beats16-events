"use client";

import { LazyMotion, MotionConfig, domAnimation, m, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const tags = {
  div: m.div,
  section: m.section,
  li: m.li,
  aside: m.aside,
} as const;

type RevealTag = keyof typeof tags;

/**
 * One LazyMotion boundary for the site. `domAnimation` keeps the client
 * bundle to transforms, opacity, and gestures — no layout or drag runtime.
 */
export function MotionRoot({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

export function HeroItem({
  children,
  className,
  delay = 0,
  prominent = false,
  draw = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Title, lede, and actions stay opaque so they can be read and focused immediately. */
  prominent?: boolean;
  /** Draws a rule from the left. Decorative only. */
  draw?: boolean;
}) {
  const reduce = useReducedMotion();
  const initial = reduce
    ? false
    : draw
      ? { opacity: 0, scaleX: 0.15 }
      : { opacity: prominent ? 1 : 0, y: 14 };

  return (
    <m.div
      className={cn("motion-hold", draw && "origin-left", className)}
      initial={initial}
      animate={draw ? { opacity: 1, scaleX: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: draw ? 0.65 : 0.72, delay, ease }}
    >
      {children}
    </m.div>
  );
}

/**
 * Scroll reveal that stays fully visible until we know the block is off-screen.
 * Opacity never drops to zero, so keyboard focus is never on an invisible control.
 * Transform is cleared after the rise so it does not pin sticky descendants.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: RevealTag;
  labelledBy?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<"idle" | "hidden" | "shown">("idle");
  const Comp = tags[as];

  useEffect(() => {
    if (reduce !== false) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setPhase("shown");
          observer.disconnect();
          return;
        }
        setPhase((current) => (current === "idle" ? "hidden" : current));
      },
      { rootMargin: "0px 0px -64px 0px", threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduce]);

  return (
    <Comp
      ref={ref as never}
      className={cn("motion-hold", className)}
      aria-labelledby={labelledBy}
      initial={false}
      animate={phase === "hidden" ? { opacity: 0.72, y: 16 } : { opacity: 1, y: 0 }}
      transition={
        phase === "shown" ? { duration: 0.68, delay, ease } : { duration: 0 }
      }
      onAnimationComplete={() => {
        if (phase !== "shown" || !ref.current) return;
        ref.current.style.transform = "none";
      }}
    >
      {children}
    </Comp>
  );
}
