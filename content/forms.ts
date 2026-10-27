/** Inquiry and showreel option labels. Values are stored exactly as shown. */

export const eventTypes = [
  "Wedding",
  "Navratri",
  "Other Hindu festival / religious celebration",
  "Cultural programme / ghazal evening",
  "Community gathering",
  "Corporate event",
] as const;

/** Older page links used the AQ-002–006 labels. Map them onto the current list. */
export const legacyEventTypes: Record<string, (typeof eventTypes)[number]> = {
  "Hindu wedding": "Wedding",
  "Navratri, garba, or dandiya": "Navratri",
  "Religious celebration": "Other Hindu festival / religious celebration",
  "Ghazal, cultural programme, or community gathering": "Cultural programme / ghazal evening",
  "Sangeet or private celebration": "Wedding",
  "Corporate event": "Corporate event",
};

export const bandInterests = [
  "Not sure — please suggest",
  "Gauri",
  "RDX",
  "Daastan-e-Ghazal",
  "Navratri band by Beats16",
  "Independent band for a private show",
] as const;

export const legacyBandInterests: Record<string, (typeof bandInterests)[number]> = {
  "Gauri (Hindu wedding ceremony)": "Gauri",
  "RDX (sangeet or private)": "RDX",
  "Daastan-e-Ghazal": "Daastan-e-Ghazal",
  "Navratri band": "Navratri band by Beats16",
  "Independent band for a private show": "Independent band for a private show",
  "Not sure yet": "Not sure — please suggest",
  "More than one": "Not sure — please suggest",
};

export const functionOptions = [
  "Mehendi",
  "Sangeet",
  "Pheras",
  "Reception",
  "Navratri / garba & dandiya",
  "Ghazal evening",
  "Other",
] as const;

export const hearAboutOptions = [
  "Google search",
  "Google Maps",
  "AI assistant (ChatGPT, Gemini, etc.)",
  "YouTube",
  "Instagram",
  "Friend or family",
  "Wedding planner / venue",
  "Other",
] as const;

export const legacyHearAbout: Record<string, (typeof hearAboutOptions)[number]> = {
  "Family or friend": "Friend or family",
  Search: "Google search",
  "A community, mandal, or planner": "Wedding planner / venue",
  Other: "Other",
};

export const showreelBands = [
  { id: "gauri", name: "Gauri" },
  { id: "rdx", name: "RDX" },
  { id: "daastan-e-ghazal", name: "Daastan-e-Ghazal" },
  { id: "navratri", name: "Navratri band by Beats16" },
  { id: "independent", name: "Independent band" },
] as const;

export type ShowreelBandId = (typeof showreelBands)[number]["id"];

export function matchOption(
  value: string | null,
  options: readonly string[],
  legacy: Record<string, string> = {},
) {
  if (!value) return "";
  const trimmed = value.trim();
  if (options.includes(trimmed)) return trimmed;
  return legacy[trimmed] ?? "";
}
