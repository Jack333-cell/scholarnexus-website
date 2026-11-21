// Renders a polished CV in the same layout as the downloads. `locked` blurs everything after
// the first two sections so the preview shows the quality without giving the CV away.
export default function CvPreview({ cv, locked = true }) {
  const visible = 2;
  return (
    <div className="relative bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden select-none" onCopy={locked ? (e) => e.preventDefault() : undefined}>
      <div className="p-6 sm:p-8 font-[Calibri,Arial,sans-serif]">
        <p className="text-center text-2xl font-bold text-[#0A1F44]">{cv.name}</p>
        <p className="text-center text-xs text-slate-600 mt-1 mb-4">{cv.contact.join('  |  ')}</p>
        {cv.sections.map((s, i) => (
          <section key={s.title} className={locked && i >= visible ? 'blur-[5px] opacity-70' : ''} aria-hidden={locked && i >= visible}>
            <h3 className="text-sm font-bold tracking-wide text-[#0A1F44] border-b-2 border-[#0A1F44] mt-4 mb-2 pb-0.5">{s.title.toUpperCase()}</h3>
            {s.items.map((it, k) => it.type === 'bullet'
              ? <p key={k} className="text-sm text-slate-800 pl-4 -indent-3 mb-1">•&nbsp; {it.text}</p>
              : <p key={k} className={`text-sm text-slate-900 mb-1 ${it.type === 'entry' && /\b(19|20)\d{2}\b/.test(it.text) ? 'font-semibold mt-2' : ''}`}>{it.text}</p>)}
          </section>
        ))}
      </div>
      {locked && cv.sections.length > visible && (
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent flex items-end justify-center pb-5">
          <span className="px-4 py-2 rounded-full bg-[#0A1F44] text-white text-sm font-semibold shadow">🔒 Full polished CV unlocks after payment</span>
        </div>
      )}
      {locked && <div className="pointer-events-none absolute inset-0 flex items-center justify-center"><span className="text-5xl font-black text-slate-900/5 -rotate-12 tracking-widest">PREVIEW</span></div>}
    </div>
  );
}
