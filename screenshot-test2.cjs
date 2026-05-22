
const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:5173", { waitUntil: "networkidle" });
  // Click first create card
  await page.click(".create-card:first-child");
  await page.waitForTimeout(500);
  await page.waitForURL("**/editor/**", { timeout: 8000 });
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: "screenshots/02-editor.png" });
  console.log("Editor screenshot done");
  await browser.close();
})();

