import Link from 'next/link';
import { parseBody, slugify } from '../lib/articles';

// Inline: [text](url), **bold**, *italic*
function Inline({ text }) {
  const out = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0, m, k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) {
      const href = m[2];
      out.push(href.startsWith('/')
        ? <Link key={k++} href={href} className="text-blue-600 underline hover:text-blue-800">{m[1]}</Link>
        : <a key={k++} href={href} target="_blank" rel={/prf\.hn|sjv\.io|trk\.udemy/.test(href) ? "sponsored noopener noreferrer" : "noopener noreferrer"} className="text-blue-600 underline hover:text-blue-800">{m[1]}</a>);
    } else if (m[3]) out.push(<strong key={k++} className="text-slate-900">{m[3]}</strong>);
    else if (m[4]) out.push(<em key={k++}>{m[4]}</em>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

export function headingsOf(body) {
  return parseBody(body).filter((b) => b.t === 'h2').map((b) => ({ id: slugify(b.text), text: b.text }));
}

export default function ArticleBody({ body }) {
  return (
    <div className="text-slate-700 leading-relaxed text-[17px]">
      {parseBody(body).map((b, i) => {
        if (b.t === 'h2') return <h2 key={i} id={slugify(b.text)} className="text-2xl font-bold text-slate-900 mt-10 mb-3 scroll-mt-24">{b.text}</h2>;
        if (b.t === 'h3') return <h3 key={i} className="text-lg font-bold text-slate-900 mt-6 mb-2">{b.text}</h3>;
        if (b.t === 'ul') return <ul key={i} className="list-disc pl-6 space-y-1.5 my-4">{b.items.map((t, j) => <li key={j}><Inline text={t} /></li>)}</ul>;
        if (b.t === 'ol') return <ol key={i} className="list-decimal pl-6 space-y-1.5 my-4">{b.items.map((t, j) => <li key={j}><Inline text={t} /></li>)}</ol>;
        return <p key={i} className="my-4"><Inline text={b.text} /></p>;
      })}
    </div>
  );
}
