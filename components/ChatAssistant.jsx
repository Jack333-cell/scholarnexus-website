'use client';
import { useEffect, useRef, useState } from 'react';
import { parseQuery, matchScholarships, closingNext, shortTitle, levelLabel } from '../lib/match';
import { nextDate, daysLeft } from '../lib/collections';
import { PRICE_GROUPS, fmtKES } from '../lib/pricing';

// Free, rule-based assistant: it reads the visitor's question and answers from the site's own
// listings, prices and pages. No AI service is called and nothing is sent anywhere.
const WA = 'https://wa.me/254754835544';
const cheapest = Math.min(...PRICE_GROUPS.flatMap((g) => g.items.map((i) => i.kes)));

function answer(text) {
  const t = text.toLowerCase();
  const is = (re) => re.test(t);
  if (is(/^(hi|hello|hey|habari|jambo|good (morning|afternoon|evening))\b/)) {
    return { text: "Hello! Tell me what you're looking for, for example \"fully funded Master's in Europe\", \"PhD in the UK\" or \"internships for Kenyans\". I can also help with prices, templates and how to apply." };
  }
  if (is(/price|cost|how much|charge|fee|pay for|rates?\b/) && !is(/scholarship covers|tuition/)) {
    return { text: `Scholarship information on ScholarNexus is always free. Our paid services (CV and SOP reviews, thesis formatting, editing, data analysis, publication and career support) start from ${fmtKES(cheapest)}.`, links: [['See all prices', '/pricing']] };
  }
  if (is(/template|sample|example|format of (a )?(cv|letter|sop)/)) {
    return { text: 'You can preview our sample academic CV, motivation letter, SOP, cover letter, recommendation letter and research proposal. Full Word files are KES 250 each or KES 1,050 for all six.', links: [['Preview templates', '/templates']] };
  }
  if (is(/m-?pesa|card|paystack|payment|how (do|can) i pay/)) {
    return { text: 'You pay securely online through Paystack by M-Pesa or card. We never see your card details or M-Pesa PIN. Templates download straight after payment.', links: [['Prices', '/pricing']] };
  }
  if (is(/contact|whatsapp|call|email|talk to|human|agent/)) {
    return { text: 'You can reach us on WhatsApp at +254 754 835 544 or by email at info@scholarnexushub.com.', links: [['Chat on WhatsApp', WA]] };
  }
  if (is(/\b(cv|resume|résumé|curriculum vitae)\b/) && !is(/scholarships? (in|for)/)) {
    return { text: 'Paste your CV into our CV Polisher: it rewrites weak phrases, fixes dates and layout and removes unneeded personal details. The preview is free; download the polished CV as PDF or Word for KES 250.', links: [['Polish my CV', '/tools/cv-polisher'], ['CV templates', '/templates/academic-cv']] };
  }
  if (is(/motivation letter|sop|statement of purpose|personal statement|essay|how to apply|tips/) && !is(/scholarships? (in|for)/)) {
    return { text: 'Three quick tips: open with a real moment from your own work, link 2–3 specific modules or professors to your goals, and back every claim with numbers. Our free checker gives instant feedback on your draft.', links: [['Check my draft (free)', '/tools/writing-checker'], ['Templates', '/templates'], ['Get a full review', '/pricing']] };
  }
  if (is(/free|is it free|do you charge/)) {
    return { text: 'Yes. All scholarship listings, alerts and deadline reminders are free. Official scholarships never need an agent or an application fee.', links: [['Browse scholarships', '/scholarships']] };
  }
  const q = parseQuery(text);
  if (q.soon && !q.levels.length && !q.countries.length && !q.keywords.length) {
    const list = closingNext(5).map((s) => ({ s, reasons: [s.amount, `${daysLeft(nextDate(s))} days left`] }));
    return { text: 'These deadlines are coming up next:', results: list, links: [['All closing soon', '/scholarships/closing-soon']] };
  }
  const results = matchScholarships(q, { limit: 5 });
  if (results.length) {
    const what = [q.fullyFunded && 'fully funded', ...q.levels.map(levelLabel), (q.countries.length ? 'in ' + q.countries.join(' or ') : q.europe ? 'in Europe' : '')].filter(Boolean).join(' ');
    return { text: `Here ${results.length === 1 ? 'is the best match' : `are the best ${results.length} matches`}${what ? ` for ${what}` : ''}:`, results, links: [['Try the full matcher', '/tools/matcher']] };
  }
  return { text: "I couldn't find a listing that fits that yet. Try a level and a country (for example \"PhD in Germany\"), or browse everything sorted by deadline.", links: [['All scholarships', '/scholarships'], ['Ask us on WhatsApp', WA]] };
}

