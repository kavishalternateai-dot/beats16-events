import { bandMedia, type ReelSlot } from "@/content/media";
import type { ShowreelBandId } from "@/content/forms";

const INSTAGRAM_PERMALINK =
  /^https:\/\/(www\.)?instagram\.com\/(reel|p)\/[A-Za-z0-9_-]+\/?/i;

export type ResolvedReel = {
  id: string;
  title: string;
  envKey: string;
  placeholder: boolean;
  permalink: string | null;
  embedUrl: string | null;
};

export type ResolvedShowreel = {
  url: string;
  filename: string;
  placeholder: boolean;
  external: boolean;
};

/**
 * Static `process.env.NAME` reads so Next can inline them at build time.
 * Dynamic `process.env[key]` lookups are avoided on purpose.
 */
const envValues: Record<string, string | undefined> = {
  REEL_GAURI_1: process.env.REEL_GAURI_1,
  REEL_GAURI_2: process.env.REEL_GAURI_2,
  REEL_RDX_1: process.env.REEL_RDX_1,
  REEL_RDX_2: process.env.REEL_RDX_2,
  REEL_DAASTAN_1: process.env.REEL_DAASTAN_1,
  REEL_DAASTAN_2: process.env.REEL_DAASTAN_2,
  REEL_NAVRATRI_1: process.env.REEL_NAVRATRI_1,
  REEL_NAVRATRI_2: process.env.REEL_NAVRATRI_2,
  REEL_INDEPENDENT_1: process.env.REEL_INDEPENDENT_1,
  REEL_INDEPENDENT_2: process.env.REEL_INDEPENDENT_2,
  SHOWREEL_GAURI_URL: process.env.SHOWREEL_GAURI_URL,
  SHOWREEL_RDX_URL: process.env.SHOWREEL_RDX_URL,
  SHOWREEL_DAASTAN_URL: process.env.SHOWREEL_DAASTAN_URL,
  SHOWREEL_NAVRATRI_URL: process.env.SHOWREEL_NAVRATRI_URL,
  SHOWREEL_INDEPENDENT_URL: process.env.SHOWREEL_INDEPENDENT_URL,
};

function readEnv(key: string): string {
  return envValues[key]?.trim() ?? "";
}

function permalinkFrom(slot: ReelSlot): string {
  return readEnv(slot.envKey) || slot.permalink.trim();
}

export function resolveReels(bandId: ShowreelBandId): ResolvedReel[] {
  return bandMedia[bandId].reels.map((slot) => {
    const raw = permalinkFrom(slot);
    const match = INSTAGRAM_PERMALINK.exec(raw);
    if (!match) {
      return {
        id: slot.id,
        title: slot.title,
        envKey: slot.envKey,
        placeholder: true,
        permalink: null,
        embedUrl: null,
      };
    }

    const permalink = match[0].replace(/\/?$/, "/");
    const pathname = new URL(permalink).pathname.replace(/\/?$/, "/");
    return {
      id: slot.id,
      title: slot.title,
      envKey: slot.envKey,
      placeholder: false,
      permalink,
      embedUrl: `https://www.instagram.com${pathname}embed`,
    };
  });
}

function isHttpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

export function resolveShowreel(bandId: ShowreelBandId): ResolvedShowreel {
  const media = bandMedia[bandId];
  const configured = readEnv(media.showreelEnvKey) || media.showreelUrl.trim();
  if (isHttpsUrl(configured)) {
    return {
      url: configured,
      filename: media.showreelFilename,
      placeholder: false,
      external: true,
    };
  }

  return {
    url: `/showreels/${media.showreelFilename}`,
    filename: media.showreelFilename,
    placeholder: true,
    external: false,
  };
}
