/**
 * Approved Home copy, AQ-001 (2026-10-27).
 * Do not add clients, testimonials, venues, press, or prices.
 * Founder spelling is confirmed: Tushar Sonigra.
 */

import type { FaqItem } from "@/content/faqs";
import { site } from "@/content/site";

export const homeSeo = {
  title: "Beats16 | Hindu Wedding & Navratri Bands, Mumbai",
  description:
    "40 years, 5,000+ events and 80+ Navratris. Beats16 brings live bands to Hindu weddings and festivals across India and abroad. Send us your inquiry.",
} as const;

export const homeHero = {
  eyebrow: `${site.name} · ${site.city}`,
  h1: "Live music for Hindu weddings and Navratri, for 40 years",
  subhead:
    "From the first song at the mehendi to the last dance at the reception, we shape the music around each function of your celebration, so every moment sounds the way it feels.",
  cta: "Fill the inquiry form",
  ctaHref: "/contact?source=home-page#inquiry-form",
  note: `Based in ${site.city}. Performing across India and abroad.`,
} as const;

export const homeProof = {
  label: "Four decades of celebrations",
  items: [
    { value: "40 years", detail: "of music at family celebrations" },
    { value: "5,000+ events", detail: "weddings, festivals and gatherings" },
    { value: "80+ Navratris", detail: "organised, for audiences around the world" },
  ],
  support: `Started by ${site.founder} about 40 years ago, Beats16 has grown with the families and communities it plays for.`,
} as const;

export const homeBands = {
  heading: "A band for every part of the celebration",
  intro: "Every function has its own mood. That's why we have more than one band.",
  cards: [
    {
      href: "/gauri",
      name: "Gauri",
      text: "For wedding rituals and traditional Hindu ceremonies. Music that sits gently with the pheras and the moments that matter most.",
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
  body: "A Hindu wedding is many celebrations in one. We plan a musical concept for each function — the colour of the mehendi, the energy of the sangeet, the calm of the pheras and the warmth of the reception — so the music feels connected from start to finish.",
  functions: "Mehendi · Sangeet · Pheras · Reception",
  link: "Plan your wedding music",
  href: "/weddings",
} as const;

export const homeAbout = {
  heading: "A family name in celebrations",
  body: `Beats16 began in ${site.city} around 40 years ago with ${site.founder}. Since then we have played more than 5,000 events — weddings, religious celebrations, cultural programmes, community gatherings and corporate events — and organised over 80 Navratris. We focus on Hindu weddings and Hindu festivals, and we bring the same care to every one.`,
  link: "Read our story",
  href: "/about",
} as const;

export const homeFaqs: FaqItem[] = [
  {
    id: "home-kinds",
    question: "What kinds of events does Beats16 play?",
    answer:
      "Hindu weddings and Hindu festivals such as Navratri. We also perform at cultural programmes, religious celebrations, community gatherings and corporate events.",
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
  cta: "Fill the inquiry form",
  ctaHref: "/contact?source=home-page#inquiry-form",
} as const;
