import type { ShowreelBandId } from "@/content/forms";
import type { FaqItem } from "@/content/faqs";
import { inquiryHref, standardProof, type PageStory, type ProofLine } from "@/content/story";
import { site } from "@/content/site";

/**
 * Approved band-page copy, AQ-003 through AQ-006.
 * Do not add line-ups, songs, instruments, clients, or prices.
 * Founder is named Tushar Sonigra.
 * Reel permalinks and showreel files live in content/media.ts.
 */

export type MediaPattern = "ceremony" | "floor" | "listening" | "garba" | "private";

const showreelNote = "We'll only use your email to send the showreel and reply to your inquiry.";

const gauriInquiry = inquiryHref({
  event: "Wedding",
  band: "Gauri",
  source: "gauri-page",
});
const rdxInquiry = inquiryHref({ band: "RDX", source: "rdx-page" });
const ghazalInquiry = inquiryHref({ band: "Daastan-e-Ghazal", source: "daastan-page" });
const navratriInquiry = inquiryHref({
  event: "Navratri",
  band: "Navratri band by Beats16",
  source: "navratri-page",
});

export const gauriFaqs: FaqItem[] = [
  {
    id: "gauri-what",
    question: "What is Gauri?",
    answer: "Gauri is the Beats16 band for wedding rituals and traditional ceremonies, including the pheras.",
  },
  {
    id: "gauri-pheras",
    question: "Can Gauri play during the pheras?",
    answer: "Yes. Gauri is made for the ritual parts of the wedding, with music that follows the ceremony and never takes over.",
  },
  {
    id: "gauri-alongside",
    question: "Can we book Gauri alongside another Beats16 band?",
    answer:
      "Yes. You can pair Gauri for the rituals with RDX for the sangeet or Daastan-e-Ghazal for a quieter evening. We'll help you plan the full wedding.",
  },
  {
    id: "gauri-outside",
    question: "Does Gauri perform outside Mumbai?",
    answer: "Yes. Beats16 is based in Mumbai and performs across India and abroad.",
  },
  {
    id: "gauri-price",
    question: "How much does Gauri cost?",
    answer: site.pricing,
  },
  {
    id: "gauri-availability",
    question: "How do I check if Gauri is available on my date?",
    answer:
      "Send us your date, city or venue and the ceremonies you're planning. Tushar Sonigra will personally get back to you to discuss availability.",
  },
  {
    id: "gauri-scope",
    question: "Does Gauri perform at ceremonies other than Indian weddings?",
    answer: "No. Beats16 focuses only on Indian weddings and traditional festivals.",
  },
];

export const rdxFaqs: FaqItem[] = [
  {
    id: "rdx-what",
    question: "What is RDX?",
    answer: "RDX is the Beats16 wireless band for sangeet nights and private events.",
  },
  {
    id: "rdx-wireless",
    question: 'What does "wireless band" mean?',
    answer:
      "RDX isn't tied to one stage. The band can move through the venue with your guests, so the music stays where the celebration is.",
  },
  {
    id: "rdx-only-sangeet",
    question: "Is RDX only for sangeet?",
    answer:
      "No. RDX is made for sangeet nights and also plays private events where you want lively live music close to your guests.",
  },
  {
    id: "rdx-alongside",
    question: "Can we book RDX with another Beats16 band?",
    answer:
      "Yes. You can pair RDX for the sangeet with Gauri for the rituals and pheras. We'll help you plan the full wedding.",
  },
  {
    id: "rdx-outside",
    question: "Does RDX perform outside Mumbai?",
    answer: "Yes. Beats16 is based in Mumbai and performs across India and abroad.",
  },
  {
    id: "rdx-price",
    question: "How much does RDX cost?",
    answer: site.pricing,
  },
  {
    id: "rdx-availability",
    question: "How do I check if RDX is available on my date?",
    answer:
      "Send us your date, city or venue and the event you're planning. Tushar Sonigra will personally get back to you to discuss availability.",
  },
];

