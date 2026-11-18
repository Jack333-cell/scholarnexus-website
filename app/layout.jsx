import './globals.css';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  metadataBase: new URL('https://www.scholarnexushub.com'),
  title: 'ScholarNexus — Verified Scholarships & Academic Guidance',
  description: 'Verified, open scholarship opportunities with official links, plus guidance on applications, CVs and theses. Connect · Empower · Succeed.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
