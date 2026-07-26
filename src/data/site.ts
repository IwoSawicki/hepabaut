// Zentrale Seiten-Daten. Telefon & E-Mail vom Kunden bestätigt (06206 185 7728, info@hepabaut.de).
// HINWEIS Adresse: Impressum nutzt die ladungsfähige Anschrift Mörlenbach (Gerhart-Hauptmann-Str. 8).
// Footer/Kontakt zeigen weiterhin die Adresse Bürstadt (Steinlachstraße 66) — vom Kunden bestätigen,
// ob Bürstadt ein separater Standort ist oder vereinheitlicht werden soll.
export const site = {
  name: 'HePa Baut',
  legalName: 'Hermann und Adam Solar GbR',
  phonePrimary: '06206 185 7728',
  phonePrimaryHref: '+4962061857728',
  phoneFooter: '06206 185 7728',
  phoneFooterHref: '+4962061857728',
  emailFooter: 'info@hepabaut.de',
  emailKontakt: 'info@hepabaut.de',
  addressStreet: 'Steinlachstraße 66',
  addressCity: '68642 Bürstadt',
  designedBy: 'Sawix Studio',
  year: 2025,
} as const;

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Sanierung', href: '/sanierung' },
  { label: 'Renovierung', href: '/renovierung' },
  { label: 'Wasserschäden', href: '/wasserschaden' },
  { label: 'Kontakt', href: '/kontakt' },
] as const;

// Gemeinsamer USP-Block ("Warum HepaBaut") — identisch auf mehreren Seiten.
export const usps = [
  {
    title: 'Immer Erreichbar',
    text: 'Ob per Telefon, E-Mail oder WhatsApp – wir reagieren schnell und stehen Ihnen während des gesamten Projekts persönlich zur Seite.',
  },
  {
    title: 'Pünktlich & Termintreu',
    text: 'Versprochene Termine halten wir ein – zuverlässig, ohne Ausreden und mit verbindlicher Planung.',
  },
  {
    title: 'Zuverlässig',
    text: 'Von der ersten Besichtigung bis zur letzten Schraube: Auf unser Wort und unsere Arbeit können Sie sich verlassen.',
  },
  {
    title: 'Sauber',
    text: 'Wir hinterlassen Ihre Räume so ordentlich, wie wir sie vorgefunden haben – saubere Arbeit ist bei uns selbstverständlich.',
  },
] as const;
