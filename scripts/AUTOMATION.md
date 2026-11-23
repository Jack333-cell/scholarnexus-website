# ScholarNexus automation runbook

Used by the daily scheduled tasks. Repo: Jack333-cell/scholarnexus-website (Next.js 14, Vercel auto-deploys `main`).

## Commits
```
git -c user.name="Jack Odoyo Otieno" -c user.email="noreply@users.noreply.github.com" commit -m "..."
```
After `git push`, poll the live URL with curl until it returns 200 / shows the change (~1–3 min).
Submit new URLs: `node scripts/indexnow.mjs <url> [<url>...]`.

## Listings (lib/data.js)
- Append new objects before the final `\n];` (splice at `s.lastIndexOf('}\n];')`), next free `id`, unique `slug`.
- Copy the field shape of the last entry (title, slug, country, category, level, amount, closeDate, lastChecked, officialUrl, summary, eligibility, benefits, howToApply, prep, ...).
- Every listing MUST state the money (grant / stipend / allowance / salary). Verify each opportunity on its official page: it must be open, deadline in the future, eligible for Africans/Kenyans where possible. Never invent figures.
- New countries: add to `lib/collections.js`, `lib/match.js`, `components/Matcher.jsx` as done for Belgium/Rwanda.

## Posters
```
python3 scripts/poster.py spec.json public/posters/<YYYY-MM-DD>-<slug>.png
```
spec keys: kind (opportunity|service), tag, country, title, money, points[<=5], deadline, cta. Plain text only (no emoji).
Brand: navy #0a1f44, gold #c9a227, light #eef1f8. Always open the PNG with Read and check it before posting.
Posters are public at `https://www.scholarnexushub.com/posters/<file>` once deployed.

## Getting a poster into Facebook / X (built-in browser, no file picker)
Both sites block fetching other domains, so carry the image across in `window.name`:
1. Navigate the tab to `https://www.scholarnexushub.com/posters/<file>.png` and run:
```js
const b=await (await fetch(location.href)).blob();
const u=await new Promise(r=>{const f=new FileReader();f.onload=()=>r(f.result);f.readAsDataURL(b)});
window.name='SNPOSTER:'+u; b.size
```
2. Navigate the same tab to the composer page (`https://www.facebook.com/` or `https://x.com/compose/post`). Then build the file:
```js
const u=window.name.slice(9); window.name='';
const [m,b64]=u.split(','); const s=atob(b64); const a=new Uint8Array(s.length); for(let i=0;i<s.length;i++)a[i]=s.charCodeAt(i);
window.__file=new File([a],'poster.png',{type:m.match(/:(.*?);/)[1]}); window.__file.size
```
3. Attach:
- **X**: `const i=document.querySelector('input[data-testid=fileInput]'); const d=new DataTransfer(); d.items.add(window.__file); i.files=d.files; i.dispatchEvent(new Event('change',{bubbles:true}))` — check `[data-testid=attachments]` exists.
- **Facebook** (after opening the composer): paste into the dialog's `[contenteditable=true]`: `const d=new DataTransfer(); d.items.add(window.__file); ed.dispatchEvent(new ClipboardEvent('paste',{clipboardData:d,bubbles:true,cancelable:true}))` — an `img` with naturalWidth 1080 appears in the dialog. Paste the caption text separately (DataTransfer with text/plain) BEFORE the image.
Do steps 1–3 in a fresh page load for every post (window.name is cleared after use).

## X posting
Navigate (force) to `https://x.com/compose/post`, wait for `[data-testid=tweetTextarea_0]` (empty), paste text via ClipboardEvent DataTransfer text/plain, verify `innerText.replace(/\n\n\n/g,'\n\n')===txt`, attach poster, click `[data-testid=tweetButton]`, wait for "Your post was sent". Keep text ≤ 280 chars (URLs count 23). Verify with `https://x.com/search?q=from%3ASaharanAfric%20<term>&f=live`.

## Facebook posting (as the ScholarNexus Page)
1. `https://www.facebook.com/` → click role=button containing "What's on your mind, ScholarNexus" (if it says another name, stop: wrong profile).
2. Paste caption, then poster, into the dialog `[contenteditable=true]`; wait ~4 s; click "Next".
3. Post settings loads slowly: take a screenshot / wait until "Share to groups" shows, then click that row ONCE by coordinate (ref clicks may only hover). Wait ~4 s.
4. Tick checkboxes (`[role=dialog] input[type=checkbox]` that are not role=switch) for: ScholarNexus- Scholarship & Academic Support Hub; Scholarship Positions and Study Abroad; USA Scholarships 2026-2027; Fully Funded Scholarships in Germany; Study Abroad Scholarships 2026-27 | Fully Funded; LATEST FULLY FUNDED SCHOLARSHIPS. NEVER tick "CHALLY CNA REACTION PROMOTOR". Click Done; confirm "6 Facebook groups selected".
5. Click the single visible "Post" button; click "Publish Original Post" if offered; wait for "Your post has been published".
If a script times out or the composer looks duplicated, reload facebook.com and start that post again from step 1 (check the Page first so you never double-post).
Service posters go to the Page only (no groups) unless Jack says otherwise.

## Google Search Console – request indexing
`https://search.google.com/search-console?resource_id=sc-domain%3Ascholarnexushub.com` → combobox "Inspect any URL" → triple-click, type the full URL, Enter, wait ~8 s → click the visible "Request indexing" button → wait for "Indexing requested" (can take ~1 min) → click "Dismiss". About 10 per day; stop at "Quota exceeded".
