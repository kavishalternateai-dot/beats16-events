/**
 * Copy swap: site-wide facts. Do not add client names, review counts, or prices.
 * Founder spelling is confirmed: Tushar Sonigra.
 */

/** Shared proof. Shown on the home founder section and About only. */
export const proofLines = [
  { value: "5,000+", detail: "events, weddings and festivals" },
  { value: "80+", detail: "Navratris organised" },
  { value: "Mumbai", detail: "home base, in India and abroad" },
] as const;

const FALLBACK_SITE_URL = "https://beats16-events.vercel.app";

function stripTrailingSlash(url: string) {
  return url.replace(/\/$/, "");
}

/** Canonical origin for metadata, sitemap, and schema. */
export function siteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return stripTrailingSlash(configured);
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "").replace(/\/$/, "");
    return `https://${host}`;
  }
  return FALLBACK_SITE_URL;
}

export const site = {
  name: "Beats16 Events & Entertainment",
  shortName: "Beats16",
  founder: "Tushar Sonigra",
  url: siteUrl(),
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
 * Kavish confirmed this handle. This one constant publishes the
 * profile link in Where to find us, on Contact, and in the footer.
 */
export const INSTAGRAM_HANDLE: string | null = "beats16bytushar";

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

export const bandNav = [
  { href: "/gauri", label: "Gauri" },
  { href: "/rdx", label: "RDX" },
  { href: "/daastan-e-ghazal", label: "Daastan-e-Ghazal" },
  { href: "/navratri", label: "Navratri" },
] as const;

export const primaryNav = [
  { href: "/weddings", label: "Weddings" },
  { href: "/corporate-cultural", label: "Corporate & cultural" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
] as const;

export const footerFocus = "We specialise in Indian weddings and traditional festivals.";

export const footerNav = [
  { href: "/", label: "Home" },
  { href: "/weddings", label: "Weddings" },
  ...bandNav,
  { href: "/corporate-cultural", label: "Corporate & cultural" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/#independent-bands", label: "Independent bands" },
] as const;
