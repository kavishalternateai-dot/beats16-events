/**
 * Approved FAQ page, AQ-008 (2026-10-27). Fifteen answers only.
 * Tushar Sonigra is named in Q1. "Tushar ji" is used on the personal call lines.
 * Related links sit beside the answer. Schema uses the answer text alone.
 */

import type { FaqGroup, FaqItem } from "@/content/faqs";
import { inquiryHref } from "@/content/story";
import { site } from "@/content/site";

const inquiry = inquiryHref({ source: "faq-page" });

export const faqPageSeo = {
  title: "Beats16 FAQs | Wedding Band Mumbai, Sangeet & Navratri",
  description:
    "Answers on Beats16 wedding bands in Mumbai: pheras, sangeet, ghazal nights, Navratri in India and abroad, pricing and availability. Ask us anything.",
} as const;

export const faqPageHero = {
  eyebrow: "Beats16 FAQs",
  h1: "Questions families and organisers ask Beats16",
  subhead:
    "Quick answers about our bands, the events we play and how booking works. If your question isn't here, send us an inquiry and Tushar ji will get back to you personally.",
  cta: "Send an inquiry",
  ctaHref: inquiry,
} as const;

export const faqPageClose = {
  heading: "Still have a question?",
  body: "Share your date, city and the functions you're planning, and Tushar ji will get back to you personally.",
  cta: "Fill the inquiry form",
  ctaHref: inquiry,
} as const;

function item(entry: FaqItem): FaqItem {
  return entry;
}

export const faqPageGroups: FaqGroup[] = [
  {
    id: "about-beats16",
    title: "About Beats16",
    items: [
      item({
        id: "faq-who",
        question: "Who is Beats16?",
        answer:
          "Beats16 Events & Entertainment is a Mumbai-based live music company started by Tushar Sonigra around 40 years ago. We have played 5,000+ events and organised 80+ Navratris, and we specialise in Hindu weddings and Hindu festivals.",
        related: { href: "/about", label: "About Beats16" },
      }),
      item({
        id: "faq-wedding-band",
        question: "Is Beats16 a good wedding band in Mumbai?",
        answer:
          "Beats16 is a Mumbai wedding band with 40 years of experience and 5,000+ events. Weddings are our speciality: we plan a tailored musical concept for each function — mehendi, sangeet, pheras and reception — and suggest the band that suits each one.",
        related: { href: "/weddings", label: "Hindu wedding music" },
      }),
      item({
        id: "faq-event-kinds",
        question: "What kinds of events does Beats16 perform at?",
        answer:
          "Hindu weddings and Hindu festivals such as Navratri. We also perform at cultural programmes, religious celebrations, community gatherings and corporate events.",
        related: { href: "/corporate-cultural", label: "Corporate & cultural events" },
      }),
      item({
        id: "faq-non-hindu",
        question: "Do you perform at non-Hindu weddings or ceremonies?",
        answer:
          "No. Beats16 performs at Hindu weddings and Hindu festivals only. Keeping that focus is how we bring 40 years of experience to the rituals and customs families expect.",
      }),
    ],
  },
  {
    id: "wedding-music",
    title: "Wedding music",
    items: [
      item({
        id: "faq-pheras",
        question: "Which band plays during the pheras?",
        answer:
          "Gauri, our band for wedding rituals and traditional Hindu ceremonies, is made for the pheras and the moments that matter most, with music that sits gently with the ritual.",
        related: { href: "/gauri", label: "Meet Gauri" },
      }),
      item({
        id: "faq-traditional",
        question: "Do you offer shehnai or traditional music for the wedding ceremony?",
        answer:
          "For traditional ceremonial music, Gauri is our band for wedding rituals and Hindu ceremonies. Tell us which instruments or music you'd like at your pheras, and Tushar ji will talk you through what Gauri can bring.",
        related: { href: "/gauri", label: "Meet Gauri" },
      }),
      item({
        id: "faq-sangeet",
        question: "Do you have a band for the sangeet?",
        answer:
          "Yes. RDX is our wireless band for sangeet nights and private events. Because it's wireless, it moves with your guests, wherever the party goes.",
        related: { href: "/rdx", label: "Meet RDX" },
      }),
      item({
        id: "faq-every-function",
        question: "Can Beats16 cover every wedding function?",
        answer:
          "Yes. We plan a tailored musical concept for each function — mehendi, sangeet, pheras and reception — so the music feels connected from start to finish.",
        related: { href: "/weddings", label: "Hindu wedding music" },
      }),
      item({
        id: "faq-destination",
        question: "Do you perform at destination weddings?",
        answer: `Yes. Beats16 is based in ${site.city} and performs across India and abroad.`,
        related: { href: "/weddings", label: "Hindu wedding music" },
      }),
    ],
  },
  {
    id: "ghazal",
    title: "Ghazal nights and cultural evenings",
    items: [
      item({
        id: "faq-ghazal-night",
        question: "Can Beats16 perform a ghazal night?",
        answer:
          "Yes. Daastan-e-Ghazal is our ghazal band for cultural, community and private events: unhurried, soulful evenings made for listening.",
        related: { href: "/daastan-e-ghazal", label: "Explore Daastan-e-Ghazal" },
      }),
    ],
  },
  {
    id: "navratri",
    title: "Navratri, garba and dandiya",
    items: [
      item({
        id: "faq-garba",
        question: "Do you have a garba and dandiya band for Navratri?",
        answer:
          "Yes. The Navratri band by Beats16 plays live garba and dandiya, from a team that has organised 80+ Navratris for audiences in India and around the world.",
        related: { href: "/navratri", label: "See our Navratri band" },
      }),
      item({
        id: "faq-navratri-abroad",
        question: "Can Beats16 perform Navratri in London or elsewhere abroad?",
        answer:
          "We have organised Navratri events for audiences around the world. If you're planning Navratri in London or any other city outside India, share your dates, city and venue and Tushar ji will discuss it with you personally.",
        related: { href: "/navratri", label: "See our Navratri band" },
      }),
    ],
  },
  {
    id: "booking",
    title: "Pricing, dates and booking",
    items: [
      item({
        id: "faq-price",
        question: "How much does a Beats16 band cost?",
        answer: site.pricing,
      }),
      item({
        id: "faq-availability",
        question: "How do I check if Beats16 is available on my date?",
        answer:
          "Send us your date, city or venue and the functions you're planning. Tushar ji will personally get back to you to discuss availability. Dates are confirmed only by Tushar ji.",
      }),
      item({
        id: "faq-planners",
        question: "Do you work with wedding planners, venues and event companies?",
        answer:
          "Yes. Wedding and destination wedding planners, venues, banquets, hotels and event management companies are welcome to share their event brief, functions and timings, and we'll plan the music around their schedule.",
      }),
    ],
  },
];

export const faqPageItems: FaqItem[] = faqPageGroups.flatMap((group) => group.items);
