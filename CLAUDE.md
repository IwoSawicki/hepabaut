# CLAUDE.md — hepabaut.de

Projektleitfaden für Claude Code. Kurz, konkret, verbindlich.

## Was ist das

Umbau der bestehenden **Webflow-Seite hepabaut.de** (Bausanierung / Renovierung /
Wasserschaden im Raum Heidelberg–Mannheim–Bergstraße) nach **Astro + Tailwind**.
Kernprinzip der Seite ist **Programmatic SEO (pSEO)**: 3 Leistungs-Templates × Orts-Liste,
ein Platzhalter `{ort}` wird im Text ersetzt.

**Reihenfolge:** Erst **1:1-Nachbau** (Fonts, Farben, Layout, Texte identisch), danach
SEO-Optimierung, danach neue Landingpages für Google Ads. Details in `plan.md`.

## Ground Truth / Quellen

- `mirror/` — lokaler wget-Download der Live-Seite. **Das ist die verbindliche Vorlage** für
  1:1-Nachbau (Layout, Farben, Fonts, Texte, exakte Slugs, Meta-Tags). Immer zuerst hier nachsehen.
- `reference/orte.txt` — kanonische Liste aller 117 Ort-Slugs (aus der Sitemap, byte-genau).
- `reference/sitemap-urls.txt` — alle Original-URLs (Ranking-relevant, nicht verändern).

> ⚠️ Wenn `mirror/` fehlt, **nicht** raten/erfinden — beim Nutzer nachfordern. 1:1 ohne Vorlage
> geht nicht.

## URL-Struktur (RANKING-KRITISCH — exakt beibehalten)

```
/                         Startseite
/renovierung              Leistungs-Übersicht (existiert; sanierung/wasserschaden haben KEINE Übersicht in der Sitemap – am mirror prüfen)
/kontakt
/impressum
/datenschutz
/renovierung/<ort>        117 Seiten
/sanierung/<ort>          117 Seiten
/wasserschaden/<ort>      117 Seiten   ← Slug SINGULAR, ohne Umlaut ("wasserschaden", nicht "wasserschaeden")
```

Gesamt: **356 Seiten** (351 Ortsseiten + 5 statische).

**Regeln:**
- Slugs sind ASCII-gefaltet (`bruhl`, `buhl`, `burstadt`, `romerberg`, `neckargemund`,
  `meorlenbach`, `lutzelsachsen` …). **Nie „korrigieren"** — 1:1 aus `reference/orte.txt`.
- Kein Trailing-Slash-Wechsel, keine Groß/Kleinschreibungs-Änderung.
- Ort-**Anzeigename** (mit Umlaut, z. B. „Brühl") ≠ Slug. Anzeigenamen aus dem `mirror/`-H1
  übernehmen, nicht erfinden.

## Tech-Stack

- **Astro v5** (statischer Output), **Tailwind CSS**.
- Inhalte datengetrieben: `src/data/leistungen.ts` (Textbausteine mit `{ort}`) +
  `src/data/orte.ts` (Slug + Anzeigename + optionale Metadaten).
- Seiten-Generierung: `src/pages/[leistung]/[ort].astro` via `getStaticPaths()` (Leistung × Ort).
- SEO: `@astrojs/sitemap`, JSON-LD (LocalBusiness/Service/BreadcrumbList/FAQPage),
  `astro:assets` für Bilder. Ziel: **kein Client-JS** auf Inhaltsseiten.
- Fonts self-hosted (kein Google-Fonts-CDN → DSGVO + Performance).

## Geplante Verzeichnisstruktur

```
src/
  data/        leistungen.ts, orte.ts
  layouts/     BaseLayout.astro  (head, meta, schema, header/footer)
  components/  Header, Footer, Hero, LeistungBlock, FAQ, CTA, …
  pages/       index.astro, renovierung/index.astro, kontakt.astro,
               impressum.astro, datenschutz.astro, [leistung]/[ort].astro
  styles/      global.css (Tailwind + Fonts + Farb-Tokens aus mirror)
public/        Bilder/Fonts/robots.txt
```

## Befehle (nach Scaffolding)

```
npm install
npm run dev       # lokaler Dev-Server
npm run build     # statischer Build nach dist/
npm run preview   # Build lokal prüfen
```

## Konventionen

- Sprache der Inhalte: **Deutsch**. Texte 1:1 aus `mirror/` (in Phase 1 nichts umformulieren).
- Genau **ein `<h1>`** pro Seite; saubere h2/h3-Hierarchie.
- Farben/Abstände/Fonts als Tailwind-Tokens aus dem `mirror/`-CSS ableiten, keine
  „ungefähren" Werte.
- Title/Meta-Description/Canonical pro Seite exakt wie im Original (Phase 1) — erst in Phase 2
  optimieren.
- Commits klein und beschreibend. Arbeit läuft auf Branch
  `claude/hepabaut-webflow-astro-kfvssu`, Push dorthin. Kein PR ohne ausdrücklichen Wunsch.

## Aktueller Stand

- [x] `plan.md`, `CLAUDE.md`, `reference/orte.txt`, `reference/sitemap-urls.txt` angelegt.
- [ ] `mirror/` im Repo verfügbar (aktuell **nicht** auf dem Branch vorhanden — vom Nutzer angefordert).
- [ ] Astro-Grundgerüst + eine abgestimmte Beispiel-Ortsseite.
- [ ] Alle 356 Seiten generiert.
- [ ] SEO-Härtung / Launch / Ads-Landingpages.
