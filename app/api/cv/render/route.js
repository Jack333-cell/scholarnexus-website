import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { verifyPayment } from '../../../../lib/paystack';
import { cvCanonical } from '../../../../lib/cvPolish';
import { cvToDocx, cvToPdf } from '../../../../lib/cvRender';

export const dynamic = 'force-dynamic';
const MAX_AGE_DAYS = 14;

// Builds the paid polished CV. The CV text comes from the buyer's browser; it must hash to the
// value recorded with the payment, so one payment unlocks exactly one CV.
export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const tx = await verifyPayment(body.ref);
  if (!tx || tx.metadata?.item_id !== 'cv-polish') return NextResponse.json({ error: 'payment_not_found' }, { status: 403 });
  const paidAt = new Date(tx.paid_at || tx.paidAt || tx.created_at);
  if (Date.now() - paidAt.getTime() > MAX_AGE_DAYS * 86400000) return NextResponse.json({ error: 'link_expired' }, { status: 410 });

  const cv = body.cv;
  if (!cv || typeof cv.name !== 'string' || !Array.isArray(cv.contact) || !Array.isArray(cv.sections)) return NextResponse.json({ error: 'bad_cv' }, { status: 400 });
  const text = cvCanonical(cv);
  if (text.length > 60000) return NextResponse.json({ error: 'too_long' }, { status: 413 });
  const hash = crypto.createHash('sha256').update(text, 'utf8').digest('hex');
  if (hash !== tx.metadata?.cv_hash) return NextResponse.json({ error: 'cv_mismatch' }, { status: 403 });

  const format = tx.metadata?.format === 'docx' ? 'docx' : 'pdf';
  const file = format === 'docx' ? await cvToDocx(cv) : await cvToPdf(cv);
  const safeName = (cv.name || 'CV').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'CV';
  return new NextResponse(file, {
    headers: {
      'Content-Type': format === 'docx' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : 'application/pdf',
      'Content-Disposition': `attachment; filename="${safeName}-CV-ScholarNexus.${format}"`,
      'Cache-Control': 'private, no-store',
    },
  });
}
