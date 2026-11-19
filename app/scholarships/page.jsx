import Link from 'next/link';
import { SiteHeader, SiteFooter } from '../../components/SiteShell';
import ScholarshipCards from '../../components/ScholarshipCards';
import { scholarships } from '../../lib/data';
import { sortByDeadline, allCollections } from '../../lib/collections';

export const revalidate = 3600;
export const metadata = {
  title: 'All Scholarships 2027: Verified, with Deadlines & Official Links',
  description: 'Browse verified scholarships, internships and student opportunities for 2027 — Masters, PhD and undergraduate — sorted by deadline, with official application links.',
  alternates: { canonical: '/scholarships' },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">All Scholarships &amp; Opportunities</h1>
        <p className="text-lg text-slate-600 mb-6">Every listing is checked against the official source and links straight to it. Sorted by nearest deadline.</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {allCollections().map((c) => (
            <Link key={c.path} href={c.path} className="px-3 py-1.5 border border-slate-300 rounded-full text-sm text-slate-700 hover:border-blue-600 hover:text-blue-600">{c.heading.replace(' for International Students', '')}</Link>
          ))}
        </div>
        <ScholarshipCards items={sortByDeadline(scholarships)} />
      </main>
      <SiteFooter />
    </div>
  );
}
