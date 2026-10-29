"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { TimelineEra } from "@/content/timeline";

export function AboutTimeline({ eras }: { eras: TimelineEra[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        node.classList.add("is-drawn");
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="site-wrap py-12 md:py-16" aria-labelledby="about-timeline">
      <h2 id="about-timeline" className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-none">
        How the story unfolds
      </h2>
      <div className="relative mt-8 max-w-3xl pl-8">
        <div ref={ref} aria-hidden="true" className="timeline-thread absolute top-0 bottom-0 left-1 w-[2px] rounded-full bg-sona" />
        <ol className="grid gap-8">
          {eras.map((era) => (
            <li key={era.id} className="min-w-0">
              <p className="eyebrow text-mor">{era.label}</p>
              {era.milestones.map((item) => (
                <div key={item.id} className="mt-2">
                  {item.year ? <p className="font-display text-2xl leading-none text-sindoor">{item.year}</p> : null}
                  <h3 className="font-display text-[clamp(1.6rem,2.5vw,2.15rem)] leading-none [overflow-wrap:anywhere]">{item.title}</h3>
                  <p className="mt-2 max-w-2xl leading-relaxed">{item.text}</p>
                  {item.image ? (
                    <div className="relative mt-4 aspect-[3/2] max-w-sm overflow-hidden rounded-2xl">
                      <Image src={item.image} alt={item.imageAlt ?? ""} fill className="object-cover" sizes="24rem" />
                    </div>
                  ) : null}
                </div>
              ))}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
