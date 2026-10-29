/**
 * Every H1 must compute to at least 36px, use one font size through
 * every visible span, and must not leave a single word on its last
 * line. A lone word on a middle line is allowed. Glyph ink must stay
 * inside its clip box. Also fails on horizontal overflow.
 * Widths: 360, 390, 1280, 1440.
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
await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
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
      const sizes = [];
      for (const el of [h1, ...h1.querySelectorAll("span")]) {
        const style = getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden") continue;
        if (el.getClientRects().length === 0) continue;
        if (!(el.textContent || "").trim()) continue;
        sizes.push(parseFloat(style.fontSize));
      }
      const mismatched = sizes.filter((value) => Math.abs(value - size) > 0.6);
      const clips = [];
      const slop = 0.75;
      const clipOf = (el) => {
        let node = el;
        while (node) {
          const style = getComputedStyle(node);
          if (style.overflowX !== "visible" || style.overflowY !== "visible") return node;
          node = node.parentElement;
        }
        return document.documentElement;
      };
      const seen = new Set();
      const inkWalker = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT);
      while (inkWalker.nextNode()) {
        const node = inkWalker.currentNode;
        const parent = node.parentElement;
        if (!parent) continue;
        const style = getComputedStyle(parent);
        if (style.display === "none" || style.visibility === "hidden") continue;
        if (parent.getBoundingClientRect().height < 1) continue;
        const clip = clipOf(parent).getBoundingClientRect();
        const text = node.textContent ?? "";
        for (let i = 0; i < text.length; i += 1) {
          range.setStart(node, i);
          range.setEnd(node, i + 1);
          for (const rect of range.getClientRects()) {
            if (rect.width < 0.2 || rect.height < 0.2) continue;
            const past =
              rect.left < clip.left - slop ||
              rect.right > clip.right + slop ||
              rect.top < clip.top - slop ||
              rect.bottom > clip.bottom + slop;
            if (past) {
              const key = `${text[i]}@${Math.round(rect.left)}`;
              if (!seen.has(key)) {
                seen.add(key);
                clips.push(text[i]);
              }
            }
          }
        }
      }
      return {
        size,
        family,
        lines,
        lastWords: words.length,
        mismatched,
        clips,
        scroll: document.documentElement.scrollWidth <= window.innerWidth + 1,
      };
    });
    if (result.missing) failures.push(`${width} ${path}: no h1`);
    else if (result.size < 36) failures.push(`${width} ${path}: h1 is ${result.size}px (${result.family})`);
    else if (result.mismatched?.length) {
      failures.push(`${width} ${path}: mixed H1 sizes ${result.size}px and ${result.mismatched.join(", ")}px`);
    }
    else if (result.clips?.length) {
      failures.push(`${width} ${path}: glyph ink outside its clip box (${result.clips.slice(0, 8).join("")}) from [${result.lines.join(" | ")}]`);
    }
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
