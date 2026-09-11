// Daten für Google-Ads-Landingpages (dediziert, NICHT für SEO — /angebot/* ist noindex + nicht
// in der Sitemap). Erste Kampagne: „Badsanierung + Ort". Neue Orte = neue Zeile in badsanierungTowns.
//
// Grundsatz Ads-LP: 1 Ziel (Anfrage), Message-Match zur Anzeige, kein Menü-Ablenken, Trust oben,
// Formular above the fold, Klick-to-Call prominent. Conversions: Formular + Telefon/WhatsApp.

export interface AdsTown {
  slug: string; // ASCII-Slug (URL): /angebot/badsanierung-<slug>
  name: string; // Anzeigename (mit Umlaut)
}

/** Kernorte für die Badsanierung-Kampagne. Weinheim = Heimat/Referenz → zuerst. */
export const badsanierungTowns: AdsTown[] = [
  { slug: 'weinheim', name: 'Weinheim' },
  { slug: 'mannheim', name: 'Mannheim' },
  { slug: 'heidelberg', name: 'Heidelberg' },
  { slug: 'viernheim', name: 'Viernheim' },
  { slug: 'bensheim', name: 'Bensheim' },
  { slug: 'ludwigshafen', name: 'Ludwigshafen' },
];

export interface AdsBenefit {
  title: string;
  text: string;
}
export interface AdsStep {
  title: string;
  text: string;
}
export interface AdsFaq {
  q: string;
  a: string; // darf {ort} enthalten
}

/** Inhalt der Badsanierung-LP. {ort} wird pro Ort ersetzt. */
export const badsanierung = {
  // Message-Match: exakt das Keyword der Anzeige.
  h1Template: 'Badsanierung in {ort} – alles aus einer Hand',
  subline:
    'Vom alten Bad zum Traumbad: Planung, Fliesen, Sanitär, Elektrik & Trockenbau – ein Ansprechpartner, ein Festpreis, saubere Ausführung.',
  titleTemplate: 'Badsanierung {ort} | Festpreis & Termintreu | HePa Baut',
  metaDescriptionTemplate:
    'Badsanierung in {ort} vom Fachbetrieb: komplett aus einer Hand, Festpreis, termintreu & sauber. Kostenlose Vor-Ort-Beratung – jetzt Angebot anfordern.',
  formTitle: 'Kostenloses Angebot für Ihre Badsanierung',
  // Vertrauens-„Badges" unter dem Hero (kurz, scanbar).
  trustBadges: [
    'Kostenlose Vor-Ort-Beratung',
    'Festpreis-Garantie',
    'Alles aus einer Hand',
    'Termintreu & sauber',
  ],
  benefitsHeading: 'Ihr neues Bad – ohne Stress und Koordinationschaos',
  benefits: [
    {
      title: 'Alle Gewerke aus einer Hand',
      text: 'Fliesen, Sanitär, Elektrik, Trockenbau, Malerarbeiten – wir koordinieren alles. Sie haben nur einen Ansprechpartner statt fünf Handwerker.',
    },
    {
      title: 'Fester Preis, feste Termine',
      text: 'Nach der Besichtigung erhalten Sie ein transparentes Festpreis-Angebot und einen verbindlichen Zeitplan. Keine bösen Überraschungen.',
    },
    {
      title: 'Sauber & wohnbegleitend',
      text: 'Wir arbeiten staubarm, schützen Ihre Wohnung und hinterlassen die Räume besenrein. Eine übliche Badsanierung dauert ca. 1–2 Wochen.',
    },
    {
      title: 'Regional & zuverlässig',
      text: 'Als Handwerksbetrieb aus der Region sind wir schnell bei Ihnen in {ort} – erreichbar per Telefon, WhatsApp und E-Mail.',
    },
  ] as AdsBenefit[],
  processHeading: 'So läuft Ihre Badsanierung ab',
  steps: [
    { title: '1. Kostenlose Beratung', text: 'Sie schildern uns Ihr Vorhaben. Wir kommen zur unverbindlichen Besichtigung nach {ort} und messen auf.' },
    { title: '2. Festpreis-Angebot', text: 'Sie erhalten ein transparentes Angebot mit klarem Leistungsumfang und Zeitplan.' },
    { title: '3. Umsetzung', text: 'Wir sanieren Ihr Bad – termingerecht, sauber und mit allen Gewerken aus einer Hand.' },
    { title: '4. Übergabe', text: 'Endkontrolle gemeinsam mit Ihnen. Erst wenn alles passt, ist der Auftrag für uns erledigt.' },
  ] as AdsStep[],
  faqHeading: 'Häufige Fragen zur Badsanierung',
  faq: [
    { q: 'Was kostet eine Badsanierung in {ort}?', a: 'Das hängt von Größe, Ausstattung und Zustand ab. Ein kleines Gäste-WC ist deutlich günstiger als ein komplettes Familienbad mit Bodengleicher Dusche. Nach einer kostenlosen Vor-Ort-Besichtigung erhalten Sie ein transparentes Festpreis-Angebot – ohne versteckte Kosten.' },
    { q: 'Wie lange dauert eine Badsanierung?', a: 'Eine komplette Badsanierung dauert in der Regel 1–2 Wochen, je nach Umfang. Vor Beginn erhalten Sie einen verbindlichen Zeitplan, an den wir uns halten.' },
    { q: 'Übernehmt ihr wirklich alle Gewerke?', a: 'Ja. Wir koordinieren Fliesenleger, Sanitär, Elektrik, Trockenbau und Maler – Sie haben nur einen Ansprechpartner. Das spart Ihnen Zeit, Nerven und Abstimmungsaufwand.' },
    { q: 'Ist die Beratung wirklich kostenlos?', a: 'Ja – die Vor-Ort-Besichtigung und das Angebot in {ort} sind für Sie kostenlos und unverbindlich.' },
    { q: 'Kann ich das Bad während der Sanierung nutzen?', a: 'Während einer Komplettsanierung ist das Bad nicht nutzbar. Wir planen die Arbeiten aber so kompakt wie möglich und besprechen mit Ihnen im Vorfeld, wie Sie die Zeit überbrücken.' },
  ] as AdsFaq[],
} as const;

/** Ersetzt {ort} in einem Textbaustein. */
export function withOrt(template: string, ort: string): string {
  return template.replaceAll('{ort}', ort);
}
