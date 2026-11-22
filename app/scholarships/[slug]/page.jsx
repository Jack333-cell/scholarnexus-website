import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader, SiteFooter } from '../../../components/SiteShell';
import ScholarshipCards, { DeadlineBadge } from '../../../components/ScholarshipCards';
import { scholarships } from '../../../lib/data';
import { prepFor } from '../../../lib/affiliates';
import { SITE, getBySlug, shortTitle, isClosed, formatDate, sortByDeadline, countries, levels } from '../../../lib/collections';

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return scholarships.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const s = getBySlug(params.slug);
  if (!s) return {};
  const title = `${shortTitle(s)}: Eligibility, Benefits & Deadline`;
  const description = `${s.excerpt} Deadline: ${s.deadline}. Requirements, benefits and the official application link.`.slice(0, 300);
  return {
    title,
    description,
    alternates: { canonical: `/scholarships/${s.slug}` },
    openGraph: { title, description, url: `${SITE}/scholarships/${s.slug}`, siteName: 'ScholarNexus', type: 'article' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default function Page({ params }) {
  const s = getBySlug(params.slug);
  if (!s) notFound();
  const closed = isClosed(s);
  const country = countries.find((c) => c.match.includes(s.country) && c.slug !== 'europe');
  const levelLinks = levels.filter((l) => s.levels.includes(l.slug));
  const related = sortByDeadline(
    scholarships.filter((o) => o.id !== s.id && !isClosed(o) && (o.country === s.country || o.levels.some((l) => s.levels.includes(l))))
  ).slice(0, 4);
  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: 'Scholarships', item: SITE + '/scholarships' },
      { '@type': 'ListItem', position: 3, name: shortTitle(s), item: `${SITE}/scholarships/${s.slug}` },
    ],
  };

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: shortTitle(s).slice(0, 110),
    description: s.excerpt,
    image: [`${SITE}/scholarships/${s.slug}/opengraph-image`],
    author: { '@type': 'Organization', name: 'ScholarNexus', url: SITE + '/about' },
    publisher: { '@type': 'Organization', name: 'ScholarNexus', logo: { '@type': 'ImageObject', url: SITE + '/logo-mark.png' } },
    mainEntityOfPage: `${SITE}/scholarships/${s.slug}`,
    about: { '@type': 'EducationalOccupationalProgram', name: shortTitle(s), provider: { '@type': 'Organization', name: s.university }, ...(s.closeDate ? { applicationDeadline: s.lastDate || s.closeDate } : {}) },
  };
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link> › <Link href="/scholarships" className="hover:text-blue-600">Scholarships</Link>
          {country && <> › <Link href={country.path} className="hover:text-blue-600">{country.name.replace(/^the /, '')}</Link></>}
        </nav>

        {closed && (
          <div className="mb-6 p-4 rounded-lg bg-slate-100 border border-slate-300 text-slate-700 text-sm">
            The deadline for this round ({formatDate(s.lastDate || s.closeDate)}) has passed. Check the official page for the next intake, or see <Link href="/scholarships/closing-soon" className="text-blue-600 underline font-semibold">scholarships closing soon</Link>.
          </div>
        )}

        <div className="flex items-start gap-4 mb-6">
          <div className="text-5xl md:text-6xl" aria-hidden="true">{s.thumbnail}</div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{s.title}</h1>
            <p className="text-lg text-slate-600 mb-1">{s.university}</p>
            <p className="text-sm text-slate-500 mb-3">By the ScholarNexus team · {s.date.replace(/^Updated/, 'Last checked')} against the official source · <Link href="/editorial-policy" className="underline hover:text-blue-600">How we verify</Link></p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">🌍 {s.country}</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">💰 {s.amount}</span>
              <DeadlineBadge s={s} />
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 rounded-lg p-4"><p className="text-sm text-slate-600 mb-1">Funding</p><p className="font-bold text-blue-600">{s.amount}</p></div>
          <div className="bg-green-50 rounded-lg p-4"><p className="text-sm text-slate-600 mb-1">Deadline</p><p className="font-bold text-green-700">{s.deadline}</p></div>
          <div className="bg-purple-50 rounded-lg p-4"><p className="text-sm text-slate-600 mb-1">Duration</p><p className="font-bold text-purple-700">{s.duration}</p></div>
          <div className="bg-orange-50 rounded-lg p-4"><p className="text-sm text-slate-600 mb-1">Academic standard</p><p className="font-bold text-orange-700">{s.gpa}</p></div>
        </div>

        <div className={`grid gap-4 mb-10 ${closed ? '' : 'lg:grid-cols-3'}`}>
          <div className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white flex flex-col">
            <h2 className="text-xl font-bold mb-1">Ready to apply?</h2>
            <p className="text-blue-100 text-sm mb-4 flex-1">Apply on the official website. Deadline: <strong className="text-white">{s.deadline}</strong></p>
            <a href={s.link} target="_blank" rel="noopener noreferrer" className="block text-center px-6 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition">Apply on the official page &rarr;</a>
          </div>
          {!closed && (
            <section className="lg:col-span-2 rounded-xl border border-amber-200 bg-amber-50 p-5">
              <h2 className="text-lg font-bold mb-1">Prepare for this scholarship</h2>
              <p className="text-sm text-slate-600 mb-3">Strengthen your application before the deadline.</p>
              <div className="grid sm:grid-cols-3 gap-3">
                {prepFor(s).map((p) => (
                  <a key={p.name} href={p.url} target="_blank" rel="sponsored noopener noreferrer" className="flex flex-col bg-white border border-slate-200 rounded-lg p-3 hover:shadow-md hover:border-amber-400 transition">
                    <span className="font-semibold text-sm mb-1">{p.name}</span>
                    <span className="text-xs text-slate-600 flex-1 mb-2">{p.why}</span>
                    <span className="text-xs font-semibold text-amber-700">On {p.src} &rarr;</span>
                  </a>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-3"><Link href="/courses" className="underline">More courses and tutors</Link> · <Link href="/guides/ielts-courses" className="underline font-semibold text-amber-700">IELTS courses guide (KSh 250)</Link></p>
            </section>
          )}
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">Overview</h2>
          <p className="text-lg text-slate-700 leading-relaxed">{s.description}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">Eligibility and requirements</h2>
          <ul className="space-y-2">
            {s.requirements.map((r, i) => <li key={i} className="flex gap-3 text-slate-700"><span className="text-green-600">✔</span><span>{r}</span></li>)}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">What you get</h2>
          <ul className="space-y-2">
            {s.benefits.map((b, i) => <li key={i} className="flex gap-3 text-slate-700"><span className="text-blue-600">★</span><span>{b}</span></li>)}
          </ul>
        </section>

        <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">How to apply</h2>
          <p className="text-blue-100 mb-6">Applications are made on the official website. Always confirm the latest deadline and eligibility there.</p>
          <a href={s.link} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition">Visit the official page</a>
          <p className="text-blue-100 text-sm mt-4">Need help with your motivation letter, CV or proposal? <a href="https://wa.me/254754835544" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Talk to ScholarNexus</a>.</p>
        </section>

        <div className="flex flex-wrap gap-2 mb-10">
          {levelLinks.map((l) => <Link key={l.slug} href={l.path} className="px-3 py-1.5 border border-slate-300 rounded-full text-sm hover:border-blue-600 hover:text-blue-600">More {l.label} opportunities</Link>)}
          {country && <Link href={country.path} className="px-3 py-1.5 border border-slate-300 rounded-full text-sm hover:border-blue-600 hover:text-blue-600">Scholarships in {country.name}</Link>}
          <Link href="/scholarships/closing-soon" className="px-3 py-1.5 border border-slate-300 rounded-full text-sm hover:border-blue-600 hover:text-blue-600">Closing soon</Link>
        </div>

        {related.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4">Related opportunities</h2>
            <ScholarshipCards items={related} />
          </section>
        )}
        <p className="text-xs text-slate-500 mt-8">{s.date}. Information verified against the official source; details can change, so always check the official page.</p>
      </main>
      <SiteFooter />
    </div>
  );
}
