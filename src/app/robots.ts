import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/checkout/', '/success/', '/cancel/'],
    },
    sitemap: 'https://renoyl.com/sitemap.xml',
  };
}
