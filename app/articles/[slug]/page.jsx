import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader, SiteFooter } from '../../../components/SiteShell';
import ArticleBody, { headingsOf } from '../../../components/ArticleBody';
import { ARTICLES, findArticle, wordCount } from '../../../lib/articles';
import { SITE } from '../../../lib/collections';

export const dynamicParams = false;
export function generateStaticParams() { return ARTICLES.map((a) => ({ slug: a.slug })); }

export async function generateMetadata({ params }) {
  const a = findArticle((await params).slug);
  if (!a) return {};
  return {
    title: a.title, description: a.description, alternates: { canonical: `/articles/${a.slug}` },
    openGraph: { type: 'article', title: a.title, description: a.description, url: `${SITE}/articles/${a.slug}`, publishedTime: a.published },
  };
}

const fmt = (d) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export default async function Page({ params }) {
  const a = findArticle((await params).slug);
  if (!a) notFound();
  const toc = headingsOf(a.body);
  const related = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3);
  const ld = {
    '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.description,
    datePublished: a.published, dateModified: a.updated || a.published, wordCount: wordCount(a),
    author: { '@type': 'Organization', name: 'ScholarNexus', url: SITE },
    publisher: { '@type': 'Organization', name: 'ScholarNexus', logo: { '@type': 'ImageObject', url: `${SITE}/logo-mark.png` } },
    mainEntityOfPage: `${SITE}/articles/${a.slug}`,
  };
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        <nav className="text-sm text-slate-500 mb-6"><Link href="/articles" className="hover:text-blue-600">Guides</Link> › {a.category}</nav>
        <div className="grid lg:grid-cols-4 gap-10">
          <article className="lg:col-span-3 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">{a.title}</h1>
            <p className="text-sm text-slate-500 mb-6">By the ScholarNexus team · {fmt(a.updated || a.published)} · {a.readMins} min read{a.checked ? ` · Facts checked ${a.checked}` : ''}</p>
            <ArticleBody body={a.body} />
            <div className="mt-12 border-t border-slate-200 pt-6">
              <h2 className="text-xl font-bold mb-4">More guides</h2>
              <ul className="space-y-2">{related.map((r) => <li key={r.slug}><Link href={`/articles/${r.slug}`} className="text-blue-600 underline">{r.title}</Link></li>)}</ul>
            </div>
          </article>
          <aside className="hidden lg:block">
            <div className="sticky top-24 text-sm">
              <p className="font-semibold text-slate-900 mb-2">On this page</p>
              <ul className="space-y-1.5 border-l border-slate-200 pl-3">{toc.map((h) => <li key={h.id}><a href={`#${h.id}`} className="text-slate-600 hover:text-blue-600">{h.text}</a></li>)}</ul>
              <div className="mt-6 rounded-lg bg-blue-50 border border-blue-100 p-4">
                <p className="font-semibold text-slate-900 mb-1">Need feedback?</p>
                <p className="text-slate-600 mb-2">Get your SOP, CV or proposal reviewed by our team.</p>
                <Link href="/pricing" className="text-blue-600 font-semibold underline">See services</Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
