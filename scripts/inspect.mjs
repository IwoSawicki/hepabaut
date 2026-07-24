import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
async function inspect(url, stripSri, label) {
  const page = await browser.newPage({ viewport: { width: 375, height: 800 } });
  if (stripSri) {
    await page.route('**/*.html', async (route) => {
      const res = await route.fetch();
      let body = (await res.text()).replace(/ integrity="[^"]*"/g, '').replace(/ crossorigin="anonymous"/g, '');
      await route.fulfill({ response: res, body });
    });
  }
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(1200);
  const info = await page.evaluate(() => {
    const row = document.querySelector('.section-3 .flex-horizontal.gap-20');
    const out = { rowH: row?.getBoundingClientRect().height };
    out.children = [...(row?.children ?? [])].map((c) => ({
      cls: c.className.toString().slice(0, 40),
      h: Math.round(c.getBoundingClientRect().height),
      mt: getComputedStyle(c).marginTop,
      mb: getComputedStyle(c).marginBottom,
      display: getComputedStyle(c).display,
    }));
    const p = row?.querySelector('p');
    if (p) out.p = { h: Math.round(p.getBoundingClientRect().height), mb: getComputedStyle(p).marginBottom, lh: getComputedStyle(p).lineHeight, fs: getComputedStyle(p).fontSize };
    const img = row?.querySelector('a img');
    if (img) out.img = { h: Math.round(img.getBoundingClientRect().height), natural: img.naturalHeight, cls: img.className.toString() };
    return out;
  });
  console.log(label, JSON.stringify(info, null, 1));
  await page.close();
}
await inspect('http://localhost:4323/www.hepabaut.de/index.html', true, 'ORIGINAL');
await inspect('http://localhost:4321/', false, 'NACHBAU');
await browser.close();
