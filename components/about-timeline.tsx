"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { TimelineEra, TimelineMilestone } from "@/content/timeline";
import { PosterTile } from "@/components/poster-tile";
import { cn } from "@/lib/utils";

function MilestoneMedia({ item }: { item: TimelineMilestone }) {
  if (item.image) {
    return (
      <div className="relative mt-4 aspect-[3/2] overflow-hidden rounded-2xl bg-chandan">
        <Image src={item.image} alt={item.imageAlt ?? ""} fill className="object-cover" sizes="(min-width: 768px) 24rem, 90vw" />
      </div>
    );
  }
  return (
    <PosterTile
      item={{ word: item.word, tone: item.tone, ratio: "3:2" }}
      className="mt-4 rounded-2xl"
    />
  );
}

function MilestoneCard({ item }: { item: TimelineMilestone }) {
  const body = (
    <article className="min-w-0 max-w-full rounded-3xl bg-chandan p-5 md:p-6">
      {item.year ? <p className="eyebrow text-mor">{item.year}</p> : null}
      <h3 className="font-display text-[clamp(1.7rem,3vw,2.4rem)] leading-none [overflow-wrap:anywhere]">{item.title}</h3>
      <p className="mt-3 leading-relaxed">{item.text}</p>
      <MilestoneMedia item={item} />
      {item.href ? <span className="mt-4 inline-flex min-h-11 items-center font-medium">See the band →</span> : null}
    </article>
  );
  if (!item.href) return body;
  return (
    <Link href={item.href} className="lift-card block min-w-0 max-w-full">
      {body}
    </Link>
  );
}

export function AboutTimeline({ eras }: { eras: TimelineEra[] }) {
  const ref = useRef<SVGSVGElement>(null);
  const milestones = eras.flatMap((era) => era.milestones);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const path = node.querySelector("path");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        path?.classList.add("is-drawn");
        observer.disconnect();
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="site-wrap relative py-14 md:py-20" aria-labelledby="about-timeline">
      <h2 id="about-timeline" className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-none">
        How the story unfolds
      </h2>
      <div className="relative mt-10">
        <svg
          ref={ref}
          viewBox="0 0 2 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none absolute top-0 bottom-0 left-1 w-3 overflow-visible md:left-1/2 md:-ml-1.5"
        >
          <path className="spine-path" d="M1 0 V100" pathLength={1} stroke="#C9A227" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
        </svg>
        <ol className="grid gap-8 md:grid-cols-2 md:gap-x-16">
          {eras.map((era) => (
            <li key={era.id} className="contents">
              <h3 className={cn("relative z-[1] justify-self-start rounded-full bg-cream py-2 pr-4 pl-8 font-display text-2xl leading-none md:col-span-2 md:justify-self-center md:px-4")}>
                {era.label}
              </h3>
              {era.milestones.map((item) => {
                const side = milestones.findIndex((entry) => entry.id === item.id) % 2;
                return (
                  <div
                    key={item.id}
                    className={cn("min-w-0 pl-8", side === 0 ? "md:col-start-1 md:pr-6 md:pl-0" : "md:col-start-2 md:pr-0 md:pl-6")}
                  >
                    <MilestoneCard item={item} />
                  </div>
                );
              })}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
