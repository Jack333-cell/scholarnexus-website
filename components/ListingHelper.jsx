'use client';
import { useMemo, useState } from 'react';

// Admin helper: turns a pasted scholarship announcement into a draft X caption and a draft
// website entry. Rule-based and offline. Always verify every detail on the official page first.
const COUNTRIES = { 'United States': /united states|\busa\b|\bu\.s\.|america/i, 'United Kingdom': /united kingdom|\buk\b|britain|england|scotland/i, Canada: /canada/i, Germany: /germany/i, Netherlands: /netherlands|holland/i, Sweden: /sweden/i, Italy: /italy/i, France: /france/i, China: /china/i, Japan: /japan/i, Australia: /australia/i, 'South Korea': /korea/i, Ireland: /ireland/i, 'New Zealand': /new zealand/i, Hungary: /hungary/i, Turkey: /turkey|türkiye/i };
const FLAGS = { 'United States': '🇺🇸', 'United Kingdom': '🇬🇧', Canada: '🇨🇦', Germany: '🇩🇪', Netherlands: '🇳🇱', Sweden: '🇸🇪', Italy: '🇮🇹', France: '🇫🇷', China: '🇨🇳', Japan: '🇯🇵', Australia: '🇦🇺', 'South Korea': '🇰🇷', Ireland: '🇮🇪', 'New Zealand': '🇳🇿', Hungary: '🇭🇺', Turkey: '🇹🇷' };
const MONTH = '(jan(uary)?|feb(ruary)?|mar(ch)?|apr(il)?|may|june?|july?|aug(ust)?|sep(t(ember)?)?|oct(ober)?|nov(ember)?|dec(ember)?)';
const slugify = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\|.*$/, '').replace(/\(.*?\)/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 70);
const xLength = (s) => [...s.replace(/https?:\/\/\S+/g, 'x'.repeat(23))].reduce((n, ch) => n + (ch.codePointAt(0) > 0x2000 ? 2 : 1), 0);

function extract(raw) {
  const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean);
  const t = raw;
  const title = (lines[0] || '').replace(/^\d+[.)]\s*/, '');
  const field = (label) => { const m = t.match(new RegExp(label + '\\s*[:\\-–]\\s*(.+)', 'i')); return m ? m[1].trim() : ''; };
  const hostLine = field('host country') || field('country') || field('location');
  const country = Object.keys(COUNTRIES).find((c) => COUNTRIES[c].test(hostLine || t)) || hostLine || '';
  const amounts = [...new Set((t.match(/(?:US\$|A\$|C\$|\$|£|€|KES|USD|GBP|EUR|AUD|CAD)\s?\d[\d,]*(?:\.\d+)?(?:\s?(?:per|\/)\s?(?:year|month|annum))?/gi) || []).map((a) => a.trim()))];
  const fully = /fully[- ]funded|full scholarship|full tuition|full ride/i.test(t);
  const deadline = field('deadline') || ((t.match(new RegExp(`\\b\\d{1,2}(st|nd|rd|th)?\\s+${MONTH},?\\s+20\\d{2}|${MONTH}\\s+\\d{1,2}(st|nd|rd|th)?,?\\s+20\\d{2}`, 'i')) || [''])[0]);
  const level = /phd|doctoral/i.test(t) ? 'PhD' : /master|msc|mba|postgraduate/i.test(t) ? "Master's" : /bachelor|undergraduate/i.test(t) ? 'Undergraduate' : /bootcamp|training|course|internship|fellowship/i.test(t) ? 'Training / programme' : '';
  const eligible = field('eligible countr(?:y|ies)') || field('eligibility') || '';
  const benefits = lines.filter((l) => /^[⭐✅•\-*]/.test(l)).map((l) => l.replace(/^[⭐✅•\-*]\s*/, ''));
  return { title, country, amounts, fully, deadline, level, eligible, benefits };
}

