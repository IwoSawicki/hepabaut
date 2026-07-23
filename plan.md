# Projektplan: hepabaut.de — Webflow → Astro (1:1, dann SEO)

> Ziel: Bestehende Webflow-Seite **1:1** nach **Astro + Tailwind** übernehmen (Fonts, Farben,
> Layout, Texte identisch), Rankings erhalten, danach hart SEO-optimieren und neue
> Landingpages für Google Ads bauen (Ads-Start in ~1–2 Wochen).

Ergänzend: `CLAUDE.md` (Arbeitsregeln), `reference/orte.txt` (117 Ort-Slugs),
`reference/sitemap-urls.txt` (alle 356 Original-URLs).

---

## 1. Bestandsaufnahme (aus der Sitemap gesichert)

- **Programmatic SEO:** 3 Leistungen × 117 Orte, `{ort}`-Platzhalter im Text.
- **3 Leistungen:** `sanierung`, `renovierung`, `wasserschaden`.
- **117 Orte** (Raum Heidelberg / Mannheim / Bergstraße / Odenwald / Vorderpfalz).
- **356 Seiten gesamt:** 351 Ortsseiten + Start + `/renovierung` + `/kontakt` + `/impressum`
  + `/datenschutz`.
- **URL-Muster (unverändert übernehmen):** `/<leistung>/<ort>`, Slug `wasserschaden` singular
  ohne Umlaut, Ort-Slugs ASCII-gefaltet.
- **Offen (am `mirror/` zu klären):** Gibt es Übersichtsseiten für `sanierung` und
  `wasserschaden`? In der Sitemap steht nur `/renovierung`.

---

## 2. Offener Punkt: `mirror/` fehlt im Repo ⚠️

Der Branch `claude/hepabaut-webflow-astro-kfvssu` enthält aktuell **nur** die Planungsdateien —
**kein `mirror/`-Ordner**. Für den 1:1-Nachbau (Farben, Fonts, exakte Texte, Meta-Tags) ist der
Mirror die verbindliche Vorlage.

**Bitte prüfen:**
- Wurde der Ordner auf **genau diesen Branch** gepusht? (`git branch` → sollte
  `claude/hepabaut-webflow-astro-kfvssu` sein.)
- Beim GitHub-Web-Upload: Ordner samt Inhalt hochgeladen und **committet**?
- Wurden große Dateien (>100 MB) von GitHub abgelehnt? Dann Medien vorher aussortieren
  (`--reject "*.mp4,*.mov,*.zip"`) oder als ZIP hochladen — ich entpacke es hier.

Sobald `mirror/` da ist, starte ich Phase 0/1.

---

## 3. Architektur (Astro + Tailwind)

Datengetrieben statt 400× Handarbeit — dein `{ort}`-Prinzip als Code:

```
src/
  data/
    orte.ts          # [{ slug, name }]  (name = Anzeigename mit Umlaut, aus mirror)
    leistungen.ts    # 3 Leistungen: slug, name, title/meta-Template, Textbausteine mit {ort}
  layouts/BaseLayout.astro      # <head>, Meta, Canonical, JSON-LD, Header/Footer
  components/                    # Hero, LeistungBlock, FAQ, CTA, Header, Footer …
  pages/
    index.astro
    renovierung/index.astro      # (+ ggf. sanierung/, wasserschaden/ – je nach mirror)
    kontakt.astro, impressum.astro, datenschutz.astro
    [leistung]/[ort].astro       # getStaticPaths(): Leistung × Ort = 351 Seiten
  styles/global.css              # Tailwind + self-hosted Fonts + Farb-Tokens aus mirror
public/                          # Bilder, Fonts, robots.txt
```

`[leistung]/[ort].astro` erzeugt via `getStaticPaths()` das kartesische Produkt und ersetzt
`{ort}` in allen Bausteinen — exakt dein Webflow-CMS-Prinzip, nur zentral und versioniert.

