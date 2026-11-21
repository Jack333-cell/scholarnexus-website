// Server-only: turns a polished CV into a Word (.docx) or PDF file in one clean layout.
import { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle, LevelFormat } from 'docx';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const NAVY = '0A1F44';

export async function cvToDocx(cv) {
  const run = (text, o = {}) => new TextRun({ text, font: 'Calibri', size: o.size || 21, bold: o.bold, italics: o.italics, color: o.color });
  const children = [
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [run(cv.name, { size: 34, bold: true, color: NAVY })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 160 }, children: [run(cv.contact.join('  |  '), { size: 19, color: '444444' })] }),
  ];
  for (const s of cv.sections) {
    children.push(new Paragraph({ spacing: { before: 200, after: 80 }, keepNext: true, border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: NAVY, space: 2 } }, children: [run(s.title.toUpperCase(), { bold: true, color: NAVY, size: 22 })] }));
    for (const it of s.items) {
      if (it.type === 'bullet') children.push(new Paragraph({ numbering: { reference: 'b', level: 0 }, spacing: { after: 40 }, children: [run(it.text)] }));
      else children.push(new Paragraph({ spacing: { before: it.type === 'entry' ? 80 : 0, after: 40 }, keepNext: it.type === 'entry', children: [run(it.text, { bold: it.type === 'entry' && /\b(19|20)\d{2}\b/.test(it.text) })] }));
    }
  }
  const doc = new Document({
    creator: 'ScholarNexus CV Polisher', title: `${cv.name} CV`,
    numbering: { config: [{ reference: 'b', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 420, hanging: 240 } } } }] }] },
    sections: [{ properties: { page: { margin: { top: 900, bottom: 900, left: 1000, right: 1000 } } }, children }],
  });
  return Buffer.from(await Packer.toBuffer(doc));
}

export async function cvToPdf(cv) {
  const pdf = await PDFDocument.create();
  pdf.setTitle(`${cv.name} CV`); pdf.setCreator('ScholarNexus CV Polisher');
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const navy = rgb(10 / 255, 31 / 255, 68 / 255), grey = rgb(0.27, 0.27, 0.27), black = rgb(0.1, 0.1, 0.1);
  const W = 595.28, H = 841.89, M = 50, maxW = W - 2 * M;
  // Standard PDF fonts only cover Western characters; replace anything else safely.
  const safe = (f, t) => [...t].map((ch) => { try { f.encodeText(ch); return ch; } catch { return ch === '–' || ch === '—' ? '-' : '?'; } }).join('');
  let page = pdf.addPage([W, H]); let y = H - M;
  const need = (h) => { if (y - h < M) { page = pdf.addPage([W, H]); y = H - M; } };
  const wrap = (t, f, size, width) => {
    const words = safe(f, t).split(' '); const lines = []; let line = '';
    for (const w of words) { const test = line ? line + ' ' + w : w; if (f.widthOfTextAtSize(test, size) > width && line) { lines.push(line); line = w; } else line = test; }
    if (line) lines.push(line); return lines;
  };
  const center = (t, f, size, color) => { for (const l of wrap(t, f, size, maxW)) { need(size + 4); page.drawText(l, { x: (W - f.widthOfTextAtSize(l, size)) / 2, y: y - size, size, font: f, color }); y -= size + 4; } };

  center(cv.name, bold, 20, navy); y -= 2;
  center(cv.contact.join('  |  '), font, 9.5, grey); y -= 8;
  for (const s of cv.sections) {
    need(40); y -= 8;
    page.drawText(safe(bold, s.title.toUpperCase()), { x: M, y: y - 11, size: 11, font: bold, color: navy }); y -= 15;
    page.drawLine({ start: { x: M, y }, end: { x: W - M, y }, thickness: 0.8, color: navy }); y -= 8;
    for (const it of s.items) {
      const isB = it.type === 'bullet', f = it.type === 'entry' && /\b(19|20)\d{2}\b/.test(it.text) ? bold : font, size = 10.5;
      const lines = wrap(it.text, f, size, isB ? maxW - 14 : maxW);
      if (it.type === 'entry') y -= 3;
      lines.forEach((l, k) => {
        need(size + 4);
        if (isB && k === 0) page.drawText('•', { x: M + 2, y: y - size, size, font, color: black });
        page.drawText(l, { x: isB ? M + 14 : M, y: y - size, size, font: f, color: black });
        y -= size + 3.5;
      });
      y -= 1.5;
    }
  }
  return Buffer.from(await pdf.save());
}
