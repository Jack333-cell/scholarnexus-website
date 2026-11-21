import { SiteHeader, SiteFooter } from '../../../components/SiteShell';
import CvPolisher from '../../../components/CvPolisher';

export const metadata = {
  title: 'AI CV Polisher: Turn Your CV Into a Professional PDF or Word File',
  description: 'Paste your CV and AI polishes it instantly: stronger action verbs, consistent dates, clean sections and a professional layout. Download as PDF or Word from KES 250.',
  alternates: { canonical: '/tools/cv-polisher' },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">✨ AI CV Polisher</h1>
        <p className="text-lg text-slate-600 mb-8">Paste your CV and our AI polishes it in seconds, without inventing anything. See what changed and preview the result for free, then download the full CV as a PDF or Word file.</p>
        <CvPolisher />
      </main>
      <SiteFooter />
    </div>
  );
}
