// ScholarNexus price list. Edit prices here (USD), then commit; KES is set alongside.
// KES = USD x ~129 (Nov 2026 rate), rounded to the nearest 50.
// from: true shows "from" (quoted after seeing the work).

export const FREE = [
  'Scholarship listings on this website: verified details, deadlines and official links',
  'Scholarship alerts by email newsletter and on X',
  '"Closing soon" deadline reminders',
  'Quick WhatsApp questions about eligibility for a listed scholarship',
];

export const PRICE_GROUPS = [
  {
    id: 'applications',
    title: 'Scholarship and admission applications',
    items: [
      { name: 'CV / academic CV review (written feedback)', usd: 2, kes: 250 },
      { name: 'CV rewrite into Europass / academic format', usd: 2, kes: 250 },
      { name: 'Motivation letter / SOP review (2 rounds of feedback)', usd: 2, kes: 250 },
      { name: 'Personal statement coaching (1-hour call + review)', usd: 5, kes: 650 },
      { name: 'Recommendation letter guidance (template + tips for referees)', usd: 5, kes: 650 },
      { name: 'Application package: CV + SOP review + document checklist', usd: 10, kes: 1300 },
    ],
  },
  {
    id: 'thesis',
    title: "Thesis and research support (Master's and PhD)",
    items: [
      { name: 'Research proposal review and feedback', usd: 15, kes: 1950 },
      { name: 'Thesis formatting (APA, Harvard, university template)', usd: 25, kes: 3250, from: true },
      { name: 'Editing and proofreading (per 1,000 words)', usd: 6, kes: 750 },
      { name: 'Citation and reference formatting (Zotero / Mendeley setup)', usd: 15, kes: 1950 },
      { name: 'Data analysis guidance: SPSS, R, Python (per dataset)', usd: 50, kes: 6450, from: true },
      { name: 'Similarity / plagiarism check report', usd: 8, kes: 1050 },
    ],
  },
  {
    id: 'publication',
    title: 'Publication support',
    items: [
      { name: 'Journal selection (shortlist of 3–5 suitable journals)', usd: 20, kes: 2600 },
      { name: 'Manuscript formatting to journal guidelines', usd: 40, kes: 5150 },
      { name: 'Cover letter and reviewer-response guidance', usd: 20, kes: 2600 },
    ],
  },
  {
    id: 'careers',
    title: 'Careers and online work',
    items: [
      { name: 'Cover letter review', usd: 2, kes: 250 },
      { name: 'LinkedIn profile optimisation', usd: 3, kes: 400 },
      { name: 'Online work setup: Turing, Mercor, micro1, OneForma (profile + tips)', usd: 15, kes: 1950 },
      { name: 'Job application package: CV + cover letter + LinkedIn', usd: 10, kes: 1300 },
    ],
  },
  {
    id: 'skills',
    title: 'Education and digital skills',
    items: [
      { name: 'Digital skills session: Excel, Google Workspace, AI tools (per hour)', usd: 10, kes: 1300 },
      { name: 'Study-abroad consultation (1 hour: countries, courses, funding)', usd: 15, kes: 1950 },
    ],
  },
];

export const TERMS = [
  ['Fixed-price services', 'paid online before work starts (M-Pesa or card).'],
  ['"From" prices', 'quoted after reviewing the work; 50% upfront and 50% on delivery.'],
  ['Discount', '10% off for returning clients and bundles.'],
  ['Academic integrity', 'all services are review, coaching, guidance and editing. ScholarNexus does not write theses, essays or assignments for clients.'],
];

export const fmtKES = (n) => 'KES ' + n.toLocaleString('en-US');
export const fmtUSD = (n) => '$' + n;

export const WHATSAPP = '254754835544';
export const orderLink = (what) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hello ScholarNexus, I would like to order: ${what}`)}`;

// Sample documents shop. Only the blurred, watermarked preview images are on the website;
// the full Word files are kept privately and delivered after payment.
// paymentUrl: paste a Paystack payment-page link here once the account is approved.
// Until then the Buy button opens WhatsApp with the order pre-filled.
export const TEMPLATES = [
  { slug: 'academic-cv', file: '01-Academic-CV', title: 'Academic CV (Masters / PhD)', usd: 2, kes: 250, paymentUrl: '',
    blurb: 'A one-page academic CV for scholarship and graduate applications: profile, education, research experience, publications, skills and referees, with tips in every section.' },
  { slug: 'motivation-letter', file: '02-Motivation-Letter', title: 'Motivation Letter (Erasmus Mundus / DAAD style)', usd: 2, kes: 250, paymentUrl: '',
    blurb: 'A complete European-style motivation letter showing how to open with a real story, link modules to your goals and close with a clear career plan.' },
  { slug: 'statement-of-purpose', file: '03-Statement-of-Purpose', title: 'Statement of Purpose (US / Canada)', usd: 2, kes: 250, paymentUrl: '',
    blurb: 'A research-focused SOP for North American graduate programmes: academic preparation, research experience, faculty fit and career goals.' },
  { slug: 'job-cover-letter', file: '04-Job-Cover-Letter', title: 'Job Cover Letter', usd: 2, kes: 250, paymentUrl: '',
    blurb: 'A short, evidence-based cover letter that mirrors the job advert and backs every claim with numbers.' },
  { slug: 'recommendation-letter', file: '05-Recommendation-Letter', title: 'Recommendation Letter (guide for referees)', usd: 2, kes: 250, paymentUrl: '',
    blurb: 'A model reference letter to share with your lecturer or supervisor, showing what strong letters include: specific examples, rankings and how long they have known you.' },
  { slug: 'research-proposal', file: '06-Research-Proposal-Template', title: 'Research Proposal Template (Masters / PhD)', usd: 2, kes: 250, paymentUrl: '',
    blurb: 'A 2-page proposal with every standard section: background, problem statement, objectives, methodology, ethics, work plan and references.' },
];

export const TEMPLATE_BUNDLE = { title: 'All 6 templates (bundle)', usd: 8, kes: 1050, paymentUrl: '' };

export const buyLink = (t) => t.paymentUrl || orderLink(`${t.title} template (${fmtKES(t.kes)} / ${fmtUSD(t.usd)})`);
