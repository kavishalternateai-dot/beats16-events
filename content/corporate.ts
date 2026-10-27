/**
 * Approved Corporate & Cultural Events copy, AQ-010 (2026-10-27).
 * Route stays /corporate-cultural. Founder: Tushar Sonigra.
 * "Tushar ji" only on the personal call lines. No client names.
 */

import type { FaqItem } from "@/content/faqs";
import { inquiryHref, type PageStory } from "@/content/story";
import { site } from "@/content/site";

const inquiry = inquiryHref({ source: "corporate-cultural-page" });

export const corporateSeo = {
  title: "Corporate & Cultural Event Bands | Beats16, Mumbai",
  description:
    "Live bands for Hindu festival celebrations, community gatherings, cultural programmes and corporate events, from Beats16's 40 years and 5,000+ events.",
} as const;

export const corporateFaqs: FaqItem[] = [
  {
    id: "corp-kinds",
    question: "What kinds of non-wedding events does Beats16 perform at?",
    answer:
      "Cultural programmes, religious celebrations, community gatherings and corporate events, alongside Hindu festivals such as Navratri.",
  },
  {
    id: "corp-company-navratri",
    question: "Can Beats16 play our company's Navratri or festival celebration?",
    answer:
      "Yes. The Navratri band by Beats16 plays live garba and dandiya, and we can suggest the right band for other festival celebrations. Share your date, city and programme to get started.",
  },
  {
    id: "corp-abroad",
    question: "Do you perform at community and society events abroad?",
    answer:
      "Yes. Beats16 is based in Mumbai and performs across India and abroad, including Navratri events for audiences around the world.",
  },
  {
    id: "corp-ghazal",
    question: "Can we book a ghazal evening for a cultural programme?",
    answer: "Yes. Daastan-e-Ghazal performs at cultural, community and private events.",
  },
  {
    id: "corp-agencies",
    question: "Do you work with event management companies and agencies?",
    answer:
      "Yes. Event companies and agencies are welcome to share the event brief, timings and programme on behalf of their clients.",
  },
  {
    id: "corp-price",
    question: "How much does it cost?",
    answer: site.pricing,
  },
  {
    id: "corp-availability",
    question: "How do we check availability?",
    answer:
      "Send your date, city or venue and programme. Tushar ji will personally get back to you to discuss availability.",
  },
];

export const corporateStory: PageStory = {
  hero: {
    eyebrow: "Corporate & Cultural Events · Beats16",
    h1: "Live music for festivals, communities and corporate celebrations",
    subhead:
      "From religious celebrations and community gatherings to cultural programmes and company festival events, Beats16 brings 40 years of live music to occasions rooted in Hindu tradition.",
    cta: "Send an event inquiry",
    ctaHref: inquiry,
    note: `Based in ${site.city}. Performing across India and abroad.`,
  },
  sections: [
    {
      kind: "proof",
      compact: true,
      heading: "Experience you can plan around",
      items: [
        { value: "40 years", detail: "of music at celebrations" },
        { value: "5,000+ events", detail: "weddings, festivals and gatherings" },
        { value: "80+ Navratris", detail: "organised, for audiences around the world" },
      ],
    },
    {
      kind: "points",
      heading: "The occasions we play",
      points: [
        {
          title: "Religious celebrations",
          text: "Hindu festivals and religious celebrations, with music that respects the occasion and brings people together.",
        },
        {
          title: "Community gatherings",
          text: "Societies, community groups and associations, in India and abroad, celebrating together.",
        },
        {
          title: "Cultural programmes",
          text: "Evenings built around music, culture and listening, from ghazal nights to festival programmes.",
        },
        {
          title: "Corporate events",
          text: "Company festival celebrations and cultural evenings for teams, clients and guests, planned around your schedule.",
        },
      ],
    },
    {
      kind: "cards",
      heading: "A band for every kind of gathering",
      cards: [
        {
          href: "/navratri",
          title: "Navratri band by Beats16",
          text: "Live garba and dandiya for community and company Navratri nights, from a team that has organised 80+ Navratris.",
          link: "See our Navratri band",
        },
        {
          href: "/daastan-e-ghazal",
          title: "Daastan-e-Ghazal",
          text: "Ghazal evenings for cultural, community and private events. Unhurried, soulful and made for listening.",
          link: "Explore Daastan-e-Ghazal",
        },
        {
          href: "/rdx",
          title: "RDX",
          text: "Our wireless band for high-energy private events. It moves with your guests, wherever the celebration goes.",
          link: "Meet RDX",
        },
        {
          href: "/gauri",
          title: "Gauri",
          text: "Traditional Hindu ceremonial music for rituals and religious occasions.",
          link: "Meet Gauri",
        },
      ],
      note: "We also put together independent bands for private shows.",
    },
    {
      kind: "prose",
      heading: "Working with organisers, agencies and companies",
      body: "If you're organising a festival celebration for a community group, a cultural programme for an association, or a company event for your team, share your event brief, date, city or venue and programme. Our founder, Tushar Sonigra, will talk you through the right band and how we can fit around your schedule. Event management companies and agencies are welcome to get in touch on behalf of their clients.",
    },
    {
      kind: "steps",
      heading: "How to plan your event with Beats16",
      steps: [
        "Share the basics — your date, city or venue, and the kind of event you're planning.",
        "Talk to Tushar ji — he personally calls you to understand your audience and programme.",
        "Plan the music — we suggest the band and shape the set around your schedule.",
        "Celebrate — Beats16 performs, and you stay with your guests.",
      ],
    },
    {
      kind: "prose",
      heading: "Rooted in Hindu festivals and culture",
      body: "Beats16 performs at Hindu weddings and Hindu festivals, and at cultural, community and corporate events in that spirit. Keeping that focus is how we bring 40 years of experience to every occasion. If your event falls outside it, we'll let you know politely and honestly.",
    },
    { kind: "pricing", heading: "About pricing" },
  ],
  faqs: corporateFaqs,
  faqHeading: "Corporate & cultural event FAQs",
  close: {
    heading: "Plan your event with Beats16",
    body: "Share your date, city and the kind of event you're planning, and Tushar ji will get back to you personally.",
    cta: "Fill the inquiry form",
    ctaHref: inquiry,
  },
};
