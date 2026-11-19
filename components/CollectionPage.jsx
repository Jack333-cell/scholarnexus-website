import Link from 'next/link';
import { SiteHeader, SiteFooter } from './SiteShell';
import ScholarshipCards from './ScholarshipCards';
import { SITE, allCollections } from '../lib/collections';

export function collectionMetadata(c) {
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: c.path },
    openGraph: { title: c.title, description: c.description, url: SITE + c.path, siteName: 'ScholarNexus', type: 'website' },
  };
}

export default function CollectionPage({ c }) {
  const items = c.items();
  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: 'Scholarships', item: SITE + '/scholarships' },
      { '@type': 'ListItem', position: 3, name: c.heading, item: SITE + c.path },
    ],
  };
  const others = allCollections().filter((o) => o.path !== c.path);
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="text-sm text-slate-500 mb-4"><Link href="/" className="hover:text-blue-600">Home</Link> › <Link href="/scholarships" className="hover:text-blue-600">Scholarships</Link></nav>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">{c.heading}</h1>
        <p className="text-lg text-slate-600 mb-2">{c.intro || c.description}</p>
        <p className="text-sm text-slate-500 mb-8">{items.length} verified listing{items.length === 1 ? '' : 's'} · each links to the official application page.</p>
        <ScholarshipCards items={items} />
        <section className="mt-12 bg-blue-50 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-2">Need help with your application?</h2>
          <p className="text-slate-700 text-sm">We review motivation letters, CVs and research proposals. <a href="https://wa.me/254754835544" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline">Chat on WhatsApp</a> or see <Link href="/#services" className="text-blue-600 font-semibold underline">our services</Link>.</p>
        </section>
        <section className="mt-10">
          <h2 className="text-lg font-bold mb-3">Browse more</h2>
          <div className="flex flex-wrap gap-2">
            {others.map((o) => (
              <Link key={o.path} href={o.path} className="px-3 py-1.5 border border-slate-300 rounded-full text-sm text-slate-700 hover:border-blue-600 hover:text-blue-600">{o.heading.replace(' for International Students', '')}</Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
