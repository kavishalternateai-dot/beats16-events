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
  const mark = await readFile(join(process.cwd(), "public/brand/beats16-wordmark.png"));
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;
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
          padding: "64px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              background: "#FFF4E2",
              borderRadius: 16,
              padding: "10px 14px",
            }}
          >
            {/* next/og ImageResponse only accepts a plain img. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={markSrc} width={250} height={144} alt="" />
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 84, lineHeight: 0.95, fontFamily: "Rozha One" }}>{title}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 28, letterSpacing: "0.14em", textTransform: "uppercase" }}>{eyebrow}</div>
          <div style={{ display: "flex", fontSize: 32, marginTop: 10 }}>Beats16 Events & Entertainment</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [{ name: "Rozha One", data: font, weight: 400, style: "normal" }],
    },
  );
}
