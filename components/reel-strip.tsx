"use client";

import { useState } from "react";
import { instagramProfileUrl } from "@/content/site";
import { BandhaniPattern } from "@/components/ornament/bandhani";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

let instagramScriptStarted = false;

function loadInstagramScript() {
  if (typeof document === "undefined") return;
  if (!document.querySelector('link[data-ig-preconnect="true"]')) {
    const preconnect = document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = "https://www.instagram.com";
    preconnect.dataset.igPreconnect = "true";
    document.head.appendChild(preconnect);
  }
  if (instagramScriptStarted) {
    window.instgrm?.Embeds.process();
    return;
  }
  instagramScriptStarted = true;
  const script = document.createElement("script");
  script.src = "https://www.instagram.com/embed.js";
  script.async = true;
  script.dataset.igEmbed = "true";
  script.onload = () => window.instgrm?.Embeds.process();
  document.body.appendChild(script);
}

export function ReelStrip({
  urls,
  toneClassName,
}: {
  urls: string[];
  toneClassName: string;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const profile = instagramProfileUrl();

  if (urls.length === 0) {
    if (!profile) return null;
    return (
      <a
        href={profile}
        target="_blank"
        rel="noopener noreferrer"
        className={`lift-card relative block w-full max-w-xs overflow-hidden rounded-2xl ${toneClassName}`}
      >
        <span className="relative flex aspect-[9/16] flex-col items-center justify-end gap-4 overflow-hidden bg-inherit p-5">
          <span aria-hidden="true" className="reel-play relative grid size-14 place-items-center rounded-full bg-cream text-2xl text-kajal">
            ▶
          </span>
          <span className="relative text-center font-display text-3xl leading-none">
            Watch us on Instagram
            <span className="sr-only"> (opens in a new tab)</span>
          </span>
          <span className="relative text-sm">@beats16bytushar</span>
        </span>
      </a>
    );
  }

  return (
    <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
      {urls.map((url) => {
        const loaded = open === url;
        return (
          <li key={url} className="w-[70%] max-w-xs shrink-0 snap-start">
            {loaded ? (
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                style={{ background: "#FFF4E2", border: 0, margin: 0, maxWidth: "100%", width: "100%" }}
              >
                <a href={url}>View this reel on Instagram</a>
              </blockquote>
            ) : (
              <button
                type="button"
                className={`group relative flex aspect-[9/16] w-full items-end overflow-hidden rounded-2xl p-4 text-left ${toneClassName}`}
                onClick={() => {
                  setOpen(url);
                  loadInstagramScript();
                }}
              >
                <BandhaniPattern />
          <span aria-hidden="true" className="reel-play relative grid size-12 place-items-center rounded-full bg-cream text-lg text-kajal">
                  ▶
                </span>
                <span className="sr-only">Load Instagram reel</span>
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
