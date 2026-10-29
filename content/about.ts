/**
 * About story. Confirm-lines and unconfirmed years are omitted, not shown as placeholders.
 * "Four decades" appears twice in this copy and nowhere else on the page.
 */

import type { MediaItem } from "@/content/media";
import { site } from "@/content/site";

export const aboutSeo = {
  title: "About Beats16 | Indian Wedding Music from Mumbai",
  description:
    "Tushar Sonigra started Beats16 in Mumbai. Live music for Indian weddings and festivals, with 5,000+ events and 80+ Navratris.",
} as const;

export const aboutHero = {
  eyebrow: `About ${site.name} · ${site.city}`,
  h1: "A story told in songs, one celebration at a time",
  paragraphs: [
    "Beats16 began in Mumbai with one man and a love for music.",
    "His name is Tushar Sonigra. Families call him Tushar ji.",
  ],
} as const;

export const aboutCraft = {
  heading: "Wedding by wedding, festival by festival",
  paragraphs: [
    "For four decades, Beats16 has grown with the families it plays for.",
    "One wedding led to the next. One festival led to another.",
    "Each one taught us something new.",
    "We learned that a mehendi and a sangeet do not want the same song.",
    "We learned that the pheras ask for quiet respect, not a party.",
    "We learned that a garba circle needs music that never lets it break.",
    "That is how the craft grew: by listening, one celebration at a time.",
  ],
} as const;

export const aboutBands = {
  heading: "Why we have more than one band",
  intro: [
    "A wedding needs more than one sound. So Beats16 grew more than one band.",
    "Each was born for a reason.",
  ],
  cards: [
    {
      href: "/gauri",
      title: "Gauri",
      reason: "For the rituals.",
      text: "Some moments ask for calm. Gauri plays traditional music for the pheras and wedding ceremonies. The music follows the ritual. It never takes over.",
      link: "Meet Gauri",
      tone: "haldi" as const,
    },
    {
      href: "/rdx",
      title: "RDX",
      reason: "For the sangeet.",
      text: "The best sangeet nights don't stay on one stage. RDX is our wireless band. It walks in with the family and plays among the guests, wherever the party goes.",
      link: "Meet RDX",
      tone: "rani" as const,
    },
    {
      href: "/daastan-e-ghazal",
      title: "Daastan-e-Ghazal",
      reason: "For listening.",
      text: "Not every evening needs a dance floor. Daastan-e-Ghazal brings slow, soulful ghazal evenings to cultural programmes, community gatherings and private family nights.",
      link: "Explore Daastan-e-Ghazal",
      tone: "neel" as const,
    },
    {
      href: "/navratri",
      title: "Navratri band by Beats16",
      reason: "For the circle.",
      text: "Nine nights, one circle, and music that keeps everyone moving. Our Navratri band plays live garba and dandiya, in India and around the world.",
      link: "See our Navratri band",
      tone: "bandhani" as const,
    },
  ],
  independent: "When a private show needs its own line-up, we put one together.",
} as const;

export const aboutScale = {
  heading: "5,000+ celebrations, and counting",
  paragraphs: [
    "More than 5,000 events. Weddings, festivals, cultural programmes, community gatherings and corporate events.",
    "More than 80 Navratris organised, for audiences around the world.",
    "Our home is Mumbai. Our music travels across India and abroad.",
  ],
} as const;

export const aboutBeliefs = {
  heading: "Music shaped around each function, culture held with care",
  intro: [
    "An Indian wedding is many celebrations in one.",
    "So we don't play one playlist for all of it.",
    "We plan the music for each function, so it feels connected from the first song to the last dance.",
  ],
  points: [
    {
      title: "Rituals deserve calm.",
      text: "The pheras call for music that sits gently with the moment.",
      tone: "bg-haldi text-kajal",
    },
    {
      title: "Celebrations deserve energy.",
      text: "Sangeet nights, garba and dandiya call for a full floor.",
      tone: "bg-rani-deep text-cream",
    },
    {
      title: "Evenings deserve soul.",
      text: "Cultural and community evenings call for music made for listening.",
      tone: "bg-neel text-cream",
    },
  ],
  close:
    "We play Indian weddings and traditional festivals only. That focus keeps the rituals, customs and music close to what families expect.",
} as const;

export const aboutClose = {
  heading: "Every celebration still starts with a conversation",
  paragraphs: [
    "Four decades on, one thing has not changed.",
    "Tushar ji still speaks personally with every family and organiser who gets in touch.",
    "He listens first: your date, your city, your functions, your family's customs.",
    "Then we plan the music around you.",
  ],
  cta: "Plan your music",
  ctaHref: "/contact?source=about-page#inquiry-form",
} as const;

/** Unconfirmed. The quote block stays unrendered while this is unset. */
export const aboutQuote: string | undefined = undefined;

/** Unconfirmed. The founder video stays unrendered while this is unset. */
export const aboutVideo: string | undefined = undefined;

function poster(item: MediaItem): MediaItem {
  return item;
}

export const aboutEarlyMedia = poster({
  id: "about-early",
  kind: "image",
  alt: "Beats16 in the early years.",
  ratio: "3:2",
  word: "Mumbai",
  tone: "haldi",
  envKey: "MEDIA_ABOUT_EARLY",
});

export const aboutScaleMedia = poster({
  id: "about-scale",
  kind: "image",
  alt: "A Beats16 celebration.",
  ratio: "16:9",
  word: "Navratri",
  script: "ગરબા",
  scriptFont: "gujarati",
  tone: "bandhani",
  envKey: "MEDIA_ABOUT_SCALE",
});

export const aboutCraftIds = ["gallery-mehendi", "gallery-sangeet", "gallery-pheras"] as const;
