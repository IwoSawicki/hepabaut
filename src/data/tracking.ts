// Zentrale Tracking-Konfiguration.
// SOLANGE die IDs leer sind, wird NICHTS geladen: kein GA, kein Ads-Tag, kein Cookie-Banner
// (Seite bleibt cookie-/trackingfrei). Sobald du echte IDs einträgst, aktivieren sich
// automatisch: Consent Mode v2 (Standard: alles abgelehnt) + Cookie-Banner + GA4/Ads.
//
// TODO(vor Ads-Start): IDs eintragen.
//   - GA4_ID: "G-XXXXXXXXXX"  (GA4 → Verwaltung → Datenströme → Mess-ID)
//   - ADS_ID: "AW-XXXXXXXXXX" (Google Ads → Tools → Conversions → Tag)
//   - ADS_CONVERSION_LABEL: "xxxxxxx"  (Label der Conversion-Aktion "Kontaktanfrage")

export const tracking = {
  GA4_ID: '',
  ADS_ID: '',
  ADS_CONVERSION_LABEL: '',
} as const;

/** true, sobald mindestens eine echte ID hinterlegt ist. */
export const trackingEnabled = Boolean(tracking.GA4_ID || tracking.ADS_ID);
