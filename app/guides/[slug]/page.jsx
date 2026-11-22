import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader, SiteFooter } from '../../../components/SiteShell';
import ProtectedPreview from '../../../components/ProtectedPreview';
import PayButton from '../../../components/PayButton';
import { GUIDES, fmtKES, fmtUSD, orderLink } from '../../../lib/pricing';

export const dynamicParams = false;
export function generateStaticParams() { return GUIDES.map((g) => ({ slug: g.slug })); }
const find = (s) => GUIDES.find((g) => g.slug === s);
export function generateMetadata({ params }) {
  const g = find(params.slug);
  if (!g) return {};
  return { title: `${g.title} (PDF Guide)`, description: g.blurb, alternates: { canonical: `/guides/${g.slug}` } };
}

export default function Page({ params }) {
  const g = find(params.slug);
  if (!g) notFound();
  const fallback = g.paymentUrl || orderLink(`${g.title} PDF guide (${fmtKES(g.kes)} / ${fmtUSD(g.usd)})`);
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="text-sm text-slate-500 mb-6"><Link href="/courses" className="hover:text-blue-600">Courses</Link> › PDF guide</nav>
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <ProtectedPreview src={`/templates/${g.file}-preview.jpg`} alt={`${g.title} preview`} />
            <p className="text-xs text-slate-500 mt-2 text-center">Preview of page 1. The full {g.pages}-page guide is unlocked after purchase.</p>
          </div>
          <aside className="lg:col-span-2">
            <div className="lg:sticky lg:top-24">
              <p className="text-sm font-semibold text-amber-700 mb-1">PDF guide · {g.pages} pages</p>
              <h1 className="text-3xl font-bold mb-3">{g.title}</h1>
              <p className="text-slate-600 mb-6">{g.blurb}</p>
              <ul className="space-y-2 text-sm text-slate-700 mb-6">
                <li>✔ 5 hand-picked courses with ratings, length and who each one suits</li>
                <li>✔ Which 2 courses to buy, so you do not waste money</li>
                <li>✔ Free official practice tests from the British Council and IELTS.org</li>
                <li>✔ 6-week study plan and money-saving tips</li>
                <li>✔ Pay by M-Pesa or card, instant PDF download</li>
              </ul>
              <p className="text-3xl font-bold text-green-700 mb-1">{fmtKES(g.kes)}</p>
              <p className="text-slate-500 mb-5">{fmtUSD(g.usd)} for international buyers</p>
              <PayButton id={`guide-${g.slug}`} label="Buy and download the guide" compact fallback={fallback} className="block text-center w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700" />
              <p className="text-xs text-slate-500 mt-5">Looking for scholarships that need IELTS? <Link href="/scholarships" className="text-blue-600 underline">Browse verified scholarships</Link>.</p>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
