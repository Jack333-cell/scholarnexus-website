import Link from 'next/link';
import { SiteHeader, SiteFooter } from '../../components/SiteShell';
import ProtectedPreview from '../../components/ProtectedPreview';
import { TEMPLATES, TEMPLATE_BUNDLE, fmtKES, fmtUSD, buyLink } from '../../lib/pricing';

export const metadata = {
  title: 'CV, Motivation Letter and SOP Templates (Samples)',
  description: 'Preview sample academic CV, motivation letter, statement of purpose, cover letter, recommendation letter and research proposal templates. Full editable Word files from KES 250.',
  alternates: { canonical: '/templates' },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Sample Templates</h1>
        <p className="text-lg text-slate-600 mb-2">Real, complete examples with tips in every section. Preview the first part free; buy the full editable Word file to use as your guide.</p>
        <p className="text-sm text-slate-500 mb-8">Use them as models, not copies. Committees can spot copied letters, so always write your own story.</p>

        <div className="mb-10 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
          <div>
            <p className="text-xl font-bold">{TEMPLATE_BUNDLE.title}</p>
            <p className="text-blue-100">Every template below in one download: {fmtKES(TEMPLATE_BUNDLE.kes)} ({fmtUSD(TEMPLATE_BUNDLE.usd)}) instead of {fmtKES(TEMPLATES.reduce((a, t) => a + t.kes, 0))}.</p>
          </div>
          <a href={buyLink(TEMPLATE_BUNDLE)} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white text-blue-700 font-bold rounded-lg text-center hover:bg-blue-50">Buy the bundle</a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEMPLATES.map((t) => (
            <div key={t.slug} className="flex flex-col border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
              <Link href={`/templates/${t.slug}`} className="block mb-4">
                <div className="h-72 overflow-hidden rounded-lg"><ProtectedPreview src={`/templates/${t.file}-preview.jpg`} alt={`${t.title} preview`} /></div>
              </Link>
              <h2 className="font-bold text-lg mb-1"><Link href={`/templates/${t.slug}`} className="hover:text-blue-600">{t.title}</Link></h2>
              <p className="text-sm text-slate-600 mb-4 flex-1">{t.blurb}</p>
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-green-700">{fmtKES(t.kes)} <span className="text-slate-500 font-normal text-sm">/ {fmtUSD(t.usd)}</span></span>
                <div className="flex gap-2">
                  <Link href={`/templates/${t.slug}`} className="px-3 py-1.5 border border-slate-300 rounded-md text-sm font-medium hover:border-blue-600 hover:text-blue-600">Preview</Link>
                  <a href={buyLink(t)} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700">Buy</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-slate-500 mt-10">After payment, the full Word file (.docx) is sent to your email or WhatsApp. Need someone to review your own document instead? See <Link href="/pricing" className="text-blue-600 underline">our review services</Link>.</p>
      </main>
      <SiteFooter />
    </div>
  );
}
