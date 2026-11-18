import './globals.css';

export const metadata = {
  title: 'ScholarNexus — Verified Scholarships & Academic Guidance',
  description: 'Verified, open scholarship opportunities with official links, plus guidance on applications, CVs and theses. Connect · Empower · Succeed.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
