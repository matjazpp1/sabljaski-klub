import sl from './sl.json';
import en from './en.json';

export const languages = ['sl', 'en'] as const;
export type Lang = (typeof languages)[number];
export type UiKey = keyof typeof sl;

const dictionaries: Record<Lang, Record<string, string>> = { sl, en };

/** Prevod besedila vmesnika; manjkajoč angleški prevod pade nazaj na slovenščino. */
export function useTranslations(lang: Lang) {
  return (key: UiKey) => dictionaries[lang][key] ?? dictionaries.sl[key] ?? key;
}

/** Poti strani v obeh jezikih. Ključ se uporablja za meni in preklopnik jezika. */
export const routes = {
  home: { sl: '/', en: '/en/' },
  about: { sl: '/klub/', en: '/en/club/' },
  coaches: { sl: '/klub/trenerji/', en: '/en/club/coaches/' },
  venue: { sl: '/klub/dvorana/', en: '/en/club/venue/' },
  schedule: { sl: '/treningi/urnik/', en: '/en/training/schedule/' },
  prices: { sl: '/treningi/cenik/', en: '/en/training/prices/' },
  equipment: { sl: '/treningi/oprema/', en: '/en/training/equipment/' },
  start: { sl: '/treningi/zacni-s-sabljanjem/', en: '/en/training/start-fencing/' },
  news: { sl: '/novice/', en: '/en/news/' },
  fencing: { sl: '/sabljanje/', en: '/en/fencing/' },
  archive: { sl: '/arhiv/', en: '/en/archive/' },
  contact: { sl: '/kontakt/', en: '/en/contact/' },
} as const;
export type RouteKey = keyof typeof routes;

export function path(lang: Lang, key: RouteKey, rest = '') {
  return routes[key][lang] + (rest ? `${rest.replace(/^\/|\/$/g, '')}/` : '');
}

/** Pot iste strani v drugem jeziku (za preklopnik), npr. /novice/x/ ↔ /en/news/x/. */
export function alternatePath(pathname: string, to: Lang): string {
  const from: Lang = pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'sl';
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  // najdaljša ujemajoča se pot ima prednost (npr. /klub/trenerji/ pred /klub/)
  const match = Object.values(routes)
    .filter((r) => r[from] !== routes.home[from] && normalized.startsWith(r[from]))
    .sort((a, b) => b[from].length - a[from].length)[0];
  if (!match) return routes.home[to];
  // oštevilčene strani novic: /novice/stran/2/ ↔ /en/news/page/2/
  const rest = normalized.slice(match[from].length).replace(/^(stran|page)\//, to === 'sl' ? 'stran/' : 'page/');
  return match[to] + rest;
}

export function formatDate(date: Date, lang: Lang) {
  return date.toLocaleDateString(lang === 'sl' ? 'sl-SI' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
