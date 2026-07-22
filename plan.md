# Umbau hepabaut.de: Webflow → Astro (SEO-first)

> Ziel: Die bestehende Webflow-Seite (~400 Unterseiten, programmatisch aus 3 Leistungen ×
> Orts-Liste erzeugt) 1:1 in Astro nachbauen, ohne Rankings zu verlieren, danach hart SEO-
> optimieren und mehrere neue Landingpages für Google Ads aufsetzen (Ads-Start in ~1–2 Wochen).

---

## 0. Kurzfassung / Empfehlung

Dein Aufbau ist **Programmatic SEO (pSEO)**: 3 Leistungs-Templates + eine Orts-Liste, das
Platzhalter-`[ORT]` wird überall im Text ersetzt. Das ist mit Astro **deutlich sauberer, schneller
und billiger** umsetzbar als in Webflow – und Astro liefert von Haus aus statisches HTML
(Top Core Web Vitals = Ranking-Vorteil + günstigerer Google-Ads-Quality-Score).

Vorgehen in 5 Phasen:

1. **Setup & Datenmodell** (Astro-Projekt, Orts-Liste + Leistungs-Templates als Daten)
2. **1:1-Nachbau** (identische URLs, identische Inhalte, identisches Layout)
3. **SEO-Härtung** (Structured Data, Meta-Templates, interne Verlinkung, Core Web Vitals)
4. **Launch & Migration** (URL-Mapping, 301-Redirects, Search Console, Sitemap einreichen)
5. **Ads-Landingpages + Conversion-Tracking** (DSGVO-konform, für Google Ads optimiert)

**Wichtigster Grundsatz für den 1:1-Nachbau:** URLs, Title-Tags und Meta-Descriptions **exakt**
übernehmen. Rankings hängen an der URL – ändert sie sich unkontrolliert, verlierst du Sichtbarkeit.

---

## 1. Was ich von dir brauche (Inputs)

Ich konnte die Live-Seite aus dieser Umgebung nicht crawlen (Netzwerk-Policy + Webflow-Bot-Schutz
blockieren `www.hepabaut.de`). Damit der Nachbau wirklich 1:1 wird, brauche ich von dir:

- [ ] **Webflow CMS-Export als CSV** – je Collection (Orte + ggf. Leistungen). Das ist deine
      „Wahrheit" für die ~400 Seiten. In Webflow: *CMS → Collection → Export*.
- [ ] **Webflow Code-Export (HTML/CSS)** oder Zugriff, damit ich Layout, Texte und die exakten
      URL-Slugs 1:1 übernehmen kann. Alternativ: die `sitemap.xml` als Datei hochladen.
- [ ] **Das Platzhalter-Textmuster** je Leistung: der komplette Fließtext mit `[ORT]` an den
      Stellen, wo ersetzt wird (Hero, Intro, Leistungsbeschreibung, FAQ, CTA …).
- [ ] **Marken-Assets**: Logo, Farben, Schriftarten, Bilder.
- [ ] **Kontaktdaten & Rechtstexte**: Firmenname, Adresse, Telefon, E-Mail, Impressum,
      Datenschutzerklärung.
- [ ] **Empfänger für Formulare** (an welche E-Mail sollen Anfragen gehen?).
- [ ] **Google-Zugänge** (später): Search Console, Google Analytics 4, Google Ads – oder ich
      erkläre dir das Einrichten.

> Sobald die CSV + das Textmuster da sind, kann ich die 400 Seiten **automatisch** generieren.

---

## 2. Warum Astro (und wie pSEO darin funktioniert)

- **Statisches HTML zur Build-Zeit** → schnellste Ladezeit, beste Core Web Vitals, perfekt
  crawlbar. Kein Client-JS nötig für Inhaltsseiten.
- **`getStaticPaths()`** erzeugt aus einer Datenliste beliebig viele Seiten – genau dein
  „3 Leistungen × Orte"-Muster, nur code-getrieben statt manuell im CMS gepflegt.
- **Content Collections / Datendateien** als „CMS": Orte und Leistungstexte liegen als
  CSV/JSON/TS im Repo, versioniert und leicht massenhaft editierbar.
- **`@astrojs/sitemap`, `astro:assets`** (Bildoptimierung WebP/AVIF), Head-Management,
  Structured Data – alles nativ.
- **Kostenlos hostbar** (Cloudflare Pages / Netlify / Vercel), Deploy per Git-Push.

### Das Datenmodell (Kern des Ganzen)

