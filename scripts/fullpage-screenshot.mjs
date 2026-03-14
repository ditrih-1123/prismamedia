/**
 * Full-page screenshot of the site.
 *
 * Usage:
 *   1. Start the dev server: npm run dev
 *   2. In another terminal: npm run screenshot
 *
 * Uses installed Google Chrome (channel: "chrome"). If you don't have Chrome,
 * run: npx playwright install chromium
 * and remove the channel option below.
 */

import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const outputPath = path.join(projectRoot, "site-screenshot.png");
const url = process.env.SCREENSHOT_URL || "http://localhost:3000";

async function main() {
  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
  });
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle" });
    await page.screenshot({
      path: outputPath,
      fullPage: true,
      type: "png",
    });
    console.log("Full-page screenshot saved to:", outputPath);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
