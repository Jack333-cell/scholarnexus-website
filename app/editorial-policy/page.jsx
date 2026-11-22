import Link from 'next/link';
import { SiteHeader, SiteFooter } from '../../components/SiteShell';

export const metadata = {
  title: 'Editorial Policy: How We Verify Scholarships',
  description: 'How ScholarNexus researches, verifies, updates and corrects scholarship listings, and how advertising and affiliate links are kept separate from our listings.',
  alternates: { canonical: '/editorial-policy' },
};

const H = ({ children }) => <h2 className="text-xl font-bold mt-8 mb-2 text-slate-900">{children}</h2>;

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-slate-700 leading-relaxed">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Editorial policy</h1>
        <p className="text-lg">Students make big decisions based on what we publish, so every listing follows the same checks.</p>

        <H>How we verify a scholarship</H>
        <ul className="list-disc pl-6 space-y-1">
          <li>We confirm the scholarship on the <strong>official website</strong> of the university, government or foundation that runs it, and link straight to that page.</li>
          <li>We check the <strong>deadline</strong> (and time zone where given), <strong>what the scholarship pays</strong> (tuition, stipend, allowances), the <strong>eligible countries and study levels</strong>, and how to apply.</li>
          <li>Where official sources disagree or a detail is not published, we say so on the listing rather than guess.</li>
          <li>We do not list opportunities that charge an application fee to the scholarship itself, or that we cannot trace to a real organisation.</li>
        </ul>

        <H>Keeping listings up to date</H>
        <p>Each listing shows when it was last checked. Listings are marked as closed automatically once the deadline passes, and we update them when the next round opens.</p>

        <H>Corrections</H>
        <p>If you spot an error, email <a href="mailto:info@scholarnexushub.com" className="text-blue-600 underline">info@scholarnexushub.com</a> with the page link. We check it against the official source and correct the listing, usually within 48 hours.</p>

        <H>Advertising, affiliate links and paid services</H>
        <p>The site shows ads and some affiliate links to courses and tutors, and we sell application services and templates. These never decide which scholarships we list or how we describe them, and no scholarship provider pays to be listed.</p>

        <H>Use of AI</H>
        <p>Our AI tools help you match scholarships and improve your documents. Listings themselves are researched and checked by a person against official sources before publishing.</p>

        <p className="mt-8"><Link href="/about" className="text-blue-600 underline">About ScholarNexus</Link> · <Link href="/contact" className="text-blue-600 underline">Contact</Link></p>
      </main>
      <SiteFooter />
    </div>
  );
}
