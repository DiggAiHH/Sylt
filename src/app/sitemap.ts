/**
 * Dynamic Sitemap Generation
 * Generates XML sitemap for search engine crawlers
 * Follows sitemap protocol standards
 */

import { MetadataRoute } from "next";
import { ALL_PAGES, SITE_CONFIG } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ALL_PAGES.map((page) => ({
    url: `${SITE_CONFIG.url}${page.path}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
