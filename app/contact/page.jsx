import Link from 'next/link';
import { SiteHeader, SiteFooter } from '../../components/SiteShell';

export const metadata = {
  title: 'Contact ScholarNexus',
  description: 'Contact ScholarNexus by email, WhatsApp, X or Facebook for scholarship questions, application help or corrections.',
  alternates: { canonical: '/contact' },
};

const Item = ({ label, children }) => (
  <div className="border border-slate-200 rounded-xl p-5"><p className="text-sm text-slate-500 mb-1">{label}</p><p className="font-semibold text-slate-900 break-all">{children}</p></div>
);

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Contact us</h1>
        <p className="text-lg text-slate-600 mb-8">Questions about a scholarship, help with your application, or a correction to a listing? We usually reply within 24 hours.</p>
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Item label="Email"><a href="mailto:info@scholarnexushub.com" className="text-blue-600">info@scholarnexushub.com</a></Item>
          <Item label="WhatsApp"><a href="https://wa.me/254754835544" target="_blank" rel="noopener noreferrer" className="text-blue-600">+254 754 835 544</a></Item>
          <Item label="X (Twitter)"><a href="https://x.com/SaharanAfric" target="_blank" rel="noopener noreferrer" className="text-blue-600">@SaharanAfric</a></Item>
          <Item label="Facebook"><a href="https://www.facebook.com/profile.php?id=61559343783222" target="_blank" rel="noopener noreferrer" className="text-blue-600">ScholarNexus Page</a></Item>
        </div>
        <p className="text-slate-700"><strong>Found an error?</strong> If a deadline, amount or link on our site is wrong, email us with the page link and we will check it against the official source and correct it. See our <Link href="/editorial-policy" className="text-blue-600 underline">editorial policy</Link>.</p>
        <p className="text-sm text-slate-500 mt-6">We never charge to list or apply for a scholarship, and we will never ask for your passwords or bank PINs.</p>
      </main>
      <SiteFooter />
    </div>
  );
}
