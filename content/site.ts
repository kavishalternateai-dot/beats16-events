/**
 * Copy swap: site-wide facts. Do not add client names, review counts, or prices.
 * Founder spelling is confirmed: Tushar Sonigra.
 */

export const site = {
  name: "Beats16 Events & Entertainment",
  shortName: "Beats16",
  founder: "Tushar Sonigra",
  url: "https://beats16.events",
  locale: "en_IN",
  phoneDisplay: "+91 9820133078",
  phoneTel: "+919820133078",
  email: "beats16@gmail.com",
  city: "Mumbai",
  region: "Maharashtra",
  country: "IN",
  pricing:
    "Every celebration is different, so we discuss pricing personally once we know your date, city and functions.",
  proof: [
    { value: "40 years", detail: "of this work" },
    { value: "5,000+", detail: "events" },
    { value: "80+", detail: "Navratris" },
  ],
} as const;

export const primaryNav = [
  { href: "/weddings", label: "Weddings" },
  { href: "/gauri", label: "Gauri" },
  { href: "/rdx", label: "RDX" },
  { href: "/daastan-e-ghazal", label: "Daastan-e-Ghazal" },
  { href: "/navratri", label: "Navratri" },
  { href: "/corporate-cultural", label: "Corporate & cultural" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
] as const;

export const footerNav = [
  { href: "/", label: "Home" },
  ...primaryNav,
  { href: "/contact", label: "Contact" },
  { href: "/#independent-bands", label: "Independent bands" },
] as const;
