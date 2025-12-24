import { MetadataRoute } from 'next';

/**
 * Robots.txt Generator
 * 
 * Controls search engine crawler access to the site.
 * - Allows all crawlers by default
 * - Blocks admin and API routes from indexing
 * - Specifies sitemap location
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://blumsylthotels.de';

  return {
    rules: [
      {
        // Default rules for all crawlers
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // API endpoints should not be indexed
          '/admin/',         // Admin area (if exists)
          '/_next/',         // Next.js internal routes
          '/private/',       // Private pages
          '/*.json$',        // JSON files
          '/booking/confirm/*', // Booking confirmation pages with sensitive data
        ],
      },
      {
        // Specific rules for aggressive bots
        userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot', 'anthropic-ai'],
        disallow: ['/'],     // Block AI training bots
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
