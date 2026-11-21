// Everything that can be paid for online. Prices are always looked up here on the server,
// so a buyer cannot change the amount in their browser.
import { PRICE_GROUPS, TEMPLATES, TEMPLATE_BUNDLE, CV_POLISH } from './pricing';

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

export const CATALOG = [
  ...PRICE_GROUPS.flatMap((g) =>
    g.items.filter((it) => !it.from).map((it) => ({ id: 'svc-' + slug(it.name), kind: 'service', name: it.name, kes: it.kes, usd: it.usd }))
  ),
  ...TEMPLATES.map((t) => ({ id: 'tpl-' + t.slug, kind: 'template', name: t.title + ' template', kes: t.kes, usd: t.usd, files: [t.file] })),
  { id: 'cv-polish', kind: 'cvpolish', name: CV_POLISH.title, kes: CV_POLISH.kes, usd: CV_POLISH.usd },
  { id: 'tpl-bundle', kind: 'template', name: TEMPLATE_BUNDLE.title, kes: TEMPLATE_BUNDLE.kes, usd: TEMPLATE_BUNDLE.usd, files: TEMPLATES.map((t) => t.file) },
];

export const getItem = (id) => CATALOG.find((c) => c.id === id);
export const serviceId = (name) => 'svc-' + slug(name);
export const templateTitle = (file) => (TEMPLATES.find((t) => t.file === file) || {}).title || file;
