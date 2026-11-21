'use client';
import { useState } from 'react';

// Asks for the buyer's email, starts a Paystack checkout (M-Pesa or card) and redirects to it.
// If online payment is not switched on yet, it falls back to the WhatsApp order link.
export default function PayButton({ id, label = 'Pay now', fallback, className = '', compact = false }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  async function pay(e) {
    e.preventDefault();
    setBusy(true); setErr('');
    try {
      const r = await fetch('/api/pay/init', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, email }) });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.url) { window.location.href = j.url; return; }
      if (r.status === 503 && fallback) { window.open(fallback, '_blank', 'noopener'); setBusy(false); return; }
      setErr(j.error === 'bad_email' ? 'Please enter a valid email address.' : 'Could not start the payment. Please try again or order on WhatsApp.');
    } catch { setErr('Network error. Please try again.'); }
    setBusy(false);
  }

  if (!open) {
    return <button type="button" onClick={() => setOpen(true)} className={className}>{label}</button>;
  }
  return (
    <form onSubmit={pay} className={`flex ${compact ? 'flex-col' : 'flex-col sm:flex-row'} gap-2 w-full`}>
      <input type="email" required autoFocus value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email (receipt and files)" className="flex-1 min-w-0 px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <button type="submit" disabled={busy} className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-md hover:bg-green-700 disabled:opacity-60 whitespace-nowrap">{busy ? 'Opening checkout…' : 'Continue to pay'}</button>
      {err && <p className="text-xs text-red-600 sm:basis-full">{err}</p>}
    </form>
  );
}
