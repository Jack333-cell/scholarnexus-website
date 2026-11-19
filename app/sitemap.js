import { scholarships } from '../lib/data';
import { SITE, allCollections } from '../lib/collections';

export default function sitemap() {
  const now = new Date();
  return [
    { url: `${SITE}/`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE}/scholarships`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    ...allCollections().map((c) => ({ url: SITE + c.path, lastModified: now, changeFrequency: 'daily', priority: 0.8 })),
    ...scholarships.map((s) => ({ url: `${SITE}/scholarships/${s.slug}`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 })),
  ];
}
