import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "public", "showreels");
mkdirSync(dir, { recursive: true });

const files = [
  ["gauri-showreel-placeholder.pdf", "Gauri"],
  ["rdx-showreel-placeholder.pdf", "RDX"],
  ["daastan-e-ghazal-showreel-placeholder.pdf", "Daastan-e-Ghazal"],
  ["navratri-showreel-placeholder.pdf", "Navratri band by Beats16"],
  ["independent-showreel-placeholder.pdf", "Independent bands"],
];

function escapePdf(value) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function buildPdf(band) {
  const lines = [
    "Beats16 Events & Entertainment",
    "Placeholder showreel",
    `Band: ${band}`,
    "This file stands in for the real showreel.",
    "Replace it with an https link in content/media.ts",
    "or with the matching SHOWREEL_*_URL env var.",
    "Phone: +91 9820133078",
    "Email: beats16@gmail.com",
  ];

  const commands = ["BT", "/F1 16 Tf", "72 720 Td"];
  lines.forEach((line, index) => {
    if (index === 0) commands.push(`/F1 18 Tf (${escapePdf(line)}) Tj`);
    else commands.push(`0 -32 Td /F1 14 Tf (${escapePdf(line)}) Tj`);
  });
  commands.push("ET");
  const stream = commands.join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Count 1 /Kids [3 0 R] >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
    `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];

  let body = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(body));
    body += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xref = Buffer.byteLength(body);
  body += `xref\n0 ${objects.length + 1}\n`;
  body += "0000000000 65535 f \n";
  offsets.slice(1).forEach((offset) => {
    body += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  body += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return body;
}

for (const [filename, band] of files) {
  writeFileSync(join(dir, filename), buildPdf(band));
}

console.log(`Wrote ${files.length} placeholder showreels to ${dir}`);
