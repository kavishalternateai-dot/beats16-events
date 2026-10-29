"use client";

import { useEffect, useRef, useState } from "react";
import type { ResolvedMedia } from "@/lib/resolve-media";
import { FadeUp } from "@/components/motion/pieces";
import { LineReveal } from "@/components/motion/line-reveal";
import { BandhaniPattern } from "@/components/ornament/bandhani";
import { Equaliser } from "@/components/ornament/equaliser";
import { GoldThread } from "@/components/ornament/gold-thread";
import { PlanActions } from "@/components/plan-actions";

export function HomeHero({
  media,
  eyebrow,
  title,
  subhead,
}: {
  media: ResolvedMedia;
  eyebrow: string;
  title: string;
  subhead: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const [saveData, setSaveData] = useState(false);
  const [armed, setArmed] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const [reduce, setReduce] = useState(false);
  const paused = userPaused === true || reduce || (saveData && !armed);
  const hasVideo = Boolean(media.src && media.kind === "video");
  const posterFirst = narrow || saveData;
  const showVideo = (hasVideo && Boolean(media.src) && !posterFirst) || (hasVideo && armed);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(motion.matches);
    apply();
    motion.addEventListener("change", apply);
    return () => motion.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const frame = requestAnimationFrame(() => {
      setNarrow(query.matches);
      const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
      const slow = connection?.effectiveType === "2g" || connection?.effectiveType === "slow-2g" || connection?.effectiveType === "3g";
      if (connection?.saveData || slow) setSaveData(true);
    });
    const onChange = () => setNarrow(query.matches);
    query.addEventListener("change", onChange);
    return () => {
      cancelAnimationFrame(frame);
      query.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => {
      const visible = Boolean(entry?.isIntersecting);
      root.classList.toggle("is-off", !visible);
      const video = videoRef.current;
      if (!video || !hasVideo) return;
      if (!visible || paused) video.pause();
      else video.play().catch(() => setUserPaused(true));
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, [hasVideo, paused]);

  return (
    <section ref={rootRef} className="relative isolate min-h-[88svh] overflow-x-clip text-cream md:min-h-[100svh]" aria-labelledby="home-title">
      {showVideo && media.src ? (
        <div className="hero-media absolute inset-0">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            playsInline
            muted
            loop
            autoPlay={!posterFirst && !reduce}
            preload="metadata"
            poster={media.poster ?? undefined}
            aria-hidden="true"
          >
            {media.src.endsWith(".webm") ? <source src={media.src} type="video/webm" /> : null}
            <source src={media.src} type={media.src.endsWith(".webm") ? "video/webm" : "video/mp4"} media="(min-width: 768px)" />
            <source src={media.src} type="video/mp4" media="(max-width: 767px)" />
          </video>
        </div>
      ) : (
        <div className="hero-media absolute inset-0 overflow-hidden">
          <div className="hero-drift absolute top-0 -left-1/2 h-full w-[200%]" />
          <BandhaniPattern className="text-cream" />
        </div>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-kajal via-kajal/80 to-transparent" />
      <div className="site-wrap relative flex min-h-[88svh] min-w-0 flex-col justify-end pb-24 pt-28 md:min-h-[100svh] md:pb-16">
        <Equaliser className="mb-4" />
        <p className="eyebrow max-w-full text-cream/90">{eyebrow}</p>
        <GoldThread className="mt-3" delay={0.15} />
        <LineReveal
          as="h1"
          id="home-title"
          text={title}
          lineWords={[3, 2, 5]}
          className="home-display mt-4 max-w-full"
          delay={0.08}
          wordStagger={0.06}
        />
        <FadeUp hero delay={0.62} className="mt-5 max-w-xl">
          <p className="text-lg leading-relaxed text-cream">{subhead}</p>
        </FadeUp>
        <FadeUp hero delay={0.78}>
          <PlanActions source="home-page" onDark className="mt-8" />
        </FadeUp>
      </div>
      {hasVideo && posterFirst && !armed ? (
        <button
          type="button"
          className="absolute right-4 bottom-24 z-10 inline-flex h-11 items-center rounded-full bg-cream px-4 text-sm font-medium text-kajal"
          onClick={() => {
            setArmed(true);
            setUserPaused(false);
          }}
        >
          Play film
        </button>
      ) : null}
      {showVideo ? (
        <button
          type="button"
          onClick={() => setUserPaused((current) => !(current ?? false))}
          className="absolute right-4 bottom-24 z-10 inline-flex size-11 items-center justify-center rounded-full bg-kajal/80 text-sm font-medium text-cream md:bottom-4"
          aria-pressed={paused}
          aria-label={paused ? "Play hero film" : "Pause hero film"}
        >
          {paused ? "Play" : "Pause"}
        </button>
      ) : null}
    </section>
  );
}
