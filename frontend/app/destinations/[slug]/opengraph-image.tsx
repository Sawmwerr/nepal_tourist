import { ImageResponse } from "next/og";
import { DESTINATION_LIST } from "@/lib/data";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TYPE_COLOR: Record<string, string> = {
  Trek:      "#5b9bd5",
  City:      "#d4834a",
  Culture:   "#b078c8",
  Spiritual: "#d4a843",
  Nature:    "#52c98a",
  Wildlife:  "#e88a3a",
};

const TYPE_BG: Record<string, string> = {
  Trek:      "rgba(26,74,122,0.35)",
  City:      "rgba(123,63,0,0.35)",
  Culture:   "rgba(74,35,90,0.35)",
  Spiritual: "rgba(212,168,67,0.2)",
  Nature:    "rgba(30,132,73,0.35)",
  Wildlife:  "rgba(140,70,10,0.35)",
};

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dest = DESTINATION_LIST.find((d) => d.slug === slug);

  const typeColor = TYPE_COLOR[dest?.type ?? "Trek"];
  const typeBg = TYPE_BG[dest?.type ?? "Trek"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(160deg, #0a1520 0%, #142d48 40%, #0c2238 70%, #07070d 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "0 64px 56px",
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
            background:
              "linear-gradient(90deg, #b8891e, #d4a843, #f0c56a, #d4a843, #b8891e)",
          }}
        />

        {/* NEPAL watermark top-right */}
        <div
          style={{
            position: "absolute",
            top: 44,
            right: 60,
            fontSize: 13,
            color: "rgba(212,168,67,0.45)",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
          }}
        >
          NEPAL
        </div>

        {/* Type + Region badges */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
          {dest?.type && (
            <div
              style={{
                padding: "6px 18px",
                borderRadius: 999,
                background: typeBg,
                border: `1px solid ${typeColor}55`,
                fontSize: 12,
                color: typeColor,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              {dest.type}
            </div>
          )}
          {dest?.region && (
            <div
              style={{
                padding: "6px 18px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                fontSize: 12,
                color: "rgba(240,236,227,0.45)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              {dest.region}
            </div>
          )}
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 76,
            fontWeight: 800,
            color: "#f0ece3",
            lineHeight: 1.05,
            marginBottom: 20,
            maxWidth: 900,
          }}
        >
          {dest?.name ?? slug}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 20,
            color: "rgba(240,236,227,0.5)",
            maxWidth: 760,
            lineHeight: 1.55,
            marginBottom: 36,
          }}
        >
          {dest?.description}
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: 48,
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            width: "100%",
          }}
        >
          {[
            { label: "Elevation",   value: dest?.elevation },
            { label: "Duration",    value: dest?.duration },
            { label: "Best Season", value: dest?.bestSeason },
            { label: "Difficulty",  value: dest?.difficulty },
          ].map((s) =>
            s.value ? (
              <div
                key={s.label}
                style={{ display: "flex", flexDirection: "column", gap: 6 }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: "#8a8978",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontSize: 17,
                    color: "#f0ece3",
                    fontWeight: 600,
                  }}
                >
                  {s.value}
                </div>
              </div>
            ) : null,
          )}
        </div>
      </div>
    ),
    { ...size },
  );
}
