// Misst offsetTop/Höhe aller Sections bei gegebener Breite für Original & Nachbau.
import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const W = Number(process.env.W ?? 375);
async function measure(url, stripSri) {
  const page = await browser.newPage({ viewport: { width: W, height: 800 } });
  if (stripSri) {
    await page.route('**/*.html', async (route) => {
      const res = await route.fetch();
      let body = (await res.text()).replace(/ integrity="[^"]*"/g, '').replace(/ crossorigin="anonymous"/g, '');
      await route.fulfill({ response: res, body });
    });
  }
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(1500);
  const data = await page.evaluate(() => {
    const els = [...document.querySelectorAll('section, footer.footer-wrapper, .footer-cta')];
    return els.map((el) => ({
      cls: (el.className || '').toString().slice(0, 50),
      top: Math.round(el.getBoundingClientRect().top + window.scrollY),
      h: Math.round(el.getBoundingClientRect().height),
    }));
  });
  await page.close();
  return data;
}
const orig = await measure('http://localhost:4323/www.hepabaut.de/index.html', true);
const neu = await measure('http://localhost:4321/', false);
for (let i = 0; i < Math.max(orig.length, neu.length); i++) {
  const o = orig[i], n = neu[i];
  const mark = o && n && (Math.abs(o.h - n.h) > 4 ? '  <<< DIFF' : '');
  console.log(`${(o?.cls ?? '-').padEnd(50)} o:${o?.top}/${o?.h}  n:${n?.top}/${n?.h}${mark}`);
}
await browser.close();
