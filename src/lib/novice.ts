import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';

export type Novica = CollectionEntry<'novice'>;

/** URL del novice: ime datoteke brez datuma (2024-03-01-naslov → naslov). */
export const slugOf = (entry: Novica) => entry.id.replace(/^\d{4}-\d{2}-\d{2}-/, '');

/** Vse objavljene novice, najnovejše najprej. */
export async function getPublishedNews() {
  const all = await getCollection('novice', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Meja med Novicami in Arhivom (src/data/nastavitve.yml → novice_od). */
export async function getCutoff() {
  const settings = await getEntry('nastavitve', 'nastavitve');
  return settings!.data.novice_od;
}

export async function getCurrentNews() {
  const cutoff = await getCutoff();
  return (await getPublishedNews()).filter((n) => n.data.date >= cutoff);
}

export async function getArchivedNews() {
  const cutoff = await getCutoff();
  return (await getPublishedNews()).filter((n) => n.data.date < cutoff);
}

/** Začetek besedila brez oblikovanja – povzetek, če ga urednik ni vpisal. */
export function excerptFrom(markdown: string | undefined, length = 200) {
  const text = (markdown ?? '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<https?:\/\/[^>]+>/g, '')
    .replace(/^\|.*$/gm, '')
    .replace(/[*_#>|]|^\s*- /gm, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= length) return text || undefined;
  const cut = text.slice(0, length);
  const dot = cut.lastIndexOf('. ');
  return dot > 80 ? cut.slice(0, dot + 1) : `${cut.slice(0, cut.lastIndexOf(' '))} …`;
}

/** Besedila v izbranem jeziku; če angleški prevod manjka, vrne slovensko in označi `fallback`. */
export function localize(entry: Novica, lang: Lang) {
  const d = entry.data;
  const excerptSl = d.excerpt ?? excerptFrom(entry.body);
  if (lang === 'en' && d.title_en) {
    return { title: d.title_en, excerpt: d.excerpt_en ?? excerptFrom(d.body_en) ?? excerptSl, bodyEn: d.body_en, fallback: !d.body_en };
  }
  return { title: d.title, excerpt: excerptSl, bodyEn: undefined, fallback: lang === 'en' };
}

/** Število strani in novice za izbrano stran seznama Novice. */
export async function getNewsPage(page: number) {
  const settings = (await getEntry('nastavitve', 'nastavitve'))!.data;
  const all = await getCurrentNews();
  const perPage = settings.novic_na_stran;
  const pages = Math.max(1, Math.ceil(all.length / perPage));
  return { items: all.slice((page - 1) * perPage, page * perPage), page, pages };
}

export async function getNewsPageCount() {
  return (await getNewsPage(1)).pages;
}
