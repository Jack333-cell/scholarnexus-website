import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import ChatAssistant from '../components/ChatAssistant';
import { ADSENSE_CLIENT } from '../lib/ads';

export const metadata = {
  metadataBase: new URL('https://www.scholarnexushub.com'),
  title: { default: 'ScholarNexus — Verified Scholarships & Academic Guidance', template: '%s | ScholarNexus' },
  description: 'Verified, open scholarship opportunities with official links, plus guidance on applications, CVs and theses. Connect · Empower · Succeed.',
  alternates: { canonical: '/' },
  openGraph: { siteName: 'ScholarNexus', type: 'website', locale: 'en_GB' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {ADSENSE_CLIENT && (
        <head>
          <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`} crossOrigin="anonymous" />
        </head>
      )}
      <body>
        {children}
        <ChatAssistant />
        <Analytics />
      </body>
    </html>
  );
}
