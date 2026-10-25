import { getCollection, type CollectionEntry } from 'astro:content';

export type ArhivEntry = CollectionEntry<'arhiv'>;

/** Galerije in lige, združene po sezonah (najnovejša sezona zgoraj). */
export async function getArchiveBySeason() {
  const all = await getCollection('arhiv');
  const seasons = new Map<string, ArhivEntry[]>();
  for (const e of all.sort((a, b) => b.data.datum.valueOf() - a.data.datum.valueOf())) {
    const list = seasons.get(e.data.sezona) ?? [];
    list.push(e);
    seasons.set(e.data.sezona, list);
  }
  return [...seasons.entries()].sort((a, b) => b[0].localeCompare(a[0]));
}
