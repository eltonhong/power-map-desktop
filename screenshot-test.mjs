
const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:5173", { waitUntil: "networkidle" });
  await page.screenshot({ path: "D:/腾达工作/产品成果/power-map-desktop/screenshots/01-home.png" });
  console.log("Home screenshot done");
  await browser.close();
})();

