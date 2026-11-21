import Link from 'next/link';
import { countries, levels, fullyFunded, forAfrican } from '../lib/collections';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo-mark.png" alt="ScholarNexus logo" width="44" height="44" className="rounded-lg bg-white" style={{ width: 44, height: 44 }} />
            <div>
              <span className="block text-lg font-bold text-slate-900 leading-tight">ScholarNexus</span>
              <span className="block text-xs text-slate-500">Connect · Empower · Succeed</span>
            </div>
          </Link>
          <nav className="flex items-center gap-4 sm:gap-8 text-sm font-medium text-slate-600">
            <Link href="/scholarships" className="hover:text-blue-600 transition">Scholarships</Link>
            <Link href="/scholarships/closing-soon" className="hidden sm:inline hover:text-blue-600 transition">Closing soon</Link>
            <Link href="/pricing" className="hover:text-blue-600 transition">Prices</Link>
            <Link href="/templates" className="hover:text-blue-600 transition">Templates</Link>
            <a href="mailto:info@scholarnexushub.com" className="hidden sm:inline hover:text-blue-600 transition">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo-mark.png" alt="ScholarNexus logo" width="36" height="36" className="w-9 h-9 rounded-md bg-white p-0.5" />
              <span className="font-bold text-white">ScholarNexus</span>
            </div>
            <p className="text-sm text-slate-400">Verified scholarship opportunities and guidance on theses, applications, CVs and online work. We share. We guide. You succeed. 💙</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Browse</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/scholarships" className="hover:text-blue-400">All scholarships</Link></li>
              <li><Link href="/scholarships/closing-soon" className="hover:text-blue-400">Closing soon</Link></li>
              <li><Link href={fullyFunded.path} className="hover:text-blue-400">Fully funded</Link></li>
              <li><Link href={forAfrican.path} className="hover:text-blue-400">For African students</Link></li>
              {levels.map((l) => (
                <li key={l.slug}><Link href={l.path} className="hover:text-blue-400">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">By country</h4>
            <ul className="space-y-2 text-sm">
              {countries.filter((c) => c.items().length > 0).map((c) => (
                <li key={c.slug}><Link href={c.path} className="hover:text-blue-400">Scholarships in {c.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:info@scholarnexushub.com" className="hover:text-blue-400 break-all">info@scholarnexushub.com</a></li>
              <li><a href="https://wa.me/254754835544" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">WhatsApp: +254 754 835 544</a></li>
              <li><a href="https://x.com/SaharanAfric" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">X: @SaharanAfric</a></li>
              <li><Link href="/pricing" className="hover:text-blue-400">Services and prices</Link></li>
              <li><Link href="/templates" className="hover:text-blue-400">CV, SOP and letter templates</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8">
          <p className="text-sm text-slate-400">&copy; {new Date().getFullYear()} ScholarNexus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
