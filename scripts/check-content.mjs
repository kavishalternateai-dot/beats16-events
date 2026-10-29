import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const roots = ["app", "content", "components", "public"];
const textExt = new Set([".ts", ".tsx", ".js", ".mjs", ".css", ".txt", ".md", ".json"]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".next") continue;
    const file = join(dir, name);
    if (statSync(file).isDirectory()) walk(file, out);
    else out.push(file);
  }
  return out;
}

const files = roots.flatMap((root) => walk(root)).filter((file) => textExt.has(file.slice(file.lastIndexOf("."))));

const hindu = [];
const coming = [];
let years = 0;
const yearFiles = [];

for (const file of files) {
  const text = readFileSync(file, "utf8");
  if (/hindu/i.test(text)) hindu.push(file);
  if (/photo coming|film coming/i.test(text)) coming.push(file);
  const matches = text.match(/40 years|forty years/gi);
  if (matches) {
    years += matches.length;
    yearFiles.push(`${file} (${matches.length})`);
  }
}

let failed = false;
if (hindu.length) {
  failed = true;
  console.error("Found a forbidden word in:\n" + hindu.join("\n"));
}
if (coming.length) {
  failed = true;
  console.error("Found coming-soon media labels in:\n" + coming.join("\n"));
}
if (years !== 1) {
  failed = true;
  console.error(`Expected the longevity phrase once, found ${years}:\n${yearFiles.join("\n")}`);
}

if (failed) process.exit(1);
console.log(`Content checks passed. Longevity phrase count: ${years}.`);
