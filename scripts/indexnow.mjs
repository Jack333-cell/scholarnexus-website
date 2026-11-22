// Tell Bing, Yandex and other IndexNow search engines about new or changed pages.
// Usage: node scripts/indexnow.mjs            (submits every URL in the live sitemap)
//        node scripts/indexnow.mjs <url> ...  (submits only the given URLs)
const HOST = 'www.scholarnexushub.com';
const KEY = '5531aa5ce67f3771591b9457b454a010'; // public key, served at /<KEY>.txt

let urls = process.argv.slice(2);
if (!urls.length) {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${res.status} for ${urls.length} URL(s)`);
