import { instagramProfileUrl, site } from "@/content/site";

const bands = [
  {
    id: "gauri",
    name: "Gauri",
    path: "/gauri",
    description: "Beats16 band for wedding rituals and traditional ceremonies, including the pheras.",
  },
  {
    id: "rdx",
    name: "RDX",
    path: "/rdx",
    description: "Beats16 wireless band for sangeet nights and private events.",
  },
  {
    id: "daastan-e-ghazal",
    name: "Daastan-e-Ghazal",
    path: "/daastan-e-ghazal",
    description: "Beats16 band for ghazal evenings at cultural, community and private events.",
  },
  {
    id: "navratri",
    name: "Navratri band by Beats16",
    path: "/navratri",
    description: "Live garba and dandiya from Beats16, for communities in India and around the world.",
  },
] as const;

export function performingGroup(id: (typeof bands)[number]["id"]) {
  const band = bands.find((item) => item.id === id);
  if (!band) return null;
  return {
    "@type": "PerformingGroup",
    "@id": `${site.url}${band.path}#band`,
    name: band.name,
    url: `${site.url}${band.path}`,
    description: band.description,
    parentOrganization: { "@id": `${site.url}/#organization` },
  };
}

export function organizationJsonLd() {
  const instagram = instagramProfileUrl();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "PerformingGroup"],
        "@id": `${site.url}/#organization`,
        name: site.name,
        alternateName: site.shortName,
        url: site.url,
        telephone: site.phoneDisplay,
        email: site.email,
        logo: `${site.url}/icon`,
        image: `${site.url}/opengraph-image`,
        ...(instagram ? { sameAs: [instagram] } : {}),
        founder: {
          "@type": "Person",
          name: site.founder,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressRegion: site.region,
          addressCountry: site.country,
        },
        areaServed: [
          { "@type": "Country", name: "India" },
          { "@type": "Place", name: "Performances abroad" },
        ],
        description:
          "Mumbai band for Indian weddings and traditional festivals, performing in India and abroad.",
        genre: ["Indian wedding music", "Garba", "Dandiya", "Ghazal"],
        subOrganization: bands.map((band) => ({ "@id": `${site.url}${band.path}#band` })),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": `${site.url}/#organization` },
        inLanguage: "en-IN",
      },
    ],
  };
}

export function serviceJsonLd(options: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: options.name,
    description: options.description,
    url: `${site.url}${options.path}`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: ["India", "International"],
  };
}

export function breadcrumbJsonLd(items: readonly { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function aboutPageJsonLd(options: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: options.name,
    description: options.description,
    url: `${site.url}${options.path}`,
    mainEntity: { "@id": `${site.url}/#organization` },
  };
}

export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${site.url}/contact`,
    mainEntity: {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      telephone: site.phoneDisplay,
      email: site.email,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: site.phoneDisplay,
        email: site.email,
        contactType: "customer service",
        areaServed: ["India", "Worldwide"],
        availableLanguage: "English",
      },
    },
  };
}

export function faqJsonLd(items: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
