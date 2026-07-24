# CLAUDE.md — hepabaut.de

Projektleitfaden für Claude Code. Kurz, konkret, verbindlich.

## Was ist das

Umbau der bestehenden **Webflow-Seite hepabaut.de** (Bausanierung / Renovierung /
Wasserschaden im Raum Heidelberg–Mannheim–Bergstraße) nach **Astro + Tailwind**.
Kernprinzip der Seite ist **Programmatic SEO (pSEO)**: 3 Leistungs-Templates × Orts-Liste,
ein Platzhalter `{ort}` wird im Text ersetzt.

**Reihenfolge:** Erst **1:1-Nachbau** (Fonts, Farben, Abstände, Größen, Layout, Texte,
responsives Verhalten — alles identisch), danach SEO-Optimierung, danach neue Landingpages für
Google Ads. Details in `plan.md`.

## Architektur-Grundsätze (nicht verhandelbar)

1. **Jedes Template existiert genau einmal im Code.** Es gibt EINE Ortsseiten-Komponente
   (`src/pages/[leistung]/[ort].astro` + `src/components/LeistungPage.astro`), die per
   `getStaticPaths()` alle 351 Leistung×Ort-Kombinationen erzeugt. **Niemals** einzelne
   Ortsseiten von Hand anlegen oder duplizieren — neue Orte/Leistungen laufen ausschließlich
   über die Datendateien.
2. **Inhalte sind Daten, kein Code.** Orte kommen aus `src/data/orte.csv` (Slug + Anzeigename) —
   ein neuer Ort = eine neue CSV-Zeile, kein Code-Änderung. Leistungstexte (Cards, FAQ, USPs)
   liegen strukturiert in `src/data/leistungen.ts`, weil es nur 3 sind und der Inhalt tief
   verschachtelt ist (kein guter CSV-Fit).
3. **Wiederverwendbare Sections statt Copy-Paste.** UI-Bausteine (Hero, ServiceCards, USP-Grid,
   FAQ-Akkordeon, CTA, Vorher/Nachher-Slider …) sind eigene Komponenten in `src/components/`,
   die auf Start-, Übersichts- UND Ortsseiten gleich benutzt werden. Ein Layout-Fix = eine Datei
   ändern, wirkt auf alle 358 Seiten.
4. **Token-Effizienz für die künftige Pflege:** Weil Inhalt/Layout getrennt sind, braucht das
   Hinzufügen eines neuen Orts oder einer neuen Landingpage **keinen** erneuten KI-Durchlauf durch
   den ganzen Codebase — nur eine Datenzeile bzw. eine neue, kleine Seite, die bestehende
   Komponenten wiederverwendet. Beim Bauen neuer Sections: erst prüfen, ob eine bestehende
   Komponente parametrisiert werden kann, bevor eine neue entsteht.

## Ground Truth / Quellen

- `mirror-v3/` — **aktuelle, verbindliche Vorlage** für 1:1-Nachbau: HTML-Seiten (Start, 3
  Übersichten, Kontakt, Impressum, Datenschutz, je 2 Beispiel-Ortsseiten pro Leistung) **plus**
  CDN-Assets (CSS, self-hosted Fonts, Bilder/Logo/SVGs) von `cdn.prod.website-files.com` und
  `d3e54v103j8qbb.cloudfront.net`. Immer zuerst hier nachsehen — für Layout UND Design-Werte.
- `mirror/` — älterer Mirror ohne CDN-Assets, nur zur Not als Text-Fallback.
- `reference/orte.txt` — kanonische Liste aller 117 Ort-Slugs (aus der Sitemap, byte-genau).
- `reference/sitemap-urls.txt` — alle Original-URLs (Ranking-relevant, nicht verändern).
- `src/data/orte.csv` — **Datenquelle für die Ortsliste** (Slug + Anzeigename). Hier pflegen,
  nicht in `orte.ts` (die Datei lädt nur noch die CSV).

> ⚠️ Wenn eine Design-/Text-Angabe nicht im Mirror auffindbar ist, **nicht** raten/erfinden —
> beim Nutzer nachfragen. 1:1 ohne Vorlage geht nicht.

## URL-Struktur (RANKING-KRITISCH — exakt beibehalten)

```
/                         Startseite
/sanierung                Leistungs-Übersicht
/renovierung              Leistungs-Übersicht
/wasserschaden            Leistungs-Übersicht
/kontakt
/impressum
/datenschutz
/sanierung/<ort>          117 Seiten
/renovierung/<ort>        117 Seiten
/wasserschaden/<ort>      117 Seiten   ← Slug SINGULAR, ohne Umlaut ("wasserschaden")
```

