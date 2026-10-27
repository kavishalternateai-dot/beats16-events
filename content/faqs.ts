/**
 * FAQ answers used on the wedding and band pages (AQ-002 through AQ-006).
 * The public FAQ page is content/faq-page.ts (AQ-008) and is not this list.
 * Do not add credentials, client names, or prices.
 */

import { gauriFaqs, ghazalFaqs, navratriFaqs, rdxFaqs } from "@/content/bands";
import { weddingFaqHeading, weddingFaqs } from "@/content/weddings";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  /** Extra navigation. Not included in FAQPage answer text. */
  related?: { href: string; label: string };
};

export type FaqGroup = {
  id: string;
  title: string;
  items: FaqItem[];
};

export const faqGroups: FaqGroup[] = [
  { id: "weddings", title: weddingFaqHeading, items: weddingFaqs },
  { id: "gauri", title: "Gauri FAQs", items: gauriFaqs },
  { id: "rdx", title: "RDX FAQs", items: rdxFaqs },
  { id: "daastan-e-ghazal", title: "Daastan-e-Ghazal FAQs", items: ghazalFaqs },
  { id: "navratri", title: "Navratri FAQs", items: navratriFaqs },
];
