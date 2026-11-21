import { SiteHeader, SiteFooter } from '../../../components/SiteShell';
import ListingHelper from '../../../components/ListingHelper';

export const metadata = { title: 'Listing helper (admin)', robots: { index: false, follow: false } };

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-600 mb-1">Admin tool · not linked publicly</p>
        <h1 className="text-3xl font-bold mb-2">Listing and X caption helper</h1>
        <p className="text-slate-600 mb-8">Paste an announcement to get a draft X caption (money first) and a draft website entry. Runs in your browser; nothing is saved.</p>
        <ListingHelper />
      </main>
      <SiteFooter />
    </div>
  );
}
