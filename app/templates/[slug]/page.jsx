import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader, SiteFooter } from '../../../components/SiteShell';
import ProtectedPreview from '../../../components/ProtectedPreview';
import { TEMPLATES, TEMPLATE_BUNDLE, fmtKES, fmtUSD, buyLink } from '../../../lib/pricing';
import PayButton from '../../../components/PayButton';

export const dynamicParams = false;
export function generateStaticParams() { return TEMPLATES.map((t) => ({ slug: t.slug })); }
const find = (s) => TEMPLATES.find((t) => t.slug === s);
export function generateMetadata({ params }) {
  const t = find(params.slug);
  if (!t) return {};
  return { title: `${t.title}: Sample Template`, description: t.blurb, alternates: { canonical: `/templates/${t.slug}` } };
}

export default function Page({ params }) {
  const t = find(params.slug);
  if (!t) notFound();
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="text-sm text-slate-500 mb-6"><Link href="/templates" className="hover:text-blue-600">Templates</Link> › {t.title}</nav>
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <ProtectedPreview src={`/templates/${t.file}-preview.jpg`} alt={`${t.title} preview`} />
            <p className="text-xs text-slate-500 mt-2 text-center">Preview only. The full document is unlocked after purchase.</p>
          </div>
          <aside className="lg:col-span-2">
            <div className="lg:sticky lg:top-24">
              <h1 className="text-3xl font-bold mb-3">{t.title}</h1>
              <p className="text-slate-600 mb-6">{t.blurb}</p>
              <ul className="space-y-2 text-sm text-slate-700 mb-6">
                <li>✔ Full, editable Word file (.docx)</li>
                <li>✔ Complete example plus tips in each section</li>
                <li>✔ Pay by M-Pesa or card</li>
                <li>✔ Instant download after payment</li>
              </ul>
              <p className="text-3xl font-bold text-green-700 mb-1">{fmtKES(t.kes)}</p>
              <p className="text-slate-500 mb-5">{fmtUSD(t.usd)} for international buyers</p>
              <div className="mb-3"><PayButton id={`tpl-${t.slug}`} label="Buy and download the full file" compact fallback={buyLink(t)} className="block text-center w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700" /></div>
              <PayButton id="tpl-bundle" label={`Get all 6 for ${fmtKES(TEMPLATE_BUNDLE.kes)}`} compact fallback={buyLink(TEMPLATE_BUNDLE)} className="block text-center w-full px-6 py-3 border-2 border-blue-600 text-blue-700 font-semibold rounded-lg hover:bg-blue-50" />
              <p className="text-xs text-slate-500 mt-5">Use the template as a model; committees reject copied letters. Want feedback on your own draft? <Link href="/pricing" className="text-blue-600 underline">Review services from KES 250</Link>.</p>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
