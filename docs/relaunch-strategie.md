# HePa Baut – Relaunch-Strategie (SEO + Ads)

Grundlage: echte Google-Search-Console-Daten (Export 09/2026) + Migration Webflow → Astro.
Ziel des Projekts (intern, Stolz Marketing): Referenz-Vorzeigeprojekt + Anfragen gewinnen →
Upsell Betreuung (750 €+/Monat), später Recruiting etc.

---

## 1. Datenbasis (was die GSC wirklich zeigt)

- Google kennt aktuell nur **~49 URLs** (14 indexiert, 35 nicht) — **nicht** die ~450.
  Größter Nicht-Index-Grund: **„Gecrawlt – zurzeit nicht indexiert" (30)** = algorithmischer
  Thin-Content-Filter, **keine** manuelle Doorway-Strafe. Voll reversibel.
- **Nachfrage-Muster:** immer `[Leistung] + [Ort]`. Beispiele (Impressionen):
  haussanierung mannheim (38), betonsanierung mannheim (38), altbausanierung mannheim (34),
  renovieren mannheim (29), fassade mannheim (17), bausanierung walldorf (7),
  wohnungsrenovierung mannheim (6), innenausbau mannheim (6), hausanbau heidelberg (6),
  wohnungssanierung mannheim (5), sanierung mannheim (4), hausumbau/hausrenovierung heidelberg …
- **Top-Orte nach Nachfrage:** Mannheim (klar #1), Heidelberg, Walldorf, Neckargemünd, Bürstadt,
  Weinheim-Umland. Viele Fern-Orte (Rottenburg, Marbach, Rutesheim …) sind irrelevant → ignorieren.
- **Bereits Erfolge (URL behalten!):** `/sanierung/worms` (Pos 1,5), `/sanierung/gaiberg` (5,3),
  `/sanierung/neckargemund` (2 Klicks), Homepage (Pos 9,6 / CTR 12,5 %), `/renovierung` (Pos 5,8).
- **Wasserschaden:** 0 Nachfrage in den Daten → als SEO-Säule streichen (nur als Unterpunkt/
  Ads-Thema behalten).

### ⚠️ Wichtig: GSC ist ein Blind Spot, kein Marktvolumen

Die GSC-Zahlen sind eine **Untergrenze**, nicht das echte Suchvolumen. Zwei Effekte:

1. **Nur Queries, für die wir schon ranken, tauchen auf.** Für „Badsanierung Weinheim" stehen wir
   bei ~0 % → **kein Datenpunkt**, obwohl das Keyword stark gesucht wird. „Fehlt in GSC" ≠
   „wird nicht gesucht". Neue Keyword-Felder (z. B. Badsanierung) sind in den Daten unsichtbar,
   aber real und wertvoll — sie zu besetzen erschließt komplett neuen, kaufstarken Traffic.
2. **Impressionen sind nach unten verzerrt.** Eine Impression zählt erst, wenn die Position
   tatsächlich gerendert wird. Auf Seite 2/3 passiert das nur, wenn jemand dorthin scrollt
   (< 1 % der Sucher). Unsere 30–40 Impressionen bei Position ~15–20 entsprechen daher einem
   echten Suchvolumen, das leicht **20–50× höher** liegt.

**Konsequenz:** Architektur an echten Such-Intents ausrichten (Keyword-Recherche + Branchenlogik),
NICHT nur an dem, wo wir zufällig schon schwach ranken. Badsanierung ist genau so ein
verborgenes Feld → deshalb erste Ads-Landingpage. Für die SEO-Priorisierung heißt das:
GSC-Daten als „warmen Startpunkt" nutzen, aber bewusst neue Money-Keywords ergänzen.

---

## 2. Leistungs-Logik (Sanierung vs. Renovierung vs. …)

- **Sanierung** = Mängel/Substanz beheben (Altbau, Bad, Kern, Feuchte). **Renovierung** =
  optische Auffrischung (Malern, Boden, Tapete). Kunden **trennen das nicht** — sie suchen nach
  dem **Ergebnis** („haus sanieren", „wohnung renovieren", „altbau sanieren", „bad renovieren").
- **Konsequenz:** NICHT nach vagen Kategorien („Sanierung"/„Renovierung") strukturieren, sondern
  nach **konkreten Such-Intents** (= Keywords, die Leute wirklich tippen).

---

## 3. Neue Architektur (Vorschlag) — intent-/keyword-getrieben

**Weg von** 3 vage Kategorien × 117 Orte = 351 dünne Seiten.
**Hin zu** wenigen, starken Seiten entlang echter Suchintents × 5–10 Kernorten (mit echten Projekten).

**A) Leistungs-Pillars** (je 1 starke Seite, nach Suchvolumen):
- Altbausanierung
- Badsanierung
- Wohnungs-/Hausrenovierung
- Kern-/Komplettsanierung
- Fassade & Dämmung
- (Bauunternehmen/Generalunternehmer — Dach-Pillar, da HePa breiter ist)
- Wasserschadensanierung — 1 Seite, niedrige SEO-Prio (evtl. Ads-Notdienst)