```
src/
  data/
    leistungen.ts        # 3 Leistungen: slug, name, meta-templates, textbausteine mit {ort}
    orte.ts / orte.csv   # Orts-Liste: name, slug, plz, bundesland, nachbarorte…
  pages/
    [leistung]/[ort].astro   # erzeugt via getStaticPaths ~400 Seiten
    index.astro              # Startseite
    impressum.astro, datenschutz.astro, kontakt.astro
  components/
    Hero.astro, LeistungBlock.astro, FAQ.astro, CTA.astro, Header.astro, Footer.astro
  layouts/
    BaseLayout.astro     # <head>, Meta, Schema, Header/Footer
```

Die Route `[leistung]/[ort].astro` bildet das kartesische Produkt (Leistung × Ort) und ersetzt
`{ort}` in allen Textbausteinen – exakt dein `[ORT]`-Prinzip, nur zentral gepflegt.

> **URL-Struktur:** Wir übernehmen 1:1 die bestehenden Slugs aus deiner Sitemap
> (z. B. `/sanierung/berlin` **oder** `/sanierung-berlin` – je nachdem, was heute live ist).
> Das ist nicht verhandelbar für den Ranking-Erhalt und wird beim ersten Schritt festgelegt.

---

## 3. SEO-Härtung („Hardcore") – Checkliste

**On-Page / technisch**
- [ ] Genau **ein `<h1>`** pro Seite, saubere Heading-Hierarchie (h2/h3).
- [ ] **Title & Meta-Description als Template** je Seite, mit Ort/Leistung befüllt und unter
      Längenlimit (Title ~60 Zeichen, Description ~155). Jede der 400 Seiten einzigartig.
- [ ] **Canonical-Tag** auf jeder Seite (self-referencing).
- [ ] **XML-Sitemap** automatisch (`@astrojs/sitemap`) + **robots.txt**.
- [ ] **Open Graph / Twitter Cards** für Social-Vorschauen.
- [ ] `lang="de"`, sprechende, konsistente Slugs.

**Structured Data (Schema.org, JSON-LD)** – großer Hebel für lokale Suche:
- [ ] `LocalBusiness` (NAP: Name, Adresse, Telefon) global.
- [ ] `Service` + `areaServed` (der jeweilige Ort) je Unterseite.
- [ ] `BreadcrumbList` für die Navigationspfade.
- [ ] `FAQPage` wo FAQ-Blöcke existieren (kann Rich Snippets bringen).

**Core Web Vitals / Performance**
- [ ] Bilder via `astro:assets` → WebP/AVIF, `width`/`height` gesetzt, `loading="lazy"`,
      Hero-Bild `fetchpriority="high"`.
- [ ] Kritisches CSS inline, Fonts self-hosted + `font-display: swap` (keine Google-Fonts-
      Requests → auch DSGVO-sicherer).
- [ ] Möglichst **null Client-JS** auf Inhaltsseiten.

**Der pSEO-Killer: Thin/Duplicate Content** ⚠️
400 fast identische Seiten sind das Hauptrisiko, dass Google sie als „doorway pages" abwertet.
Gegenmaßnahmen (in der Optimierungsphase):
- [ ] Pro Ort **echte lokale Signale** einbauen: Stadtteile/PLZ, Nachbarorte, ggf.
      Referenzen/Projekte, lokale Besonderheiten – nicht nur Name austauschen.
- [ ] Textvarianten/Bausteine rotieren, damit nicht 400× derselbe Absatz steht.
- [ ] **Interne Verlinkung**: jede Ortsseite verlinkt auf Nachbarorte + die anderen 2 Leistungen
      am selben Ort. Das verteilt Link-Equity und hilft der Indexierung massiv.
- [ ] Ehrlich priorisieren: lieber die wichtigsten Orte stark machen als 400 dünne Seiten.

---

## 4. Migration ohne Ranking-Verlust (kritischste Phase)

- [ ] **Vollständiges URL-Mapping** alt → neu aus der Sitemap erstellen. Ziel: **1:1 identisch**.
- [ ] Für jede – falls überhaupt nötige – URL-Änderung ein **301-Redirect** (kein 302).
- [ ] Title/Description/H1 pro URL gegen die alte Seite abgleichen.
- [ ] **Staging-Deploy** (Preview-URL) → Seiten stichprobenartig gegen Live prüfen.
- [ ] Domain umziehen (DNS auf neuen Host), SSL sicherstellen.
- [ ] **Google Search Console**: neue Sitemap einreichen, Abdeckung/Fehler die ersten Wochen
      täglich beobachten, Rankings monitoren.
- [ ] Alte Webflow-Seite erst nach bestätigter Indexierung abschalten.

---

