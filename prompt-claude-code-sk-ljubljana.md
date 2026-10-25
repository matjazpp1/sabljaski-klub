# Prompt za Claude Code – nova spletna stran Sabljaškega kluba Ljubljana

## Naloga

Izdelaj novo, moderno spletno stran za **Sabljaški klub Ljubljana** (SK Ljubljana), ki nadomešča staro stran na Weeblyju: https://sabljanjeljubljana.weebly.com.

Vizualni zgled je **https://www.sallepaulphoenix.com**. Posnemaj njegov slog in strukturo, ne kopiraj pa besedil, slik ali logotipa. **Poudarna barva ne sme biti oranžna** (glej razdelek Vizualni slog).

Glavni cilji:
1. Moderna, hitra, mobilno prijazna stran v **slovenščini in angleščini** (angleška različica je popolna kopija slovenske).
2. **Enostavno vzdrževanje** – novice bosta urejala netehnična oseba (prek spletnega urejevalnika) in tehnični urednik (prek urejevalnika ali neposredno v Markdown datotekah).
3. Vse neaktualne vsebine stare strani (galerije, stare lige, novice pred letom 2022) premakni v **Arhiv**, da ostanejo dostopne, a ne motijo.
4. Vidno postavljen **logotip kluba (želva)**.
5. Povezavi na **Instagram** in **Facebook** v glavi in nogi strani.

---

## Tehnična zasnova

