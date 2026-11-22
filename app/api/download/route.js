import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { getItem, fileExt } from '../../../lib/catalog';
import { verifyPayment } from '../../../lib/paystack';

export const dynamic = 'force-dynamic';
const MAX_AGE_DAYS = 14; // download links work for two weeks after payment

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const ref = searchParams.get('ref');
  const file = searchParams.get('file');
  const tx = await verifyPayment(ref);
  if (!tx) return NextResponse.json({ error: 'payment_not_found' }, { status: 403 });

  const item = getItem(tx.metadata?.item_id);
  if (!item || !item.files || !item.files.includes(file)) return NextResponse.json({ error: 'not_purchased' }, { status: 403 });
  const paidAt = new Date(tx.paid_at || tx.paidAt || tx.created_at);
  if (Date.now() - paidAt.getTime() > MAX_AGE_DAYS * 86400000) return NextResponse.json({ error: 'link_expired' }, { status: 410 });

  const key = Buffer.from(process.env.TEMPLATE_KEY || '', 'hex');
  if (key.length !== 32) return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  const ext = fileExt(file);
  const blob = await readFile(path.join(process.cwd(), 'private', 'templates', `${file}.${ext}.enc`));
  const iv = blob.subarray(0, 12), tag = blob.subarray(blob.length - 16), ct = blob.subarray(12, blob.length - 16);
  const d = crypto.createDecipheriv('aes-256-gcm', key, iv);
  d.setAuthTag(tag);
  const out = Buffer.concat([d.update(ct), d.final()]);

  const type = ext === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  return new NextResponse(out, {
    headers: {
      'Content-Type': type,
      'Content-Disposition': `attachment; filename="ScholarNexus-${file}.${ext}"`,
      'Cache-Control': 'private, no-store',
    },
  });
}
