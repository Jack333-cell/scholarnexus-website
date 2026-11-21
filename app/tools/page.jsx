import Link from 'next/link';
import { SiteHeader, SiteFooter } from '../../components/SiteShell';

export const metadata = {
  title: 'AI Tools: AI CV Polisher, Scholarship Matcher and SOP Reviewer',
  description: 'ScholarNexus AI tools: polish your CV, find scholarships that fit you, get feedback on your SOP, and ask our AI assistant.',
  alternates: { canonical: '/tools' },
};
const TOOLS = [
  ['✨', 'AI CV Polisher', 'Paste your CV and AI rewrites and reformats it professionally. Preview free; download as PDF or Word for KES 250.', '/tools/cv-polisher'],
  ['🎯', 'AI Scholarship Matcher', 'Choose your level, nationality, destination and field. AI ranks the open scholarships that fit you and explains why.', '/tools/matcher'],
  ['📝', 'AI SOP and Motivation Letter Reviewer', 'Paste your draft and get a score, strengths and specific improvements from an AI reviewer.', '/tools/writing-checker'],
  ['💬', 'AI Scholarship Assistant', 'Click "Ask ScholarNexus AI" at the bottom right of any page to ask about scholarships, deadlines, prices and templates.', null],
];
export default function Page() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">✨ AI Tools</h1>
        <p className="text-lg text-slate-600 mb-8">AI-powered help built on our verified scholarship listings. Free to try.</p>
        <div className="grid md:grid-cols-2 gap-6">
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
