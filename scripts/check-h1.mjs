/**
 * Every H1 must compute to at least 36px, and must not leave a single
 * word on its last line at 360, 390, 1280 or 1440.
 * Usage: BASE_URL=http://127.0.0.1:3000 node scripts/check-h1.mjs
 */
import puppeteer from "puppeteer-core";

const base = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const paths = ["/", "/about", "/gauri", "/rdx", "/daastan-e-ghazal", "/navratri", "/weddings", "/corporate-cultural", "/contact", "/faq", "/thank-you", "/not-a-page"];
const widths = [360, 390, 1280, 1440];

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH ?? "/usr/bin/google-chrome-stable",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const page = await browser.newPage();
const failures = [];

for (const width of widths) {
  await page.setViewport({ width, height: 900 });
  for (const path of paths) {
    await page.goto(base + path, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    const result = await page.evaluate(() => {
      const h1 = document.querySelector("h1");
      if (!h1) return { missing: true };
      const size = parseFloat(getComputedStyle(h1).fontSize);
      const family = getComputedStyle(h1).fontFamily;
      const range = document.createRange();
      const walker = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT);
      const lines = [];
      let bucket = "";
      let lastTop = null;
      while (walker.nextNode()) {
        const node = walker.currentNode;
        const parent = node.parentElement;
        if (!parent) continue;
        const style = getComputedStyle(parent);
        if (style.display === "none" || style.visibility === "hidden") continue;
        const box = parent.getBoundingClientRect();
        if (box.width < 1 || box.height < 1) continue;
        const text = node.textContent ?? "";
        for (let i = 0; i < text.length; i += 1) {
          range.setStart(node, i);
          range.setEnd(node, i + 1);
          const rect = range.getClientRects()[0];
          if (!rect || rect.width < 0.2) continue;
          if (lastTop !== null && rect.top - lastTop > Math.max(6, rect.height * 0.45)) {
            if (bucket.trim()) lines.push(bucket.replace(/\s+/g, " ").trim());
            bucket = "";
          }
          lastTop = rect.top;
          bucket += text[i];
        }
      }
      if (bucket.trim()) lines.push(bucket.replace(/\s+/g, " ").trim());
      const last = lines[lines.length - 1] ?? "";
      const words = last.split(/\s+/).filter(Boolean);
      return {
        size,
        family,
        lines,
        lastWords: words.length,
        scroll: document.documentElement.scrollWidth <= window.innerWidth + 1,
      };
    });
    if (result.missing) failures.push(`${width} ${path}: no h1`);
    else if (result.size < 36) failures.push(`${width} ${path}: h1 is ${result.size}px (${result.family})`);
    else if (result.lastWords < 2) {
      failures.push(`${width} ${path}: last line "${result.lines.at(-1)}" (${result.lastWords} words) from [${result.lines.join(" | ")}]`);
    }
    if (result.scroll === false) failures.push(`${width} ${path}: horizontal overflow`);
  }
}

await browser.close();
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`H1 check passed at ${widths.join(" and ")}px.`);
