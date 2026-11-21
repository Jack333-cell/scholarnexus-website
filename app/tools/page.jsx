import Link from 'next/link';
import { SiteHeader, SiteFooter } from '../../components/SiteShell';

export const metadata = {
  title: 'Free Smart Tools: Scholarship Matcher, SOP and CV Checker',
  description: 'Free ScholarNexus tools: find scholarships that fit you, check your motivation letter, SOP or CV, and ask our assistant about deadlines and prices.',
  alternates: { canonical: '/tools' },
};
const TOOLS = [
  ['🎯', 'Scholarship Matcher', 'Choose your level, nationality, destination and field. See open scholarships ranked by fit and deadline.', '/tools/matcher'],
  ['📝', 'SOP, Motivation Letter and CV Checker', 'Paste your draft for instant feedback on structure, clichés, evidence and programme fit.', '/tools/writing-checker'],
  ['💬', 'Scholarship Assistant', 'Click "Ask ScholarNexus" at the bottom right of any page to ask about scholarships, deadlines, prices and templates.', null],
];
export default function Page() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Free Smart Tools</h1>
        <p className="text-lg text-slate-600 mb-8">Instant help built on our verified listings. Free to use, and your text never leaves your browser.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {TOOLS.map(([icon, t, d, href]) => {
            const body = (<><div className="text-4xl mb-3">{icon}</div><h2 className="font-bold text-lg mb-2">{t}</h2><p className="text-sm text-slate-600 mb-4">{d}</p>{href && <span className="text-blue-600 font-semibold text-sm">Open tool →</span>}</>);
            return href ? <Link key={t} href={href} className="block p-6 border border-slate-200 rounded-xl hover:shadow-lg hover:border-blue-500 transition">{body}</Link> : <div key={t} className="p-6 border border-slate-200 rounded-xl bg-slate-50">{body}</div>;
          })}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
