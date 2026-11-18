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
Listings live in `components/ScholarNexus.jsx` (`scholarshipListings`).
Before each intake cycle, re-check every deadline and link on the official site and update the `date` field.

## Deployment
Deployed on [Vercel](https://vercel.com). Every push to `main` redeploys the site automatically.

## Contact
- Email: info@scholarnexushub.com
- WhatsApp: +254 754 835 544
