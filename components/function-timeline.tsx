"use client";

import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import { dur, ease, inViewMobile, rise, stagger } from "@/lib/motion";
import { useMotionReady } from "@/components/motion";
import { toneClass } from "@/components/tones";
import type { MediaTone } from "@/content/media";

export function FunctionTimeline({
  items,
}: {
  items: readonly {
    title: string;
    tone: MediaTone;
    line: string;
    detail?: string;
    href: string;
    link: string;
  }[];
}) {
  const ready = useMotionReady();
  const reduce = useReducedMotion();
  const play = ready && reduce === false;

  return (
    <ul className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 md:grid md:grid-cols-4 md:overflow-visible">
      {items.map((item, index) => {
        const tone = toneClass[item.tone];
        return (
          <m.li
            key={item.title}
            className={`flex w-[78%] shrink-0 snap-start flex-col rounded-3xl p-6 md:w-auto ${tone.bg} ${tone.text}`}
            initial={play ? { opacity: 0, y: rise } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewMobile}
            transition={{ duration: dur.medium, delay: index * stagger.card, ease: ease.silk }}
          >
            <h3 className="font-display text-4xl leading-none">{item.title}</h3>
            <p className="mt-4 leading-relaxed">{item.line}</p>
            {item.detail ? <p className="mt-3 text-sm leading-relaxed opacity-90">{item.detail}</p> : null}
            <Link href={item.href} className="mt-auto inline-flex min-h-11 items-center pt-5 font-medium underline-offset-4 hover:underline">
              {item.link}
            </Link>
          </m.li>
        );
      })}
    </ul>
  );
}
