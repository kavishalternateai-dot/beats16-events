/**
 * Single media registry. Set `src` (and `poster` for video) to show a real
 * asset. Leave `src` unset and the slot renders as a pattern poster.
 * A file at `public/media/{id}.jpg` (png, webp, or mp4/webm) is also picked up.
 * Optional `envKey` values override `src` at build time. See .env.example.
 */

export type MediaRatio = "16:9" | "4:5" | "9:16" | "1:1" | "3:2";
export type MediaKind = "image" | "video" | "reel";
export type MediaTone = "sindoor" | "haldi" | "rani" | "mor" | "neel" | "mehendi" | "bandhani";
export type GalleryTag = "home" | "wedding" | "about";
export type ScriptFont = "devanagari" | "gujarati";

export type MediaItem = {
  id: string;
  kind: MediaKind;
  src?: string;
  poster?: string;
  alt: string;
  ratio: MediaRatio;
  credit?: string;
  /** Large Latin word on an empty poster. */
  word: string;
  /** Decorative script. Never the only label. */
  script?: string;
  scriptFont?: ScriptFont;
  tone: MediaTone;
  tags?: readonly GalleryTag[];
  /** Desktop bento spans. Ignored on the mobile scroller. */
  col?: number;
  row?: number;
  envKey?: string;
  posterEnvKey?: string;
};

export type BandMedia = {
  hero: MediaItem;
  /** Instagram reel permalinks. Empty until a real URL is set. */
  reels: string[];
  reelEnvKeys?: readonly string[];
  photos: MediaItem[];
  /**
   * Real showreel file (https). Omit until the file exists.
   * The download form stays hidden while this is unset.
   */
  showreelUrl?: string;
  showreelEnvKey: string;
  showreelFilename: string;
};

function slot(item: MediaItem): MediaItem {
  return item;
}