const SUGGEST = ["Fully funded Master's in Europe", 'PhD scholarships', 'Closing soon', 'For African students', 'How much is a CV review?'];

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState([{ from: 'bot', text: "Hi! I'm the ScholarNexus assistant. Ask me about scholarships, deadlines, prices or templates." }]);
  const end = useRef(null);
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, open]);

  const send = (text) => {
    const q = text.trim();
    if (!q) return;
    setMsgs((m) => [...m, { from: 'you', text: q }, { from: 'bot', ...answer(q) }]);
    setInput('');
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 left-4 sm:left-auto sm:w-96 z-[60] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[70vh]" role="dialog" aria-label="ScholarNexus assistant">
          <div className="flex items-center justify-between px-4 py-3 bg-blue-600 text-white rounded-t-2xl">
            <div>
              <p className="font-bold leading-tight">ScholarNexus Assistant</p>
              <p className="text-xs text-blue-100">Answers from our verified listings</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close assistant" className="text-2xl leading-none px-2">×</button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3 text-sm">
            {msgs.map((m, i) => (
              <div key={i} className={m.from === 'you' ? 'flex justify-end' : ''}>
                <div className={m.from === 'you' ? 'bg-blue-600 text-white rounded-2xl rounded-br-sm px-3 py-2 max-w-[85%]' : 'bg-slate-100 text-slate-800 rounded-2xl rounded-bl-sm px-3 py-2 max-w-[95%]'}>
                  <p>{m.text}</p>
                  {m.results && (
                    <ul className="mt-2 space-y-2">
                      {m.results.map(({ s, reasons }) => (
                        <li key={s.id}>
                          <a href={`/scholarships/${s.slug}`} className="block bg-white rounded-lg border border-slate-200 p-2 hover:border-blue-500">
                            <span className="font-semibold text-slate-900">{s.thumbnail} {shortTitle(s)}</span>
                            <span className="block text-xs text-green-700 mt-0.5">{reasons.slice(0, 3).join(' · ')}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                  {m.links && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {m.links.map(([label, href]) => (
                        <a key={href} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-600 text-blue-700 bg-white hover:bg-blue-50">{label}</a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {msgs.length === 1 && (
              <div className="flex flex-wrap gap-2">
                {SUGGEST.map((s) => <button key={s} onClick={() => send(s)} className="text-xs px-2.5 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 hover:bg-amber-100">{s}</button>)}
              </div>
            )}
            <div ref={end} />
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2 p-3 border-t border-slate-200">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="e.g. PhD in the UK" aria-label="Your question" className="flex-1 min-w-0 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">Send</button>
          </form>
        </div>
      )}
      <button onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close assistant' : 'Open scholarship assistant'} className="fixed bottom-5 right-4 z-[60] flex items-center gap-2 pl-4 pr-5 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-xl hover:bg-blue-700">
        <span className="text-xl" aria-hidden="true">{open ? '×' : '💬'}</span>
        <span className="hidden sm:inline">{open ? 'Close' : 'Ask ScholarNexus'}</span>
      </button>
    </>
  );
}
