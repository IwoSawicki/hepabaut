// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Live-Domain: URL-Struktur RANKING-KRITISCH 1:1 beibehalten (keine Trailing-Slashes).
export default defineConfig({
  site: 'https://www.hepabaut.de',
  trailingSlash: 'never',
  // Clean URLs ohne .html (/sanierung/heidelberg). 'directory' erzeugt .../index.html,
  // die Hosts unter dem sauberen Pfad ausliefern.
  build: { format: 'directory' },
  vite: { plugins: [tailwindcss()] },
  integrations: [sitemap()],
});
