'use client';
import { useEffect, useState } from 'react';
import { downloadCv } from './CvPolisher';

// Shown on the payment success page for a polished-CV purchase.
export default function CvDownload({ reference, hash, format }) {
  const [cv, setCv] = useState(null);
  const [state, setState] = useState('');
  useEffect(() => { try { const s = localStorage.getItem('sn_cv_' + hash); if (s) setCv(JSON.parse(s)); } catch {} }, [hash]);
  const label = format === 'docx' ? 'Word (.docx)' : 'PDF';
  if (!cv) {
    return (
      <div>
        <p className="text-slate-700 mb-3">Your CV isn't saved in this browser (you may have paid on another device). Open the polisher, paste the same CV again, and download it there.</p>
        <a href={`/tools/cv-polisher?ref=${encodeURIComponent(reference)}`} className="inline-block px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg">Open the CV polisher</a>
      </div>
    );
  }
  return (
    <div>
      <button onClick={async () => { setState('busy'); try { await downloadCv(reference, cv); setState('done'); } catch { setState('error'); } }} className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
        {state === 'busy' ? 'Preparing…' : `⬇ Download your polished CV (${label})`}
      </button>
      {state === 'done' && <p className="text-sm text-green-700 mt-2">✔ Downloaded. You can download it again from this page for 14 days.</p>}
      {state === 'error' && <p className="text-sm text-red-600 mt-2">Something went wrong. Contact us on WhatsApp with your reference.</p>}
    </div>
  );
}
