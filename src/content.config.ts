import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';
import { parse } from 'yaml';

/** YAML datoteka s seznamom pod ključem `key` (oblika, ki jo ureja Pages CMS).
 *  `red` ohrani vrstni red iz datoteke (zbirke so sicer razvrščene po id). */
const yamlList = (key: string) => (text: string) =>
  ((parse(text)?.[key] ?? []) as Record<string, unknown>[]).map((entry, red) => ({
    ...entry,
    // nov zapis iz urejevalnika nima oznake – dobi jo po vrstnem redu
    id: entry.id || `${key}-${red + 1}`,
    red,
  }));
const red = z.number().int();

/** Pages CMS neizpolnjena polja zapiše kot "" ali null – obravnavaj jih kot izpuščena. */
const opt = <T extends z.ZodType>(schema: T) =>
  z.preprocess((v) => (v === '' || v === null ? undefined : v), schema.optional());
/** Prazen seznam iz urejevalnika (null) → []. */
const list = <T extends z.ZodType>(item: T) => z.preprocess((v) => v ?? [], z.array(item));
/** Ura v obliki 16:45 (sprejme tudi 16.45 ali 9:00). */
const ura = z
  .union([z.string(), z.number()])
  .transform((v) => String(v).trim().replace('.', ':'))
  .transform((v) => (/^\d:/.test(v) ? `0${v}` : v))
  .pipe(z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Ura mora biti v obliki 16:45'));
/** YAML datoteka z enim samim zapisom. */
const yamlSingle = (id: string) => (text: string) => [{ id, ...parse(text) }];

const novice = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/novice' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      cover: opt(image()),
      cover_alt: opt(z.string()),
      cover_alt_en: opt(z.string()),
      excerpt: opt(z.string()),
      gallery: opt(list(z.object({ image: image(), alt: opt(z.string()), alt_en: opt(z.string()) }))),
      draft: z.preprocess((v) => v ?? false, z.boolean()),
      title_en: opt(z.string()),
      excerpt_en: opt(z.string()),
      body_en: opt(z.string()),
    }),
});

const bi = { sl: z.string(), en: opt(z.string()) };

/** Vsebinske strani (O klubu, Dvorana, Oprema, Začni s sabljanjem, Sabljanje). */
const strani = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/strani' }),
  schema: z.object({
    title: z.string(),
    title_en: z.string(),
    description: z.string(),
    description_en: z.string(),
    body_en: opt(z.string()),
  }),
});

/** Arhiv: galerije in klubske lige, razvrščene po sezonah. */
const arhiv = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/arhiv' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      title_en: opt(z.string()),
      vrsta: z.enum(['galerija', 'liga']),
      sezona: z.string().regex(/^\d{4}\/\d{2}$/, 'Sezona v obliki 2016/17'),
      datum: z.coerce.date(),
      novica: opt(z.string()),
      video: opt(list(z.string())),
      cover: opt(image()),
      slike: opt(list(z.object({ image: image(), alt: opt(z.string()), alt_en: opt(z.string()) }))),
      body_en: opt(z.string()),
    }),
});

const urnik = defineCollection({
  loader: file('src/data/urnik.yml', { parser: yamlList('skupine') }),
  schema: z.object({
    red,
    skupina: z.string(),
    skupina_en: opt(z.string()),
    opis: opt(z.string()),
    opis_en: opt(z.string()),
    termini: list(
      z.object({
        dan: z.enum(['pon', 'tor', 'sre', 'cet', 'pet', 'sob', 'ned']),
        od: ura,
        do: ura,
      }),
    ),
  }),
});

const cenik = defineCollection({
  loader: file('src/data/cenik.yml', { parser: yamlList('sklopi') }),
  schema: z.object({
    red,
    naslov: z.string(),
    naslov_en: opt(z.string()),
    postavke: list(
      z.object({
        opis: z.string(),
        opis_en: opt(z.string()),
        cena: z.string(),
        cena_en: opt(z.string()),
      }),
    ),
    opomba: opt(z.string()),
    opomba_en: opt(z.string()),
  }),
});

const trenerji = defineCollection({
  loader: file('src/data/trenerji.yml', { parser: yamlList('trenerji') }),
  schema: ({ image }) =>
    z.object({
      red,
      ime: z.string(),
      vloga: z.string(),
      vloga_en: opt(z.string()),
      foto: opt(image()),
      reference: list(z.object({ sl: z.string(), en: opt(z.string()) })),
    }),
});

const kontakt = defineCollection({
  loader: file('src/data/kontakt.yml', { parser: yamlSingle('kontakt') }),
  schema: z.object({
    klub: z.string(),
    naslov: z.string(),
    posta: z.string(),
    dvorana: z.string(),
    dvorana_en: z.string(),
    kontaktna_oseba: z.string(),
    telefon: z.string(),
    email: z.string(),
    davcna: z.string(),
    trr: z.string(),
    banka: z.string(),
    facebook: z.string().url(),
    instagram: z.string().url(),
    zemljevid: z.string().url(),
    lat: z.number(),
    lon: z.number(),
  }),
});

const nastavitve = defineCollection({
  loader: file('src/data/nastavitve.yml', { parser: yamlSingle('nastavitve') }),
  schema: z.object({
    novice_od: z.coerce.date(),
    novic_na_stran: z.number().int().positive(),
    rojstni_dnevi: z.string().url(),
    hero: z.array(
      z.object({
        slika: z.string(),
        alt: z.string(),
        alt_en: z.string(),
        naslov: z.string(),
        naslov_en: z.string(),
        podnaslov: z.string(),
        podnaslov_en: z.string(),
        gumb: z.enum(['zacni', 'urnik', 'kontakt', 'cenik', 'trenerji']),
      }),
    ),
  }),
});

export const collections = { novice, strani, arhiv, urnik, cenik, trenerji, kontakt, nastavitve };
