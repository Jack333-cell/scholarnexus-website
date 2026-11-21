import { SiteHeader, SiteFooter } from '../../../components/SiteShell';
import Matcher from '../../../components/Matcher';

export const metadata = {
  title: 'Scholarship Matcher: Find Scholarships That Fit You',
  description: 'Free scholarship matcher: choose your level, nationality, destination and field to see open, verified scholarships ranked by fit and deadline.',
  alternates: { canonical: '/tools/matcher' },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Scholarship Matcher</h1>
        <p className="text-lg text-slate-600 mb-8">Answer four questions and see which open scholarships fit you best. Free, instant and private: nothing you enter leaves your browser.</p>
        <Matcher />
      </main>
      <SiteFooter />
    </div>
  );
}
