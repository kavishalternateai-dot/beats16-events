import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export async function ogImage({
  title,
  eyebrow,
  background,
  color,
}: {
  title: string;
  eyebrow: string;
  background: string;
  color: string;
}) {
  const font = await readFile(join(process.cwd(), "assets/fonts/RozhaOne-Regular.ttf"));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background,
          color,
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: "0.16em", textTransform: "uppercase" }}>{eyebrow}</div>
        <div style={{ display: "flex", fontSize: 92, lineHeight: 0.95, fontFamily: "Rozha One" }}>{title}</div>
        <div style={{ display: "flex", fontSize: 32 }}>Beats16 · Mumbai</div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [{ name: "Rozha One", data: font, weight: 400, style: "normal" }],
    },
  );
}
