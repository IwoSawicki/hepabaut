// Orte werden aus orte.csv geladen — DAS ist die Datenquelle, die im Alltag gepflegt wird.
// Neuen Ort hinzufügen = eine Zeile in orte.csv anhängen (slug,name), kein Code nötig.
// Slugs sind ranking-kritisch (byte-genau, ASCII-gefaltet) — siehe reference/orte.txt & CLAUDE.md.
// ?raw bündelt den CSV-Inhalt zur Build-Zeit mit ein (kein Laufzeit-Dateisystemzugriff nötig,
// funktioniert daher auch nach dem SSR-Bundling der Astro-Routen).
import csvRaw from './orte.csv?raw';

export interface Ort {
  slug: string;
  name: string;
}

function parseOrteCsv(raw: string): Ort[] {
  const lines = raw.trim().split('\n').slice(1); // Header überspringen
  return lines
    .filter((line) => line.trim().length > 0)
    .map((line) => {
      const [slug, name] = line.split(',');
      return { slug: slug.trim(), name: name.trim() };
    });
}

export const orte: Ort[] = parseOrteCsv(csvRaw);

export const orteBySlug: Record<string, Ort> = Object.fromEntries(orte.map((o) => [o.slug, o]));
