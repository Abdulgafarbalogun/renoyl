import type { MetadataRoute } from 'next';

const BASE_URL = 'https://renoyl.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let productEntries: MetadataRoute.Sitemap = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, { cache: 'no-store' });
    if (res.ok) {
      const products = await res.json();
      productEntries = products
        .filter((p: { isActive: boolean }) => p.isActive)
        .map((p: { id: string; updatedAt?: string }) => ({
          url: `${BASE_URL}/products/${p.id}`,
          lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        }));
    }
  } catch {
    // backend unreachable during build — omit product URLs
  }

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/shop`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    ...productEntries,
  ];
}
