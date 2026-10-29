"use client";

import { useEffect, useRef, type ReactNode, type Ref } from "react";
import { m, useAnimation, useInView, useReducedMotion } from "motion/react";
import { dur, ease, inViewMobile, rise } from "@/lib/motion";
import { useMotionReady } from "@/components/motion";
import { cn } from "@/lib/utils";

export function FadeUp({
  children,
  className,
  delay = 0,
  distance = rise,
  pace = 1,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  pace?: number;
}) {
  const ready = useMotionReady();
  const reduce = useReducedMotion();
  const play = ready && reduce === false;

  if (!play) return <div className={className}>{children}</div>;

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: Math.min(1.6, dur.medium * pace), delay, ease: ease.silk }}
    >
      {children}
    </m.div>
  );
}

export function ColorWipe({
  children,
  className,
  from = "left",
  pace = 1,
}: {
  children: ReactNode;
  className?: string;
  from?: "left" | "right";
  pace?: number;
}) {
  const ready = useMotionReady();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, inViewMobile);
  const controls = useAnimation();
  const play = ready && reduce === false;
  const narrow = useRef(false);

  useEffect(() => {
    narrow.current = window.matchMedia("(max-width: 767px)").matches;
  }, []);

  useEffect(() => {
    if (!play || !inView) return;
    const hidden = narrow.current
      ? "inset(100% 0 0 0)"
      : from === "right"
        ? "inset(0 0 0 100%)"
        : "inset(0 100% 0 0)";
    controls.set({ clipPath: hidden });
    const frame = requestAnimationFrame(() => {
      controls.start({
        clipPath: "inset(0% 0% 0% 0%)",
        transition: { duration: Math.min(1.6, dur.medium * pace), ease: ease.curtain },
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [controls, from, inView, pace, play]);

  if (reduce !== false && ready) {
    return (
      <m.div ref={ref} className={className} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        {children}
      </m.div>
    );
  }

  return (
    <m.div ref={ref} className={cn("overflow-x-clip", className)} initial={false} animate={controls}>
      {children}
    </m.div>
  );
}

export function ArchReveal({
  children,
  className,
  curtainClass = "bg-kajal",
  pace = 1,
}: {
  children: ReactNode;
  className?: string;
  curtainClass?: string;
  pace?: number;
}) {
  const ready = useMotionReady();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, inViewMobile);
  const controls = useAnimation();
  const curtain = useAnimation();
  const play = ready && reduce === false;

  useEffect(() => {
    if (!play || !inView) return;
    controls.set({ scale: 1.12, y: rise });
    curtain.set({ scaleY: 1 });
    const frame = requestAnimationFrame(() => {
      controls.start({
        scale: 1,
        y: 0,
        transition: { duration: Math.min(1.6, dur.long * pace), ease: ease.silk },
      });
      curtain.start({
        scaleY: 0,
        transition: { duration: Math.min(1.6, dur.medium * pace), ease: ease.curtain },
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [controls, curtain, inView, pace, play]);

  return (
    <div ref={ref as Ref<HTMLDivElement>} className={cn("relative h-full overflow-x-clip", className)}>
      <m.div className="h-full" initial={false} animate={controls}>
        {children}
      </m.div>
      {play ? (
        <m.div
          aria-hidden="true"
          className={cn("pointer-events-none absolute inset-0 origin-top", curtainClass)}
          initial={false}
          animate={curtain}
        />
      ) : null}
    </div>
  );
}
