import { ImageResponse } from "next/og";

export const alt = "Beats16 Events & Entertainment, Mumbai. Indian weddings and festivals.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#f7f1e6",
          color: "#3c1520",
          padding: "72px",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: 56, height: 2, background: "#a68446" }} />
          <div style={{ display: "flex", marginTop: 18, fontSize: 24, letterSpacing: "0.14em" }}>
            MUMBAI · INDIA AND ABROAD
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, lineHeight: 1 }}>Beats16</div>
          <div style={{ display: "flex", fontSize: 36, marginTop: 16 }}>Events & Entertainment</div>
        </div>
        <div style={{ display: "flex", fontSize: 32 }}>Indian weddings and festivals</div>
      </div>
    ),
    { ...size },
  );
}