Gesamt: **358 Seiten** (351 Ortsseiten + 3 Leistungsübersichten + 4 statische).
Clean URLs ohne `.html`, ohne Trailing Slash (Astro `build.format: 'directory'`).

**Regeln:**
- Slugs sind ASCII-gefaltet (`bruhl`, `buhl`, `burstadt`, `romerberg`, `neckargemund`,
  `meorlenbach`, `lutzelsachsen` …). **Nie „korrigieren"** — 1:1 aus `reference/orte.txt` /
  `src/data/orte.csv`.
- Ort-**Anzeigename** (mit Umlaut, z. B. „Brühl") ≠ Slug. Aus dem `mirror-v3/`-H1 übernehmen,
  nicht erfinden.

## Design-Fakten aus mirror-v3 (Ground Truth, verifiziert)

- **Schriftart: „Onest"** (self-hosted TTF, Gewichte 400/500/700). Liegt in
  `mirror-v3/cdn.prod.website-files.com/.../fonts/`. **Kein** Google Fonts / System-Font.
- **Farb-Tokens** (aus `:root` im Original-CSS, `hepabaut.webflow.shared.*.css`):
  - `--accent--primary-1: #06c35d` (Grün, Primär-/CTA-Farbe)
  - `--secondary--color-1: #063137` (Dunkelteal)
  - `--secondary--color-2: #f7ece1` (Creme)
  - Neutral-Skala: `--neutral--100: #fff` … `--neutral--800: #131313` (siehe CSS für alle Stufen)
  - System-Farben (Grün/Blau/Rot/Orange) für Status/Alerts vorhanden, aber im UI kaum genutzt —
    beim Nachbauen einer Section prüfen, ob sie wirklich gebraucht werden.
- **Breakpoints (Standard-Webflow):** `max-width: 479px`, `767px`, `991px`; zusätzlich
  `min-width: 768px`, `1440px`, `1920px`. Als Tailwind-Breakpoints entsprechend mappen.
- **Typo-Skala (Beispiele aus CSS):** `h1` global 54px/400, `.display-1` 60px/400 (Hero-Headlines
  nutzen die `.display-*`-Klassen, nicht das rohe `h1`). Bei jeder Section im Original-CSS die
  tatsächlich verwendete Klasse nachschlagen, nicht raten.
- Marke **HePa Baut** / juristisch **Hermann und Adam Solar GbR**. Geschäftsführer: Hermann & Adam.
- Platzhalter im Original = **„Stadtname"** bzw. **„Ihrer Stadt"** (entspricht `{ort}`).
- **Widersprüche im Original (Phase 1 bewusst 1:1 übernommen, Phase-2-Klärung):** zwei
  Telefonnummern (Hero `+49 6209 298 16 78` vs. Footer `06206 185 7728`); `info@hepasolar.de`
  (Footer) vs. `info@hepabaut.de` (Kontakt); Adresse Bürstadt (Footer) vs. Mörlenbach
  (Impressum); Lorem-ipsum in Impressum/Datenschutz/„in Zahlen"; Original nutzt Google
  Fonts/Analytics/Maps (wir: self-hosted Fonts, siehe Phase 4 für DSGVO-Tracking-Ersatz).

## Vorgehen beim CSS-Abgleich (wichtig für Token-Effizienz)

Das Original-CSS (`hepabaut.webflow.shared.*.css`) hat **~18.000 Zeilen** (voller Webflow-
Baukasten, inkl. ungenutzter Utility-Klassen). **Nicht** die ganze Datei auf einmal einlesen/
verarbeiten. Stattdessen pro Section, die gerade gebaut wird:
1. Die passende(n) Klasse(n) im HTML der entsprechenden `mirror-v3`-Seite identifizieren.
2. Gezielt nur diese Klassen im CSS nachschlagen (`grep -n "^\.klassenname"`).
3. Werte als Tailwind-Utility oder Theme-Token übernehmen — exakt, keine Rundung.

## Styling-Architektur (1:1-Nachbau — so umgesetzt)

- `src/styles/webflow.css` — aus dem Original-CSS **maschinell gepurgte** Regeln (nur benutzte
  Klassen; inkl. Normalize, @font-face, :root-Tokens, alle Media-Queries, `#w-node-…`-Grid-Regeln).
  Komponenten nutzen die **Original-Klassennamen** → garantiert Pixel-Parität.
  Werte hier nie von Hand ändern; bei Bedarf neu aus `mirror-v3` extrahieren.
- Tailwind-Utilities sind mit **`tw:`-Präfix** eingebunden (`prefix(tw)` in `global.css`), weil
  Webflow-Klassennamen mit Tailwind kollidieren (`.gap-20`: Webflow 30px vs. Tailwind 5rem!).
  Neue Komponenten/Landingpages: `tw:flex`, `tw:gap-4` …
- Original-`id="w-node-…"`-Attribute sind ranking-/layout-relevant (Grid-Placement via ID-Selektor,
  auch responsive). Beim Nachbau neuer Sections aus dem Mirror **mit übernehmen**.
- Webflow-JS wird nicht ausgeliefert. JS-Verhalten ersetzt durch: CSS-Checkbox-Toggle (Mobile-Menü,
  `Header.astro`), `<details>/<summary>` (FAQ, `FaqAccordion.astro`). Scroll-Animationen (Fade-ins)
  entfallen bewusst — Endzustand identisch.
- Icon-Fonts: Glyphen als HTML-Entities schreiben (`&#xE900;` Pfeil, `&#xE811;` FAQ-Plus,
  `&#xE810;/&#xE807;/&#xE819;` Social). Texte enthalten tw. **NBSP** (`&nbsp;`) — beim Übernehmen
  aus dem Mirror die Codepoints prüfen, sie beeinflussen Zeilenumbrüche (H1 Startseite!).
- Bilder: 1:1 unter `public/cdn/<webflow-ordner>/<originaldatei>` (Hash-Namen beibehalten).
  `srcset` der Originale wird in Phase 1 weggelassen (nur `src`) — Phase 2: `astro:assets`.
  Bekannte Original-Bugs, bewusst NICHT repliziert: EXIF-Rotation der CDN-Varianten (Projekte-
  Galerie mobil) — unser Nachbau zeigt die Fotos korrekt gedreht.

## Visuelle Verifikation (Werkzeug)

`scripts/shot.mjs` screenshottet Original (mirror-v3 via lokalem Server, Port 4323) und Nachbau
(`npm run preview`, Port 4321) und vergleicht — `W=<breite>` als Env. SRI-`integrity`-Attribute
müssen beim lokalen Original gestrippt werden (wget hat Dateien verändert). Verifiziert für die
Startseite: 1440/991/767/479/375 px pixelgleich (Restdiffs = Mirror-Artefakte: 1 kaputtes Bild
im Mirror, EXIF-Rotation).

## Tech-Stack

- **Astro v5** (statischer Output, `build.format: 'directory'` → saubere URLs), **Tailwind CSS 4**
  (`@tailwindcss/vite`, Tokens über `@theme` in `src/styles/global.css`, Utilities mit `tw:`-Präfix).
- Inhalte datengetrieben:
  - `src/data/orte.csv` — 117 Orte (Slug, Anzeigename). **Primäre Pflege-Datei.**
  - `src/data/orte.ts` — lädt `orte.csv` zur Build-Zeit (`?raw`-Import, kein Laufzeit-Dateisystem).
  - `src/data/leistungen.ts` — 3 Leistungen, Textbausteine mit `{ort}`.
  - `src/data/site.ts` — Nav, Kontakt, USPs, global wiederverwendet.
- Seiten-Generierung: `src/pages/[leistung]/[ort].astro` via `getStaticPaths()` — **einzige**
  Ortsseiten-Route für alle 351 Kombinationen.
- SEO: `@astrojs/sitemap`, JSON-LD (LocalBusiness/Service/BreadcrumbList/FAQPage),
  `astro:assets` für Bilder. Ziel: **kein Client-JS** auf Inhaltsseiten.
- Fonts self-hosted aus `mirror-v3` (kein Google-Fonts-CDN → DSGVO + Performance).

## Verzeichnisstruktur

```
src/
  data/        orte.csv, orte.ts, leistungen.ts, site.ts
  layouts/     BaseLayout.astro  (head, meta, schema, header/footer)
  components/  Header, Footer, Faq, LeistungPage, (weitere Sections nach Bedarf)
  pages/       index.astro, {sanierung,renovierung,wasserschaden}/index.astro, kontakt.astro,
               impressum.astro, datenschutz.astro, [leistung]/[ort].astro
  styles/      global.css (Tailwind-Theme: Farben, Fonts, Breakpoints aus mirror-v3)
public/        Bilder/Fonts/robots.txt
mirror-v3/     Ground-Truth-Vorlage (HTML + CDN-Assets) — nicht Teil des Builds, nur Referenz
```

## Befehle

```
npm install
npm run dev       # lokaler Dev-Server
npm run build     # statischer Build nach dist/ (aktuell 358 Seiten, grün)
npm run preview   # Build lokal prüfen
```

## Konventionen

- Sprache der Inhalte: **Deutsch**. Texte 1:1 aus `mirror-v3/` (in Phase 1 nichts umformulieren).
- Genau **ein `<h1>`** pro Seite; saubere h2/h3-Hierarchie.
- Farben/Abstände/Fonts/Größen exakt aus dem `mirror-v3`-CSS ableiten, keine „ungefähren" Werte —
  auch nicht bei Zwischenständen (lieber TODO markieren als schätzen).
- Title/Meta-Description/Canonical pro Seite exakt wie im Original (Phase 1) — erst in Phase 2
  optimieren. Hinweis: die Original-Ortsseiten setzen Title/Meta teils clientseitig (React-
  Hydration-Marker im Mirror sichtbar) — wo nicht eindeutig rekonstruierbar, im Code als TODO
  markieren statt zu raten.
- Commits klein und beschreibend. Arbeit läuft auf Branch
  `claude/hepabaut-webflow-astro-kfvssu`, Push dorthin. Kein PR ohne ausdrücklichen Wunsch.

## Aktueller Stand

- [x] `plan.md`, `CLAUDE.md`, `reference/` angelegt.
- [x] `mirror-v3/` im Repo: HTML + vollständige CDN-Assets (CSS, Onest-Fonts, Bilder/SVGs) +
      je 2 echte Ortsseiten pro Leistung zur Verifikation.
- [x] Astro + Tailwind 4 Grundgerüst; datengetriebenes Modell, Orte jetzt **CSV-basiert**.
- [x] Alle Seiten generiert & Build grün: **358 Seiten**, saubere URLs, Sitemap, JSON-LD.
- [x] Design-Tokens aus Original-CSS identifiziert (Farben, Font „Onest", Breakpoints, Typo-Skala).
- [x] **Startseite visuell 1:1** (Screenshot-Diff-verifiziert auf 5 Breakpoints): Header/Nav mit
      CSS-Mobile-Menü, Hero, Leistungs-Kacheln, USP-Grid, Projekte, Vorher/Nachher, CTA-Bänder,
      FAQ (details/summary), Footer. Wiederverwendbare Sections in `src/components/`.
- [x] **Leistungs-Übersichten + alle 351 Ortsseiten visuell 1:1**: je ein Template pro Leistung
      (`src/components/templates/{Sanierung,Renovierung,Wasserschaden}Template.astro`), das
      Übersicht (ort=null) UND Ortsseiten (`[leistung]/[ort].astro`) speist. `{ort}`-Ersetzung
      gegen mirror-Beispielseiten verifiziert. Wiederverwendbar: `LandingForm`, `UspGrid`
      (CTA-Varianten), `FaqAccordionV2`, CSS-Slider-Carousel, Erste-Hilfe-Prozess.
- [x] **Header 2 Varianten**: `overlay` (Startseite, weiße Nav über dunklem Hero) vs. `solid`
      (Innenseiten, dunkle Nav im Fluss) — `BaseLayout` prop `headerVariant`.
- [x] **Kontakt / Impressum visuell 1:1**. **Datenschutz bewusst gekürzt/angepasst** (Original
      nennt Google Fonts/Analytics/Maps, die der Nachbau NICHT nutzt → vor Launch final
      überarbeiten, siehe TODO in `datenschutz.astro`).
- [x] **Deploy-Setup**: `Dockerfile` (multi-stage node→nginx) + `nginx.conf` (clean URLs,
      Staging-`noindex`-Header — vor Prod-Launch entfernen!) + `404.astro`.
- [ ] SEO-Härtung Phase 2 / Launch Phase 3 / Ads-Landingpages Phase 4 (siehe `plan.md`).

### Offene Punkte vor echtem Launch (aus Phase 1)
- Datenschutz final (self-hosted Fonts, kein Google-Tracking → Text anpassen; Consent nur falls
  später Tracking dazukommt).
- Ortsseiten-`<title>`/`<meta>` gegen Original prüfen (Original setzt sie teils per JS).
- `nginx.conf`: `X-Robots-Tag noindex` entfernen, sobald auf der echten Domain live.
- Widersprüche im Original (2 Telefonnummern, hepasolar.de vs. hepabaut.de, Bürstadt vs.
  Mörlenbach) mit Kunde klären (aktuell 1:1 übernommen).
