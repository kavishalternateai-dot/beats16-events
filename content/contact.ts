/**
 * Approved Contact and thank-you copy, AQ-009 (2026-10-27).
 * Founder: Tushar Sonigra. "Tushar ji" on the call and confirmation lines.
 * The form is the only button. Phone and email stay plain text.
 */

import { site } from "@/content/site";

export const contactSeo = {
  title: "Contact Beats16 | Wedding & Navratri Band Inquiry, Mumbai",
  description:
    "Planning an Indian wedding or Navratri? Share your date, city and functions with Beats16 and Tushar ji will get back to you personally. Send your inquiry.",
} as const;

export const contactHero = {
  eyebrow: `Contact Beats16 · ${site.city}`,
  h1: "Tell us about your celebration",
  subhead:
    "Share your date, city and the functions you're planning, and Tushar Sonigra, our founder, will get back to you personally. Every conversation starts with what your celebration needs.",
} as const;

export const contactFormCopy = {
  heading: "Send your inquiry",
  intro: "The more you can tell us, the faster we can help. Fields marked * are required.",
  phoneHint: "Tushar ji will call you on this number.",
  dateHint: "dd/mm/yyyy. Not fixed yet? Leave blank, or choose the month and year.",
  cityPlaceholder: "Mumbai, venue to be decided",
  submit: "Send my inquiry",
  privacy: "We'll only use your details to reply to your inquiry.",
} as const;

export const contactAfter = {
  heading: "What happens after you send your inquiry",
  steps: [
    "Tushar ji's team will get back to you personally.",
    "Our founder, Tushar Sonigra, personally reviews every inquiry and will get back to you by phone or email.",
    "He'll ask about your date, city or venue and the functions you're planning, if they're not already in your inquiry.",
    "Together you'll talk through the right band for each function, availability and pricing.",
  ],
  note: "Dates are confirmed only once you've spoken with Tushar ji.",
} as const;

export const contactReach = {
  heading: "Other ways to reach us",
  call: "calls are answered by our founder, Tushar Sonigra (Tushar ji)",
  based: `Based in ${site.city}. Performing across India and abroad.`,
  focus:
    "Beats16 performs at Indian weddings and traditional festivals only. If your celebration is a different kind of ceremony, we'll let you know politely.",
} as const;

export const thankYouSeo = {
  title: "Thank You | Beats16",
  description:
    "Tushar Sonigra reviews every inquiry. Tushar ji's team will get back to you personally.",
} as const;

export const thankYouCopy = {
  eyebrow: "Inquiry received",
  h1: "Thank you — we've received your inquiry",
  lead: "Congratulations on your upcoming celebration, and thank you for thinking of Beats16.",
  body: "Our founder, Tushar Sonigra, personally reviews every inquiry and will get back to you by phone or email. Tushar ji's team will get back to you personally.",
  prepareHeading: "To help us prepare",
  prepare:
    "If you didn't include them, it helps to have these ready for our conversation:",
  prepareItems: [
    "Your event date (or the month you're considering)",
    "Your city or venue",
    "Which functions you're planning — mehendi, sangeet, pheras, reception, Navratri or others",
  ],
  add: "Need to add something?",
  bandsLabel: "Explore our bands",
  bandsHref: "/weddings",
} as const;
