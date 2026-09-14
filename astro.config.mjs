// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Live-Domain: URL-Struktur RANKING-KRITISCH 1:1 beibehalten (keine Trailing-Slashes).
export default defineConfig({
  // Kanonische Domain OHNE www (Apex lädt; www ist noch nicht live). Steuert Sitemap,
  // Canonical-Tags, og:url und JSON-LD-Basis. Bei www-Umstellung später hier + robots.txt ändern.
  site: 'https://hepabaut.de',
  trailingSlash: 'never',
  // Clean URLs ohne .html (/sanierung/heidelberg). 'directory' erzeugt .../index.html,
  // die Hosts unter dem sauberen Pfad ausliefern.
  build: { format: 'directory' },
  vite: { plugins: [tailwindcss()] },
  // Sitemap-Konsolidierung: NUR starke Seiten. Muss zu src/data/seo.ts passen
  // (Astro-Config kann .ts nicht sauber importieren → Kern-Listen hier gespiegelt).
  integrations: [sitemap({ filter: sitemapFilter })],
});

// --- Sitemap-Whitelist (Spiegel von src/data/seo.ts) ---
const CORE_ORTE = new Set([
  'mannheim', 'heidelberg', 'weinheim', 'walldorf', 'neckargemund', 'burstadt',
  'viernheim', 'schwetzingen', 'bensheim', 'worms', 'gaiberg', 'lampertheim', 'hemsbach',
]);
const CORE_LEISTUNGEN = new Set(['sanierung', 'renovierung']);
// Einzelne Top-Level-Seiten in der Sitemap (Übersichten + Kontakt). Impressum/Datenschutz/404 raus.
const TOP_LEVEL_IN_SITEMAP = new Set(['sanierung', 'renovierung', 'wasserschaden', 'kontakt']);

function sitemapFilter(page) {
  const path = new URL(page).pathname.replace(/\/+$/, '');
  if (path.includes('/angebot/')) return false; // Ads-LPs sind noindex
  const seg = path.split('/').filter(Boolean);
  if (seg.length === 0) return true; // Startseite
  if (seg.length === 1) return TOP_LEVEL_IN_SITEMAP.has(seg[0]);
  if (seg.length === 2) return CORE_LEISTUNGEN.has(seg[0]) && CORE_ORTE.has(seg[1]);
  return false;
}
