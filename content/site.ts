/**
 * Copy swap: site-wide facts. Do not add client names, review counts, or prices.
 * Founder spelling is confirmed: Tushar Sonigra.
 */

/** Shared proof. The long history is named once, on the home hero. */
export const proofLines = [
  { value: "5,000+", detail: "events, weddings and festivals" },
  { value: "80+", detail: "Navratris organised" },
  { value: "Mumbai", detail: "home base, in India and abroad" },
] as const;

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
  proof: proofLines,
} as const;

/**
 * Tushar Sonigra's Instagram handle, without @ and without a URL.
 * Leave null until Kavish confirms it. This one constant publishes the
 * profile link in Where to find us, on Contact, and in the footer.
 */
export const INSTAGRAM_HANDLE: string | null = null;

const INSTAGRAM_HANDLE_PATTERN = /^[A-Za-z0-9._]{1,30}$/;

export function instagramHandle(): string | null {
  if (INSTAGRAM_HANDLE == null) return null;
  const handle = INSTAGRAM_HANDLE.trim().replace(/^@/, "");
  if (!INSTAGRAM_HANDLE_PATTERN.test(handle)) return null;
  return handle;
}

export function instagramProfileUrl(): string | null {
  const handle = instagramHandle();
  if (!handle) return null;
  return `https://www.instagram.com/${handle}/`;
}

export const instagramPendingCopy = `${site.founder}'s Instagram will appear here once the handle is confirmed.`;

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
