import type { ShowreelBandId } from "@/content/forms";

/**
 * Copy / media swap: reel permalinks and showreel URLs.
 *
 * Leave `permalink` or `showreelUrl` empty until a real link exists.
 * A real Instagram permalink looks like https://www.instagram.com/reel/SHORTCODE/
 * A real showreel URL is an https link (for example a Drive file).
 *
 * Photographs and performance films use `visualSlots` below.
 * Drop a file in `public/media/` named `{id}.jpg` (or png, webp; mp4 or webm for films)
 * and redeploy. Optional poster: `{id}-poster.jpg`.
 * Or set `src` here, or the matching `MEDIA_*` env var, to a `/media/...` path.
 *
 * Environment variables override these values at build time without a code edit.
 * Redeploy after changing either the file or the env vars.
 * See .env.example for the variable names.
 */

export type ReelSlot = {
  id: string;
  title: string;
  /** Full permalink. Empty means the slot is a labeled placeholder. */
  permalink: string;
  envKey: string;
};

export type BandMedia = {
  reels: ReelSlot[];
  /** https URL. Empty means the gated download is the placeholder PDF. */
  showreelUrl: string;
  showreelEnvKey: string;
  showreelFilename: string;
};

export const bandMedia: Record<ShowreelBandId, BandMedia> = {
  gauri: {
    showreelUrl: "",
    showreelEnvKey: "SHOWREEL_GAURI_URL",
    showreelFilename: "gauri-showreel-placeholder.pdf",
    reels: [
      {
        id: "gauri-1",
        title: "Gauri reel 1",
        permalink: "",
        envKey: "REEL_GAURI_1",
      },
      {
        id: "gauri-2",
        title: "Gauri reel 2",
        permalink: "",
        envKey: "REEL_GAURI_2",
      },
    ],
  },
  rdx: {
    showreelUrl: "",
    showreelEnvKey: "SHOWREEL_RDX_URL",
    showreelFilename: "rdx-showreel-placeholder.pdf",
    reels: [
      {
        id: "rdx-1",
        title: "RDX reel 1",
        permalink: "",
        envKey: "REEL_RDX_1",
      },
      {
        id: "rdx-2",
        title: "RDX reel 2",
        permalink: "",
        envKey: "REEL_RDX_2",
      },
    ],
  },
  "daastan-e-ghazal": {
    showreelUrl: "",
    showreelEnvKey: "SHOWREEL_DAASTAN_URL",
    showreelFilename: "daastan-e-ghazal-showreel-placeholder.pdf",
    reels: [
      {
        id: "daastan-1",
        title: "Daastan-e-Ghazal reel 1",
        permalink: "",
        envKey: "REEL_DAASTAN_1",
      },
      {
        id: "daastan-2",
        title: "Daastan-e-Ghazal reel 2",
        permalink: "",
        envKey: "REEL_DAASTAN_2",
      },
    ],
  },
  navratri: {
    showreelUrl: "",
    showreelEnvKey: "SHOWREEL_NAVRATRI_URL",
    showreelFilename: "navratri-showreel-placeholder.pdf",
    reels: [
      {
        id: "navratri-1",
        title: "Navratri reel 1",
        permalink: "",
        envKey: "REEL_NAVRATRI_1",
      },
      {
        id: "navratri-2",
        title: "Navratri reel 2",
        permalink: "",
        envKey: "REEL_NAVRATRI_2",
      },
    ],
  },
  independent: {
    showreelUrl: "",
    showreelEnvKey: "SHOWREEL_INDEPENDENT_URL",
    showreelFilename: "independent-showreel-placeholder.pdf",
    reels: [
      {
        id: "independent-1",
        title: "Independent band reel 1",
        permalink: "",
        envKey: "REEL_INDEPENDENT_1",
      },
      {
        id: "independent-2",
        title: "Independent band reel 2",
        permalink: "",
        envKey: "REEL_INDEPENDENT_2",
      },
    ],
  },
};

export type VisualKind = "image" | "video";

export type VisualSlot = {
  id: string;
  /** Short scene name. Shown on the empty frame and as the caption. */
  label: string;
  /** Honest description for when the file is present. */
  alt: string;
  /** Public path such as /media/gauri-hero.jpg. Empty uses auto-discovery. */
  src: string;
  poster: string;
  envKey: string;
  posterEnvKey: string;
  kind: VisualKind;
};

