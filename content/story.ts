import type { FaqItem } from "@/content/faqs";

/** Shared shape for approved page packages (AQ-002 through AQ-006). */

export type ProofLine = {
  value: string;
  detail: string;
};

export type StorySection =
  | { kind: "proof"; heading?: string; items: ProofLine[]; body?: string; compact?: boolean }
  | {
      kind: "points";
      heading: string;
      intro?: string;
      points: { title: string; text: string }[];
      note?: string;
    }
  | {
      kind: "cards";
      heading: string;
      intro?: string;
      cards: { href: string; title: string; text: string; link: string }[];
      note?: string;
    }
  | { kind: "steps"; heading: string; steps: string[]; note?: string }
  | {
      kind: "prose";
      heading: string;
      body?: string;
      paragraphs?: string[];
      link?: { href: string; label: string };
      /** Renders the founder Instagram slot. Hidden link until INSTAGRAM_HANDLE is set. */
      instagram?: boolean;
    }
  | { kind: "reel"; heading: string; body: string }
  | { kind: "showreel"; heading: string; body: string; note: string }
  | { kind: "pricing"; heading: string };

export type PageStory = {
  hero: {
    eyebrow: string;
    h1: string;
    subhead: string;
    cta: string;
    ctaHref: string;
    note: string;
  };
  sections: StorySection[];
  faqs: FaqItem[];
  faqHeading: string;
  close: {
    heading: string;
    body: string;
    cta: string;
    ctaHref: string;
  };
};

export function inquiryHref(query: Record<string, string>) {
  return `/contact?${new URLSearchParams(query).toString()}#inquiry-form`;
}

export const standardProof: ProofLine[] = [
  { value: "40 years", detail: "of music at family celebrations" },
  { value: "5,000+ events", detail: "weddings, festivals and gatherings" },
  { value: "80+ Navratris", detail: "organised, for audiences around the world" },
];
