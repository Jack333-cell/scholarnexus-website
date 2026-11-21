import { SiteHeader, SiteFooter } from '../../../components/SiteShell';
import WritingChecker from '../../../components/WritingChecker';

export const metadata = {
  title: 'Free SOP, Motivation Letter and CV Checker',
  description: 'Paste your motivation letter, statement of purpose or CV and get instant, free feedback on structure, clichés, evidence, programme fit and more.',
  alternates: { canonical: '/tools/writing-checker' },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Free SOP, Motivation Letter and CV Checker</h1>
        <p className="text-lg text-slate-600 mb-8">Paste your draft and get instant feedback on the problems scholarship committees notice most.</p>
        <WritingChecker />
      </main>
      <SiteFooter />
    </div>
  );
}
