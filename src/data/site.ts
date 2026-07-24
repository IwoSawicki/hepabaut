// Zentrale Seiten-Daten (1:1 aus mirror/). Werte mit Widersprüchen im Original sind unten markiert
// und werden in Phase 1 bewusst 1:1 übernommen (Korrektur erst in Phase 2, nach Rücksprache).

export const site = {
  name: 'HePa Baut',
  legalName: 'Hermann und Adam Solar GbR',
  // Original: Hero-/CTA-Telefon vs. Footer-Telefon unterscheiden sich — beide 1:1 behalten.
  phonePrimary: '+49 6209 298 16 78', // Hero-/CTA-Nummer
  phonePrimaryHref: '+4962092981678',
  phoneFooter: '06206 185 7728', // Footer/Kontaktdaten
  phoneFooterHref: '+4962061857728',
  // Original: Footer nennt info@hepasolar.de, Kontaktseite info@hepabaut.de — beide 1:1 behalten.
  emailFooter: 'info@hepasolar.de',
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