## 5. Neue Landingpages + Google Ads (Ziel: Anfragen)

**Landingpages** (getrennt von den SEO-Ortsseiten, conversion-optimiert):
- [ ] Klare, einzelne Conversion (Formular + Klick-to-Call), „above the fold" ein CTA.
- [ ] Trust-Signale: Bewertungen, Zertifikate, Referenzen, Reaktionszeit, Garantie.
- [ ] Sehr schnelle Ladezeit → **besserer Quality Score → günstigere Klickpreise**.
- [ ] Message-Match: LP-Headline = Anzeigentext = Keyword der Kampagne.
- [ ] Pro Kampagne/Anzeigengruppe eine eigene LP (z. B. je Leistung + Region).

**Formular / Lead-Handling**
- [ ] Formular-Endpoint: Serverless-Function (Cloudflare/Netlify/Vercel) oder Dienst
      (Formspree/Netlify Forms) → Anfrage per E-Mail an dich + optional CRM.
- [ ] Spam-Schutz (Honeypot / hCaptcha/Turnstile – DSGVO-konform wählbar).

**Tracking & DSGVO (Pflicht in DE, sonst kein sauberes Ads-Tracking)**
- [ ] **Google Consent Mode v2** + Cookie-Banner (Opt-in), z. B. Klaro/Cookiebot/usercentrics.
- [ ] GA4 + **Google-Ads-Conversion-Tag** (Formular-Absenden & Anruf als Conversion).
- [ ] Impressum & Datenschutzerklärung aktuell (Formular, Tracking, Hosting nennen).

**Ads-Setup (parallel, kein Website-Blocker)**
- [ ] Konto/Conversions einrichten, Keyword- & Anzeigenstruktur, Budget/Gebote.
- [ ] Start, sobald ≥1 Landingpage live + Tracking verifiziert ist.

---

## 6. Empfohlener Tech-Stack

| Bereich | Wahl | Warum |
|---|---|---|
| Framework | **Astro (v5)** | statisches HTML, pSEO via `getStaticPaths`, top CWV |
| Styling | **Tailwind CSS** | schneller 1:1-Nachbau, konsistent, kleines CSS |
| Inhalte | TS/JSON/CSV-Datendateien (Content Collections) | 400 Seiten massenhaft + versioniert pflegbar |
| Bilder | `astro:assets` (Sharp) | WebP/AVIF, auto-Optimierung |
| Sitemap/SEO | `@astrojs/sitemap` + JSON-LD | Standard, wartungsarm |
| Hosting | **Cloudflare Pages** (o. Netlify/Vercel) | kostenlos, schnell, Deploy per Git-Push |
| Formular | Serverless Function / Formspree | Leads per Mail, DSGVO-steuerbar |
| Consent | Consent Mode v2 + Banner | Ads/Analytics rechtssicher |

---

## 7. Zeitplan (Richtwert, passend zum Ads-Start in 1–2 Wochen)

| Phase | Inhalt | Dauer |
|---|---|---|
| **0** | Setup: Astro-Projekt, Tailwind, Datenmodell, ein Muster-Template live | 1 Tag |
| **1** | 1:1-Nachbau: Layout + Templates + 400 Seiten generieren (nach CSV-Export) | 2–3 Tage |
| **2** | SEO-Härtung: Meta, Schema, Sitemap, interne Verlinkung, CWV | 2 Tage |
| **3** | Launch/Migration: URL-Mapping, 301, Staging-Check, Domain, Search Console | 1–2 Tage |
| **4** | Ads-Landingpages + Consent/Tracking (parallel zu 2/3 startbar) | 2–3 Tage |

> Landingpages + Tracking (Phase 4) können **parallel** laufen, damit Ads pünktlich starten,
> auch wenn die volle SEO-Optimierung (Phase 2) noch nachzieht.

---

## 8. Nächster konkreter Schritt

1. Du lädst mir **(a) den Webflow-CMS-CSV-Export der Orte** und **(b) das Platzhalter-Textmuster
   je Leistung** hoch (plus Logo/Farben/Kontaktdaten, wenn schon greifbar).
2. Ich richte das **Astro-Grundgerüst** ein und baue **eine** vollständige Beispiel-Ortsseite
   (z. B. Sanierung/[Musterort]) als abgestimmtes Template.
3. Nach deinem „passt" generiere ich alle ~400 Seiten und wir gehen in die SEO-Härtung.

**Sag mir, ob ich mit Schritt 2 (Grundgerüst + Beispielseite) schon starten soll** – dafür würden
mir schon die bloßen URL-Slugs aus der Sitemap und ein Beispieltext genügen.
