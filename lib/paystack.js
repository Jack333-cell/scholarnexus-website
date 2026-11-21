// Server-only helpers for Paystack. PAYSTACK_SECRET_KEY is set in Vercel (never in code).
export const paystackReady = () => Boolean(process.env.PAYSTACK_SECRET_KEY);

export async function paystack(path, init = {}) {
  const res = await fetch('https://api.paystack.co' + path, {
    ...init,
    headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, 'Content-Type': 'application/json', ...(init.headers || {}) },
    cache: 'no-store',
  });
  const json = await res.json().catch(() => ({}));
  return { ok: res.ok && json.status === true, json };
}

// Returns the verified transaction, or null if it is not a successful payment.
export async function verifyPayment(reference) {
  if (!reference || !/^[A-Za-z0-9_.=-]{6,100}$/.test(reference)) return null;
  const { ok, json } = await paystack(`/transaction/verify/${encodeURIComponent(reference)}`);
  if (!ok || json.data?.status !== 'success') return null;
  return json.data;
}