**B) Kernorte (5–10, vom Kunden bestätigen):** Mannheim, Heidelberg, Weinheim (Heimat/Referenz!),
Viernheim, Bürstadt, Ludwigshafen, Schwetzingen, Walldorf, Lampertheim, Bensheim.

**C) „Money"-Kombis** = Leistung × Ort NUR wo Nachfrage **und** nachweisbares Projekt existiert,
z. B. „Altbausanierung Mannheim", „Badsanierung Heidelberg", „Bauunternehmen Weinheim".
→ Lieber 15–30 richtig gute Kombi-Seiten als 351 leere.

**D) Jede Orts-/Kombi-Seite braucht (sonst nicht bauen):**
echten lokalen Text · 1–2 reale Projekte (Vorher/Nachher) · Kundenstimme · interne Links zu
Nachbarorten & verwandten Leistungen · ort-spezifische FAQ.

**Priorisierung (Reihenfolge Rollout):** 1. Mannheim, 2. Heidelberg, 3. Weinheim, dann Walldorf/
Neckargemünd/Bürstadt … — in Wellen, nur „stolze" Seiten in die Sitemap.

---

## 4. Kunden-Meeting – was einsammeln (Content-Brief)

Pro **Kernort** (5–10 Städte, die der Kunde nennt):
- [ ] Bedient ihr den Ort aktiv? (nur dann Seite bauen)
- [ ] 1–3 **reale Projekte** dort/in der Nähe: Vorher/Nachher-Fotos, Art (z. B. Badsanierung,
      Altbau), kurzer 2–3-Sätze-Ablauf, ggf. Straße/Stadtteil
- [ ] 1 **Kundenstimme** (Name/Kürzel + Ort) — sehr wertvoll
- [ ] Besonderheiten des Orts (typische Bausubstanz, Stadtteile)

Allgemein:
- [ ] Welche **Leistungen** sind die profitabelsten / gewünschten? (Fokus danach ausrichten)
- [ ] **Echte Google-Bewertungen** (Anzahl + Sterne) für Trust-Elemente
- [ ] Team-/Inhaberfoto (Hermann & Adam) für Vertrauen
- [ ] Einzugsgebiet/Radius (für „Wir arbeiten in …")

---

## 5. Google Ads – Vorgehen & Maximum rausholen

**Grundsatz:** Ads = sofortiger Traffic, während SEO wächst. Getrennt vom SEO-Umbau startbar.

- **Dedizierte Landingpages** pro Kampagne (NICHT Homepage): Message-Match Anzeige = LP-Headline.
  Schnell, ein klares Ziel (Formular + Klick-to-Call), Trust-Signale, kein Menü-Ablenken.
- **Startkampagnen (hohe Kaufabsicht, lokal):**
  - Search: „badsanierung weinheim/mannheim", „altbausanierung mannheim", „wohnungsrenovierung
    heidelberg", „bauunternehmen weinheim".
  - Optional **Wasserschaden-Notdienst** (Emergency, hohe Conversion, obwohl SEO-schwach).
- **Conversion-Tracking = Pflicht** (sonst Budget-Verbrennung + kein Upsell-Nachweis!):
  GA4 + Google-Ads-Conversion-Tag; als Conversions zählen: **Formular-Absenden UND Klicks auf
  Telefon/WhatsApp** (die Sticky-Buttons!).
- **DSGVO:** Sobald Ads/GA-Tracking läuft → **Consent Mode v2 + Cookie-Banner Pflicht**
  (aktuell ohne Tracking = kein Banner nötig).
- Anzeigenerweiterungen: Anruf, Standort, Lead-Formular. Klein starten, messen, skalieren.

**Was ich dafür von dir brauche:** GA4-Measurement-ID, Google-Ads-Conversion-ID/-Label,
Wahl des Consent-Tools (z. B. Cookiebot/Usercentrics/Klaro), Ziel-Keywords/Budget.

---

## 6. Nächste Schritte

1. **Kunden-Meeting** → Kernorte + reale Projekte + Bewertungen (Brief oben).
2. Architektur final festlegen (Pillars + Kombis), dann **bauen** (datengetrieben, wiederverwendbar).
3. Parallel: **1 Ads-Landingpage** + Tracking/Consent aufsetzen → früh Anfragen + ROI-Nachweis.
4. Rollout in Wellen, Sitemap nur mit Qualitätsseiten, GSC „Indexierung beantragen".
5. Upsell-Story: Tracking zeigt Leads → rechtfertigt die 750 €/Monat-Betreuung.
