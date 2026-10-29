"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

const ReadyContext = createContext(false);

export function useMotionReady() {
  return useContext(ReadyContext);
}

export function MotionRoot({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.motionReady = "true";
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <ReadyContext.Provider value={ready}>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LazyMotion>
    </ReadyContext.Provider>
  );
}

export function HeroItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  prominent?: boolean;
  draw?: boolean;
}) {
  return <div className={className}>{children}</div>;
}

export function Reveal({
  children,
  className,
  as = "div",
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "aside";
  labelledBy?: string;
}) {
  const Tag = as;
  return (
    <Tag className={className} aria-labelledby={labelledBy}>
      {children}
    </Tag>
  );
}
