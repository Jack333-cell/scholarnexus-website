import { SiteHeader, SiteFooter } from '../../../components/SiteShell';
import Matcher from '../../../components/Matcher';

export const metadata = {
  title: 'AI Scholarship Matcher: Find Scholarships That Fit You',
  description: 'Free AI scholarship matcher: choose your level, nationality, destination and field to see open, verified scholarships ranked by fit and deadline.',
  alternates: { canonical: '/tools/matcher' },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">✨ AI Scholarship Matcher</h1>
        <p className="text-lg text-slate-600 mb-8">Answer four questions and AI ranks the open scholarships that fit you best, with a reason for each. Free. Your answers are sent to Google Gemini to rank the results.</p>
        <Matcher />
      </main>
      <SiteFooter />
    </div>
  );
}
