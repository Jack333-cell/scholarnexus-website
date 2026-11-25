import Link from 'next/link';
import { SiteHeader, SiteFooter } from '../../components/SiteShell';
import { ARTICLES } from '../../lib/articles';
import { SITE } from '../../lib/collections';

export const metadata = {
  title: 'Scholarship Guides: SOPs, CVs, References, IELTS Waivers and More',
  description: 'Free, in-depth guides for African students applying for scholarships abroad: statements of purpose, academic CVs, recommendation letters, scholarships without IELTS, research proposals and avoiding scams.',
  alternates: { canonical: '/articles' },
};

export default function Page() {
  const ld = {
    '@context': 'https://schema.org', '@type': 'ItemList', name: 'ScholarNexus scholarship guides',
    itemListElement: ARTICLES.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/articles/${a.slug}`, name: a.title })),
  };
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Scholarship guides</h1>
        <p className="text-lg text-slate-600 mb-8 max-w-3xl">Practical, step-by-step advice for winning fully funded scholarships, written by the ScholarNexus team for students in Africa and beyond. Free to read, always.</p>
        <div className="grid md:grid-cols-2 gap-5">
          {ARTICLES.map((a) => (
            <Link key={a.slug} href={`/articles/${a.slug}`} className="block border border-slate-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 mb-1">{a.category} · {a.readMins} min read</p>
              <h2 className="text-lg font-bold mb-2 text-slate-900">{a.title}</h2>
              <p className="text-sm text-slate-600">{a.description}</p>
            </Link>
          ))}
        </div>
        <div className="mt-10 rounded-xl bg-slate-50 border border-slate-200 p-6">
          <h2 className="text-xl font-bold mb-2">Ready to apply?</h2>
          <p className="text-slate-600 mb-3">Browse verified, currently open scholarships with funding amounts and official links.</p>
          <Link href="/scholarships" className="inline-block px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Browse scholarships</Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
