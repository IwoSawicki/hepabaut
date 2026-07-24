// Leistungs-Templates (Textbausteine 1:1 aus mirror/). Platzhalter {ort} wird pro Ortsseite ersetzt
// (im Original war das "Stadtname" / "Ihrer Stadt"). Slugs ranking-kritisch: sanierung, renovierung,
// wasserschaden (singular, ohne Umlaut).
//
// TODO(Phase 1): title/metaDescription der ECHTEN Ortsseiten gegen mirror abgleichen, sobald die
// /<leistung>/<ort>-Seiten heruntergeladen sind (waren im ersten Mirror nicht enthalten).

export interface FaqItem {
  q: string;
  a: string;
}
export interface ServiceCard {
  title: string;
  text: string; // darf {ort} enthalten
}
export interface EmergencyStep {
  title: string;
  text: string;
  tip?: string;
}
export interface Leistung {
  slug: 'sanierung' | 'renovierung' | 'wasserschaden';
  name: string; // Anzeigename
  titleTemplate: string; // {ort} -> Ortsname
  metaDescriptionTemplate: string;
  heroH1Template: string;
  heroSubline: string;
  heroLead: string;
  heroCtaLabel: string;
  leistungenHeading: string;
  leistungenIntro: string;
  cards: ServiceCard[];
  bullets?: string[];
  emergency?: { heading: string; steps: EmergencyStep[] };
  faqHeading?: string;
  faq: FaqItem[];
}