export const ghazalFaqs: FaqItem[] = [
  {
    id: "ghazal-what",
    question: "What is Daastan-e-Ghazal?",
    answer:
      "Daastan-e-Ghazal is the Beats16 band for live ghazal evenings at cultural programmes, community gatherings and private events.",
  },
  {
    id: "ghazal-best",
    question: "What kind of events is it best for?",
    answer: "Seated, listening-focused evenings: cultural programmes, community gatherings and private family events.",
  },
  {
    id: "ghazal-wedding",
    question: "Can Daastan-e-Ghazal be part of a wedding?",
    answer:
      "Yes. For an Indian wedding, a ghazal evening can be a quieter, soulful function alongside the sangeet and reception. We'll help you plan where it fits.",
  },
  {
    id: "ghazal-outside",
    question: "Do you perform for community groups outside Mumbai?",
    answer: "Yes. Beats16 is based in Mumbai and performs across India and abroad.",
  },
  {
    id: "ghazal-price",
    question: "How much does a Daastan-e-Ghazal evening cost?",
    answer: site.pricing,
  },
  {
    id: "ghazal-availability",
    question: "How do I check availability for my date?",
    answer:
      "Send us your date, city or venue and the kind of event you're planning. Tushar Sonigra will personally get back to you to discuss availability.",
  },
];

export const navratriFaqs: FaqItem[] = [
  {
    id: "navratri-play",
    question: "What does the Navratri band by Beats16 play?",
    answer: "Live garba and dandiya music for Navratri nights, for communities in India and around the world.",
  },
  {
    id: "navratri-experience",
    question: "How much Navratri experience does Beats16 have?",
    answer: "Beats16 has organised 80+ Navratris, as part of 40 years and 5,000+ events.",
  },
  {
    id: "navratri-abroad",
    question: "Do you perform at Navratri events outside India?",
    answer:
      "Yes. We have organised Navratri events for audiences around the world. Tell us your city and dates and we'll discuss it with you.",
  },
  {
    id: "navratri-nights",
    question: "Can you play just one night, or all nine?",
    answer: "Both. Whether it's a single garba night or a full Navratri, we plan the music around your programme.",
  },
  {
    id: "navratri-organisers",
    question: "Do you work with societies and community organisers?",
    answer: "Yes. Navratri organisers and community groups are welcome to get in touch with their dates, city and venue.",
  },
  {
    id: "navratri-price",
    question: "How much does the Navratri band cost?",
    answer: site.pricing,
  },
  {
    id: "navratri-when",
    question: "When should we get in touch for Navratri?",
    answer:
      "As early as possible. Navratri dates are fixed each year, so share your dates and city and Tushar Sonigra will personally get back to you to discuss availability.",
  },
];

export type BandPage = {
  id: Exclude<ShowreelBandId, "independent">;
  name: string;
  href: string;
  metaTitle: string;
  metaDescription: string;
  faqGroup: string;
  story: PageStory;
};

