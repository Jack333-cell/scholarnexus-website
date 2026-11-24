// Server-only helpers for Paystack. PAYSTACK_SECRET_KEY is set in Vercel (never in code).
import { getItem } from './catalog';

export const paystackReady = () => Boolean(process.env.PAYSTACK_SECRET_KEY);

export async function paystack(path, init = {}) {
  const res = await fetch('https://api.paystack.co' + path, {
    ...init,
    headers: { Authorization: `Bearer ${(process.env.PAYSTACK_SECRET_KEY || '').trim()}`, 'Content-Type': 'application/json', ...(init.headers || {}) },
    cache: 'no-store',
  });
  const json = await res.json().catch(() => ({}));
  return { ok: res.ok && json.status === true, json };
}

// Returns the verified transaction, or null if it is not a successful payment for the full
// price of a real catalog item. The amount and currency are checked against the server-side
// catalog, not the transaction's own metadata, so a cheap payment (e.g. made with the public key
// and a hand-written item_id) can never unlock a more expensive item.
export async function verifyPayment(reference) {
  if (!reference || !/^[A-Za-z0-9_.=-]{6,100}$/.test(reference)) return null;
  const { ok, json } = await paystack(`/transaction/verify/${encodeURIComponent(reference)}`);
  const tx = json.data;
  if (!ok || tx?.status !== 'success') return null;
  const item = getItem(tx.metadata?.item_id);
  if (!item || String(tx.currency).toUpperCase() !== 'KES') return null;
  if (!(Number(tx.amount) >= item.kes * 100)) return null; // Paystack amounts are in cents
  return tx;
}
