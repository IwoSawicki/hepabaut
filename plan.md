# Projektplan: hepabaut.de — Webflow → Astro (1:1, dann SEO)

> Ziel: Bestehende Webflow-Seite **pixelgenau 1:1** nach Astro + Tailwind übernehmen (Fonts,
> Farben, Abstände, Größen, Layout, Texte, responsives Verhalten), Rankings erhalten, danach hart
> SEO-optimieren und neue Landingpages für Google Ads bauen. Architektur: **ein Template pro
> Leistung, datengetrieben (CSV), maximal wiederverwendbare Sections** — Pflege und künftige
> Erweiterung sollen möglichst wenig Aufwand (und künftig möglichst wenig KI-Tokens) kosten.

Ergänzend: `CLAUDE.md` (verbindliche Architektur- und Arbeitsregeln), `src/data/orte.csv`
(Ortsliste), `reference/` (Sitemap-Fakten).

---

## 1. Stand heute

**Fertig:**
- Astro 5 + Tailwind 4 Grundgerüst, Build grün, **358 Seiten** (351 Ort + 3 Übersicht + Home +
  Kontakt + Impressum + Datenschutz).
- **Ein** Ortsseiten-Template (`[leistung]/[ort].astro` + `LeistungPage.astro`) erzeugt alle 351
  Kombinationen per `getStaticPaths()` — keine Datei pro Ort.
- Orte-Datenquelle auf **CSV umgestellt** (`src/data/orte.csv`): neuer Ort = eine Zeile, kein Code.
- Texte 1:1 aus dem Mirror extrahiert (Sanierung/Renovierung/Wasserschaden/Home/Kontakt/
  Impressum/Datenschutz).
- SEO-Grundgerüst: saubere URLs (kein `.html`), Canonical, Sitemap, JSON-LD (LocalBusiness/
  Service/Breadcrumb/FAQPage).
