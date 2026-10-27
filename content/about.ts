/**
 * Approved About copy, AQ-007 (2026-10-27).
 * Founder: Tushar Sonigra. "Tushar ji" only on the personal reply line.
 * No biography, dates, clients, or numbers beyond the published proof.
 */

import { inquiryHref, standardProof, type PageStory } from "@/content/story";
import { site } from "@/content/site";

const inquiry = inquiryHref({ source: "about-page" });

export const aboutSeo = {
  title: "About Beats16 | 40 Years of Hindu Wedding Music, Mumbai",
  description:
    "For 40 years Beats16 has brought live music to Hindu weddings and festivals: 5,000+ events and 80+ Navratris, from Mumbai to the world. Read our story.",
} as const;

export const aboutStory: PageStory = {
  hero: {
    eyebrow: `About ${site.name} · ${site.city}`,
    h1: "40 years of music at Hindu weddings and festivals",
    subhead:
      "Beats16 began in Mumbai around 40 years ago with Tushar Sonigra. Four decades and more than 5,000 events later, we still bring the same care to every celebration we play.",
    cta: "Send an inquiry",
    ctaHref: inquiry,
    note: `Based in ${site.city}. Performing across India and abroad.`,
  },
  sections: [
    {
      kind: "prose",
      heading: "How Beats16 began",
      paragraphs: [
        "Beats16 was started by Tushar Sonigra in Mumbai around 40 years ago. What began as music for family celebrations has grown, one wedding and one festival at a time, into more than 5,000 events across India and abroad.",
        "Over those years, families have trusted us with some of the most important days of their lives: the mehendi, the sangeet, the pheras and the reception. Communities have trusted us with their festivals, including more than 80 Navratris organised for audiences around the world.",
        "Today, Tushar Sonigra — Tushar ji to the families we work with — still personally speaks with the families and organisers who get in touch, so every celebration starts with a real conversation.",
      ],
    },
    {
      kind: "proof",
      compact: true,
      heading: "Four decades in numbers",
      items: standardProof,
    },
    {
      kind: "points",
      heading: "Music shaped around each function",
      intro:
        "A Hindu wedding is many celebrations in one, and each function has its own mood. That's why we plan a tailored musical concept for every function, and why we have more than one band.",
      points: [
        {
          title: "Rituals deserve calm",
          text: "The pheras and traditional ceremonies call for music that sits gently with the moment.",
        },
        {
          title: "Celebrations deserve energy",
          text: "Sangeet nights, garba and dandiya call for music that fills the floor and keeps it full.",
        },
        {
          title: "Evenings deserve soul",
          text: "Cultural and community evenings call for music made for listening.",
        },
      ],
    },
    {
      kind: "cards",
      heading: "The Beats16 family of bands",
      cards: [
        {
          href: "/gauri",
          title: "Gauri",
          text: "For wedding rituals and traditional Hindu ceremonies.",
          link: "Meet Gauri",
        },
        {
          href: "/rdx",
          title: "RDX",
          text: "Our wireless band for sangeet nights and private events.",
          link: "Meet RDX",
        },
        {
          href: "/daastan-e-ghazal",
          title: "Daastan-e-Ghazal",
          text: "Ghazal evenings for cultural, community and private events.",
          link: "Explore Daastan-e-Ghazal",
        },
        {
          href: "/navratri",
          title: "Navratri band by Beats16",
          text: "Garba and dandiya, in India and around the world.",
          link: "See our Navratri band",
        },
      ],
      note: "We also put together independent bands for private shows.",
    },
    {
      kind: "prose",
      heading: "Where you'll find us",
      body: "Weddings are our speciality. We also perform at cultural programmes, religious celebrations, community gatherings and corporate events.",
      link: { href: "/corporate-cultural", label: "Corporate & cultural events" },
    },
    {
      kind: "prose",
      heading: "Hindu weddings and Hindu festivals",
      body: "Beats16 performs at Hindu weddings and Hindu festivals only. Keeping that focus is how we bring 40 years of experience to the rituals, customs and music families expect. If your celebration is a different kind of ceremony, we'll let you know politely and honestly.",
    },
    {
      kind: "prose",
      heading: "Based in Mumbai, performing across India and abroad",
      body: "Our home is Mumbai, but our music travels: to weddings across India, to destination celebrations abroad, and to Navratri events for audiences around the world.",
    },
    { kind: "pricing", heading: "About pricing" },
  ],
  faqs: [],
  faqHeading: "",
  close: {
    heading: "Tell us about your celebration",
    body: "Share your date, city and the functions you're planning, and Tushar ji will get back to you personally.",
    cta: "Fill the inquiry form",
    ctaHref: inquiry,
  },
};