- **Ogrodje:** Astro (statična stran), čim manj JavaScripta. Tailwind CSS ali navaden CSS s spremenljivkami (design tokens).
- **Vsebina kot datoteke:** novice, arhivske galerije, trenerji, urnik, cenik in kontakt naj bodo v `src/content/` oziroma `src/data/` kot Markdown/YAML (Astro content collections), ločeno od kode. Urnik, cenik, kontakt in trenerji naj bodo v YAML datotekah, da se jih da popraviti brez dotikanja HTML.
- **Spletni urejevalnik (CMS): Pages CMS** (https://pagescms.org) nad GitHub repozitorijem. Pripravi konfiguracijo `.pages.yml` z obrazci za:
  - novico (naslov, datum, naslovna slika, povzetek, besedilo, galerija slik, stikalo »osnutek/objavljeno«, angleški naslov/povzetek/besedilo),
  - urnik, cenik, trenerje, kontakt,
  - arhivsko galerijo.
  Urednik se prijavi z (brezplačnim) GitHub računom in ima dostop do repozitorija. Tehnični urednik lahko enake datoteke ureja neposredno v Gitu.
- **Gostovanje: Cloudflare Pages** (brezplačno), samodejna objava ob vsaki spremembi na veji `main`. Stran naj najprej teče na brezplačni poddomeni `*.pages.dev`; konfiguracijo pripravi tako, da se pozneje lastna domena doda brez sprememb kode (`site` v `astro.config` naj bere spremenljivko okolja `SITE_URL`). V README opiši, kako se doda lastna domena.
- Slike optimiziraj z Astro `<Image>` (WebP/AVIF, lazy loading). Vse slike shrani lokalno v repozitorij – ne povezuj na Weebly.
- SEO: naslovi strani, meta opisi, Open Graph slike, `sitemap.xml` (z `hreflang` za sl/en), `robots.txt`, JSON-LD `SportsClub`.
- Dostopnost: semantičen HTML, alt besedila, zadosten kontrast (WCAG AA – posebej preveri kontrast zelene na temni podlagi), navigacija s tipkovnico.
- Brez piškotkov za sledenje in brez pasice za piškotke. Če dodaš analitiko, le Cloudflare Web Analytics (brez piškotkov).

---

## Dvojezičnost (SL / EN)

- Uporabi Astro i18n routing: slovenščina je privzeta na `/`, angleščina na `/en/`.
- **Angleška različica ima enako strukturo in vsebino kot slovenska** – vse strani, vključno z novicami in arhivom. Vsebino ob migraciji prevedi v naravno angleščino (imena tekmovanj, kategorij in rezultatov ohrani točno).
- Preklopnik jezika (SL | EN) v glavi; ob preklopu ostaneš na isti strani v drugem jeziku.
- Besedila vmesnika (meni, gumbi, oznake) v enem prevodnem slovarju (`src/i18n/sl.json`, `en.json`).
- Pri novicah: angleška polja v isti datoteki kot slovenska (ali vzporedna datoteka – izberi preprostejše za urednika v Pages CMS). Če angleški prevod nove novice manjka, angleška stran prikaže slovensko besedilo z diskretno opombo »Available in Slovenian only«, gradnja pa ne sme pasti.

---

## Vizualni slog (po zgledu sallepaulphoenix.com)

Kar sem ugotovil iz zgledne strani:
- **Glava:** temna, fiksna (sticky), logotip levo, meni desno z velikimi tiskanimi črkami, na skrajni desni izstopajoč gumb v poudarni barvi (pri njih »START FENCING«, pri nas **»PRIDRUŽI SE« / »JOIN US«**), ikoni Instagram in Facebook, preklopnik jezika. Na mobilnem hamburger meni.
- **Pisava:** Barlow (Google Fonts, naloži lokalno prek `@fontsource`) – naslovi debeli (700), VELIKE TISKANE ČRKE; besedilo 18 px, navadna debelina.
- **Barve:** temna (skoraj črna) in temno siva podlaga, bela besedila, **ena prefinjena zelena poudarna barva v slogu mesta Ljubljana** (zmaj, zeleno-belo mestno okolje, Tivoli, Ljubljanica). Ne neonska, ne travnato zelena, ampak umirjena, žlahtna zelena. Izhodiščni predlog za tokene (prilagodi po potrebi, da ustreza logotipu in kontrastu):
  - `--accent: #2F6B4F` (glavna zelena – gumbi, pasovi)
  - `--accent-light: #5E9C7C` (naslovi in povezave na temni podlagi, hover)
  - `--accent-dark: #1E4535` (globlji pasovi, ozadja kartic)
  - `--bg: #0F1211`, `--surface: #181C1A`, `--text: #F2F4F3`, `--muted: #A7B0AC`
  Oranžne ali drugih kričečih barv ne uporabljaj.
- **Uvodni del (hero):** fotografija sabljačev čez cel zaslon, temnejša prekrivna plast, polprosojen temen okvir z velikim naslovom v poudarni barvi + podnaslovom + gumbom. Drsnik z 2–3 slajdi (npr. »ZAČNI S SABLJANJEM«, »TEKMOVALNI PROGRAM«, »REKREACIJA ZA ODRASLE«); spoštuj `prefers-reduced-motion`.
- **Pod uvodom:** tri kartice s klici k dejanju: **Začetniki / Urnik in cenik / Individualni treningi**.
- **Blok »O nas«:** temna podlaga, kratko besedilo + gumb »Naša zgodba«.
- **Pas v poudarni barvi** z dvema karticama: **»Trenirajte z najboljšimi«** → trenerji in **»Naša dvorana«** → dvorana Aprima.
- **Novice:** zadnje 3 novice kot kartice (slika, datum, naslov, povzetek) in gumb »Vse novice«.
- **Urnik:** pas s kratkim opisom in gumbom »Poglej urnik«.
- **Noga:** tri stolpci – ure treningov, lokacija (povezava na zemljevid; vgrajen OpenStreetMap brez piškotkov ali le povezava), kontakt; ikoni Instagram in Facebook; osnovni podatki društva.
- Ravni, ostri robovi, malo zaobljenosti, veliko praznega prostora, subtilne animacije ob pomikanju.

---

## Fotografije za ozadja

- Za hero drsnik, ozadja pasov in kartice na domači strani uporabi **brezplačne stock fotografije sabljanja z mečem (épée)** z Unsplash ali Pexels (licenca dovoljuje brezplačno uporabo brez dovoljenja).
- Izbiraj fotografije, ki res prikazujejo **meč**: velik zvonast ščitnik na roki, ravno rezilo, sabljači v beli opremi na pisti, borba, napad, maska. Izogibaj se fotografijam sablje in floreta ter posnetkom z vidnimi logotipi blagovnih znamk v ospredju.
- Prednost imajo temnejši, kontrastni, atmosferski posnetki (dramatična svetloba, temno ozadje), ki se ujemajo s temno podlago in zeleno poudarno barvo. Na fotografije lahko dodaš temno prekrivno plast ali rahel zeleni barvni ton za enoten videz.
- Fotografije prenesi lokalno v `src/assets/stock/`, optimiziraj jih in v `src/assets/stock/CREDITS.md` zapiši vir, avtorja in povezavo za vsako (kot dobra praksa, tudi če licenca navedbe ne zahteva).
- Pripravi 4–6 fotografij: 3 za hero drsnik, 1–2 za ozadje pasov, 1 za Open Graph sliko.
- Klubske fotografije s stare strani uporabi pri novicah in v arhivu, ne kot ozadja domače strani (so nizke ločljivosti). Zamenjava stock fotografij z lastnimi naj bo enostavna (ena mapa, ena nastavitev).
- Če fotografij ne moreš samodejno prenesti, mi pošlji seznam izbranih povezav in v kodo vstavi nadomestne slike z istimi imeni datotek.

---

## Logotip

- Logotip (želva) prenesi s stare strani: https://sabljanjeljubljana.weebly.com/uploads/1/8/6/0/18609092/1420229459.png in ga shrani v `public/logo/`. Če je ločljivost prenizka za ostro prikazovanje, me na to opozori (lahko priskrbim boljšo datoteko); do takrat uporabi to.
- Logotip naj bo viden v glavi (na temni podlagi – po potrebi pripravi svetlo različico ali svetlo ozadje za logotip), v nogi in kot favicon (`favicon.ico`, `apple-touch-icon.png`, `icon.svg`/`icon.png`).
- Želvo lahko diskretno uporabiš kot grafični motiv (npr. vodni žig v ozadju bloka »O nas«), ne pa kot dekoracijo povsod.

---

## Struktura strani (meni)

1. **Domov** – opisano zgoraj.
2. **Klub**
   - O klubu / naša zgodba
   - Trenerji
   - Dvorana (športna dvorana Aprima, Tržaška 132, Ljubljana)
3. **Treningi**
   - Urnik (po skupinah)
   - Cenik
   - Oprema in izposoja
   - Začni s sabljanjem (stran za nove člane: komu je namenjeno, kaj prinesti na prvi trening, izposoja opreme, kontakt) – sem kaže gumb »PRIDRUŽI SE«.
4. **Novice** – novice od leta 2022 naprej, z oštevilčenimi stranmi.
5. **Sabljanje** – zgodovina sabljanja, pravila (povezava na FIE tehnična pravila, PDF »Prekrški in kazni« s stare strani – prenesi ga lokalno), uporabne povezave.
6. **Arhiv** – vse neaktualno (glej spodaj).
7. **Kontakt** – kontaktna oseba, telefon, e-pošta, naslov, zemljevid, podatki društva, družbena omrežja.
8. **Rojstni dnevi** – zunanja povezava (odpri v novem zavihku) na https://www.kineziologinakvadrat.com/scaronportni-rojstni-dnevi.html, enako kot na stari strani.

**Sponzorjev in donatorjev ne prenašaj** – ta stran se ukine.

---

## Vsebina za prenos

**Osnovni podatki**
- Sabljaški klub Ljubljana, Tržaška 132, 1000 Ljubljana
- Davčna številka: 62863282
- TRR: SI56 6100 0002 8508 162 (Delavska hranilnica)
- Kontakt: Jure Jeza, tel. 041 254 017, e-pošta: sabljanjeljubljana@gmail.com
- Facebook: https://facebook.com/sabljanjeljubljana
- Instagram: https://www.instagram.com/sabljanjeljubljana/
- Treningi: športna dvorana Aprima, Tržaška 132, Ljubljana. Nove člane vpisujemo celo leto.

Urnik, cenik in trenerje prenesi takšne, kot so spodaj; urednik jih bo po potrebi posodobil prek CMS.

**Urnik**
- Začetniki: tor 16:45–18:00, čet 16:45–18:00
- Mlajši tekmovalci: pon 17:00–18:30, tor 18:00–19:30, sre 17:00–18:30, čet 18:00–19:30
- Starejši tekmovalci: pon 18:30–20:00, sre 18:30–20:00
- Odrasli (rekreacija): pon 18:30–20:00, sre 18:30–20:00

**Cenik**
- Članarina: 15 € / sezono
- Začetniki: 1x tedensko 35 €/mesec, 2x tedensko 50 €/mesec
- Tekmovalci: 2x tedensko 50 €/mesec, 3x tedensko 60 €/mesec
- Odrasli: 1x tedensko 35 €/mesec, 2x tedensko 50 €/mesec, posamezen obisk 20 €
- Individualni treningi: 1x tedensko (30 min) ob redni vadbi 40 €/mesec, posamezen trening 20 €/30 min
- Izposoja opreme: prvi trije meseci brezplačno za nove člane; otroci začnejo s plastično opremo, odrasli s pravo opremo, ki jo posodi klub.

**Trenerji**
- **Jure Jeza** – profesor športne vzgoje (Fakulteta za šport); mentor študentom programa Športno treniranje (sabljanje); trener za meč in floret s slovensko in mednarodno licenco; mednarodni FIE sodnik za meč.
- **Eva Jeza** – diplomantka in magistrica kineziologije; vaditeljica sabljanja; mednarodna FIE sodnica za meč.

Ekipo sestavljata **samo Jure in Eva Jeza**. Drugih trenerjev s stare strani (Gaja Kores, Simona Tobias) ne prenašaj, tudi skupinske fotografije trenerjev s stare strani ne uporabljaj. Pri trenerjih pripravi prostor za portretni fotografiji (do takrat nevtralna nadomestna grafika z inicialkami).

**Strani, ki jih preberi in prenesi (besedila preoblikuj v sodoben, jedrnat slog, dejstva ohrani):**
- Klub: https://sabljanjeljubljana.weebly.com/klub.html
- Zgodovina: https://sabljanjeljubljana.weebly.com/zgodovina.html
- Oprema: https://sabljanjeljubljana.weebly.com/oprema.html
- Povezave: https://sabljanjeljubljana.weebly.com/povezave.html
- ENG (kot pomoč pri prevodu): https://sabljanjeljubljana.weebly.com/eng.html
- Urnik in cenik: `/urnik.html`, `/cenik.html`

---

## Novice – migracija

- Prenesi **vse** novice z bloga (https://sabljanjeljubljana.weebly.com/ in starejše strani prek povezave »Previous« ter mesečnih arhivov od avgusta 2013 do marca 2024) v `src/content/novice/` – ena Markdown datoteka na novico: `YYYY-MM-DD-slug.md` s frontmatter (`title`, `date`, `cover`, `excerpt`, `gallery`, `draft` + angleška polja).
- Prenesi pripadajoče slike (uporabi `_orig` različice) v `src/assets/novice/<slug>/`.
- Ohrani povezave na rezultate (fencingtimelive, eurofencing …).
- Popravi očitne tipkarske napake, vsebine ne spreminjaj.
- Stran **Novice** prikazuje novice od **1. 1. 2022 naprej**; starejše so v **Arhivu** (ista kolekcija, ločen prikaz po letu – ne podvajaj datotek). Mejo določi z eno nastavitvijo v konfiguraciji.
- Weebly ne omogoča preusmeritev, zato preusmeritev s stare strani ne pripravljaj. V README pa dodaj predlog kratkega obvestila s povezavo na novo stran, ki ga lahko ročno objavim na stari strani.

---

## Arhiv

Stran **Arhiv** z razdelki po sezonah (najnovejše zgoraj), vsak element kot kartica z naslovno sliko:

- **Galerije:** Priprave Pokljuka 2017, Državno prvenstvo za otroke in odrasle 2017, 4. Ljubljana Cup, Božična zabava 2016; Arhiv 2015/16 (DP 2016, 3. Ljubljana Cup, 16. Kup VMD, 16. Pokal Nove Gorice); Arhiv 2014/15 (Olimpijski festival, #FencingMOB15, 1. poletni sabljaški tabor, DP 2015, 2. Turnir Ljubljane, Trofej Beograda 2014, 9. Viški žabji tek); Arhiv 2013/14 (Team building Bled 2014, 1. Turnir Ljubljane, DP 2014, Božični fencing party, Otvoritev dvorane, 8. Viški žabji tek); Treningi (galerija). URL-ji so v meniju »Galerija« na stari strani.
- **Klubska liga:** Liga 2017/18, 2018/19, 2019/20 (lestvice prenesi kot HTML tabele).
- **Novice pred letom 2022.**

Galerije implementiraj kot mrežo sličic z lightboxom (npr. PhotoSwipe ali GLightbox), lazy loading. Vsako galerijo shrani kot Markdown datoteko v `src/content/arhiv/` z YAML seznamom slik, da je dodajanje nove galerije enostavno.

---

## Vzdrževanje – zahteve

- Dodajanje novice prek Pages CMS mora trajati < 5 minut: naslov, datum, slike povleci in spusti, besedilo, »Objavi«.
- Urnik, cenik, trenerji in kontakt naj bodo prav tako urejljivi prek CMS (ločeni obrazci, dvojezična polja kjer je smiselno).
- Napiši `README.md` **v slovenščini** z dvema deloma:
  1. **Za urednika (netehnično):** kako se prvič prijaviti v Pages CMS, kako dodati/popraviti novico, kako popraviti urnik in cenik, kako dodati galerijo v arhiv, koliko časa traja, da se sprememba pokaže na strani.
  2. **Za tehničnega urednika:** struktura projekta, lokalni zagon, urejanje Markdown datotek neposredno, objava na Cloudflare Pages, dodajanje uredniškega dostopa novemu uporabniku na GitHubu, dodajanje lastne domene.
- Koda naj bo preprosta: malo odvisnosti, komponente jasno poimenovane, brez nepotrebnih knjižnic.

---

## Postopek dela

1. Najprej mi predstavi načrt (struktura map, knjižnice, konfiguracija Pages CMS, Cloudflare Pages) in počakaj na potrditev.
2. Postavi projekt in osnovno postavitev (glava, noga, domača stran) – pokaži mi lokalni predogled.
3. Migriraj vsebino (strani, novice, slike, arhiv) in pripravi angleške prevode.
4. Nastavi Pages CMS in objavo na Cloudflare Pages (korake, ki zahtevajo moj račun ali prijavo, mi opiši, da jih naredim sam).
5. Preveri: Lighthouse (cilj ≥ 90 v vseh kategorijah), mobilni prikaz, kontrast zelene, delujoče povezave (brez 404) v obeh jezikih, vse slike imajo alt besedilo.
6. Na koncu mi daj povzetek, kaj je narejeno, in seznam stvari, ki jih moram potrditi ali dopolniti.

Če česa ne veš (podatek manjka ali je stara stran nejasna), me vprašaj – ne izmišljuj si podatkov o klubu.