function visual(slot: {
  id: string;
  label: string;
  alt: string;
  envKey: string;
  kind?: VisualKind;
}): VisualSlot {
  return {
    id: slot.id,
    label: slot.label,
    alt: slot.alt,
    src: "",
    poster: "",
    envKey: slot.envKey,
    posterEnvKey: slot.kind === "video" ? `${slot.envKey}_POSTER` : "",
    kind: slot.kind ?? "image",
  };
}

/**
 * Future photos and films. Empty until Kavish shares files.
 * See the file comment for how a file plugs in.
 */
export const visualSlots = {
  "home-wedding": visual({
    id: "home-wedding",
    label: "Wedding",
    alt: "Beats16 performing at an Indian wedding.",
    envKey: "MEDIA_HOME_WEDDING",
  }),
  "home-navratri": visual({
    id: "home-navratri",
    label: "Navratri",
    alt: "Beats16 performing at a Navratri celebration.",
    envKey: "MEDIA_HOME_NAVRATRI",
  }),
  "home-film": visual({
    id: "home-film",
    label: "A live performance",
    alt: "A film of Beats16 performing live.",
    envKey: "MEDIA_HOME_FILM",
    kind: "video",
  }),
  "about-celebration": visual({
    id: "about-celebration",
    label: "A celebration",
    alt: "Beats16 at a wedding or festival.",
    envKey: "MEDIA_ABOUT_CELEBRATION",
  }),
  "about-band": visual({
    id: "about-band",
    label: "The band",
    alt: "The Beats16 band.",
    envKey: "MEDIA_ABOUT_BAND",
  }),
  "weddings-hero": visual({
    id: "weddings-hero",
    label: "A wedding",
    alt: "Live music at an Indian wedding.",
    envKey: "MEDIA_WEDDINGS_HERO",
  }),
  "gauri-hero": visual({
    id: "gauri-hero",
    label: "Gauri at a ceremony",
    alt: "Gauri performing at a wedding ceremony.",
    envKey: "MEDIA_GAURI_HERO",
  }),
  "rdx-hero": visual({
    id: "rdx-hero",
    label: "RDX at a sangeet",
    alt: "RDX performing at a sangeet.",
    envKey: "MEDIA_RDX_HERO",
  }),
  "daastan-hero": visual({
    id: "daastan-hero",
    label: "A ghazal evening",
    alt: "Daastan-e-Ghazal performing at an evening gathering.",
    envKey: "MEDIA_DAASTAN_HERO",
  }),
  "navratri-hero": visual({
    id: "navratri-hero",
    label: "A Navratri night",
    alt: "The Navratri band by Beats16 performing garba and dandiya.",
    envKey: "MEDIA_NAVRATRI_HERO",
  }),
  "corporate-hero": visual({
    id: "corporate-hero",
    label: "A gathering",
    alt: "Beats16 performing at a cultural or community gathering.",
    envKey: "MEDIA_CORPORATE_HERO",
  }),
  "faq-hero": visual({
    id: "faq-hero",
    label: "A celebration",
    alt: "Beats16 performing at a celebration.",
    envKey: "MEDIA_FAQ_HERO",
  }),
  "contact-hero": visual({
    id: "contact-hero",
    label: "A celebration",
    alt: "Beats16 performing at a celebration.",
    envKey: "MEDIA_CONTACT_HERO",
  }),
  "independent-hero": visual({
    id: "independent-hero",
    label: "A private show",
    alt: "An independent Beats16 band at a private show.",
    envKey: "MEDIA_INDEPENDENT_HERO",
  }),
} as const satisfies Record<string, VisualSlot>;

const heroSlots = {
  "/weddings": "weddings-hero",
  "/gauri": "gauri-hero",
  "/rdx": "rdx-hero",
  "/daastan-e-ghazal": "daastan-hero",
  "/navratri": "navratri-hero",
  "/corporate-cultural": "corporate-hero",
  "/faq": "faq-hero",
  "/contact": "contact-hero",
} as const;

export function heroSlotId(path: string): string | null {
  if (path in heroSlots) return heroSlots[path as keyof typeof heroSlots];
  return null;
}
