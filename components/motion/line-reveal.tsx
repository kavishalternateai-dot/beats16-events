"use client";

import { m, useReducedMotion } from "motion/react";
import { dur, ease, stagger } from "@/lib/motion";
import { useMotionReady } from "@/components/motion";
import { cn } from "@/lib/utils";

function splitLines(text: string, max = 32) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (current && next.length > max) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export function LineReveal({
  as: Tag = "h2",
  text,
  className,
  id,
  delay = 0,
  pace = 1,
  wordStagger,
  script,
  scriptClassName,
}: {
  as?: "h1" | "h2";
  text: string;
  className?: string;
  id?: string;
  delay?: number;
  pace?: number;
  wordStagger?: number;
  script?: string;
  scriptClassName?: string;
}) {
  const ready = useMotionReady();
  const reduce = useReducedMotion();
  const play = ready && reduce === false;
  const lines = splitLines(text);
  const words = text.split(/\s+/);
  const lead = words.slice(0, 8);
  const rest = words.slice(8).join(" ");
  const step = (wordStagger ?? stagger.word) * (pace > 1 ? 1 : 1);
  const mobileStep = wordStagger ?? 0.05;
  const duration = Math.min(1.6, dur.medium * pace);

  return (
    <Tag id={id} aria-label={play ? text : undefined} className={cn("relative", className)}>
      {play ? (
        <>
          <span aria-hidden="true" className="hidden md:block">
            {lines.map((line, index) => (
              <span key={`${line}-${index}`} className="block overflow-hidden">
                <m.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration, ease: ease.silk, delay: delay + index * step }}
                >
                  {line}
                </m.span>
              </span>
            ))}
          </span>
          <span aria-hidden="true" className="block md:hidden">
            {lead.map((word, index) => (
              <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
                <m.span
                  className="inline-block"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration, ease: ease.silk, delay: delay + index * mobileStep }}
                >
                  {word}
                  {index < lead.length - 1 ? "\u00a0" : ""}
                </m.span>
              </span>
            ))}
            {rest ? <span> {rest}</span> : null}
          </span>
          {script ? (
            <m.span
              aria-hidden="true"
              className={cn("pointer-events-none absolute -top-6 right-0 text-5xl leading-none", scriptClassName)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.12 }}
              transition={{ duration: Math.min(1.6, dur.long * pace), ease: ease.silk, delay: delay + duration }}
            >
              {script}
            </m.span>
          ) : null}
        </>
      ) : (
        text
      )}
    </Tag>
  );
}
