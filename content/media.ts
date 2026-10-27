import type { ShowreelBandId } from "@/content/forms";

/**
 * Copy / media swap: reel permalinks and showreel URLs.
 *
 * Leave `permalink` or `showreelUrl` empty until a real link exists.
 * A real Instagram permalink looks like https://www.instagram.com/reel/SHORTCODE/
 * A real showreel URL is an https link (for example a Drive file).
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
