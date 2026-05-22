
const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  page.on("console", msg => console.log("CONSOLE:", msg.type(), msg.text()));
  page.on("pageerror", err => console.log("PAGE ERROR:", err.message));

  // 1. Go to home page
  await page.goto("http://localhost:5173", { waitUntil: "networkidle" });
  console.log("1. Home page loaded");

  // 2. Clear localStorage for clean test
  await page.evaluate(() => localStorage.clear());

  // 3. Click first create card (公司内部)
  await page.click(".create-card:first-child");
  await page.waitForTimeout(500);
  
  // 4. Check URL
  const url = page.url();
  console.log("2. Navigated to:", url);
  
  if (url.includes("/editor/")) {
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);
    
    // 5. Check if editor content loaded (not "加载中...")
    const bodyText = await page.textContent("body");
    const hasLoading = bodyText.includes("加载中");
    console.log("3. Has loading text:", hasLoading);
    
    // 6. Check nodes exist
    const nodeNames = await page.$$eval(".row-name", els => els.map(e => e.textContent));
    console.log("4. Node names:", nodeNames.slice(0, 5).join(", "), "...");
    
    // 7. Check strategy bar
    const strategyBar = await page.$(".strategy-bar");
    console.log("5. StrategyBar exists:", !!strategyBar);
    
    // 8. Check chart
    const chartDom = await page.$(".chart-dom");
    console.log("6. Chart exists:", !!chartDom);
    
    await page.screenshot({ path: "screenshots/03-verify-fix.png" });
    console.log("7. Screenshot saved");
  } else {
    console.log("FAILED: Not navigated to editor");
  }

  await browser.close();
  console.log("DONE");
})();

