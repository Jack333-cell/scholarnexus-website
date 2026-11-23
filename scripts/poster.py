#!/usr/bin/env python3
"""Make a ScholarNexus social poster (1080x1350 PNG).

Usage:
  python3 scripts/poster.py spec.json public/posters/<name>.png

spec.json keys:
  kind:     "opportunity" (default) or "service"
  tag:      small pill text, e.g. "FULLY FUNDED SCHOLARSHIP" / "INTERNSHIP" / "ACADEMIC SERVICES"
  country:  e.g. "Belgium" (opportunity only, optional)
  title:    main headline
  money:    funding line, e.g. "Full tuition + EUR 13,200/year" (required for opportunities)
  points:   list of up to 5 short bullet lines
  deadline: e.g. "15 Jan 2027" (opportunity only)
  cta:      bottom call to action, e.g. "Details: scholarnexushub.com"
Brand colours: navy #0a1f44, gold #c9a227, light #eef1f8, white.
Emoji are not supported by the font; keep text plain.
"""
import json, os, sys, textwrap
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
F = lambda size, bold=False: ImageFont.truetype(os.path.join(HERE, 'fonts', 'DejaVuSans-Bold.ttf' if bold else 'DejaVuSans.ttf'), size)
NAVY, GOLD, LIGHT, WHITE, TEAL = '#0a1f44', '#c9a227', '#eef1f8', '#ffffff', '#0f766e'
W, H = 1080, 1350


def wrap(draw, text, font, width):
    words, lines, cur = text.split(), [], ''
    for w in words:
        t = (cur + ' ' + w).strip()
        if draw.textlength(t, font=font) <= width:
            cur = t
        else:
            if cur: lines.append(cur)
            cur = w
    if cur: lines.append(cur)
    return lines


def main(spec_path, out_path):
    s = json.load(open(spec_path, encoding='utf-8'))
    kind = s.get('kind', 'opportunity')
    if kind == 'opportunity' and not s.get('money'):
        sys.exit('money is required for opportunity posters')
    img = Image.new('RGB', (W, H), WHITE)
    d = ImageDraw.Draw(img)

    # Header band
    d.rectangle([0, 0, W, 170], fill=NAVY)
    logo = os.path.join(ROOT, 'public', 'logo-mark.png')
    x0 = 60
    if os.path.exists(logo):
        lg = Image.open(logo).convert('RGBA'); lg.thumbnail((110, 110))
        img.paste(lg, (60, 30), lg); x0 = 190
    d.text((x0, 42), 'ScholarNexus', font=F(54, True), fill=WHITE)
    d.text((x0, 108), 'Connect · Empower · Succeed', font=F(26), fill=GOLD)

    y = 215
    # Tag pill (+ country)
    tag = s.get('tag', 'OPPORTUNITY').upper()
    f = F(28, True); tw = d.textlength(tag, font=f)
    d.rounded_rectangle([60, y, 60 + tw + 50, y + 56], 28, fill=GOLD)
    d.text((85, y + 11), tag, font=f, fill=NAVY)
    if s.get('country'):
        c = s['country']; cw = d.textlength(c, font=F(28, True)); cx = 60 + tw + 70
        d.rounded_rectangle([cx, y, cx + cw + 50, y + 56], 28, outline=NAVY, width=3)
        d.text((cx + 25, y + 11), c, font=F(28, True), fill=NAVY)
    y += 95

    # Title
    tf = F(62, True)
    lines = wrap(d, s['title'], tf, W - 120)
    if len(lines) > 3:
        tf = F(52, True); lines = wrap(d, s['title'], tf, W - 120)
    for ln in lines[:4]:
        d.text((60, y), ln, font=tf, fill=NAVY); y += tf.size + 14
    y += 20

    # Money box
    if s.get('money'):
        mf = F(40, True); ml = wrap(d, s['money'], mf, W - 200)
        bh = 40 + len(ml) * (mf.size + 12) + 30
        d.rounded_rectangle([60, y, W - 60, y + bh], 24, fill=NAVY)
        d.text((95, y + 22), 'FUNDING', font=F(24, True), fill=GOLD)
        yy = y + 60
        for ln in ml:
            d.text((95, yy), ln, font=mf, fill=WHITE); yy += mf.size + 12
        y += bh + 30

    # Points
    pf = F(34)
    pts = s.get('points', [])[:5]
    if pts:
        boxes = [wrap(d, p, pf, W - 230) for p in pts]
        bh = 30 + sum(len(b) * (pf.size + 10) + 18 for b in boxes) + 10
        d.rounded_rectangle([60, y, W - 60, y + bh], 24, fill=LIGHT)
        yy = y + 30
        for b in boxes:
            d.ellipse([95, yy + 10, 117, yy + 32], fill=GOLD)
            for ln in b:
                d.text((140, yy), ln, font=pf, fill=NAVY); yy += pf.size + 10
            yy += 18
        y += bh + 30

    # Deadline
    if s.get('deadline'):
        df = F(40, True); t = 'Deadline: ' + s['deadline']
        dw = d.textlength(t, font=df)
        d.rounded_rectangle([60, y, 60 + dw + 60, y + 72], 36, fill=GOLD)
        d.text((90, y + 14), t, font=df, fill=NAVY)

    # Footer
    d.rectangle([0, H - 150, W, H], fill=NAVY)
    cta = s.get('cta', 'Details & more: www.scholarnexushub.com')
    cf = F(34, True)
    d.text(((W - d.textlength(cta, font=cf)) / 2, H - 128), cta, font=cf, fill=GOLD)
    foot = 'info@scholarnexushub.com  ·  WhatsApp +254 754 835 544  ·  X @SaharanAfric'
    ff = F(24)
    d.text(((W - d.textlength(foot, font=ff)) / 2, H - 70), foot, font=ff, fill=WHITE)

    os.makedirs(os.path.dirname(out_path) or '.', exist_ok=True)
    img.save(out_path, optimize=True)
    print(out_path)


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