export const MEDIA = {
  homeHero: slot({
    id: "home-hero",
    kind: "video",
    alt: "Beats16 performing live.",
    ratio: "16:9",
    word: "Beats16",
    tone: "sindoor",
    envKey: "MEDIA_HOME_HERO",
    posterEnvKey: "MEDIA_HOME_HERO_POSTER",
  }),
  founder: slot({
    id: "founder",
    kind: "image",
    src: "/media/tushar-sonigra.jpg",
    alt: "Tushar Sonigra, founder of Beats16",
    ratio: "4:5",
    word: "Tushar",
    tone: "haldi",
    envKey: "MEDIA_FOUNDER",
  }),
  gallery: [
    slot({
      id: "gallery-mehendi",
      kind: "image",
      alt: "Live music at a mehendi.",
      ratio: "4:5",
      word: "Mehendi",
      script: "मेहंदी",
      scriptFont: "devanagari",
      tone: "haldi",
      tags: ["home", "wedding", "about"],
      col: 2,
      row: 2,
      envKey: "MEDIA_GALLERY_MEHENDI",
    }),
    slot({
      id: "gallery-sangeet",
      kind: "image",
      alt: "Live music at a sangeet.",
      ratio: "9:16",
      word: "Sangeet",
      script: "संगीत",
      scriptFont: "devanagari",
      tone: "rani",
      tags: ["home", "wedding", "about"],
      col: 2,
      row: 2,
      envKey: "MEDIA_GALLERY_SANGEET",
    }),
    slot({
      id: "gallery-pheras",
      kind: "image",
      alt: "Live music at wedding pheras.",
      ratio: "3:2",
      word: "Pheras",
      tone: "mehendi",
      tags: ["home", "wedding", "about"],
      col: 2,
      row: 2,
      envKey: "MEDIA_GALLERY_PHERAS",
    }),
    slot({
      id: "gallery-reception",
      kind: "image",
      alt: "Live music at a wedding reception.",
      ratio: "16:9",
      word: "Reception",
      tone: "sindoor",
      tags: ["home", "wedding", "about"],
      col: 4,
      row: 1,
      envKey: "MEDIA_GALLERY_RECEPTION",
    }),
    slot({
      id: "gallery-garba",
      kind: "image",
      alt: "Live garba with the Navratri band by Beats16.",
      ratio: "4:5",
      word: "Garba",
      script: "ગરબા",
      scriptFont: "gujarati",
      tone: "bandhani",
      tags: ["home", "about"],
      col: 2,
      row: 2,
      envKey: "MEDIA_GALLERY_GARBA",
    }),
    slot({
      id: "gallery-dandiya",
      kind: "image",
      alt: "Live dandiya with the Navratri band by Beats16.",
      ratio: "1:1",
      word: "Dandiya",
      tone: "mor",
      tags: ["home", "about"],
      col: 2,
      row: 2,
      envKey: "MEDIA_GALLERY_DANDIYA",
    }),
    slot({
      id: "gallery-ghazal",
      kind: "image",
      alt: "A Daastan-e-Ghazal evening.",
      ratio: "4:5",
      word: "Ghazal",
      script: "ग़ज़ल",
      scriptFont: "devanagari",
      tone: "neel",
      tags: ["home", "about"],
      col: 2,
      row: 2,
      envKey: "MEDIA_GALLERY_GHAZAL",
    }),
    slot({
      id: "gallery-baraat",
      kind: "video",
      alt: "A film of Beats16 performing live.",
      ratio: "16:9",
      word: "Baraat",
      tone: "sindoor",
      tags: ["home", "wedding", "about"],
      col: 4,
      row: 1,
      envKey: "MEDIA_GALLERY_BARAAT",
      posterEnvKey: "MEDIA_GALLERY_BARAAT_POSTER",
    }),
  ],
  weddingsHero: slot({
    id: "weddings-hero",
    kind: "image",
    alt: "Live music at an Indian wedding.",
    ratio: "16:9",
    word: "Sangeet",
    script: "संगीत",
    scriptFont: "devanagari",
    tone: "rani",
    envKey: "MEDIA_WEDDINGS_HERO",
  }),
  bands: {
    gauri: {
      hero: slot({
        id: "gauri-hero",
        kind: "image",
        alt: "Gauri performing at a wedding ceremony.",
        ratio: "4:5",
        word: "Pheras",
        script: "फेरे",
        scriptFont: "devanagari",
        tone: "haldi",
        envKey: "MEDIA_GAURI_HERO",
      }),
      reels: [],
      reelEnvKeys: ["REEL_GAURI_1", "REEL_GAURI_2"],
      photos: [
        slot({
          id: "gauri-photo-1",
          kind: "image",
          alt: "Gauri at a wedding ritual.",
          ratio: "4:5",
          word: "Pheras",
          tone: "haldi",
          envKey: "MEDIA_GAURI_PHOTO_1",
        }),
        slot({
          id: "gauri-photo-2",
          kind: "image",
          alt: "Gauri with the wedding family.",
          ratio: "3:2",
          word: "Rituals",
          tone: "mehendi",
          envKey: "MEDIA_GAURI_PHOTO_2",
        }),
        slot({
          id: "gauri-photo-3",
          kind: "image",
          alt: "Gauri performing during a ceremony.",
          ratio: "1:1",
          word: "Gauri",
          tone: "haldi",
          envKey: "MEDIA_GAURI_PHOTO_3",
        }),
      ],
      showreelUrl: undefined as string | undefined,
      showreelEnvKey: "SHOWREEL_GAURI_URL",
      showreelFilename: "gauri-showreel",
    },
    rdx: {
      hero: slot({
        id: "rdx-hero",
        kind: "image",
        alt: "RDX performing at a sangeet.",
        ratio: "4:5",
        word: "Sangeet",
        script: "संगीत",
        scriptFont: "devanagari",
        tone: "rani",
        envKey: "MEDIA_RDX_HERO",
      }),
      reels: [],
      reelEnvKeys: ["REEL_RDX_1", "REEL_RDX_2"],
      photos: [
        slot({
          id: "rdx-photo-1",
          kind: "image",
          alt: "RDX at a sangeet.",
          ratio: "9:16",
          word: "Sangeet",
          script: "संगीत",
          scriptFont: "devanagari",
          tone: "rani",
          envKey: "MEDIA_RDX_PHOTO_1",
        }),
        slot({
          id: "rdx-photo-2",
          kind: "image",
          alt: "RDX playing among guests.",
          ratio: "4:5",
          word: "RDX",
          tone: "rani",
          envKey: "MEDIA_RDX_PHOTO_2",
        }),
        slot({
          id: "rdx-photo-3",
          kind: "image",
          alt: "RDX at a private event.",
          ratio: "3:2",
          word: "Party",
          tone: "sindoor",
          envKey: "MEDIA_RDX_PHOTO_3",
        }),
      ],
      showreelUrl: undefined as string | undefined,
      showreelEnvKey: "SHOWREEL_RDX_URL",
      showreelFilename: "rdx-showreel",
    },
    ghazal: {
      hero: slot({
        id: "ghazal-hero",
        kind: "image",
        alt: "Daastan-e-Ghazal performing at an evening gathering.",
        ratio: "4:5",
        word: "Ghazal",
        script: "ग़ज़ल",
        scriptFont: "devanagari",
        tone: "neel",
        envKey: "MEDIA_DAASTAN_HERO",
      }),
      reels: [],
      reelEnvKeys: ["REEL_DAASTAN_1", "REEL_DAASTAN_2"],
      photos: [
        slot({
          id: "ghazal-photo-1",
          kind: "image",
          alt: "A Daastan-e-Ghazal evening.",
          ratio: "4:5",
          word: "Ghazal",
          script: "ग़ज़ल",
          scriptFont: "devanagari",
          tone: "neel",
          envKey: "MEDIA_GHAZAL_PHOTO_1",
        }),
        slot({
          id: "ghazal-photo-2",
          kind: "image",
          alt: "Daastan-e-Ghazal performing for a seated gathering.",
          ratio: "3:2",
          word: "Mehfil",
          tone: "neel",
          envKey: "MEDIA_GHAZAL_PHOTO_2",
        }),
        slot({
          id: "ghazal-photo-3",
          kind: "image",
          alt: "Daastan-e-Ghazal at a cultural evening.",
          ratio: "1:1",
          word: "Listen",
          tone: "mor",
          envKey: "MEDIA_GHAZAL_PHOTO_3",
        }),
      ],
      showreelUrl: undefined as string | undefined,
      showreelEnvKey: "SHOWREEL_DAASTAN_URL",
      showreelFilename: "daastan-e-ghazal-showreel",
    },
    navratri: {
      hero: slot({
        id: "navratri-hero",
        kind: "image",
        alt: "The Navratri band by Beats16 performing garba and dandiya.",
        ratio: "16:9",
        word: "Garba",
        script: "ગરબા",
        scriptFont: "gujarati",
        tone: "bandhani",
        envKey: "MEDIA_NAVRATRI_HERO",
      }),
      reels: [],
      reelEnvKeys: ["REEL_NAVRATRI_1", "REEL_NAVRATRI_2"],
      photos: [
        slot({
          id: "navratri-photo-1",
          kind: "image",
          alt: "Garba with the Navratri band by Beats16.",
          ratio: "4:5",
          word: "Garba",
          script: "ગરબા",
          scriptFont: "gujarati",
          tone: "bandhani",
          envKey: "MEDIA_NAVRATRI_PHOTO_1",
        }),
        slot({
          id: "navratri-photo-2",
          kind: "image",
          alt: "Dandiya with the Navratri band by Beats16.",
          ratio: "4:5",
          word: "Dandiya",
          tone: "mor",
          envKey: "MEDIA_NAVRATRI_PHOTO_2",
        }),
        slot({
          id: "navratri-photo-3",
          kind: "image",
          alt: "A Navratri night with Beats16.",
          ratio: "16:9",
          word: "Navratri",
          tone: "sindoor",
          envKey: "MEDIA_NAVRATRI_PHOTO_3",
        }),
      ],
      showreelUrl: undefined as string | undefined,
      showreelEnvKey: "SHOWREEL_NAVRATRI_URL",
      showreelFilename: "navratri-showreel",
    },
  },
} as const satisfies {
  homeHero: MediaItem;
  founder: MediaItem;
  gallery: MediaItem[];
  weddingsHero: MediaItem;
  bands: {
    gauri: BandMedia;
    rdx: BandMedia;
    ghazal: BandMedia;
    navratri: BandMedia;
  };
};

export const showreelSources = {
  gauri: MEDIA.bands.gauri,
  rdx: MEDIA.bands.rdx,
  "daastan-e-ghazal": MEDIA.bands.ghazal,
  navratri: MEDIA.bands.navratri,
  independent: {
    showreelUrl: undefined as string | undefined,
    showreelEnvKey: "SHOWREEL_INDEPENDENT_URL",
    showreelFilename: "independent-showreel",
    reels: [] as string[],
    reelEnvKeys: ["REEL_INDEPENDENT_1", "REEL_INDEPENDENT_2"] as const,
  },
} as const;

export type MediaBandKey = keyof typeof MEDIA.bands;
