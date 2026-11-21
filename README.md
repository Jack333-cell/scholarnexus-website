# ScholarNexus

**Connect · Empower · Succeed** — verified, open scholarship opportunities with official application links, plus guidance on applications, CVs and theses.

*We share. We guide. You succeed. 💙*

## Features
- Curated scholarships, each linked to its **official** application page
- Search by name, country or field, and filter by study level
- Scholarship detail pages: deadline, eligibility and benefits
- Blog with application tips
- Contact by email or WhatsApp

## Tech stack
Next.js 14 (App Router) · React 18 · Tailwind CSS · lucide-react

## Run locally
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Updating scholarships
Listings live in `lib/data.js`. Each entry gets its own page at `/scholarships/<slug>`; keep `slug` unchanged once published.
Set `closeDate` (YYYY-MM-DD, earliest deadline, or `null` if rolling) and, if there are several deadlines, `lastDate`.
Collection pages (closing soon, fully funded, for African students, by level, by country) are defined in `lib/collections.js`
and are rebuilt hourly, so "days left" badges and closed listings update automatically. `sitemap.xml` and `robots.txt`
are generated from the same data.
Before each intake cycle, re-check every deadline and link on the official site and update the `date` field.

## Deployment
Deployed on [Vercel](https://vercel.com). Every push to `main` redeploys the site automatically.

## Contact
- Email: info@scholarnexushub.com
- WhatsApp: +254 754 835 544

## Prices and templates

- Service prices live in `lib/pricing.js` (`PRICE_GROUPS`); `/pricing` is built from it.
- Template previews are watermarked, partly blurred images in `public/templates/`. The full Word
  files are NOT in this repository (it is public) and are delivered privately after payment.
- To switch a Buy button from WhatsApp to an online payment page, paste the Paystack payment-page
  link into that template's `paymentUrl`.
