'use client';
import { useState } from 'react';
import { parseQuery, matchScholarships, shortTitle, AFRICAN } from '../lib/match';

const DESTS = ['Anywhere', 'Europe', 'United Kingdom', 'United States', 'Canada', 'Germany', 'Netherlands', 'Sweden', 'Italy', 'China', 'Japan', 'Australia', 'Switzerland', 'Saudi Arabia'];
const NATS = ['Kenya', 'Nigeria', 'Ghana', 'Uganda', 'Tanzania', 'Ethiopia', 'Rwanda', 'South Africa', 'Zambia', 'Zimbabwe', 'Cameroon', 'Other African country', 'Outside Africa'];

export default function Matcher() {
  const [f, setF] = useState({ level: 'masters', nat: 'Kenya', dest: 'Anywhere', funded: false, field: '' });
  const [res, setRes] = useState(null);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const [aiBusy, setAiBusy] = useState(false);
  const [aiNote, setAiNote] = useState('');
  async function run(e) {
    e.preventDefault();
    const q = parseQuery(f.field);
    q.levels = f.level === 'any' ? [] : [f.level];
    q.countries = f.dest === 'Anywhere' || f.dest === 'Europe' ? [] : [f.dest];
    q.europe = f.dest === 'Europe';
    q.fullyFunded = f.funded;
    const nat = f.nat.toLowerCase();
    q.nationality = f.nat === 'Outside Africa' ? null : AFRICAN.find((w) => nat.startsWith(w)) || 'africa';
    q.nationalityOther = f.nat === 'Outside Africa';
    const base = matchScholarships(q, { limit: 12 });
    setRes(base.slice(0, 10)); setAiNote('');
    if (!base.length) return;
    setAiBusy(true);
    try {
      const r = await fetch('/api/ai/match', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ profile: f, candidates: base.map((x) => x.s.slug) }) });
      if (r.ok) {
        const { ranked } = await r.json();
        const bySlug = Object.fromEntries(base.map((x) => [x.s.slug, x]));
        const ordered = ranked.map((x) => bySlug[x.slug] && { ...bySlug[x.slug], why: x.reason }).filter(Boolean);
        base.forEach((x) => { if (!ordered.find((o) => o.s.slug === x.s.slug)) ordered.push(x); });
        setRes(ordered.slice(0, 10)); setAiNote('✨ Ranked by AI for your profile');
      }
    } catch {}
    setAiBusy(false);
  }

  const sel = 'w-full px-3 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500';
  return (
    <div className="grid lg:grid-cols-5 gap-8">
      <form onSubmit={run} className="lg:col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4 h-fit">
        <label className="block"><span className="text-sm font-semibold text-slate-700">Level of study</span>
          <select value={f.level} onChange={set('level')} className={sel + ' mt-1'}>
            <option value="undergraduate">Undergraduate (Bachelor's)</option>
            <option value="masters">Master's (incl. MBA)</option>
            <option value="phd">PhD / research</option>
            <option value="programs">Internships, training and programmes</option>
            <option value="any">Any level</option>
          </select></label>
        <label className="block"><span className="text-sm font-semibold text-slate-700">Your nationality</span>
          <select value={f.nat} onChange={set('nat')} className={sel + ' mt-1'}>{NATS.map((n) => <option key={n}>{n}</option>)}</select></label>
        <label className="block"><span className="text-sm font-semibold text-slate-700">Where do you want to study?</span>
          <select value={f.dest} onChange={set('dest')} className={sel + ' mt-1'}>{DESTS.map((n) => <option key={n}>{n}</option>)}</select></label>
        <label className="block"><span className="text-sm font-semibold text-slate-700">Field or keywords (optional)</span>
          <input value={f.field} onChange={set('field')} placeholder="e.g. public health, law, AI, agriculture" className={sel + ' mt-1'} /></label>
        <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" checked={f.funded} onChange={set('funded')} className="w-4 h-4" />Fully funded only</label>
        <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">✨ Find my matches</button>
      </form>
      <div className="lg:col-span-3">
        {res === null && <p className="text-slate-500">Fill in the form and click <strong>Find my matches</strong>. Results are ranked by how well each open scholarship fits you and by how soon it closes.</p>}
        {res && res.length === 0 && (
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-5 text-slate-700">No open listings match all your choices yet. Try "Anywhere" or "Any level", or untick "Fully funded only". New scholarships are added every week; <a href="/#newsletter" className="text-blue-600 underline">get alerts by email</a>.</div>
        )}
        {aiBusy && <p className="text-sm text-purple-800 mb-3">✨ AI is ranking your matches…</p>}
        {aiNote && <p className="text-sm font-semibold text-purple-800 mb-3">{aiNote}</p>}
        {res && res.length > 0 && (
          <ol className="space-y-3">
            {res.map(({ s, reasons, why }, i) => (
              <li key={s.id}>
                <a href={`/scholarships/${s.slug}`} className="flex gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:shadow-lg hover:border-blue-500 transition">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">{i + 1}</span>
                  <span className="min-w-0">
                    <span className="block font-bold text-slate-900">{s.thumbnail} {shortTitle(s)}</span>
                    <span className="block text-sm text-slate-600 mt-0.5">{s.university} · {s.country}</span>
                    {why && <span className="block text-sm text-slate-800 mt-1.5">💡 {why}</span>}
                    <span className="flex flex-wrap gap-1.5 mt-2">{reasons.slice(0, 4).map((r) => <span key={r} className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-800 border border-green-200">{r}</span>)}</span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        )}
        {res && <p className="text-xs text-slate-500 mt-4">Always confirm eligibility and deadlines on the official page before applying.</p>}
      </div>
    </div>
  );
}
