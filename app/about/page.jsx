import Link from 'next/link';
import { SiteHeader, SiteFooter } from '../../components/SiteShell';
import { scholarships } from '../../lib/data';
import { SITE } from '../../lib/collections';

export const metadata = {
  title: 'About ScholarNexus',
  description: 'ScholarNexus lists verified scholarships for students from Africa and around the world, and offers affordable help with CVs, motivation letters, SOPs and research proposals.',
  alternates: { canonical: '/about' },
};

const org = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ScholarNexus',
  url: SITE,
  logo: SITE + '/logo-mark.png',
  email: 'info@scholarnexushub.com',
  founder: { '@type': 'Person', name: 'Jack Odoyo Otieno' },
  sameAs: ['https://x.com/SaharanAfric', 'https://www.facebook.com/profile.php?id=61559343783222'],
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      <SiteHeader />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-slate-700 leading-relaxed">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">About ScholarNexus</h1>
        <p className="text-lg mb-4">ScholarNexus helps students find real, open scholarships and put together strong applications. We focus on students from Kenya and the rest of Africa, but most listings are open to students from any developing country.</p>

        <h2 className="text-xl font-bold mt-8 mb-2 text-slate-900">What we do</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Verified listings.</strong> {scholarships.length}+ scholarships and programmes, each checked against the official source, with the money you get, the deadline and the official application link. Scholarship information is always free.</li>
          <li><strong>Application help.</strong> Reviews and editing for CVs, motivation letters, statements of purpose and research proposals. See <Link href="/pricing" className="text-blue-600 underline">services and prices</Link>.</li>
          <li><strong>Free AI tools.</strong> A <Link href="/tools/matcher" className="text-blue-600 underline">scholarship matcher</Link>, <Link href="/tools/cv-polisher" className="text-blue-600 underline">CV polisher</Link> and <Link href="/tools/writing-checker" className="text-blue-600 underline">SOP reviewer</Link>.</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-2 text-slate-900">Who runs it</h2>
        <p>ScholarNexus was founded and is run by <strong>Jack Odoyo Otieno</strong>, a Kenyan postgraduate (MSc) student. Every listing is researched and checked before it is published. Read how in our <Link href="/editorial-policy" className="text-blue-600 underline">editorial policy</Link>.</p>

        <h2 className="text-xl font-bold mt-8 mb-2 text-slate-900">How the site is funded</h2>
        <p>Scholarship listings are free. The site is supported by our paid application services, templates, advertising and some affiliate links to courses and tutors. None of these affect which scholarships we list.</p>

        <h2 className="text-xl font-bold mt-8 mb-2 text-slate-900">Get in touch</h2>
        <p>Email <a href="mailto:info@scholarnexushub.com" className="text-blue-600 underline">info@scholarnexushub.com</a>, message us on <a href="https://wa.me/254754835544" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">WhatsApp</a>, or see the <Link href="/contact" className="text-blue-600 underline">contact page</Link>.</p>
      </main>
      <SiteFooter />
    </div>
  );
}
