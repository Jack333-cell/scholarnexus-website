import { SiteHeader, SiteFooter } from '../../components/SiteShell';
import { COURSE_GROUPS, UDEMY_BASE, TUTORS } from '../../lib/affiliates';

export const metadata = {
  title: 'Courses to Boost Your Scholarship Application',
  description: 'Hand-picked online courses and 1-on-1 tutors for IELTS, TOEFL, GRE, academic writing, research methods, data analysis and career skills to strengthen your scholarship and Master’s or PhD application.',
  alternates: { canonical: '/courses' },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Courses to Boost Your Application</h1>
        <p className="text-lg text-slate-600 mb-2">Language tests, writing, research and career skills that make scholarship applications stronger. Work 1-on-1 with a tutor, or learn at your own pace: Udemy courses are often on sale for a few dollars, and you keep lifetime access.</p>
        <p className="text-xs text-slate-500 mb-8">Disclosure: some links on this page are affiliate links. If you buy through them, ScholarNexus may earn a small commission at no extra cost to you. This helps keep our scholarship listings free.</p>

        <section className="mb-10 rounded-2xl bg-pink-50 border border-pink-200 p-6">
          <h2 className="text-2xl font-bold mb-1">Learn with a 1-on-1 tutor</h2>
          <p className="text-slate-600 mb-4">Live lessons on Preply with tutors who set your pace. Good for test speaking practice and interviews. Try a trial lesson first.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TUTORS.map((c) => (
              <a key={c.name} href={c.url} target="_blank" rel="sponsored noopener noreferrer" className="flex flex-col bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg hover:border-pink-400 transition">
                <span className="font-bold mb-1">{c.name}</span>
                <span className="text-sm text-slate-600 flex-1 mb-3">{c.why}</span>
                <span className="text-sm font-semibold text-pink-600">Find a tutor on Preply &rarr;</span>
              </a>
            ))}
          </div>
        </section>

        {COURSE_GROUPS.map((g) => (
          <section key={g.title} className="mb-10">
            <h2 className="text-2xl font-bold mb-1">{g.title}</h2>
            <p className="text-slate-600 mb-4">{g.blurb}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {g.items.map((c) => (
                <a key={c.name} href={c.url} target="_blank" rel="sponsored noopener noreferrer" className="flex flex-col border border-slate-200 rounded-xl p-4 hover:shadow-lg hover:border-blue-400 transition">
                  <span className="font-bold mb-1">{c.name}</span>
                  <span className="text-sm text-slate-600 flex-1 mb-3">{c.why}</span>
                  <span className="text-sm font-semibold text-blue-600">See courses on Udemy &rarr;</span>
                </a>
              ))}
            </div>
          </section>
        ))}

        <div className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
          <div>
            <p className="text-xl font-bold">Browse all Udemy courses</p>
            <p className="text-blue-100">Over 200,000 courses in every subject.</p>
          </div>
          <a href={UDEMY_BASE} target="_blank" rel="sponsored noopener noreferrer" className="px-6 py-3 bg-white text-blue-700 font-bold rounded-lg text-center hover:bg-blue-50">Visit Udemy</a>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
