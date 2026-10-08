import { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.naira.autos';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Aggressive SEO/scraper bots with no search value — they burn CDN
        // requests and ISR reads on thousands of long-tail pages.
        userAgent: ['Bytespider', 'PetalBot', 'AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot', 'DataForSeoBot', 'BLEXBot'],
        disallow: '/',
      },
      {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/profile/',
        '/profile/*',
        '/requests/create',
        '/requests/view',
        '/add-listing',
        '/saved',
        '/*.json$',
      ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
