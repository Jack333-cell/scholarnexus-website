import { scholarships } from '../lib/data';
import { SITE, allCollections } from '../lib/collections';
import { TEMPLATES } from '../lib/pricing';

export default function sitemap() {
  const now = new Date();
  return [
    { url: `${SITE}/`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE}/scholarships`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE}/tools`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/tools/matcher`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE}/tools/cv-polisher`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/tools/writing-checker`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/courses`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE}/templates`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    ...TEMPLATES.map((t) => ({ url: `${SITE}/templates/${t.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 })),
    ...allCollections().map((c) => ({ url: SITE + c.path, lastModified: now, changeFrequency: 'daily', priority: 0.8 })),
    ...scholarships.map((s) => ({ url: `${SITE}/scholarships/${s.slug}`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 })),
  ];
}
