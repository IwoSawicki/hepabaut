import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 375, height: 800 } });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.click('label[for="nav-toggle"]');
await page.waitForTimeout(500);
const menuVisible = await page.evaluate(() => {
  const m = document.querySelector('.w-nav-menu');
  return getComputedStyle(m).display !== 'none' && m.getBoundingClientRect().height > 50;
});
await page.screenshot({ path: process.env.SP + '/menu-open.png' });
console.log('Mobile-Menü öffnet:', menuVisible);
await browser.close();