**Farben & Fonts:** werden aus dem `mirror/`-CSS ausgelesen und als Tailwind-Theme-Tokens
hinterlegt (keine „ungefähren" Werte). Fonts self-hosted.

---

## 4. Phasenplan

### Phase 0 — Setup (nach `mirror/`)
- [ ] Astro + Tailwind initialisieren, `@astrojs/sitemap`, Sharp.
- [ ] Farb-/Font-Tokens + globale Styles aus `mirror/`-CSS ableiten.
- [ ] Header/Footer als Komponenten (aus mirror).

### Phase 1 — 1:1-Nachbau
- [ ] `orte.ts` mit Slug + **Anzeigename** (Anzeigenamen aus mirror-H1s ziehen).
- [ ] `leistungen.ts`: Textbausteine je Leistung mit `{ort}` (Texte 1:1 aus mirror).
- [ ] `[leistung]/[ort].astro` → 351 Seiten generieren.
- [ ] Statische Seiten: Start, `/renovierung`(+ggf. weitere Übersichten), Kontakt,
      Impressum, Datenschutz — Inhalt 1:1.
- [ ] Title/Meta/Canonical je Seite exakt wie Original.
- [ ] Visueller Abgleich Original vs. Nachbau (Stichproben je Leistung + mehrere Orte).

### Phase 2 — SEO-Härtung
- [ ] JSON-LD: LocalBusiness, Service + `areaServed`, BreadcrumbList, FAQPage.
- [ ] `@astrojs/sitemap` + `robots.txt`, OG/Twitter-Cards.
- [ ] Core Web Vitals: `astro:assets` (WebP/AVIF, width/height, lazy), kritisches CSS inline,
      Fonts `font-display:swap`, null Client-JS auf Inhaltsseiten.
- [ ] Interne Verlinkung: jede Ortsseite → Nachbarorte + andere 2 Leistungen am selben Ort.
- [ ] Thin-Content entschärfen: pro Ort echte lokale Signale/Textvarianten (nicht nur Name tauschen).

### Phase 3 — Launch / Migration (Ranking-Erhalt)
- [ ] URL-Mapping alt→neu = 1:1 (Abgleich gegen `reference/sitemap-urls.txt`).
- [ ] 301-Redirects nur falls unvermeidbar; Staging-Preview prüfen.
- [ ] Hosting (Cloudflare Pages / Netlify / Vercel), Domain/DNS, SSL.
- [ ] Search Console: neue Sitemap einreichen, Abdeckung/Rankings beobachten; alte Seite erst
      nach bestätigter Indexierung abschalten.

### Phase 4 — Ads-Landingpages (parallel möglich, damit Ads pünktlich starten)
- [ ] Conversion-fokussierte LPs (Formular + Klick-to-Call, Trust-Signale, Message-Match).
- [ ] Formular-Endpoint (Serverless/Formspree) → Anfrage per E-Mail + Spam-Schutz.
- [ ] DSGVO: Consent Mode v2 + Cookie-Banner, GA4 + Google-Ads-Conversion-Tag.

---

## 5. Zeitplan (Richtwert)

| Phase | Inhalt | Dauer |
|---|---|---|
| 0 | Setup, Farben/Fonts, Header/Footer | 1 Tag |
| 1 | 1:1-Nachbau + 356 Seiten | 2–3 Tage |
| 2 | SEO-Härtung | 2 Tage |
| 3 | Launch/Migration | 1–2 Tage |
| 4 | Ads-Landingpages + Tracking (parallel zu 2/3) | 2–3 Tage |

---

## 6. Nächster Schritt

1. **`mirror/` auf den Branch bringen** (siehe Abschnitt 2).
2. Ich lese Farben/Fonts/Texte/Meta aus, baue **eine** Beispiel-Ortsseite
   (`sanierung/<musterort>`) zur Abstimmung.
3. Nach deinem „passt" → alle 356 Seiten + Phase 2.