export const bandPages: BandPage[] = [
  {
    id: "gauri",
    name: "Gauri",
    href: "/gauri",
    metaTitle: "Gauri by Beats16 | Indian Wedding Ritual & Pheras Band",
    metaDescription:
      "Gauri is Beats16's band for Indian wedding rituals and traditional ceremonies, from the pheras onwards. 40 years and 5,000+ events. Send your inquiry.",
    faqGroup: "gauri",
    story: {
      hero: {
        eyebrow: "Gauri · a Beats16 band",
        h1: "Gauri: traditional music for Indian wedding rituals",
        subhead:
          "Some moments in a wedding ask for quiet respect, not a party. Gauri plays for the rituals and traditional ceremonies, with music that sits gently alongside the pheras and lets the ceremony lead.",
        cta: "Send an inquiry for Gauri",
        ctaHref: gauriInquiry,
        note: `From Beats16, ${site.city}. Performing across India and abroad.`,
      },
      sections: [
        {
          kind: "reel",
          heading: "See Gauri at a ceremony",
          body: "A short look at Gauri performing at a wedding ritual.",
        },
        {
          kind: "points",
          heading: "Made for the moments that matter most",
          intro:
            "The pheras and the rituals around them are the heart of an Indian wedding. Gauri is the Beats16 band built for these moments: traditional in feel, unhurried in pace and always in step with the ceremony. The music supports the rituals; it never competes with them.",
          points: [
            {
              title: "Pheras and wedding rituals",
              text: "Music that follows the flow of the ceremony, so the family and guests can stay present.",
            },
            {
              title: "Traditional wedding ceremonies",
              text: "For the ceremonial parts of the wedding where a traditional sound feels right.",
            },
            {
              title: "Part of your full wedding concept",
              text: "Gauri can sit alongside our other bands, such as RDX for the sangeet, so each function has its own sound while the wedding still feels connected.",
            },
          ],
        },
        {
          kind: "proof",
          heading: "40 years of playing at family celebrations",
          items: standardProof,
          body: "Weddings are our speciality. We focus on Indian weddings and traditional festivals, and we bring that experience to every ceremony Gauri plays.",
        },
        {
          kind: "steps",
          heading: "How to plan Gauri for your wedding",
          steps: [
            "Share the basics — your wedding date, city or venue, and which rituals or ceremonies you'd like music for.",
            "Talk to Tushar Sonigra — he personally calls you to understand the ceremony and your family's customs.",
            "Plan the flow — we shape Gauri's music around your ceremony.",
            "On the day — Gauri performs, and you stay with your family.",
          ],
        },
        {
          kind: "showreel",
          heading: "Download the Gauri showreel",
          body: "Want to share Gauri with your family before you decide? Leave your name and email and we'll send you the showreel.",
          note: showreelNote,
        },
        { kind: "pricing", heading: "About pricing" },
      ],
      faqs: gauriFaqs,
      faqHeading: "Gauri FAQs",
      close: {
        heading: "Plan Gauri for your ceremony",
        body: "Share your date, city and the rituals you'd like music for, and Tushar Sonigra will get back to you personally.",
        cta: "Fill the inquiry form",
        ctaHref: gauriInquiry,
      },
    },
  },
  {
    id: "rdx",
    name: "RDX",
    href: "/rdx",
    metaTitle: "RDX by Beats16 | Wireless Band for Sangeet & Private Events",
    metaDescription:
      "RDX is Beats16's wireless band for sangeet nights and private events. It moves with your guests, wherever the party goes. Send your inquiry to Beats16.",
    faqGroup: "rdx",
    story: {
      hero: {
        eyebrow: "RDX · a Beats16 band",
        h1: "RDX: the wireless band that moves with your sangeet",
        subhead:
          "The best sangeet nights don't stay on one stage. RDX is our wireless band, so the music can move with your guests, from the entry to the dance floor and wherever the party goes next.",
        cta: "Send an inquiry for RDX",
        ctaHref: rdxInquiry,
        note: `From Beats16, ${site.city}. Performing across India and abroad.`,
      },
      sections: [
        {
          kind: "reel",
          heading: "See RDX in action",
          body: "A short look at RDX getting a sangeet moving.",
        },
        {
          kind: "points",
          heading: "Built for sangeet nights and private parties",
          intro:
            "A sangeet is the night everyone dances, and a private celebration should feel just as lively. Being wireless, RDX isn't tied to one corner of the room. The band can walk in with the family, play among the guests and keep the energy where the people are.",
          points: [
            {
              title: "Sangeet nights",
              text: "High energy for family performances, dance floors and the moments everyone remembers.",
            },
            {
              title: "Private events",
              text: "For private celebrations where you want live music that's close to your guests, not stuck behind a stage.",
            },
            {
              title: "Part of your full wedding concept",
              text: "Pair RDX with Gauri for the rituals and pheras, so each function gets the sound it needs while the wedding still feels connected.",
            },
          ],
        },
        {
          kind: "proof",
          heading: "40 years of getting people dancing",
          items: standardProof,
          body: "Weddings are our speciality, and the sangeet is where the celebration really lets go. We bring four decades of experience to every night RDX plays.",
        },
        {
          kind: "steps",
          heading: "How to plan RDX for your event",
          steps: [
            "Share the basics — your date, city or venue, and whether it's a sangeet or a private event.",
            "Talk to Tushar Sonigra — he personally calls you to understand your guests and the energy you want.",
            "Plan the night — we shape RDX's set around your entries, performances and dance floor.",
            "Celebrate — RDX keeps the party moving while you enjoy it.",
          ],
        },
        {
          kind: "showreel",
          heading: "Download the RDX showreel",
          body: "Want to show RDX to your family or planner first? Leave your name and email and we'll send you the showreel.",
          note: showreelNote,
        },
        { kind: "pricing", heading: "About pricing" },
      ],
      faqs: rdxFaqs,
      faqHeading: "RDX FAQs",
      close: {
        heading: "Get RDX for your sangeet",
        body: "Share your date, city and the event you're planning, and Tushar Sonigra will get back to you personally.",
        cta: "Fill the inquiry form",
        ctaHref: rdxInquiry,
      },
    },
  },
  {
    id: "daastan-e-ghazal",
    name: "Daastan-e-Ghazal",
    href: "/daastan-e-ghazal",
    metaTitle: "Daastan-e-Ghazal by Beats16 | Live Ghazal Evenings",
    metaDescription:
      "Daastan-e-Ghazal by Beats16: soulful live ghazal evenings for cultural programmes, community gatherings and private events. Send your inquiry today.",
    faqGroup: "daastan-e-ghazal",
    story: {
      hero: {
        eyebrow: "Daastan-e-Ghazal · a Beats16 band",
        h1: "Daastan-e-Ghazal: ghazal evenings made for listening",
        subhead:
          "Not every celebration needs a dance floor. Daastan-e-Ghazal brings unhurried, soulful ghazal evenings to cultural programmes, community gatherings and private events, where the music is the reason everyone stays.",
        cta: "Send an inquiry for Daastan-e-Ghazal",
        ctaHref: ghazalInquiry,
        note: `From Beats16, ${site.city}. Performing across India and abroad.`,
      },
      sections: [
        {
          kind: "reel",
          heading: "Listen to Daastan-e-Ghazal",
          body: "A short look at a Daastan-e-Ghazal evening.",
        },
        {
          kind: "points",
          heading: "For evenings that ask you to slow down",
          intro:
            "A ghazal evening is about poetry, melody and time to listen. Daastan-e-Ghazal is the Beats16 band for gatherings where guests come to sit back, take in the music and share the moment together.",
          points: [
            {
              title: "Cultural programmes",
              text: "For cultural evenings that want a refined, live musical centrepiece.",
            },
            {
              title: "Community gatherings",
              text: "For community celebrations that bring people together around music.",
            },
            {
              title: "Private events",
              text: "For intimate family evenings, including a quieter night alongside your wedding celebrations.",
            },
          ],
        },
        {
          kind: "proof",
          heading: "40 years of music at celebrations",
          items: [
            { value: "40 years", detail: "of music at family and community celebrations" },
            { value: "5,000+ events", detail: "weddings, festivals and gatherings" },
            { value: "80+ Navratris", detail: "organised, for audiences around the world" },
          ] satisfies ProofLine[],
          body: "Beats16 has played cultural programmes, religious celebrations and community gatherings for four decades. Daastan-e-Ghazal brings that experience to a quieter, more intimate kind of evening.",
        },
        {
          kind: "steps",
          heading: "How to plan a Daastan-e-Ghazal evening",
          steps: [
            "Share the basics — your date, city or venue, and the kind of gathering you're planning.",
            "Talk to Tushar Sonigra — he personally calls you to understand your audience and the mood you want.",
            "Shape the evening — we plan the flow of the evening around your programme.",
            "Enjoy it — Daastan-e-Ghazal performs while you and your guests listen.",
          ],
        },
        {
          kind: "showreel",
          heading: "Download the Daastan-e-Ghazal showreel",
          body: "Want to share the music with your committee or family first? Leave your name and email and we'll send you the showreel.",
          note: showreelNote,
        },
        { kind: "pricing", heading: "About pricing" },
      ],
      faqs: ghazalFaqs,
      faqHeading: "Daastan-e-Ghazal FAQs",
      close: {
        heading: "Plan your ghazal evening",
        body: "Share your date, city and the gathering you're planning, and Tushar Sonigra will get back to you personally.",
        cta: "Fill the inquiry form",
        ctaHref: ghazalInquiry,
      },
    },
  },
  {
    id: "navratri",
    name: "Navratri band by Beats16",
    href: "/navratri",
    metaTitle: "Navratri Garba & Dandiya Band | Beats16, India & Global",
    metaDescription:
      "Live garba and dandiya band from Beats16, organisers of 80+ Navratris for audiences in India and around the world. Send your Navratri inquiry today.",
    faqGroup: "navratri",
    story: {
      hero: {
        eyebrow: "Navratri band by Beats16",
        h1: "Live garba and dandiya nights, from 80+ Navratris of experience",
        subhead:
          "Nine nights, one circle, and music that keeps everyone moving. The Navratri band by Beats16 brings live garba and dandiya to communities in India and around the world.",
        cta: "Send a Navratri inquiry",
        ctaHref: navratriInquiry,
        note: `From Beats16, ${site.city}. Navratri events for audiences in India and abroad.`,
      },
      sections: [
        {
          kind: "reel",
          heading: "See a Beats16 Navratri night",
          body: "A short look at the circle in full swing.",
        },
        {
          kind: "proof",
          heading: "80+ Navratris organised",
          items: [
            { value: "80+ Navratris", detail: "organised, for audiences around the world" },
            { value: "40 years", detail: "of music at celebrations" },
            { value: "5,000+ events", detail: "weddings, festivals and gatherings" },
          ],
          body: "Navratri is one of the celebrations Beats16 knows best. We understand how a garba night builds, when the dandiya should take over and how to keep a crowd dancing until the last round.",
        },
        {
          kind: "points",
          heading: "Garba and dandiya, played live",
          points: [
            {
              title: "Garba",
              text: "Music that holds the circle together, from the first slow rounds to the fast, joyful finish.",
            },
            {
              title: "Dandiya",
              text: "High-energy dandiya sets that keep the sticks clicking and the floor full.",
            },
            {
              title: "Nine nights, or just one",
              text: "Whether you're planning a full Navratri or a single garba night, we plan the music around your programme.",
            },
          ],
        },
        {
          kind: "prose",
          heading: "For communities in India and abroad",
          body: "We've organised Navratri events for audiences around the world. If your community, society or organisation is planning Navratri, in India or abroad, tell us where and when and we'll talk you through how we can bring the band to you.",
        },
        {
          kind: "prose",
          heading: "Working with Navratri organisers and community groups",
          body: "Planning Navratri for a society, community group or organisation? Share your dates, city, venue and expected programme, and Tushar Sonigra will talk you through how the Navratri band by Beats16 can fit in. It helps to get in touch early, as Navratri dates are fixed every year.",
        },
        {
          kind: "steps",
          heading: "How to plan your Navratri with Beats16",
          steps: [
            "Share the basics — your Navratri dates, city or venue, and whether it's one night or more.",
            "Talk to Tushar Sonigra — he personally calls you to understand your audience and programme.",
            "Plan the nights — we shape the garba and dandiya music around your schedule.",
            "Celebrate — the Navratri band by Beats16 keeps the circle moving.",
          ],
        },
        {
          kind: "showreel",
          heading: "Download the Navratri showreel",
          body: "Need to show your committee what a Beats16 Navratri looks like? Leave your name and email and we'll send you the showreel.",
          note: showreelNote,
        },
        { kind: "pricing", heading: "About pricing" },
      ],
      faqs: navratriFaqs,
      faqHeading: "Navratri FAQs",
      close: {
        heading: "Plan your Navratri with Beats16",
        body: "Share your Navratri dates, city and venue, and Tushar Sonigra will get back to you personally.",
        cta: "Fill the inquiry form",
        ctaHref: navratriInquiry,
      },
    },
  },
];

export function getBandPage(id: BandPage["id"]): BandPage {
  const band = bandPages.find((item) => item.id === id);
  if (!band) {
    throw new Error(`Unknown band page: ${id}`);
  }
  return band;
}

export const independentBand = {
  id: "independent" as const,
  name: "Independent bands",
  eyebrow: "Private shows",
  title: "Independent bands for private shows",
  lede: "Separate from Gauri, RDX, Daastan-e-Ghazal, and the Navratri band. For a private show that does not sit inside those four, we look at an independent band and tell you honestly if it fits.",
  paragraphs: [
    "We do not list the independent bands by name on this site. The right group depends on the show, the date, and the city. Write with those three and we will say whether we can put a band there.",
    "A private show can be a family evening, a host’s gathering, or a small programme that is not a full wedding ceremony and not Navratri. If it is an Indian wedding ritual, ask for Gauri. If it is a sangeet, ask for RDX.",
    "The reels and the showreel on this section are placeholders until the real links are added. The form still works: you receive the file we have today, and we keep your name, email, and phone with the other leads.",
  ],
  mediaLabel: "A private show",
  mediaPattern: "private" as MediaPattern,
};
