import { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nairaautos.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: '/', priority: 1 },
    { url: '/search', priority: 0.9 },
    { url: '/add-listing', priority: 0.8 },
    { url: '/sell-for-me', priority: 0.8 },
    { url: '/saved', priority: 0.7 },
    { url: '/requests', priority: 0.7 },
    { url: '/requests/create', priority: 0.6 },
    { url: '/requests/view', priority: 0.6 },
    { url: '/blog', priority: 0.7 },
    { url: '/store', priority: 0.7 },
    { url: '/profile', priority: 0.5 },
    { url: '/profile/listings', priority: 0.5 },
    { url: '/profile/settings', priority: 0.4 },
    { url: '/profile/verification', priority: 0.4 },
    { url: '/profile/notifications', priority: 0.4 },
  ];

  return staticPages.map((page) => ({
    url: `${siteUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: page.priority,
  }));
}

export const revalidate = 86400;
