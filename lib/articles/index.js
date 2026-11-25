import sop from './sop';
import noIelts from './no-ielts';
import mastercard from './mastercard';
import reference from './reference';
import cv from './cv';
import timeline from './timeline';
import proposal from './proposal';
import scams from './scams';

export const ARTICLES = [sop, noIelts, mastercard, reference, cv, timeline, proposal, scams];
export const findArticle = (slug) => ARTICLES.find((a) => a.slug === slug);

// Minimal markdown → blocks: ## h2, ### h3, "- " ul, "1. " ol, paragraphs.
export function parseBody(md) {
  const blocks = [];
  let list = null;
  const flush = () => { if (list) { blocks.push(list); list = null; } };
  const paras = md.trim().split(/\n/);
  let buf = [];
  const flushP = () => { if (buf.length) { blocks.push({ t: 'p', text: buf.join(' ') }); buf = []; } };
  for (const raw of paras) {
    const line = raw.trimEnd();
    if (!line.trim()) { flushP(); flush(); continue; }
    let m;
    if ((m = line.match(/^###\s+(.*)/))) { flushP(); flush(); blocks.push({ t: 'h3', text: m[1] }); }
    else if ((m = line.match(/^##\s+(.*)/))) { flushP(); flush(); blocks.push({ t: 'h2', text: m[1] }); }
    else if ((m = line.match(/^-\s+(.*)/))) { flushP(); if (!list || list.t !== 'ul') { flush(); list = { t: 'ul', items: [] }; } list.items.push(m[1]); }
    else if ((m = line.match(/^\d+\.\s+(.*)/))) { flushP(); if (!list || list.t !== 'ol') { flush(); list = { t: 'ol', items: [] }; } list.items.push(m[1]); }
    else { flush(); buf.push(line.trim()); }
  }
  flushP(); flush();
  return blocks;
}

export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
export const wordCount = (a) => a.body.split(/\s+/).length;
