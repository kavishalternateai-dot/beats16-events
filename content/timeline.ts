import type { MediaTone } from "@/content/media";

/**
 * About timeline. Leave `year` and `image` unset until they are confirmed.
 * Filling either field does not change the card layout.
 * Milestones 2, 7 and 8 stay off this list until their details are confirmed.
 */
export type TimelineMilestone = {
  id: string;
  title: string;
  text: string;
  /** Shown only when a year is confirmed. */
  year?: string;
  /** Public path or remote image. Empty slots use a patterned poster. */
  image?: string;
  imageAlt?: string;
  href?: string;
  tone: MediaTone;
  word: string;
};

export type TimelineEra = {
  id: string;
  label: string;
  milestones: TimelineMilestone[];
};

export const aboutEras: TimelineEra[] = [
  {
    id: "beginning",
    label: "The beginning",
    milestones: [
      {
        id: "start",
        title: "Tushar Sonigra starts Beats16 in Mumbai",
        text: "One man, and a love for music.",
        tone: "haldi",
        word: "Mumbai",
      },
    ],
  },
  {
    id: "growing",
    label: "Growing up",
    milestones: [
      {
        id: "gauri",
        title: "Gauri",
        text: "For the rituals.",
        href: "/gauri",
        tone: "haldi",
        word: "Gauri",
      },
      {
        id: "rdx",
        title: "RDX",
        text: "For the sangeet.",
        href: "/rdx",
        tone: "rani",
        word: "RDX",
      },
      {
        id: "ghazal",
        title: "Daastan-e-Ghazal",
        text: "For listening.",
        href: "/daastan-e-ghazal",
        tone: "neel",
        word: "Ghazal",
      },
      {
        id: "navratri",
        title: "Navratri band by Beats16",
        text: "For the circle.",
        href: "/navratri",
        tone: "bandhani",
        word: "Garba",
      },
    ],
  },
  {
    id: "today",
    label: "Today",
    milestones: [
      {
        id: "today",
        title: "5,000+ events and 80+ Navratris",
        text: "Organised in India and abroad. Tushar ji still answers every inquiry personally.",
        tone: "sindoor",
        word: "Today",
      },
    ],
  },
];
