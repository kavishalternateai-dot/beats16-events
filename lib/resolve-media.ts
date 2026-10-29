import fs from "node:fs";
import path from "node:path";
import { chooseMosaic } from "@/lib/mosaic-layout";
import {
  MEDIA,
  showreelSources,
  type GalleryTag,
  type MediaItem,
  type MediaKind,
  type MediaRatio,
  type MediaTone,
  type ScriptFont,
} from "@/content/media";
import type { ShowreelBandId } from "@/content/forms";

const INSTAGRAM_PERMALINK = /^https:\/\/(www\.)?instagram\.com\/(reel|p)\/[A-Za-z0-9_-]+\/?/i;

const IMAGE_EXT = ["jpg", "jpeg", "png", "webp", "avif"] as const;
const VIDEO_EXT = ["mp4", "webm"] as const;

/**
 * Static `process.env.NAME` reads so Next can inline them at build time.
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
  MEDIA_HOME_HERO: process.env.MEDIA_HOME_HERO,
  MEDIA_HOME_HERO_POSTER: process.env.MEDIA_HOME_HERO_POSTER,
  MEDIA_FOUNDER: process.env.MEDIA_FOUNDER,
  MEDIA_GALLERY_MEHENDI: process.env.MEDIA_GALLERY_MEHENDI,
  MEDIA_GALLERY_SANGEET: process.env.MEDIA_GALLERY_SANGEET,
  MEDIA_GALLERY_PHERAS: process.env.MEDIA_GALLERY_PHERAS,
  MEDIA_GALLERY_RECEPTION: process.env.MEDIA_GALLERY_RECEPTION,
  MEDIA_GALLERY_GARBA: process.env.MEDIA_GALLERY_GARBA,
  MEDIA_GALLERY_DANDIYA: process.env.MEDIA_GALLERY_DANDIYA,
  MEDIA_GALLERY_GHAZAL: process.env.MEDIA_GALLERY_GHAZAL,
  MEDIA_GALLERY_BARAAT: process.env.MEDIA_GALLERY_BARAAT,
  MEDIA_GALLERY_BARAAT_POSTER: process.env.MEDIA_GALLERY_BARAAT_POSTER,
  MEDIA_WEDDINGS_HERO: process.env.MEDIA_WEDDINGS_HERO,
  MEDIA_GAURI_HERO: process.env.MEDIA_GAURI_HERO,
  MEDIA_GAURI_PHOTO_1: process.env.MEDIA_GAURI_PHOTO_1,
  MEDIA_GAURI_PHOTO_2: process.env.MEDIA_GAURI_PHOTO_2,
  MEDIA_GAURI_PHOTO_3: process.env.MEDIA_GAURI_PHOTO_3,
  MEDIA_RDX_HERO: process.env.MEDIA_RDX_HERO,
  MEDIA_RDX_PHOTO_1: process.env.MEDIA_RDX_PHOTO_1,
  MEDIA_RDX_PHOTO_2: process.env.MEDIA_RDX_PHOTO_2,
  MEDIA_RDX_PHOTO_3: process.env.MEDIA_RDX_PHOTO_3,
  MEDIA_DAASTAN_HERO: process.env.MEDIA_DAASTAN_HERO,
  MEDIA_GHAZAL_PHOTO_1: process.env.MEDIA_GHAZAL_PHOTO_1,
  MEDIA_GHAZAL_PHOTO_2: process.env.MEDIA_GHAZAL_PHOTO_2,
  MEDIA_GHAZAL_PHOTO_3: process.env.MEDIA_GHAZAL_PHOTO_3,
  MEDIA_NAVRATRI_HERO: process.env.MEDIA_NAVRATRI_HERO,
  MEDIA_NAVRATRI_PHOTO_1: process.env.MEDIA_NAVRATRI_PHOTO_1,
  MEDIA_NAVRATRI_PHOTO_2: process.env.MEDIA_NAVRATRI_PHOTO_2,
  MEDIA_NAVRATRI_PHOTO_3: process.env.MEDIA_NAVRATRI_PHOTO_3,
  MEDIA_ABOUT_EARLY: process.env.MEDIA_ABOUT_EARLY,
  MEDIA_ABOUT_SCALE: process.env.MEDIA_ABOUT_SCALE,
};

function readEnv(key: string | undefined): string {
  if (!key) return "";
  return envValues[key]?.trim() ?? "";
}

export type ResolvedMedia = {
  id: string;
  kind: MediaKind;
  alt: string;
  ratio: MediaRatio;
  word: string;
  script?: string;
  scriptFont?: ScriptFont;
  tone: MediaTone;
  col: number;
  row: number;
  src: string | null;
  poster: string | null;
  credit?: string;
  empty: boolean;
};

export type ResolvedShowreel = {
  url: string;
  filename: string;
  external: true;
};

function publicFileExists(publicPath: string): boolean {
  if (!publicPath.startsWith("/") || publicPath.includes("..")) return false;
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
  if (!trimmed) return null;
  if (/^https:\/\//i.test(trimmed)) return trimmed;
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

function extensionsFor(kind: MediaKind): readonly string[] {
  return kind === "video" ? VIDEO_EXT : IMAGE_EXT;
}

export function resolveMedia(item: MediaItem): ResolvedMedia {
  const extensions = extensionsFor(item.kind);
  const fromEnv = acceptedMediaPath(readEnv(item.envKey), extensions);
  const fromSrc = item.src ? acceptedMediaPath(item.src, extensions) : null;
  const src = fromEnv || fromSrc || discoverMedia(item.id, extensions);
  const posterExtensions = IMAGE_EXT;
  const poster =
    acceptedMediaPath(readEnv(item.posterEnvKey), posterExtensions) ||
    (item.poster ? acceptedMediaPath(item.poster, posterExtensions) : null) ||
    (item.kind === "video" ? discoverMedia(`${item.id}-poster`, posterExtensions) : null);

  return {
    id: item.id,
    kind: item.kind,
    alt: item.alt,
    ratio: item.ratio,
    word: item.word,
    script: item.script,
    scriptFont: item.scriptFont,
    tone: item.tone,
    col: item.col ?? 2,
    row: item.row ?? 1,
    src,
    poster,
    credit: item.credit,
    empty: src == null,
  };
}

export function resolveGallery(tag: GalleryTag): ResolvedMedia[] {
  return MEDIA.gallery.filter((item) => item.tags?.includes(tag)).map((item) => resolveMedia(item));
}

/** With fewer than four photographs, keep every poster slot so the grid stays full. */
export function mosaicItems(items: ResolvedMedia[]): ResolvedMedia[] {
  return chooseMosaic(items);
}

export function resolveReelUrls(urls: readonly string[], envKeys: readonly string[] = []): string[] {
  const found: string[] = [];
  const raw = [...urls, ...envKeys.map((key) => readEnv(key))];
  for (const value of raw) {
    const match = INSTAGRAM_PERMALINK.exec(value.trim());
    if (!match) continue;
    const permalink = match[0].replace(/\/?$/, "/");
    if (!found.includes(permalink)) found.push(permalink);
  }
  return found;
}

function isHttpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

export function resolveShowreel(bandId: ShowreelBandId): ResolvedShowreel | null {
  const media = showreelSources[bandId];
  const configured = readEnv(media.showreelEnvKey) || (media.showreelUrl ?? "").trim();
  if (!isHttpsUrl(configured)) return null;
  return {
    url: configured,
    filename: media.showreelFilename,
    external: true,
  };
}
