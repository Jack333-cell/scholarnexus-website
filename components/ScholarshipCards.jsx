import Link from 'next/link';
import { shortTitle, daysLeft, isClosed, nextDate } from '../lib/collections';

export function DeadlineBadge({ s }) {
  if (isClosed(s)) return <span className="px-2 py-0.5 bg-slate-200 text-slate-600 text-xs font-medium rounded">Deadline passed</span>;
  const d = daysLeft(nextDate(s));
  if (d === null) return null;
  if (d <= 14) return <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded">{d === 0 ? 'Closes today' : `${d} day${d === 1 ? '' : 's'} left`}</span>;
  if (d <= 45) return <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded">{d} days left</span>;
  return null;
}

export default function ScholarshipCards({ items }) {
  if (!items.length) return <p className="text-slate-600">No open listings here right now — check back soon or browse all scholarships.</p>;
  return (
    <div className="grid gap-4">
      {items.map((s) => (
        <Link key={s.id} href={`/scholarships/${s.slug}`} className={`group block bg-white border border-slate-200 rounded-lg hover:shadow-lg transition ${isClosed(s) ? 'opacity-60' : ''}`}>
          <div className="flex gap-4 p-5">
            <div className="text-3xl flex-shrink-0" aria-hidden="true">{s.thumbnail}</div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">{shortTitle(s)}</h3>
                <DeadlineBadge s={s} />
              </div>
              <p className="text-sm text-slate-600 mb-2">{s.excerpt}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                <span>🌍 {s.country}</span>
                <span>💰 {s.amount}</span>
                <span>📅 {s.deadline}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
