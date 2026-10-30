/** Inquiry and showreel option labels. Values are stored exactly as shown. */

export const eventTypes = [
  "Wedding",
  "Navratri",
  "Other traditional festival / religious celebration",
  "Cultural programme / ghazal evening",
  "Community gathering",
  "Corporate event",
] as const;

/** Older page links used the AQ-002–006 labels. Map them onto the current list. */
export const legacyEventTypes: Record<string, (typeof eventTypes)[number]> = {
  "Navratri, garba, or dandiya": "Navratri",
  "Religious celebration": "Other traditional festival / religious celebration",
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
  "Directory listing",
  "Other",
] as const;

export const inquiryMessages = {
  nameShort: "Please enter your name.",
  nameLong: "Name must be 80 characters or fewer.",
  phone: "Please enter a phone number we can call.",
  emailMissing: "Please enter your email address.",
  emailInvalid: "Please check your email address. It should look like name@gmail.com.",
  eventType: "Choose an event type.",
  city: "Tell us the city or venue.",
} as const;

export const bandInterestLabel = {
  gauri: "Gauri",
  rdx: "RDX",
  "daastan-e-ghazal": "Daastan-e-Ghazal",
  navratri: "Navratri band by Beats16",
} as const satisfies Record<string, (typeof bandInterests)[number]>;

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
