import type { Metadata } from "next";
import { site } from "@/content/site";

const TITLE_LIMIT = 60;
const DESCRIPTION_LIMIT = 155;

export function assertSeo(title: string, description: string) {
  if (title.length > TITLE_LIMIT) {
    throw new Error(`Title is ${title.length} characters (max ${TITLE_LIMIT}): ${title}`);
  }
  if (description.length > DESCRIPTION_LIMIT) {
    throw new Error(
      `Description is ${description.length} characters (max ${DESCRIPTION_LIMIT}): ${description}`,
    );
  }
}

export function pageMetadata(options: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}): Metadata {
  assertSeo(options.title, options.description);
  const index = options.index !== false;
  const imagePath = options.path === "/" || options.path === "/404" ? "/opengraph-image" : `${options.path}/opengraph-image`;

  return {
    title: { absolute: options.title },
    description: options.description,
    alternates: { canonical: options.path },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      title: options.title,
      description: options.description,
      url: options.path,
      type: "website",
      locale: site.locale,
      siteName: site.name,
      images: [{ url: imagePath, width: 1200, height: 630, alt: options.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: options.title,
      description: options.description,
      images: [imagePath],
    },
  };
}
