import fs from "node:fs";
import path from "node:path";
import { bandMedia, visualSlots, type ReelSlot, type VisualKind, type VisualSlot } from "@/content/media";
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
  MEDIA_HOME_WEDDING: process.env.MEDIA_HOME_WEDDING,
  MEDIA_HOME_NAVRATRI: process.env.MEDIA_HOME_NAVRATRI,
  MEDIA_HOME_FILM: process.env.MEDIA_HOME_FILM,
  MEDIA_HOME_FILM_POSTER: process.env.MEDIA_HOME_FILM_POSTER,
  MEDIA_ABOUT_CELEBRATION: process.env.MEDIA_ABOUT_CELEBRATION,
  MEDIA_ABOUT_BAND: process.env.MEDIA_ABOUT_BAND,
  MEDIA_WEDDINGS_HERO: process.env.MEDIA_WEDDINGS_HERO,
  MEDIA_GAURI_HERO: process.env.MEDIA_GAURI_HERO,
  MEDIA_RDX_HERO: process.env.MEDIA_RDX_HERO,
  MEDIA_DAASTAN_HERO: process.env.MEDIA_DAASTAN_HERO,
  MEDIA_NAVRATRI_HERO: process.env.MEDIA_NAVRATRI_HERO,
  MEDIA_CORPORATE_HERO: process.env.MEDIA_CORPORATE_HERO,
  MEDIA_FAQ_HERO: process.env.MEDIA_FAQ_HERO,
  MEDIA_CONTACT_HERO: process.env.MEDIA_CONTACT_HERO,
  MEDIA_INDEPENDENT_HERO: process.env.MEDIA_INDEPENDENT_HERO,
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

export type ResolvedVisual = {
  id: string;
  label: string;
  alt: string;
  kind: VisualKind;
  placeholder: boolean;
  src: string | null;
  poster: string | null;
};

const IMAGE_EXT = ["jpg", "jpeg", "png", "webp"] as const;
const VIDEO_EXT = ["mp4", "webm"] as const;

function publicFileExists(publicPath: string): boolean {
  if (!publicPath.startsWith("/media/") || publicPath.includes("..")) return false;
  const root = path.resolve(process.cwd(), "public");
  const abs = path.resolve(root, `.${publicPath}`);
  if (abs !== root && !abs.startsWith(root + path.sep)) return false;
  try {
    return fs.statSync(abs).isFile();
  } catch {
    return false;
  }
}

function acceptedMediaPath(value: string, extensions: readonly string[]): string | null {
  const trimmed = value.trim();
  const match = /^\/media\/[a-z0-9][a-z0-9/_-]*\.([a-z0-9]+)$/i.exec(trimmed);
  if (!match || !extensions.includes(match[1].toLowerCase())) return null;
  return publicFileExists(trimmed) ? trimmed : null;
}

function discoverMedia(id: string, extensions: readonly string[]): string | null {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(id)) return null;
  for (const ext of extensions) {
    const candidate = `/media/${id}.${ext}`;
    if (publicFileExists(candidate)) return candidate;
  }
  return null;
}

function resolvePath(slot: VisualSlot, extensions: readonly string[]): string | null {
  const fromEnv = acceptedMediaPath(readEnv(slot.envKey), extensions);
  if (fromEnv) return fromEnv;
  const fromSrc = acceptedMediaPath(slot.src, extensions);
  if (fromSrc) return fromSrc;
  return discoverMedia(slot.id, extensions);
}

function resolvePoster(slot: VisualSlot): string | null {
  if (slot.posterEnvKey) {
    const fromEnv = acceptedMediaPath(readEnv(slot.posterEnvKey), IMAGE_EXT);
    if (fromEnv) return fromEnv;
  }
  const fromSrc = acceptedMediaPath(slot.poster, IMAGE_EXT);
  if (fromSrc) return fromSrc;
  return discoverMedia(`${slot.id}-poster`, IMAGE_EXT);
}

export function resolveVisual(id: string): ResolvedVisual {
  const slot = visualSlots[id as keyof typeof visualSlots];
  if (!slot) {
    return {
      id,
      label: "Photograph",
      alt: "",
      kind: "image",
      placeholder: true,
      src: null,
      poster: null,
    };
  }

  const extensions = slot.kind === "video" ? VIDEO_EXT : IMAGE_EXT;
  const src = resolvePath(slot, extensions);
  return {
    id: slot.id,
    label: slot.label,
    alt: slot.alt,
    kind: slot.kind,
    placeholder: src == null,
    src,
    poster: slot.kind === "video" ? resolvePoster(slot) : null,
  };
}

export function resolveVisuals(ids: readonly string[]): ResolvedVisual[] {
  return ids.map((id) => resolveVisual(id));
}
