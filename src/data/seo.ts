// Zentrale SEO-Sichtbarkeit (Konsolidierung der „Doorway"-Seiten).
// Prinzip: Nur STARKE Seiten sind indexierbar UND in der Sitemap. Alle anderen Ortsseiten
// bleiben live erreichbar, stehen aber auf `noindex, follow` (URLs erhalten → keine 404,
// interne Links vererben weiter Linkkraft) und fliegen aus der Sitemap.
//
// coreOrte = kuratierte Kern-Orte (nach Nachfrage/Ranking aus der GSC). Neuen Ort „stark"
// machen = hier eintragen. WICHTIG: Die Sitemap-Whitelist in astro.config.mjs spiegelt diese
// Listen (Astro-Config kann .ts nicht sauber importieren) — bei Änderungen BEIDE Stellen pflegen.

export const coreOrte = [
  'mannheim',
  'heidelberg',
  'weinheim',
  'walldorf',
  'neckargemund',
  'burstadt',
  'viernheim',
  'schwetzingen',
  'bensheim',
  'worms',
  'gaiberg',
  'lampertheim',
  'hemsbach',
] as const;

// Ortsseiten nur für diese Leistungen indexieren. Wasserschaden: 0 Nachfrage → alle Ortsseiten
// auf noindex (die Übersichtsseite /wasserschaden bleibt indexierbar).
export const coreLeistungen = ['sanierung', 'renovierung'] as const;

/** true = Ortsseite ist stark (indexierbar + Sitemap); false = noindex + nicht in Sitemap. */
export function isOrtIndexierbar(leistungSlug: string, ortSlug: string): boolean {
  return (
    (coreLeistungen as readonly string[]).includes(leistungSlug) &&
    (coreOrte as readonly string[]).includes(ortSlug)
  );
}
