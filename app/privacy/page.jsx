import { SiteHeader, SiteFooter } from '../../components/SiteShell';

export const metadata = {
  title: 'Privacy Policy',
  description: 'How ScholarNexus collects, uses and protects your information, including cookies, advertising, newsletter and payments.',
  alternates: { canonical: '/privacy' },
};

const H = ({ children }) => <h2 className="text-xl font-bold mt-8 mb-2">{children}</h2>;

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-slate-700 leading-relaxed">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-6">Last updated: 21 November 2026</p>
        <p>This policy explains how ScholarNexus (www.scholarnexushub.com) collects and uses information when you visit the site, subscribe to alerts, use our tools or buy a service. Questions: <a href="mailto:info@scholarnexushub.com" className="text-blue-600 underline">info@scholarnexushub.com</a>.</p>

        <H>Information we collect</H>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Newsletter:</strong> your email address when you subscribe to scholarship alerts.</li>
          <li><strong>Purchases:</strong> your email address and payment reference when you buy a service or template. Payments are processed by Paystack; we never see or store your card number or M-Pesa PIN.</li>
          <li><strong>Messages:</strong> anything you send us on WhatsApp or by email, such as documents for review.</li>
          <li><strong>Usage data:</strong> anonymous statistics about page visits (Vercel Analytics), which do not identify you personally.</li>
        </ul>
        <p className="mt-3">Our free tools (scholarship matcher, writing checker and assistant) run in your browser. The text you type into them is not sent to us or stored.</p>

        <H>How we use it</H>
        <ul className="list-disc pl-6 space-y-1">
          <li>To send scholarship alerts you asked for (you can unsubscribe at any time using the link in every email).</li>
          <li>To deliver services and templates you paid for and to answer your questions.</li>
          <li>To understand which pages are useful and improve the site.</li>
        </ul>
        <p className="mt-3">We do not sell your personal information.</p>

        <H>Cookies and advertising</H>
        <p>We may show advertisements served by Google AdSense. Google and its partners use cookies to serve ads based on your previous visits to this and other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visits to our site and/or other sites on the internet.</p>
        <p className="mt-3">You can opt out of personalised advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Ads Settings</a>, or opt out of some third-party vendors' use of cookies at <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">www.aboutads.info</a>. Learn more in <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">how Google uses information from sites that use its services</a>.</p>

        <H>Service providers</H>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Vercel:</strong> website hosting and anonymous analytics.</li>
          <li><strong>Brevo:</strong> newsletter emails.</li>
          <li><strong>Paystack:</strong> payment processing (M-Pesa and card).</li>
          <li><strong>Zoho Mail:</strong> our email inbox.</li>
          <li><strong>Google:</strong> search and, where enabled, advertising.</li>
        </ul>

        <H>Your choices and rights</H>
        <p>You can ask us to access, correct or delete the personal information we hold about you by emailing info@scholarnexushub.com. We keep purchase records only as long as needed for receipts, support and legal obligations.</p>

        <H>Scholarship information</H>
        <p>We check listings against official sources, but details such as amounts, eligibility and deadlines can change. Always confirm on the official website before applying. ScholarNexus is not affiliated with the universities or organisations whose scholarships we list, and we never charge for scholarship information.</p>

        <H>Changes</H>
        <p>We may update this policy. The date at the top shows the latest version.</p>
      </main>
      <SiteFooter />
    </div>
  );
}
