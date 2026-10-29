import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const source = readFileSync("app/globals.css", "utf8");
const required = [".display-title", ".about-display", ".band-display"];
const block = source.match(
  /\.display-title,\s*\.home-display,\s*\.about-display,\s*\.band-display,\s*\.wedding-display\s*\{[^}]+\}/,
);
const scale = source.match(/\.display-title,\s*\.about-display,\s*\.band-display\s*\{[^}]+\}/);
if (!block || !scale) {
  console.error("Display headings are not defined with the shared type and the display scale.");
  process.exit(1);
}
if (!/font-family:\s*var\(--font-rozha\)/.test(block[0])) {
  console.error("Display headings are missing Rozha One.");
  process.exit(1);
}
if (!/font-size:\s*clamp\(2\.6rem,\s*7vw,\s*6rem\)/.test(scale[0])) {
  console.error("Display headings are missing the display scale.");
  process.exit(1);
}
for (const name of required) {
  if (!block[0].includes(name)) {
    console.error(`Missing ${name} in the display rule.`);
    process.exit(1);
  }
}

function collectCss(dir, into) {
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, name.name);
    if (name.isDirectory()) collectCss(path, into);
    else if (name.name.endsWith(".css")) into.push(readFileSync(path, "utf8"));
  }
}

const staticDir = join(".next", "static");
let built = "";
try {
  const files = [];
  collectCss(staticDir, files);
  built = files.join("\n");
} catch {
  console.log("Display CSS source check passed. Built CSS was not present.");
  process.exit(0);
}
for (const name of ["about-display", "band-display", "display-title"]) {
  if (!built.includes(name) || !built.includes("font-family:var(--font-rozha)")) {
    console.error(`Built CSS is missing the display rule for ${name}.`);
    process.exit(1);
  }
}
console.log("Display CSS check passed.");
