import { GraduationCap, FlaskConical, Laptop, Briefcase, School, Presentation, MessageCircle, Mail, ShieldCheck } from 'lucide-react';

const WHATSAPP = '254754835544';
const EMAIL = 'info@scholarnexushub.com';

const waLink = (service) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hello ScholarNexus, I'm interested in: ${service}. Please share details.`)}`;
const mailLink = (service) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(`Service request: ${service}`)}`;

// accent: Tailwind classes for the card's colour band, icon tint and bullets
const services = [
  {
    id: 'research',
    title: 'Thesis & Research Support',
    icon: FlaskConical,
    accent: { band: 'bg-blue-600', icon: 'text-blue-600 bg-blue-50', dot: 'bg-blue-600' },
    blurb: 'Make your thesis, dissertation or paper ready to submit.',
    items: [
      'Thesis & dissertation formatting (APA, Harvard, Vancouver, university templates)',
      'Proofreading & language editing',
      'Research proposal & literature review guidance',
      'Referencing and Mendeley/Zotero setup',
      'Data analysis guidance (SPSS, R, Python, Excel)',
      'Journal formatting, cover letters & submission support',
      'Similarity (plagiarism) report review & proper citation guidance',
    ],
  },
  {
    id: 'scholarships',
    title: 'Scholarships & Admissions',
    icon: GraduationCap,
    accent: { band: 'bg-amber-500', icon: 'text-amber-600 bg-amber-50', dot: 'bg-amber-500' },
    blurb: 'Find the right opportunity and submit a stronger application.',
    items: [
      'Scholarship search & matching to your profile',
      'Motivation letter / SOP review and editing',
      'Academic CV & Europass CV',
      'Application review before you submit',
      'Recommendation letter guidance for referees',
      'University application & document checklists',
      'Visa document preparation checklists',
    ],
  },
  {
    id: 'online-work',
    title: 'Online Work & AI Training Jobs',
    icon: Laptop,
    accent: { band: 'bg-emerald-600', icon: 'text-emerald-700 bg-emerald-50', dot: 'bg-emerald-600' },
    blurb: 'Get ready for remote work on AI-training and freelance platforms.',
    items: [
      'Guidance for platforms such as Turing, Mercor, micro1, OneForma, Outlier and DataAnnotation',
      'Profile & resume set-up for remote work',
      'Assessment & interview preparation',
      'Upwork / Fiverr / LinkedIn profile optimisation',
      'Getting paid: Payoneer, PayPal and Wise set-up guidance',
      'Time management & quality tips for task-based work',
    ],
    note: 'ScholarNexus is not affiliated with these platforms. We help you prepare; the platforms make all hiring decisions.',
  },
  {
    id: 'careers',
    title: 'Careers & Job Applications',
    icon: Briefcase,
    accent: { band: 'bg-rose-600', icon: 'text-rose-700 bg-rose-50', dot: 'bg-rose-600' },
    blurb: 'Stand out in local and international job applications.',
    items: [
      'Professional CV & cover letter writing',
      'LinkedIn profile optimisation',
      'Interview preparation & mock interviews',
      'Internship & industrial attachment applications',
      'Job search strategy & application tracking',
      'Government & NGO application forms support',
    ],
  },
  {
    id: 'education',
    title: 'Education & Teaching',
    icon: School,
    accent: { band: 'bg-violet-600', icon: 'text-violet-700 bg-violet-50', dot: 'bg-violet-600' },
    blurb: 'Resources and support for teachers and learners.',
    items: [
      'CBC lesson plans & schemes of work',
      'Teaching notes and revision materials',
      'Biology & Chemistry tutoring',
      'Exam & assessment preparation',
      'Teaching practice portfolio guidance',
    ],
  },
  {
    id: 'digital',
    title: 'Presentations & Documents',
    icon: Presentation,
    accent: { band: 'bg-sky-600', icon: 'text-sky-700 bg-sky-50', dot: 'bg-sky-600' },
    blurb: 'Professional-looking documents and slides.',
    items: [
      'PowerPoint for seminars, defences & conferences',
      'Scientific posters, leaflets & flyers',
      'Word & Excel formatting, tables and charts',
      'Typing, transcription & PDF conversion',
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-slate-50 border-t border-slate-200 py-16 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-sm font-semibold tracking-wide uppercase text-amber-600 mb-2">Our Services</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Support for Education, Research &amp; Work</h2>
          <p className="text-slate-600">From thesis formatting to remote-work applications, tell us what you need and we'll guide you.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <article key={s.id} className="flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className={`h-1.5 ${s.accent.band}`} />
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${s.accent.icon}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">{s.blurb}</p>
                  <ul className="space-y-2 mb-4 flex-1">
                    {s.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-slate-700">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.accent.dot}`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {s.note && <p className="text-xs text-slate-500 italic mb-4">{s.note}</p>}
                  <div className="flex gap-2">
                    <a href={waLink(s.title)} target="_blank" rel="noopener noreferrer"
                       className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </a>
                    <a href={mailLink(s.title)}
                       className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-100 transition">
                      <Mail className="w-4 h-4" /> Email
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex items-start gap-3 max-w-3xl mx-auto bg-white border border-slate-200 rounded-xl p-5">
          <ShieldCheck className="w-6 h-6 text-blue-600 flex-shrink-0" />
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-slate-900">Academic integrity: </span>
            we edit, format, review and coach. We don't write assessed work for you or sit tests on your behalf, and the final work is always yours.
            Prices depend on the task and deadline, so message us for a free quote.
          </p>
        </div>
      </div>
    </section>
  );
}