- `mirror-v3/` mit **vollständigen CDN-Assets** (CSS, Onest-Fonts, Bilder, Logo, SVGs) + echten
  Beispiel-Ortsseiten liegt jetzt vor — Design-Fakten daraus bereits gesichert (siehe `CLAUDE.md`:
  Farb-Tokens, Schriftart „Onest", Breakpoints, Typo-Skala).

**Offen:** Das eigentliche **visuelle 1:1** — Design-Tokens und Original-Werte sind identifiziert,
aber noch nicht in Komponenten/Styles eingebaut. Das ist der nächste Arbeitsblock.

---

## 2. Architektur-Prinzipien (aus deinem Feedback, jetzt verbindlich in CLAUDE.md)

1. **Ein Template pro Leistungstyp**, nie einzelne Ortsseiten von Hand. ✅ bereits so gebaut.
2. **CSV/Daten statt Code** für alles, was sich wiederholt (Orte). ✅ umgesetzt. Leistungstexte
   bleiben strukturiert in TS (3 Stück, tief verschachtelt — kein guter CSV-Fit), aber ebenfalls
   strikt getrennt von Layout.
3. **Wiederverwendbare Sections**: Hero, ServiceCards, USP-Grid, FAQ-Akkordeon, CTA,
   Vorher/Nachher-Slider etc. als eigene Komponenten, die auf allen Seiten gleich benutzt werden.
4. **Token-Effizienz für die Zukunft**: Neuer Ort = 1 CSV-Zeile. Neue Landingpage = neue kleine
   Seite, die bestehende Sections wiederverwendet. Kein erneutes „Durchbauen" der ganzen Seite
   nötig — genau das reduziert künftigen Aufwand (manuell wie mit KI-Unterstützung).

---

## 3. Wie wir jetzt vorgehen: Section-für-Section-Nachbau

Statt das komplette ~18.000-Zeilen-Original-CSS auf einmal zu verarbeiten (ineffizient und
fehleranfällig), gehen wir **Seite für Seite, Section für Section** vor — mit der Startseite
zuerst:

### Schritt 1 — Design-Fundament (einmalig, für alle Seiten)
- [ ] Onest-Fontdateien aus `mirror-v3` nach `public/fonts/` kopieren, `@font-face` in
      `global.css` einbinden (400/500/700).
- [ ] Echte Farb-Tokens (`--accent--primary-1`, `--secondary--color-1/2`, Neutral-Skala) als
      Tailwind-`@theme`-Variablen übernehmen.
- [ ] Breakpoints (479/767/991/1440/1920) in Tailwind-Konfiguration abbilden.
- [ ] Basis-Typo (Body-Größe/Zeilenhöhe, `.display-*`-Skala) übernehmen.

### Schritt 2 — Startseite, Section für Section
Für jede Section auf `/`: exakte Klasse(n) im `mirror-v3`-HTML identifizieren → gezielt im
Original-CSS nachschlagen → als Astro-Komponente + Tailwind-Utilities nachbauen → mit dem
Original nebeneinander (Screenshot/Browser) vergleichen.
- [ ] Header/Navigation (Logo, Menü, „Rückruf vereinbaren"-Button)
- [ ] Hero (Headline, Subline, CTA-Buttons)
- [ ] „Warum HepaBaut" USP-Grid
- [ ] Leistungs-Kacheln (Sanierung/Renovierung/Wasserschäden)
- [ ] Vorher/Nachher-Bereich
- [ ] Testimonial
- [ ] FAQ-Akkordeon
- [ ] CTA-Sektion
- [ ] Footer

Diese Sections werden als **wiederverwendbare Komponenten** gebaut (nicht Homepage-spezifisch
verdrahtet), damit Übersichts- und Ortsseiten sie direkt weiterverwenden.

### Schritt 3 — Übersichts- & Ortsseiten mit denselben Sections
- [ ] `/sanierung`, `/renovierung`, `/wasserschaden` mit den fertigen Sections zusammensetzen.
- [ ] Eine Ortsseite (`/sanierung/heidelberg`) 1:1 gegen `mirror-v3` prüfen → Template gilt dann
      automatisch für alle 351 Kombinationen.

### Schritt 4 — Kontakt / Impressum / Datenschutz
- [ ] Formularlayout, Legal-Texte visuell 1:1.

### Schritt 5 — Responsive- & Detail-Check
- [ ] Alle Breakpoints durchgehen (Mobile/Tablet/Desktop/große Screens), gegen Original abgleichen.
- [ ] Bilder optimiert einbinden (`astro:assets`, WebP/AVIF, richtige `width`/`height`).

*(Phasen 2–4 aus dem ursprünglichen Plan — SEO-Härtung, Migration/Launch, Ads-Landingpages —
bleiben wie zuvor beschrieben, folgen nach dem visuellen 1:1. Kurzfassung unten.)*

---

## 4. Spätere Phasen (Kurzfassung, Details bei Bedarf wieder ausführlich)

- **Phase SEO-Härtung:** interne Verlinkung (Nachbarorte, andere Leistungen am selben Ort),
  Thin-Content-Vermeidung, OG-Tags, Core-Web-Vitals-Feinschliff.
- **Phase Launch:** URL-Abgleich gegen `reference/sitemap-urls.txt`, Hosting-Setup, Search
  Console, alte Seite erst nach bestätigter Indexierung abschalten.
- **Phase Ads-Landingpages:** neue, conversion-fokussierte Seiten aus denselben Sections gebaut,
  Formular-Endpoint, DSGVO-Consent, Tracking.

---

## 5. Nächster Schritt

**Wir starten mit Schritt 1 (Design-Fundament) + Schritt 2 (Startseite, Section für Section).**
Ich baue nacheinander die einzelnen Sections der Startseite, jeweils mit den echten Werten aus
`mirror-v3`, und wir schauen uns das Ergebnis zwischendurch an (Dev-Server/Screenshots). Sag
kurz „los geht's", dann fange ich mit Header + Hero an.
