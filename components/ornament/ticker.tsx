"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const ITEMS = [
  { label: "Mehendi", script: false },
  { label: "मेहंदी", script: "devanagari" as const },
  { label: "Sangeet", script: false },
  { label: "संगीत", script: "devanagari" as const },
  { label: "Pheras", script: false },
  { label: "Reception", script: false },
  { label: "Garba", script: false },
  { label: "ગરબા", script: "gujarati" as const },
  { label: "Dandiya", script: false },
  { label: "Ghazal", script: false },
  { label: "ग़ज़ल", script: "devanagari" as const },
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <span className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <span key={`${hidden ? "b" : "a"}-${item.label}`} className="flex items-center">
          <span
            className={
              item.script === "gujarati"
                ? "font-gujarati px-3 text-2xl"
                : item.script === "devanagari"
                  ? "font-devanagari px-3 text-2xl"
                  : "px-3 font-display text-xl tracking-tight"
            }
          >
            {item.label}
          </span>
          <span aria-hidden="true" className="text-sona">
            ·
          </span>
        </span>
      ))}
    </span>
  );
}

export function Ticker() {
  const ref = useRef<HTMLDivElement>(null);
  const [hold, setHold] = useState(true);
  const [off, setOff] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduce !== false) return;
    const observer = new IntersectionObserver(([entry]) => {
      setOff(!entry?.isIntersecting);
    });
    observer.observe(node);
    const timer = window.setTimeout(() => setHold(false), 1800);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [reduce]);

  return (
    <div ref={ref} className={(hold || off) ? "ticker is-paused overflow-hidden bg-sindoor text-cream" : "ticker overflow-hidden bg-sindoor text-cream"}>
      <div className="ticker-track flex w-max py-3">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
