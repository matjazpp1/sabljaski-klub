import { getCollection } from 'astro:content';

/** Zapisi iz YAML seznama (urnik, cenik, trenerji) v vrstnem redu, kot so v datoteki. */
export async function getOrdered<C extends 'urnik' | 'cenik' | 'trenerji'>(name: C) {
  const entries = await getCollection(name);
  return entries.sort((a, b) => a.data.red - b.data.red);
}
