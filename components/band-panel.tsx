"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import type { ResolvedMedia } from "@/lib/resolve-media";
import type { MediaTone } from "@/content/media";
import { dur, ease, stagger } from "@/lib/motion";
import { useMotionReady } from "@/components/motion";
import { ArchReveal } from "@/components/motion/pieces";
import { LineReveal } from "@/components/motion/line-reveal";
import { MediaFrame } from "@/components/media-frame";
import { toneClass } from "@/components/tones";
import { cn } from "@/lib/utils";

function useNarrowPanel() {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const frame = requestAnimationFrame(() => setNarrow(query.matches));
    const onChange = () => setNarrow(query.matches);
    query.addEventListener("change", onChange);
    return () => {
      cancelAnimationFrame(frame);
      query.removeEventListener("change", onChange);
    };
  }, []);
  return narrow;
}

export function BandPanel({
  name,
  href,
  promise,
  chips,
  link,
  media,
  tone,
  flip = false,
}: {
  name: string;
  href: string;
  promise: string;
  chips: string[];
  link: string;
  media: ResolvedMedia;
  tone: MediaTone;
  flip?: boolean;
}) {
  const ready = useMotionReady();
  const reduce = useReducedMotion();
  const play = ready && reduce === false;
  const colors = toneClass[tone];
  const narrow = useNarrowPanel();
  const hidden = narrow ? "inset(100% 0 0 0)" : flip ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)";

  return (
    <m.article
      className={`${colors.bg} ${colors.text} overflow-x-clip`}
      initial={play ? { clipPath: hidden } : false}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={reduce !== false ? { duration: 0.3 } : { duration: dur.medium, delay: 0.45, ease: ease.curtain }}
    >
      <div className="grid md:grid-cols-2 md:items-stretch">
        <div className={cn("order-2 min-w-0 max-md:max-h-[50svh] max-md:overflow-hidden", flip ? "md:order-2" : "md:order-1")}>
          <ArchReveal className="h-full max-md:max-h-[50svh] md:min-h-[28rem] md:p-8" curtainClass={colors.bg}>
            <MediaFrame item={media} fill className="h-full max-h-[50svh] w-full max-w-full md:max-h-none md:min-h-[24rem]" sizes="(min-width: 768px) 40vw, 100vw" />
          </ArchReveal>
        </div>
        <div className={cn("order-1 flex min-w-0 flex-col justify-center px-6 py-10 md:px-12 md:py-16", flip ? "md:order-1" : "md:order-2")}>
          <LineReveal as="h2" text={name} className="font-display text-[clamp(2rem,8vw,5.6rem)] leading-[0.95]" delay={0.08} />
          <m.p
            className="mt-4 max-w-md text-lg leading-snug"
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: dur.medium, delay: 0.25, ease: ease.silk }}
          >
            {promise}
          </m.p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {chips.map((chip, index) => (
              <m.li
                key={chip}
                className={`eyebrow rounded-full border px-3 py-2 ${colors.chip}`}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: dur.short, delay: 0.35 + index * stagger.card, ease: ease.silk }}
              >
                {chip}
              </m.li>
            ))}
          </ul>
          <m.div initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: dur.short, delay: 0.55, ease: ease.silk }}>
            <Link href={href} className="group mt-8 inline-flex min-h-11 items-center gap-2 text-lg font-medium">
              {link}
              <span aria-hidden="true" className="cta-arrow inline-block">
                →
              </span>
            </Link>
          </m.div>
        </div>
      </div>
    </m.article>
  );
}
