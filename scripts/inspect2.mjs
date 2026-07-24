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
    const cs = getComputedStyle(row);
    return {
      gap: cs.gap, dir: cs.flexDirection, pad: cs.padding, minH: cs.minHeight, h: cs.height,
      align: cs.alignItems, wrap: cs.flexWrap,
      parentCls: row.parentElement.className.toString().slice(0, 60),
    };
  });
  console.log(label, JSON.stringify(info));
  await page.close();
}
await inspect('http://localhost:4323/www.hepabaut.de/index.html', true, 'ORIGINAL');
await inspect('http://localhost:4321/', false, 'NACHBAU');
await browser.close();
