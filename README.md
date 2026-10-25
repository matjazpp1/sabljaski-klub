# Spletna stran Sabljaškega kluba Ljubljana

Spletna stran v slovenščini in angleščini (`/` in `/en/`), zgrajena z [Astro](https://astro.build). Vsebino urejamo v spletnem urejevalniku [Pages CMS](https://pagescms.org), objavljena je na [Cloudflare Pages](https://pages.cloudflare.com).

- **1. del – za urednika:** prijava v urejevalnik, novice, urnik in cenik, galerije.
- **2. del – za tehničnega urednika:** struktura projekta, lokalni zagon, objava, dostopi in domena.

---

## 1. del – za urednika

### Kako deluje

Vsa vsebina (novice, urnik, cenik …) je shranjena v repozitoriju na GitHubu. Ko v urejevalniku kliknete **Save**, se sprememba shrani tja, Cloudflare pa stran samodejno zgradi znova. **Sprememba je na spletu vidna v približno 1–3 minutah.**

Če gradnja ne uspe (npr. zaradi napačno vpisanega podatka), ostane na spletu prejšnja različica – stran se nikoli ne »pokvari«. Tehnični urednik dobi obvestilo in napako popravi.

### Prva prijava

1. Od tehničnega urednika dobite vabilo na e-pošto (ali pa vas doda kot sodelavca na GitHubu).
2. Odprite **https://app.pagescms.org** in se prijavite:
   - **z e-pošto**, če ste dobili vabilo na e-pošto (sledite navodilom v vabilu), ali
   - **z GitHub računom** (brezplačen račun ustvarite na https://github.com/signup).
3. Izberite repozitorij spletne strani. Na levi se prikaže meni: *Novice, Urnik, Cenik, Trenerji, Kontakt in podatki društva, Arhiv, Besedila strani, Nastavitve strani.*

### Dodajanje novice (približno 5 minut)

1. V meniju izberite **Novice** in kliknite **Add an entry** (Dodaj).
2. Izpolnite:
   - **Naslov** in **Datum** (obvezno),
   - **Naslovna slika** – kliknite polje, nato **Upload** in povlecite sliko z računalnika. Najbolje ležeča fotografija, vsaj 1200 px široka. Ime datoteke se samodejno prilagodi.
   - **Opis naslovne slike** – kratko, kaj je na sliki (npr. »Brin Božič na stopničkah DP 2025«).
   - **Povzetek** – neobvezno; če ga izpustite, se uporabi začetek besedila.
   - **Besedilo** – pišete kot v Wordu (krepko, povezave, seznami, naslovi).
   - **Galerija** – neobvezno; za vsako dodatno fotografijo kliknite **Add**, izberite sliko in vpišite kratek opis.
3. Angleška polja (**Naslov/Povzetek/Besedilo (angleško)**) so neobvezna. Če jih pustite prazna, angleška stran pokaže slovensko besedilo z opombo »Available in Slovenian only«.
4. Kliknite **Save**. Čez nekaj minut je novica na strani Novice in na naslovnici.

**Osnutek:** če obkljukate *Osnutek (ne objavi še)*, se novica shrani, a ni vidna na strani. Ko je pripravljena, kljukico odstranite in shranite.

**Popravek novice:** v seznamu Novice kliknite novico, popravite in **Save**. **Brisanje:** v seznamu ob novici izberite **Delete**.

> Nasvet: fotografije s telefona so pogosto zelo velike – to ni težava, stran jih ob objavi sama pomanjša. Ne nalagajte pa več kot ~20 fotografij naenkrat.

### Urnik in cenik

- **Urnik:** meni *Urnik* → skupina → *Termini*. Vsak termin ima dan, uro začetka in konca (v obliki `16:45`). Novo skupino dodate z **Add** na dnu seznama. Vrstni red skupin na strani je enak kot v urejevalniku (lahko jih premikate).
- **Cenik:** meni *Cenik* → sklop (npr. *Začetniki*) → *Postavke*. Ceno vpišite kot besedilo, npr. `50 € / mesec`, in v angleško polje `€ 50 / month`.
- **Trenerji:** meni *Trenerji*. Portret dodate v polje *Portret* (pokončna fotografija). Dokler portreta ni, so prikazane inicialke.
- **Kontakt in podatki društva:** telefon, e-pošta, TRR, povezave na Facebook in Instagram. Spremembe se pokažejo povsod (noga strani, Kontakt, O klubu).

Polja z oznako *(angleško)* so prevod za angleško stran.

### Galerija v arhivu

1. Meni **Arhiv (galerije in lige)** → **Add an entry**.
2. Vpišite **Naslov**, izberite **Vrsta: Galerija**, vpišite **Sezono** v obliki `2024/25` in **Datum dogodka**.
3. **Naslovna slika** in **Fotografije** – za vsako fotografijo **Add** → izberite oz. naložite sliko.
4. **Save**. Galerija se pojavi na strani Arhiv v razdelku svoje sezone.

### Besedila strani in nastavitve

- **Besedila strani:** O klubu, Dvorana, Oprema in izposoja, Začni s sabljanjem, Sabljanje (slovensko in angleško).
- **Nastavitve strani:** datum, od katerega so novice na strani *Novice* (starejše so v *Arhivu*), število novic na stran, povezava *Rojstni dnevi* in slajdi na naslovnici.

### Ko kaj ne gre

- Sprememba se ni pokazala niti po 5 minutah → osvežite stran (Ctrl/Cmd + Shift + R). Če še vedno ni vidna, obvestite tehničnega urednika – verjetno je gradnja zaznala napako v podatkih.
- Nekaj ste pomotoma izbrisali → tehnični urednik lahko vsako prejšnjo različico obnovi iz zgodovine na GitHubu.

---

## 2. del – za tehničnega urednika

### Tehnologija

| Del | Rešitev |
|---|---|
| Ogrodje | Astro 7 (statična stran), TypeScript |
| Oblikovanje | navaden CSS z oblikovnimi žetoni (`src/styles/global.css`), pisava Barlow (`@fontsource`) |
| Galerije | PhotoSwipe 5 |
| Vsebina | Astro content collections (Markdown + YAML) |
| Urejevalnik | Pages CMS (`.pages.yml`) |
| Gostovanje | Cloudflare Pages, samodejna objava ob vsaki spremembi na veji `main` |
| Analitika / piškotki | brez (po želji Cloudflare Web Analytics – brez piškotkov) |

Potrebujete Node.js 22.23 ali novejši (priporočeno 24, glej `.node-version`).

### Struktura projekta

```
.pages.yml                 # konfiguracija urejevalnika Pages CMS
astro.config.mjs           # site (SITE_URL), i18n, sitemap
public/
  _headers                 # glave HTTP za Cloudflare (predpomnjenje, varnost)
  logo/                    # logotip (izvirnik + svetla različica)
  dokumenti/               # PDF/DOCX (pravila, rezultati, propozicije)
  favicon.ico, icon.png, apple-touch-icon.png
scripts/logo-variante.py   # iz izvirnega logotipa izdela svetlo različico in ikone
src/
  assets/
    stock/                 # fotografije naslovnice (+ CREDITS.md) – zamenjava: ista imena datotek
    novice/<slug>/         # slike novic
    arhiv/<slug>/          # slike galerij in lig
    trenerji/              # portreti trenerjev
    strani/                # slike vsebinskih strani (oprema)
  content/
    novice/YYYY-MM-DD-slug.md   # novice (SL + EN polja v isti datoteki)
    arhiv/<slug>.md             # galerije in klubske lige
    strani/<id>.md              # O klubu, Dvorana, Oprema, Začni, Sabljanje
  data/                    # urnik.yml, cenik.yml, trenerji.yml, kontakt.yml, nastavitve.yml
  content.config.ts        # sheme vseh zbirk (preverjanje podatkov ob gradnji)
  i18n/                    # sl.json, en.json (besedila vmesnika), index.ts (poti v obeh jezikih)
  components/              # Header, Footer, HeroSlider, NewsCard, Gallery, PageHeader, Icon …
  layouts/BaseLayout.astro # <head>: SEO, Open Graph, hreflang, JSON-LD SportsClub
  views/                   # vsebina posameznih strani (skupna za SL in EN)
  pages/                   # poti: slovenske na /, angleške na /en/ (tanke datoteke → views/)
```

Poti strani v obeh jezikih so zapisane na enem mestu: `src/i18n/index.ts` (`routes`).

### Lokalni zagon

```bash
npm install
```

```bash
npm run dev
```

Stran je na http://localhost:4321. Produkcijsko gradnjo preverite z:

```bash
npm run build
```

```bash
npm run preview
```

### Neposredno urejanje datotek (brez urejevalnika)

- **Nova novica:** `src/content/novice/2025-11-03-naslov-novice.md`. URL je ime datoteke brez datuma (`/novice/naslov-novice/`). Frontmatter:

  ```yaml
  ---
  title: "Naslov"
  date: 2025-11-03
  cover: ../../assets/novice/naslov-novice/01.jpg   # neobvezno
  cover_alt: "Opis slike"
  excerpt: "Povzetek"                               # neobvezno
  gallery:                                          # neobvezno
    - image: ../../assets/novice/naslov-novice/02.jpg
      alt: "Opis"
  draft: false
  title_en: "Title"                                 # neobvezno
  excerpt_en: "Summary"
  body_en: |
    English text in **Markdown**.
  ---

  Slovensko besedilo v Markdownu.
  ```

- **Slike** shranite v `src/assets/...` in nanje kažite z relativno potjo – Astro jih ob gradnji pretvori v WebP in pomanjša.
- **Meja Novice/Arhiv:** `novice_od` v `src/data/nastavitve.yml`.
- **Napake v podatkih** (npr. manjkajoči obvezni podatek, napačna ura) gradnja jasno izpiše – `npm run build` lokalno pokaže isto kot Cloudflare.

### Objava na Cloudflare Pages (enkratna nastavitev)

1. **Repozitorij na GitHubu:** na https://github.com/new ustvarite repozitorij (npr. `sk-ljubljana-stran`, lahko zaseben) in vanj potisnite projekt:

   ```bash
   git remote add origin https://github.com/<uporabnik>/sk-ljubljana-stran.git
   ```

   ```bash
   git push -u origin main
   ```

2. **Cloudflare:** prijavite se na https://dash.cloudflare.com (brezplačen račun) → **Workers & Pages** → **Create** → zavihek **Pages** → **Connect to Git** → izberite repozitorij.
3. Nastavitve gradnje:
   - *Framework preset:* **Astro**
   - *Build command:* `npm run build`
   - *Build output directory:* `dist`
   - *Production branch:* `main`
4. **Environment variables** (Production): `SITE_URL` = `https://<ime-projekta>.pages.dev` (natančen naslov vidite po prvi objavi; pozneje ga zamenjate z lastno domeno). Brez te spremenljivke kanonični naslovi in zemljevid strani (sitemap) kažejo na začasni naslov posamezne objave.
5. **Save and Deploy.** Prva gradnja traja nekaj minut (optimizacija ~1000 slik), naslednje so hitrejše.

Vsaka nadaljnja sprememba na veji `main` (iz urejevalnika ali Gita) sproži novo objavo. Spremembe na drugih vejah dobijo lasten predogledni naslov.

### Pages CMS (enkratna nastavitev)

1. Odprite https://app.pagescms.org in se prijavite z GitHub računom, ki ima dostop do repozitorija.
2. Pri prvi prijavi namestite **GitHub aplikacijo Pages CMS** in ji dovolite dostop do repozitorija spletne strani (*Only select repositories*).
3. Izberite repozitorij in vejo `main` – urejevalnik prebere `.pages.yml` in prikaže obrazce.

### Dodajanje urednika

Dve možnosti:

- **Brez GitHub računa (najpreprosteje):** v Pages CMS odprite repozitorij in v nastavitvah sodelavcev (*Collaborators*) vpišite e-poštni naslov urednika. Urednik dobi vabilo po e-pošti. Ureja lahko vsebino in slike tega repozitorija, ne more pa spreminjati `.pages.yml` ali dodajati drugih sodelavcev.
- **Z GitHub računom:** na GitHubu → repozitorij → **Settings** → **Collaborators** → **Add people** (vloga *Write*). Urednik se v Pages CMS prijavi z GitHubom.

Odvzem dostopa: odstranite osebo na istem mestu.

### Lastna domena

1. Cloudflare → projekt → **Custom domains** → **Set up a custom domain** → vpišite domeno (npr. `sabljanje-ljubljana.si` in `www.sabljanje-ljubljana.si`).
2. Če je domena že na Cloudflaru, se DNS nastavi samodejno. Sicer pri registrarju domene dodajte zapis **CNAME** (`www` → `<ime-projekta>.pages.dev`), kot ga prikaže Cloudflare; za korensko domeno je najlažje domeno prenesti na Cloudflare DNS.
3. V **Settings → Environment variables** spremenite `SITE_URL` v `https://<vaša-domena>` in sprožite novo objavo (**Deployments → Retry deployment**). Koda se ne spreminja.

### Obvestilo na stari strani (Weebly)

Weebly ne omogoča preusmeritev, zato na naslovno stran stare strani ročno objavite kratko obvestilo, npr.:

> **Preselili smo se!** Nova spletna stran Sabljaškega kluba Ljubljana je na naslovu **https://<nova-domena>**. Tam najdete urnik, cenik, novice in arhiv vseh galerij. Ta stran se ne posodablja več.
>
> *We have moved! Our new website is at https://<nova-domena>.*

### Zamenjava fotografij in logotipa

- **Naslovnica:** novo fotografijo shranite v `src/assets/stock/` z enakim imenom (`hero-1.jpg` …), opise uredite v `src/data/nastavitve.yml`. Viri trenutnih fotografij: `src/assets/stock/CREDITS.md`.
- **Logotip:** nov izvirnik shranite kot `public/logo/zelva-original.png` in zaženite `python3 scripts/logo-variante.py` (potrebuje Pillow) – skripta izdela svetlo različico za temno glavo in ikone. Vektorska različica (SVG) bi bila ostrejša.

### Odvisnosti

`astro`, `@astrojs/sitemap`, `@fontsource/barlow`, `photoswipe`, `marked` (izris angleškega Markdowna iz frontmatterja), `yaml` (branje podatkovnih datotek). Posodobitev: `npm outdated`, nato `npm update` in `npm run build`.
