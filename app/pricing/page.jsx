import Link from 'next/link';
import { SiteHeader, SiteFooter } from '../../components/SiteShell';
import { FREE, PRICE_GROUPS, TERMS, fmtKES, fmtUSD, orderLink } from '../../lib/pricing';

export const metadata = {
  title: 'Services and Prices: CV, SOP, Thesis and Publication Support',
  description: 'Affordable academic services from ScholarNexus: CV and SOP review, thesis formatting, editing, data analysis guidance, publication and career support. Scholarship information is always free.',
  alternates: { canonical: '/pricing' },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Services and Prices</h1>
        <p className="text-lg text-slate-600 mb-8">Clear prices in Kenyan shillings and US dollars. Pay by M-Pesa or card.</p>

        <section className="mb-10 rounded-xl border-2 border-green-200 bg-green-50 p-6">
          <h2 className="text-xl font-bold text-green-800 mb-3">Always free</h2>
          <ul className="space-y-1.5 text-slate-700 mb-3">
            {FREE.map((f) => <li key={f} className="flex gap-2"><span className="text-green-600">✔</span>{f}</li>)}
          </ul>
          <p className="text-sm text-green-900 font-medium">ScholarNexus never charges for scholarship information or to "apply" for a scholarship. Official scholarships do not need an agent.</p>
        </section>

        <section className="mb-10 rounded-xl bg-blue-50 border border-blue-200 p-5 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <div>
            <p className="font-bold text-slate-900">Want a model to follow?</p>
            <p className="text-sm text-slate-600">Preview our sample CV, motivation letter, SOP and proposal templates, from KES 250.</p>
          </div>
          <Link href="/templates" className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg text-center hover:bg-blue-700">See templates</Link>
        </section>

        {PRICE_GROUPS.map((g) => (
          <section key={g.id} id={g.id} className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{g.title}</h2>
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="text-left font-semibold px-4 py-3">Service</th>
                    <th className="text-right font-semibold px-4 py-3 whitespace-nowrap">KES</th>
                    <th className="text-right font-semibold px-4 py-3 whitespace-nowrap hidden sm:table-cell">USD</th>
                    <th className="px-4 py-3"><span className="sr-only">Order</span></th>
                  </tr>
                </thead>
                <tbody>
                  {g.items.map((it, i) => (
                    <tr key={it.name} className={i % 2 ? 'bg-slate-50' : 'bg-white'}>
                      <td className="px-4 py-3 text-slate-800">{it.name}<span className="sm:hidden block text-xs text-slate-500">{it.from ? 'from ' : ''}{fmtUSD(it.usd)}</span></td>
                      <td className="px-4 py-3 text-right font-semibold text-green-700 whitespace-nowrap">{it.from ? 'from ' : ''}{fmtKES(it.kes)}</td>
                      <td className="px-4 py-3 text-right text-slate-600 whitespace-nowrap hidden sm:table-cell">{it.from ? 'from ' : ''}{fmtUSD(it.usd)}</td>
                      <td className="px-4 py-3 text-right">
                        <a href={orderLink(`${it.name} (${it.from ? 'from ' : ''}${fmtKES(it.kes)})`)} target="_blank" rel="noopener noreferrer" className="inline-block px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-md hover:bg-blue-700 whitespace-nowrap">{it.from ? 'Get a quote' : 'Order'}</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}

        <section className="rounded-xl bg-slate-50 border border-slate-200 p-6">
          <h2 className="text-xl font-bold mb-3">Payment terms</h2>
          <ul className="space-y-2 text-slate-700">
            {TERMS.map(([b, t]) => <li key={b}><strong>{b}:</strong> {t}</li>)}
          </ul>
          <p className="text-sm text-slate-500 mt-4">Prices in KES are based on about KES 129 per US dollar. Orders are confirmed on WhatsApp (+254 754 835 544) or by email at info@scholarnexushub.com.</p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
