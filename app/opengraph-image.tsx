import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Nepal — Discover the Roof of the World";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(160deg, #07070d 0%, #0e1a2b 45%, #0a1520 70%, #07070d 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top gold bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #b8891e, #d4a843, #f0c56a, #d4a843, #b8891e)",
          }}
        />

        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(212,168,67,0.08) 0%, transparent 65%)",
          }}
        />

        {/* NEPAL wordmark */}
        <div
          style={{
            fontSize: 108,
            fontWeight: 900,
            color: "#f0ece3",
            letterSpacing: "0.22em",
            lineHeight: 1,
          }}
        >
          NEPAL
        </div>

        {/* Gold divider */}
        <div
          style={{
            width: 80,
            height: 1,
            background: "rgba(212,168,67,0.6)",
            margin: "28px 0",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(240,236,227,0.55)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Discover the Roof of the World
        </div>

        {/* Bottom trio */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{ width: 48, height: 1, background: "rgba(212,168,67,0.3)" }}
          />
          <div
            style={{
              fontSize: 13,
              color: "#d4a843",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            Himalayas · Culture · Adventure
          </div>
          <div
            style={{ width: 48, height: 1, background: "rgba(212,168,67,0.3)" }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
