'use client';
import { useState } from 'react';
import { checkLetter, checkCV } from '../lib/writingCheck';

const MODES = [['letter', 'Motivation letter'], ['sop', 'Statement of purpose']];

export default function WritingChecker() {
  const [mode, setMode] = useState('letter');
  const [text, setText] = useState('');
  const [res, setRes] = useState(null);
  const run = () => setRes(mode === 'cv' ? checkCV(text) : checkLetter(text, mode));
  const color = (s) => (s >= 80 ? 'text-green-700' : s >= 55 ? 'text-amber-600' : 'text-red-600');

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div>
        <a href="/tools/cv-polisher" className="block mb-4 p-3 rounded-lg bg-blue-50 border border-blue-200 text-sm text-blue-900"><strong>Working on a CV?</strong> Use the CV Polisher: it rewrites and reformats your CV automatically →</a>
        <div className="flex flex-wrap gap-2 mb-3">
          {MODES.map(([k, l]) => <button key={k} onClick={() => { setMode(k); setRes(null); }} className={`px-4 py-2 rounded-full text-sm font-semibold border ${mode === k ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-300 text-slate-700 hover:border-blue-600'}`}>{l}</button>)}
        </div>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={18} placeholder={mode === 'cv' ? 'Paste your CV text here…' : 'Paste your draft here. Leave a blank line between paragraphs…'} className="w-full p-4 border border-slate-300 rounded-xl text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-slate-500">Your text stays in your browser. Nothing is uploaded or saved.</span>
          <button onClick={run} disabled={text.trim().length < 80} className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50">Check my draft</button>
        </div>
      </div>
      <div>
        {!res && <div className="rounded-xl bg-slate-50 border border-slate-200 p-6 text-slate-600"><p className="font-semibold text-slate-800 mb-2">What it checks</p><p className="text-sm">{mode === 'cv' ? 'Key sections, contact details, dates, action verbs, measurable results, unneeded personal details and length.' : 'Length, opening sentence, clichés, evidence and numbers, programme fit, career goals, sentence variety, structure and repetition.'}</p></div>}
        {res && (
          <div>
            <div className="flex items-baseline gap-3 mb-4"><span className={`text-5xl font-bold ${color(res.score)}`}>{res.score}</span><span className="text-slate-600">/ 100 · {res.items.filter((i) => i.ok).length} of {res.items.length} checks passed</span></div>
            <ul className="space-y-2 mb-6">
              {res.items.map((i) => (
                <li key={i.title} className={`p-3 rounded-lg border ${i.ok ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
                  <p className="font-semibold text-sm text-slate-900">{i.ok ? '✔' : '⚠'} {i.title}</p>
                  <p className="text-sm text-slate-700 mt-0.5">{i.detail}</p>
                </li>
              ))}
            </ul>
            <div className="rounded-xl bg-blue-600 text-white p-5">
              <p className="font-bold mb-1">Want a human expert to review it?</p>
              <p className="text-sm text-blue-100 mb-3">This checker spots common problems. A full review gives line-by-line feedback on your story, fit and wording.</p>
              <div className="flex flex-wrap gap-2">
                <a href="/pricing#applications" className="px-4 py-2 bg-white text-blue-700 font-semibold rounded-lg text-sm">Get a review (from KES 250)</a>
                <a href="/templates" className="px-4 py-2 border border-white text-white font-semibold rounded-lg text-sm">See sample templates</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
