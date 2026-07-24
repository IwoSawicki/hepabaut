// Screenshot-Vergleich Original (mirror-v3, lokal) vs. Nachbau (Astro-Preview).
// SRI-integrity-Attribute werden beim Original entfernt — wget hat Asset-Dateien beim
// Spiegeln verändert, daher würden die Hashes clientseitig fehlschlagen.
import { chromium } from 'playwright';

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const SP = process.env.SP ?? '.';
const width = Number(process.env.W ?? 1440);
const origPath = process.env.ORIG ?? '/www.hepabaut.de/index.html';
const nachbauPath = process.env.NEU ?? '/';
const targets = [
  { url: `http://localhost:4323${origPath}`, name: 'original', stripSri: true },
  { url: `http://localhost:4321${nachbauPath}`, name: 'nachbau', stripSri: false },
];

for (const t of targets) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  if (t.stripSri) {
    await page.route('**/*.html', async (route) => {
      const res = await route.fetch();
      let body = await res.text();
      body = body.replace(/ integrity="[^"]*"/g, '').replace(/ crossorigin="anonymous"/g, '');
      await route.fulfill({ response: res, body });
    });
  }
  await page.goto(t.url, { waitUntil: 'networkidle', timeout: 30000 }).catch((e) => console.log(t.name, 'goto warn:', e.message));
  await page.waitForTimeout(2000);
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 50));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${SP}/${t.name}-${width}.png`, fullPage: true });
  console.log(t.name, 'height:', await page.evaluate(() => document.body.scrollHeight));
  await page.close();
}
await browser.close();
