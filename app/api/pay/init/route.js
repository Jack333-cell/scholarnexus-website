import { NextResponse } from 'next/server';
import { getItem } from '../../../../lib/catalog';
import { paystack, paystackReady } from '../../../../lib/paystack';

export async function POST(req) {
  if (!paystackReady()) return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  const body = await req.json().catch(() => ({}));
  const item = getItem(body.id);
  const email = String(body.email || '').trim().toLowerCase();
  if (!item) return NextResponse.json({ error: 'unknown_item' }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 120) return NextResponse.json({ error: 'bad_email' }, { status: 400 });

  const origin = new URL(req.url).origin;
  const { ok, json } = await paystack('/transaction/initialize', {
    method: 'POST',
    body: JSON.stringify({
      email,
      amount: item.kes * 100, // KES, in cents
      currency: 'KES',
      callback_url: `${origin}/pay/success`,
      metadata: {
        item_id: item.id,
        custom_fields: [{ display_name: 'Item', variable_name: 'item', value: item.name }],
      },
    }),
  });
  if (!ok) return NextResponse.json({ error: 'paystack_error', message: String(json.message || '').slice(0, 200) }, { status: 502 });
  return NextResponse.json({ url: json.data.authorization_url });
}
