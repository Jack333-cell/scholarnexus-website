import { ADSENSE_CLIENT } from '../../lib/ads';

// Serves /ads.txt, which AdSense checks to confirm you own the ad slots on this site.
export function GET() {
  if (!ADSENSE_CLIENT) return new Response('Not found', { status: 404 });
  const pub = ADSENSE_CLIENT.replace(/^ca-/, '');
  return new Response(`google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`, { headers: { 'Content-Type': 'text/plain' } });
}
