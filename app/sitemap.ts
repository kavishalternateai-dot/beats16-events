import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const paths = [
  "/",
  "/weddings",
  "/gauri",
  "/rdx",
  "/daastan-e-ghazal",
  "/navratri",
  "/corporate-cultural",
  "/about",
  "/faq",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: path === "/" ? `${site.url}/` : `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
