/**
 * Approved Weddings copy, AQ-002 (2026-10-27).
 * Do not add clients, venues, testimonials, or prices.
 * Founder is named Tushar Sonigra.
 */

import type { FaqItem } from "@/content/faqs";
import { inquiryHref, standardProof, type PageStory } from "@/content/story";
import { site } from "@/content/site";

const inquiry = inquiryHref({ event: "Wedding", source: "weddings-page" });

export const weddingFaqHeading = "Wedding music FAQs";

export const weddingFaqs: FaqItem[] = [
  {
    id: "weddings-functions",
    question: "Which wedding functions do you perform at?",
    answer:
      "We plan music for mehendi, sangeet, pheras and reception, with a tailored musical concept for each. If you have other functions planned, tell us and we'll suggest what fits.",
  },
  {
    id: "weddings-different-bands",
    question: "Can we book different bands for different functions?",
    answer:
      "Yes. Many weddings need more than one sound. Gauri suits the rituals and pheras, RDX suits the sangeet, and Daastan-e-Ghazal suits a quieter ghazal evening. We'll help you choose.",
  },
  {
    id: "weddings-destination",
    question: "Do you perform at destination weddings?",
    answer: "Yes. We are based in Mumbai and perform across India and abroad.",
  },
  {
    id: "weddings-price",
    question: "How much does wedding music with Beats16 cost?",
    answer: site.pricing,
  },
  {
    id: "weddings-availability",
    question: "How do I check if you're available on my wedding date?",
    answer:
      "Send us your date, city or venue and the functions you're planning. Tushar Sonigra will personally get back to you to discuss availability.",
  },
  {
    id: "weddings-planners",
    question: "Do you work with wedding planners and venues?",
    answer:
      "Yes. We're happy to work alongside planners, venues, banquets and hotels. Share the brief and timings and we'll plan around them.",
  },
  {
    id: "weddings-scope",
    question: "Do you perform at weddings other than Indian weddings?",
    answer:
      "We focus only on Indian weddings and traditional festivals, so we're not the right fit for other ceremonies.",
  },
  {
    id: "weddings-how-early",
    question: "How early should we get in touch?",
    answer:
      "As soon as you have a date and city in mind. That gives us time to understand your functions and plan the music for each one.",
  },
];

export const weddingsSeo = {
  title: "Indian Wedding Music & Live Bands, Mumbai | Beats16",
  description:
    "Live bands for every Indian wedding function: mehendi, sangeet, pheras and reception. 40 years and 5,000+ events. Send your wedding inquiry to Beats16.",
} as const;

export const weddingsStory: PageStory = {
  hero: {
    eyebrow: `Weddings · ${site.name}`,
    h1: "Music for every function of your Indian wedding",
    subhead:
      "An Indian wedding is many celebrations in one. We plan a musical concept for each function, from the mehendi to the reception, so the music feels connected from the first song to the last dance.",
    cta: "Send a wedding inquiry",
    ctaHref: inquiry,
    note: `Based in ${site.city}. Performing at weddings across India and abroad.`,
  },
  sections: [
    {
      kind: "proof",
      items: standardProof,
      body: "Weddings are our speciality, and every one starts with listening to the family.",
    },
    {
      kind: "points",
      heading: "A musical concept built around your functions",
      intro:
        "Each function has its own mood, its own guests and its own pace. Instead of one playlist for the whole wedding, we shape the music around each part of the day.",
      points: [
        {
          title: "Mehendi",
          text: "Colourful, relaxed and full of chatter. Music that keeps the afternoon light while the mehendi is applied and the family settles in.",
        },
        {
          title: "Sangeet",
          text: "The night everyone dances. High energy, family performances and a dance floor that fills up early and stays full.",
        },
        {
          title: "Pheras",
          text: "The heart of the wedding. Calm, respectful music that sits gently with the rituals and lets the ceremony lead.",
        },
        {
          title: "Reception",
          text: "Warm and celebratory. Music for welcoming guests, the couple's entry and an evening that ends on a high.",
        },
      ],
      note: "Planning a haldi, baraat or another function? Tell us about it and we'll suggest what fits.",
    },
    {
      kind: "cards",
      heading: "The right band for each part of the wedding",
      intro: "We have more than one band because a wedding needs more than one sound.",
      cards: [
        {
          href: "/gauri",
          title: "Gauri",
          text: "For wedding rituals and traditional ceremonies, including the pheras.",
          link: "Meet Gauri",
        },
        {
          href: "/rdx",
          title: "RDX",
          text: "Our wireless band for sangeet nights and private events. It moves with your guests, wherever the party goes.",
          link: "Meet RDX",
        },
        {
          href: "/daastan-e-ghazal",
          title: "Daastan-e-Ghazal",
          text: "Ghazal evenings for a quieter, soulful gathering with family and close guests.",
          link: "Explore Daastan-e-Ghazal",
        },
      ],
      note: "We also put together independent bands for private shows.",
    },
    {
      kind: "steps",
      heading: "How we plan your wedding music",
      steps: [
        "Share the basics — your wedding date, city or venue, and the functions you're planning.",
        "Talk to Tushar Sonigra — he personally calls you to understand your family, your guests and the feel you want.",
        "Get your musical concept — we suggest the band and the music for each function.",
        "Celebrate — our team performs on the day, so you can stay with your family.",
      ],
    },
    {
      kind: "prose",
      heading: "Working with wedding planners and venues",
      body: "If you plan weddings or manage a venue, banquet or hotel, we're happy to work alongside your team. Share the event brief, the functions and the timings, and we'll plan the music around your schedule. We perform in Mumbai, across India and at destination weddings abroad.",
    },
    {
      kind: "prose",
      heading: "Indian weddings are what we do",
      body: "Beats16 performs at Indian weddings and traditional festivals. Keeping that focus is how we bring 40 years of experience to the rituals, customs and music families expect.",
    },
    { kind: "pricing", heading: "About pricing" },
  ],
  faqs: weddingFaqs,
  faqHeading: weddingFaqHeading,
  close: {
    heading: "Tell us about your wedding",
    body: "Share your date, city and the functions you're planning, and Tushar Sonigra will get back to you personally.",
    cta: "Fill the inquiry form",
    ctaHref: inquiry,
  },
};
