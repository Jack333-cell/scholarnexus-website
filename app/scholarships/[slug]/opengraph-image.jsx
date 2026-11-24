import { ImageResponse } from 'next/og';
import { getBySlug, shortTitle } from '../../../lib/collections';
import { scholarships } from '../../../lib/data';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'ScholarNexus scholarship';

export function generateStaticParams() {
  return scholarships.map((s) => ({ slug: s.slug }));
}

const clip = (t, n) => (t.length > n ? t.slice(0, n - 1).trimEnd() + '…' : t);
// Keep only characters the default font can draw (drop emoji/flags).
const plain = (t) => t.replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu, '').replace(/≥/g, 'at least ').replace(/≈/g, '~').replace(/\s+/g, ' ').trim();

export default async function Image({ params }) {
  const s = getBySlug((await params).slug);
  const title = s ? clip(plain(shortTitle(s)), 80) : 'Verified scholarships';
  const amount = s ? clip(plain(s.amount), 70) : '';
  const deadline = s ? clip(plain(s.deadline), 34) : '';
  const where = s ? clip(plain(s.country), 40) : '';
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'linear-gradient(135deg,#0b1f4d 0%,#123a8a 100%)', color: 'white', padding: '56px 64px', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', fontSize: 34, fontWeight: 700 }}>Scholar<span style={{ color: '#f5b301' }}>Nexus</span></div>
          <div style={{ display: 'flex', fontSize: 24, background: 'rgba(255,255,255,0.15)', padding: '8px 18px', borderRadius: 999 }}>{where}</div>
        </div>
        <div style={{ display: 'flex', fontSize: title.length > 50 ? 56 : 66, fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', fontSize: 34, fontWeight: 700, color: '#5eead4' }}>{amount}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 28 }}>
            <div style={{ display: 'flex', background: '#f5b301', color: '#0b1f4d', fontWeight: 800, padding: '10px 22px', borderRadius: 12 }}>Deadline: {deadline}</div>
            <div style={{ display: 'flex', color: '#cbd5e1' }}>scholarnexushub.com</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
