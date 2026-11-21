import Link from 'next/link';
import { SiteHeader, SiteFooter } from '../../../components/SiteShell';
import { verifyPayment } from '../../../lib/paystack';
import { getItem, templateTitle } from '../../../lib/catalog';
import { WHATSAPP } from '../../../lib/pricing';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Payment status', robots: { index: false } };

export default async function Page({ searchParams }) {
  const ref = searchParams?.reference || searchParams?.trxref;
  const tx = await verifyPayment(ref);
  const item = tx ? getItem(tx.metadata?.item_id) : null;
  const wa = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-14">
        {!tx || !item ? (
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-6">
            <h1 className="text-2xl font-bold mb-2">We couldn't confirm this payment yet</h1>
            <p className="text-slate-700 mb-4">If money left your M-Pesa or card, don't pay again. Send us your payment reference and we'll sort it out quickly.</p>
            <a href={wa(`Hello ScholarNexus, I paid but the website could not confirm it. Reference: ${ref || 'unknown'}`)} target="_blank" rel="noopener noreferrer" className="inline-block px-5 py-2.5 bg-green-600 text-white font-semibold rounded-lg">Contact us on WhatsApp</a>
          </div>
        ) : (
          <div className="rounded-xl border border-green-300 bg-green-50 p-6">
            <p className="text-green-700 font-semibold mb-1">✔ Payment received</p>
            <h1 className="text-2xl font-bold mb-2">Thank you! {item.name}</h1>
            <p className="text-slate-700 mb-1">Amount: KES {(tx.amount / 100).toLocaleString('en-US')} · Reference: <span className="font-mono">{tx.reference}</span></p>
            <p className="text-slate-500 text-sm mb-6">A receipt has been sent to {tx.customer?.email}.</p>

            {item.files ? (
              <>
                <h2 className="font-bold mb-3">Download your file{item.files.length > 1 ? 's' : ''}</h2>
                <ul className="space-y-2 mb-4">
                  {item.files.map((f) => (
                    <li key={f}><a href={`/api/download?ref=${encodeURIComponent(tx.reference)}&file=${encodeURIComponent(f)}`} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">⬇ {templateTitle(f)} (.docx)</a></li>
                  ))}
                </ul>
                <p className="text-sm text-slate-600">Bookmark this page: your download links work for 14 days. Use the templates as models and write your own story.</p>
              </>
            ) : (
              <>
                <h2 className="font-bold mb-2">Next step: send us your document</h2>
                <p className="text-slate-700 mb-4">Send your file and any instructions on WhatsApp or to info@scholarnexushub.com, quoting your reference. We'll confirm the delivery date.</p>
                <div className="flex flex-wrap gap-3">
                  <a href={wa(`Hello ScholarNexus, I have paid for: ${item.name}. Reference: ${tx.reference}`)} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-green-600 text-white font-semibold rounded-lg">Send on WhatsApp</a>
                  <a href={`mailto:info@scholarnexushub.com?subject=${encodeURIComponent(`Order ${tx.reference}: ${item.name}`)}`} className="px-5 py-2.5 border-2 border-blue-600 text-blue-700 font-semibold rounded-lg">Send by email</a>
                </div>
              </>
            )}
          </div>
        )}
        <p className="text-sm text-slate-500 mt-8"><Link href="/" className="text-blue-600 underline">Back to ScholarNexus</Link></p>
      </main>
      <SiteFooter />
    </div>
  );
}
