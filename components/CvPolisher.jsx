'use client';
import { useEffect, useMemo, useState } from 'react';
import { polishCV, cvCanonical } from '../lib/cvPolish';
import { CV_POLISH, fmtKES, fmtUSD, orderLink } from '../lib/pricing';
import CvPreview from './CvPreview';

export const sha256 = async (text) => {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
};
export async function downloadCv(ref, cv) {
  const r = await fetch('/api/cv/render', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ref, cv }) });
  if (!r.ok) { const j = await r.json().catch(() => ({})); throw new Error(j.error || 'failed'); }
  const blob = await r.blob();
  const name = (r.headers.get('Content-Disposition') || '').match(/filename="([^"]+)"/)?.[1] || 'CV';
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove();
}

export default function CvPolisher() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [format, setFormat] = useState('pdf');
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [paidRef, setPaidRef] = useState('');
  useEffect(() => { const r = new URLSearchParams(window.location.search).get('ref'); if (r) setPaidRef(r); }, []);

  const polish = () => { setResult(polishCV(text)); setMsg(''); setTimeout(() => document.getElementById('cv-result')?.scrollIntoView({ behavior: 'smooth' }), 50); };

  async function pay(e) {
    e.preventDefault(); setBusy(true); setMsg('');
    const canon = cvCanonical(result.cv); const cvHash = await sha256(canon);
    try { localStorage.setItem('sn_cv_' + cvHash, canon); } catch {}
    const r = await fetch('/api/pay/init', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: 'cv-polish', email, cvHash, format }) });
    const j = await r.json().catch(() => ({}));
    if (r.ok && j.url) { window.location.href = j.url; return; }
    if (r.status === 503) { window.open(orderLink(`Polished CV download (${format.toUpperCase()}, ${fmtKES(CV_POLISH.kes)})`), '_blank', 'noopener'); setBusy(false); return; }
    setMsg(j.error === 'bad_email' ? 'Please enter a valid email address.' : 'Could not start the payment. Please try again.'); setBusy(false);
  }
  async function unlock() {
    setBusy(true); setMsg('');
    try { await downloadCv(paidRef, result.cv); setMsg('✔ Downloaded.'); }
    catch (e) { setMsg(e.message === 'cv_mismatch' ? 'This CV is different from the one you paid for. Paste exactly the same CV text to download it.' : 'We could not find a payment for this link. Contact us on WhatsApp with your reference.'); }
    setBusy(false);
  }

  return (
    <div>
      {paidRef && <div className="mb-6 rounded-xl border border-green-300 bg-green-50 p-4 text-sm text-green-900">Payment reference <span className="font-mono">{paidRef}</span>: paste the <strong>same CV</strong> you paid for and click <strong>Polish my CV</strong>, then download it below.</div>}
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <label className="font-semibold text-slate-800">1. Paste your CV</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={20} placeholder={'Paste the full text of your CV here (copy it from Word or PDF).\n\nKeep the section headings, e.g. Education, Experience, Skills, Referees.'} className="w-full mt-2 p-4 border border-slate-300 rounded-xl text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <div className="flex items-center justify-between mt-3 gap-3">
            <span className="text-xs text-slate-500">Polishing happens in your browser. Nothing is uploaded until you choose to buy the file.</span>
            <button onClick={polish} disabled={text.trim().length < 80} className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 whitespace-nowrap">Polish my CV</button>
          </div>
        </div>
        <div>
          {!result ? (
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-6 text-slate-700">
              <p className="font-semibold text-slate-900 mb-2">What the polisher does</p>
              <ul className="text-sm space-y-1.5 list-disc pl-5">
                <li>Rewrites weak phrases ("responsible for", "duties included", "worked on") into strong action verbs</li>
                <li>Puts achievements in the past tense and makes bullets consistent</li>
                <li>Formats dates the same way (2018 – 2022, Jan 2023 – Present)</li>
                <li>Removes details international applications don't need (date of birth, marital status, religion, ID)</li>
                <li>Orders sections the way scholarship committees and employers expect</li>
                <li>Applies a clean, professional layout, ready as PDF or Word</li>
              </ul>
            </div>
          ) : (
            <div id="cv-result">
              <p className="font-semibold text-slate-800 mb-2">2. What we improved ({result.changes.length} changes)</p>
              <ul className="space-y-1.5 mb-4">{result.changes.map((c) => <li key={c} className="text-sm p-2 rounded-lg bg-green-50 border border-green-200 text-green-900">✔ {c}</li>)}</ul>
              {result.tips.length > 0 && <><p className="font-semibold text-slate-800 mb-2">Add these yourself for an even stronger CV</p><ul className="space-y-1.5">{result.tips.map((t) => <li key={t} className="text-sm p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">⚠ {t}</li>)}</ul></>}
            </div>
          )}
        </div>
      </div>

      {result && (
        <div className="grid lg:grid-cols-5 gap-8 mt-10">
          <div className="lg:col-span-3">
            <p className="font-semibold text-slate-800 mb-2">3. Preview of your polished CV</p>
            <CvPreview cv={result.cv} locked={!paidRef} />
          </div>
          <aside className="lg:col-span-2">
            <div className="lg:sticky lg:top-24 rounded-xl border-2 border-blue-600 p-6">
              {paidRef ? (
                <>
                  <p className="text-xl font-bold mb-3">Download your polished CV</p>
                  <button onClick={unlock} disabled={busy} className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:opacity-60">{busy ? 'Preparing…' : '⬇ Download'}</button>
                </>
              ) : (
                <form onSubmit={pay}>
                  <p className="text-xl font-bold mb-1">Get the full polished CV</p>
                  <p className="text-3xl font-bold text-green-700">{fmtKES(CV_POLISH.kes)} <span className="text-base font-normal text-slate-500">/ {fmtUSD(CV_POLISH.usd)}</span></p>
                  <p className="text-sm text-slate-600 mb-4">Pay by M-Pesa or card. Download straight away.</p>
                  <p className="text-sm font-semibold text-slate-800 mb-2">Choose your format</p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[['pdf', 'PDF', 'Ready to send or upload'], ['docx', 'Word (.docx)', 'Edit it yourself later']].map(([v, l, d]) => (
                      <label key={v} className={`cursor-pointer rounded-lg border-2 p-3 ${format === v ? 'border-blue-600 bg-blue-50' : 'border-slate-200'}`}>
                        <input type="radio" name="fmt" value={v} checked={format === v} onChange={() => setFormat(v)} className="sr-only" />
                        <span className="block font-bold text-slate-900">{l}</span><span className="block text-xs text-slate-600">{d}</span>
                      </label>
                    ))}
                  </div>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email (for the receipt)" className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <button disabled={busy} className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-60">{busy ? 'Opening checkout…' : `Pay ${fmtKES(CV_POLISH.kes)} and download ${format === 'pdf' ? 'PDF' : 'Word'}`}</button>
                  <p className="text-xs text-slate-500 mt-3">Want a person to rewrite it fully? <a href="/pricing#applications" className="text-blue-600 underline">See CV services</a>.</p>
                </form>
              )}
              {msg && <p className="text-sm mt-3 text-slate-700">{msg}</p>}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
