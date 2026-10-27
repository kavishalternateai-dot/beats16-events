import { instagramProfileUrl, site } from "@/content/site";

export function organizationJsonLd() {
  const founderInstagram = instagramProfileUrl();
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
        founder: {
          "@type": "Person",
          name: site.founder,
          ...(founderInstagram ? { sameAs: [founderInstagram] } : {}),
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