export const leistungen: Leistung[] = [
  {
    slug: 'sanierung',
    name: 'Sanierung',
    titleTemplate: 'Sanierung {ort} – HePa Baut',
    metaDescriptionTemplate:
      'Professionelle Teil- & Komplettsanierungen in {ort}: Altbau-, Bäder-, Kern- und Haussanierung. Ihr regionaler Handwerker – zuverlässig & termintreu.',
    heroH1Template: 'Sanierungen in {ort}',
    heroSubline: 'Zuverlässig & ohne Kopfschmerzen',
    heroLead:
      'Professionelle Teil- & Komplettsanierungen von Wohnungen, Häusern und Gewerbeobjekten. Wir sind Ihr regionaler Handwerker.',
    heroCtaLabel: 'Kontaktformular',
    leistungenHeading: 'Unsere Leistungen',
    leistungenIntro: '',
    cards: [
      { title: 'Altbausanierung', text: 'Aus alt wird neu: Wir machen Ihr Haus zukunftsfähig und wohnlich. Ihre Experten für Altbausanierung.' },
      { title: 'Bädersanierung', text: 'Ihr neues Traumbad? Mit uns gelingt die Badsanierung stressfrei und sauber.' },
      { title: 'Kernsanierung', text: 'Wir übernehmen die komplette Kernsanierung – professionell koordiniert und fachgerecht umgesetzt.' },
      { title: 'Haussanierung', text: 'Von Schönheitsreparaturen bis Komplettumbau – Wohnungssanierung mit System.' },
    ],
    faqHeading: 'Oft gestellte Fragen zu Sanierungen',
    faq: [
      { q: 'Was genau fällt unter eine Sanierung?', a: 'Bei einer Sanierung werden bauliche oder technische Mängel behoben – dazu zählen z. B. neue Leitungen, Dämmung, Fenster, Bodenaufbau oder die Erneuerung der Bausubstanz. Oft geht sie tiefer als eine Renovierung und erfordert Fachwissen.' },
      { q: 'Wie lange dauert eine Sanierung?', a: 'Die Dauer hängt stark vom Umfang ab. Eine Badsanierung dauert ca. 1–2 Wochen, eine komplette Wohnungssanierung 3–6 Wochen. Vor Beginn erhalten Sie einen klaren Zeitplan.' },
      { q: 'Übernehmt ihr auch die komplette Altbausanierung?', a: 'Ja – wir sind auf Altbausanierungen spezialisiert. Dabei kümmern wir uns um Elektrik, Dämmung, Trockenbau, Böden, Wände, Bad und Küche. Alles wird auf Wunsch moderner Standard angepasst – unter Berücksichtigung der Altbausubstanz.' },
      { q: 'Ist eine Besichtigung vor Ort notwendig?', a: 'Ja – um ein realistisches Angebot erstellen zu können, ist eine Vor-Ort-Besichtigung notwendig. Sie ist für Sie kostenlos und unverbindlich.' },
      { q: 'Könnt ihr auch eine Kernsanierung übernehmen?', a: 'Ja, wir übernehmen vollständige Kernsanierungen inklusive Entkernung, Abbruch, Neubauplanung und Umsetzung – inklusive Koordination aller Gewerke.' },
      { q: 'Wie finde ich heraus, ob mein Haus sanierungsbedürftig ist?', a: 'Typische Hinweise sind: Feuchtigkeitsschäden, marode Leitungen, alte Fenster, hohe Heizkosten, Schimmel oder Risse im Mauerwerk. Wir beraten Sie gern, was sinnvoll und wirtschaftlich ist.' },
    ],
  },
  {
    slug: 'renovierung',
    name: 'Renovierung',
    titleTemplate: 'Renovierung {ort} – HePa Baut',
    metaDescriptionTemplate:
      'Renovierung in {ort}: Maler- und Tapezierarbeiten, Bodenverlegung, Schönheitsreparaturen und Fenster-/Türeinbau. Professionell & ohne Kopfschmerzen.',
    heroH1Template: 'Renovierung in {ort}',
    heroSubline: 'Professionell & ohne Kopfschmerzen',
    heroLead: '',
    heroCtaLabel: 'Angebot sichern',
    leistungenHeading: 'Unsere Leistungen',
    leistungenIntro:
      'Ob akuter Wasserschaden oder schon länger bestehende Feuchtigkeit – wir kümmern uns um die fachgerechte Trocknung, Sanierung und Wiederherstellung.',
    cards: [
      { title: 'Maler- und Tapezierarbeiten', text: 'Maler- und Tapezierarbeiten in {ort} – schnell, sauber und professionell.' },
      { title: 'Boden verlegen / Bodenrenovierung', text: 'Neuer Boden – neues Wohngefühl. Fachgerechte Verlegung inklusive Untergrundvorbereitung.' },
      { title: 'Schönheitsreparaturen', text: 'Kleine Mängel? Wir erledigen alles, was für einen guten Eindruck nötig ist.' },
      { title: 'Innenräume renovieren', text: 'Wir renovieren Ihre Wohnräume in {ort} – stilvoll, pünktlich und sauber.' },
      { title: 'Fenster- und Türeinbau', text: 'Neue Fenster und Türen steigern Wohnkomfort und senken Energiekosten – wir bauen sauber und zuverlässig ein.' },
    ],
    faqHeading: 'Noch Fragen offen?',
    faq: [
      { q: 'Was kostet eine Wohnungsrenovierung ungefähr?', a: 'Die Kosten hängen stark vom Umfang ab – also wie viele Räume betroffen sind, ob neue Böden, Malerarbeiten oder zusätzliche Reparaturen nötig sind. Ein einzelnes Zimmer beginnt bei ein paar hundert Euro, eine komplette Wohnung kann mehrere Tausend Euro kosten. Wir besichtigen das Objekt vorab kostenlos und machen Ihnen ein faires, transparentes Angebot.' },
      { q: 'Wie schnell könnt ihr mit der Renovierung beginnen?', a: 'In der Regel können wir kurzfristig starten – je nach Umfang meist innerhalb von 1–2 Wochen nach Angebotsfreigabe. Bei kleineren Projekten sogar früher. Wir sagen Ihnen ehrlich, was realistisch ist, und halten uns an zugesagte Termine.' },
      { q: 'Kann ich während der Renovierung in der Wohnung bleiben?', a: 'Oft ja – zum Beispiel bei Malerarbeiten oder Bodenverlegung in einzelnen Räumen. Bei umfangreicheren Renovierungen (z. B. mehrere Räume gleichzeitig, viel Staub oder Lärm) empfehlen wir, währenddessen auszuweichen. Wir besprechen das vorab mit Ihnen und planen die Arbeiten so, dass sie möglichst wenig stören.' },
      { q: 'Was muss ich vor der Renovierung vorbereiten?', a: 'Im Idealfall räumen Sie die betroffenen Räume leer oder decken Möbel ab – wir bringen bei Bedarf Schutzmaterial mit. Alles Weitere – Abklebearbeiten, Abdeckungen, Staubschutz – übernehmen wir. Wir helfen auch gerne beim Ausräumen oder Umstellen, wenn es nötig ist.' },
      { q: 'Was passiert, wenn während der Renovierung etwas entdeckt wird, das nicht geplant war?', a: 'Das kann passieren, zum Beispiel bei versteckten Schäden oder feuchtem Putz. In dem Fall sprechen wir das sofort offen mit Ihnen durch, machen Lösungsvorschläge und passen das Angebot nur nach Absprache an. Transparenz ist uns hier sehr wichtig.' },
      { q: 'Macht ihr auch kleinere Arbeiten oder nur Komplettsanierungen?', a: 'Auch kleine Renovierungsarbeiten sind willkommen – etwa ein einzelnes Zimmer streichen, neue Fußleisten anbringen oder einen alten Boden austauschen. Sie müssen kein Großprojekt beauftragen, um mit uns arbeiten zu können.' },
    ],
  },
  {
    slug: 'wasserschaden',
    name: 'Wasserschäden',
    titleTemplate: 'Wasserschaden {ort} – HePa Baut',
    metaDescriptionTemplate:
      'Wasserschaden in {ort}? Schnelle Hilfe: Schadensaufnahme, Trocknung von Böden & Wänden, Schimmelbehandlung, Wiederherstellung – alles aus einer Hand.',
    heroH1Template: 'Wasserschaden? Wir helfen schnell & zuverlässig',
    heroSubline: '',
    heroLead:
      'Von der Schadensaufnahme bis zur kompletten Trocknung und Sanierung – alles aus einer Hand',
    heroCtaLabel: 'Hilfe anfordern',
    leistungenHeading: 'Unsere Leistungen',
    leistungenIntro:
      'Ob akuter Wasserschaden oder schon länger bestehende Feuchtigkeit – wir kümmern uns um die fachgerechte Trocknung, Sanierung und Wiederherstellung.',
    cards: [],
    bullets: [
      'Trocknung von Böden & Wänden',
      'Schimmelvermeidung & -behandlung',
      'Rückbau & Wiederherstellung (z. B. Putz, Boden, Farbe)',
      'Koordination mit Versicherung (falls gewünscht)',
    ],
    emergency: {
      heading: 'Erste Hilfe. Das müssen sie jetzt tun:',
      steps: [
        { title: 'Wasserzufuhr stoppen', text: 'Drehen Sie sofort den Hauptwasserhahn zu, um weiteren Schaden zu verhindern – besonders bei Rohrbrüchen oder defekten Anschlüssen.', tip: 'Der Hauptwasserhahn befindet sich meist im Keller, im Hauswirtschaftsraum oder dort, wo die Wasseruhr sitzt.' },
        { title: 'Strom abstellen', text: 'Sichern Sie sich ab, indem Sie betroffene Stromkreise oder die Hauptsicherung abschalten – bei durchnässten Wänden oder Böden besteht Stromschlaggefahr.', tip: 'Der Sicherungskasten befindet sich meist im Flur, Keller oder Hausanschlussraum – oft in einem grauen Kasten an der Wand.' },
        { title: 'Schaden dokumentieren (Fotos)', text: 'Machen Sie Fotos oder Videos vom Schaden – das hilft später bei der Abwicklung mit Ihrer Versicherung.' },
        { title: 'Kontakt zu uns aufnehmen', text: 'Je früher wir da sind, desto mehr lässt sich retten. Rufen Sie uns an oder schreiben Sie uns – wir kümmern uns um den Rest.' },
      ],
    },
    faq: [],
  },
];

export const leistungenBySlug: Record<string, Leistung> = Object.fromEntries(
  leistungen.map((l) => [l.slug, l]),
);

/** Ersetzt {ort} in einem Textbaustein. */
export function withOrt(template: string, ort: string): string {
  return template.replaceAll('{ort}', ort);
}
