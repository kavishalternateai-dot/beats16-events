/**
 * Approved Home copy, AQ-001 (2026-10-27).
 * Do not add clients, testimonials, venues, press, or prices.
 * Founder spelling is confirmed: Tushar Sonigra.
 */

import type { FaqItem } from "@/content/faqs";
import { site } from "@/content/site";

export const homeSeo = {
  title: "Beats16 | Indian Wedding & Navratri Bands, Mumbai",
  description:
    "5,000+ events and 80+ Navratris. Beats16 brings live bands to Indian weddings and festivals across India and abroad. Send us your inquiry.",
} as const;

export const homeHero = {
  eyebrow: `${site.name} · ${site.city}`,
  /** The only public longevity line. Do not repeat it on other pages. */
  h1: "Live music for Indian weddings and Navratri, for 40 years",
  subhead:
    "From the first song at the mehendi to the last garba round. Four bands, one family, from Mumbai.",
  cta: "Plan your music",
  ctaHref: "/contact?source=home-page#inquiry-form",
  note: `Based in ${site.city}. Performing across India and abroad.`,
} as const;

export const homeProof = {
  label: "A record of celebrations",
  items: site.proof,
  support: `Started in ${site.city} by ${site.founder}. Beats16 has grown with the families and communities it plays for.`,
} as const;

export const homeGallery = {
  heading: "From the floor",
  intro: "Pictures and films from weddings, festivals and Navratri will be added here.",
  slotIds: ["home-wedding", "home-navratri", "home-film"],
} as const;

export const homeBands = {
  heading: "Four bands. Four moods.",
  intro: "Every function has its own mood. That's why we have more than one band.",
  cards: [
    {
      href: "/gauri",
      name: "Gauri",
      text: "For wedding rituals and traditional ceremonies. Music that sits gently with the pheras and the moments that matter most.",
      link: "Meet Gauri",
    },
    {
      href: "/rdx",
      name: "RDX",
      text: "Our wireless band for sangeet nights and private events. It moves with your guests, wherever the party goes.",
      link: "Meet RDX",
    },
    {
      href: "/daastan-e-ghazal",
      name: "Daastan-e-Ghazal",
      text: "Ghazal evenings for cultural, community and private events. Unhurried, soulful and made for listening.",
      link: "Explore Daastan-e-Ghazal",
    },
    {
      href: "/navratri",
      name: "Navratri band by Beats16",
      text: "Garba and dandiya nights for communities in India and around the world, from a team that has organised 80+ Navratris.",
      link: "See our Navratri band",
    },
  ],
  independent: "We also put together independent bands for private shows.",
} as const;

export const homeWeddings = {
  heading: "Weddings are our speciality",
  body: "An Indian wedding is many celebrations in one. We plan the music for each function: the colour of the mehendi, the energy of the sangeet, the calm of the pheras and the warmth of the reception. It stays connected from the first song to the last.",
  functions: "Mehendi · Sangeet · Pheras · Reception",
  link: "Plan your wedding music",
  href: "/weddings",
} as const;

export const homeAbout = {
  heading: "A family name in celebrations",
  body: `Beats16 began in ${site.city} with ${site.founder}. We have played more than 5,000 events. That includes weddings, festivals, cultural programmes, community gatherings and corporate events. We have organised over 80 Navratris. We focus on Indian weddings and traditional festivals. We bring the same care to every one.`,
  link: "Read our story",
  href: "/about",
} as const;

export const homeFaqs: FaqItem[] = [
  {
    id: "home-kinds",
    question: "What kinds of events does Beats16 play?",
    answer:
      "Indian weddings and traditional festivals such as Navratri. We also perform at cultural programmes, religious celebrations, community gatherings and corporate events.",
  },
  {
    id: "home-functions",
    question: "Can you cover every wedding function?",
    answer:
      "Yes. We plan a tailored musical concept for each function — mehendi, sangeet, pheras and reception — and suggest the band that suits each one.",
  },
  {
    id: "home-which-band",
    question: "Which band is right for my event?",
    answer:
      "Gauri suits wedding rituals and traditional ceremonies, RDX suits sangeet nights and private events, Daastan-e-Ghazal suits cultural, community and private evenings, and our Navratri band is made for garba and dandiya. Tell us about your event and we'll guide you.",
  },
  {
    id: "home-outside-mumbai",
    question: "Do you perform outside Mumbai?",
    answer:
      "Yes. We are based in Mumbai and perform across India and abroad, including Navratri events for audiences around the world.",
  },
  {
    id: "home-price",
    question: "How much does a Beats16 band cost?",
    answer: site.pricing,
  },
  {
    id: "home-availability",
    question: "How do I check if my date is available?",
    answer:
      "Send us your date, city or venue, and the functions you're planning. Tushar Sonigra will personally get back to you to discuss availability.",
  },
  {
    id: "home-navratri-abroad",
    question: "Do you organise Navratri events for communities abroad?",
    answer:
      "Yes. We have organised 80+ Navratris and bring our Navratri band to audiences in India and around the world.",
  },
];

export const homeFaqHeading = "Questions families often ask";

export const homeClose = {
  heading: "Tell us about your celebration",
  body: "Share your date, city and the functions you're planning, and Tushar Sonigra will get back to you personally.",
  cta: "Plan your music",
  ctaHref: "/contact?source=home-page#inquiry-form",
} as const;

export const homeFunctions = [
  {
    title: "Mehendi",
    tone: "haldi" as const,
    line: "Colour, chatter, and music that stays light.",
    href: "/weddings",
    link: "Plan this function",
  },
  {
    title: "Sangeet",
    tone: "rani" as const,
    line: "The night everyone dances.",
    href: "/rdx",
    link: "Meet RDX",
  },
  {
    title: "Pheras",
    tone: "mehendi" as const,
    line: "Calm music that lets the ceremony lead.",
    href: "/gauri",
    link: "Meet Gauri",
  },
  {
    title: "Reception",
    tone: "sindoor" as const,
    line: "Warm music for entries and the last dance.",
    href: "/weddings",
    link: "Plan this function",
  },
] as const;

export const homeMeet = {
  heading: "Meet Tushar ji",
  lines: [
    "Tushar Sonigra started Beats16 in Mumbai.",
    "He still speaks with every family personally.",
    "5,000+ events and 80+ Navratris.",
  ],
} as const;
