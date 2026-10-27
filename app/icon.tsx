import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#4e1c24",
          color: "#f6f1e8",
          fontSize: 20,
          fontWeight: 600,
        }}
      >
        B
      </div>
    ),
    { ...size },
  );
}