export default function ListingHelper() {
  const [raw, setRaw] = useState('');
  const d = useMemo(() => extract(raw), [raw]);
  const shortT = d.title.split('|')[0].trim();
  const slug = slugify(shortT);
  const money = d.amounts.length ? d.amounts.slice(0, 2).join(' + ') + (d.fully ? ' (fully funded)' : '') : d.fully ? 'Fully funded' : '[ADD AMOUNT: grant, stipend or allowance]';
  const body = [
    `💰 ${money}`,
    d.level && `🎓 ${d.level}`,
    d.eligible && `🌍 Open to: ${d.eligible}`,
    `📅 Deadline: ${d.deadline || '[CHECK OFFICIAL PAGE]'}`,
  ].filter(Boolean).join('\n');
  const caption = `${FLAGS[d.country] || '🎓'} ${shortT}\n\n${body}\n\nDetails 👉 https://www.scholarnexushub.com/scholarships/${slug}\n#Scholarships`;
  const len = xLength(caption);
  const entry = JSON.stringify({ slug, title: d.title, levels: [], country: d.country, amount: money, deadline: d.deadline, closeDate: null, excerpt: '', description: '', requirements: [], benefits: d.benefits, university: '', link: '[OFFICIAL URL]' }, null, 2);
  const copy = (s) => navigator.clipboard?.writeText(s);
  const [ai, setAi] = useState(null);
  const [aiBusy, setAiBusy] = useState(false);
  async function draftAI() {
    setAiBusy(true); setAi(null);
    try { const r = await fetch('/api/ai/listing', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: raw }) }); if (r.ok) setAi(await r.json()); else setAi({ error: true }); } catch { setAi({ error: true }); }
    setAiBusy(false);
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div>
        <label className="font-semibold text-sm text-slate-700">Paste a scholarship announcement</label>
        <textarea value={raw} onChange={(e) => setRaw(e.target.value)} rows={18} placeholder={'Oxford Saïd Future Leaders Scholarships | £40,000\nHost Country: United Kingdom\n⭐ Winners are awarded £40,000\nCategory: Masters Study\nDeadline: 6 January 2027'} className="w-full mt-1 p-4 border border-slate-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {raw && (
          <dl className="grid grid-cols-3 gap-x-3 gap-y-1 text-sm mt-4">
            {[['Country', d.country], ['Level', d.level], ['Amounts', d.amounts.join(', ') || (d.fully ? 'Fully funded' : '—')], ['Deadline', d.deadline], ['Eligible', d.eligible], ['Page link', `/scholarships/${slug}`]].map(([k, v]) => (
              <div key={k} className="contents"><dt className="text-slate-500">{k}</dt><dd className="col-span-2 font-medium text-slate-900 break-words">{v || <span className="text-red-600">not found</span>}</dd></div>
            ))}
          </dl>
        )}
      </div>
      <div className="space-y-6">
        {raw && (
          <div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
            <div className="flex items-center justify-between mb-2"><span className="font-semibold text-sm text-purple-900">✨ AI draft</span><button onClick={draftAI} disabled={aiBusy} className="px-3 py-1.5 bg-purple-700 text-white text-sm font-semibold rounded-lg disabled:opacity-60">{aiBusy ? 'Drafting…' : 'Draft with AI'}</button></div>
            {ai?.error && <p className="text-sm text-red-700">AI unavailable right now; use the instant draft below.</p>}
            {ai?.caption && (
              <>
                <pre className="whitespace-pre-wrap p-3 bg-white border border-purple-200 rounded-lg text-sm">{ai.caption}</pre>
                <p className={`text-xs mt-1 font-semibold ${xLength(ai.caption) > 280 ? 'text-red-600' : 'text-green-700'}`}>{xLength(ai.caption)} / 280</p>
                {ai.warnings?.length > 0 && <ul className="mt-2 text-xs text-amber-800 list-disc pl-5">{ai.warnings.map((w) => <li key={w}>Check: {w}</li>)}</ul>}
                <button onClick={() => copy(ai.caption)} className="mt-2 px-4 py-2 bg-purple-700 text-white text-sm font-semibold rounded-lg">Copy AI caption</button>
              </>
            )}
          </div>
        )}
        <div>
          <div className="flex items-center justify-between mb-1"><span className="font-semibold text-sm text-slate-700">Instant draft X caption</span><span className={`text-xs font-semibold ${len > 280 ? 'text-red-600' : 'text-green-700'}`}>{len} / 280</span></div>
          <pre className="whitespace-pre-wrap p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm">{raw ? caption : 'The caption appears here.'}</pre>
          {raw && <button onClick={() => copy(caption)} className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg">Copy caption</button>}
        </div>
        <div>
          <span className="font-semibold text-sm text-slate-700">Draft website entry (send to your developer)</span>
          <pre className="whitespace-pre-wrap p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs max-h-72 overflow-auto">{raw ? entry : '—'}</pre>
          {raw && <button onClick={() => copy(entry)} className="mt-2 px-4 py-2 border border-blue-600 text-blue-700 text-sm font-semibold rounded-lg">Copy entry</button>}
        </div>
        <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">Check every detail (amount, eligibility, deadline, link) on the official website before posting. Announcements shared online are often wrong or out of date.</p>
      </div>
    </div>
  );
}
