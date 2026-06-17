import { ImageResponse } from "next/og";
import { COMMUNITY_POSTS } from "@/lib/data";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CATEGORY_LABEL: Record<string, string> = {
  "trek-report":    "Trek Report",
  "cultural-story": "Cultural Story",
  "food-travel":    "Food & Travel",
  "travel-tip":     "Travel Tip",
  "photography":    "Photography",
};

const CATEGORY_COLOR: Record<string, string> = {
  "trek-report":    "#5b9bd5",
  "cultural-story": "#d4834a",
  "food-travel":    "#52c98a",
  "travel-tip":     "#d4a843",
  "photography":    "#b078c8",
};

const CATEGORY_BG: Record<string, string> = {
  "trek-report":    "rgba(26,74,122,0.35)",
  "cultural-story": "rgba(123,63,0,0.35)",
  "food-travel":    "rgba(30,132,73,0.35)",
  "travel-tip":     "rgba(212,168,67,0.2)",
  "photography":    "rgba(74,35,90,0.35)",
};

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = COMMUNITY_POSTS.find((p) => p.slug === slug);

  const catColor = CATEGORY_COLOR[post?.category ?? "trek-report"];
  const catBg = CATEGORY_BG[post?.category ?? "trek-report"];
  const catLabel = CATEGORY_LABEL[post?.category ?? "trek-report"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#07070d",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "56px 64px",
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

        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              `radial-gradient(circle, ${catBg.replace("0.35", "0.12")} 0%, transparent 65%)`,
          }}
        />

        {/* Top: category badge + community label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              padding: "8px 20px",
              borderRadius: 999,
              background: catBg,
              border: `1px solid ${catColor}44`,
              fontSize: 12,
              color: catColor,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            {catLabel}
          </div>
          <div
            style={{
              fontSize: 13,
              color: "rgba(212,168,67,0.45)",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
            }}
          >
            NEPAL COMMUNITY
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: post && post.title.length > 55 ? 52 : 64,
            fontWeight: 800,
            color: "#f0ece3",
            lineHeight: 1.15,
            maxWidth: 1000,
            flex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          {post?.title ?? slug}
        </div>

        {/* Bottom: author + date + read time */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Avatar */}
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: post?.author.color ?? "#1a4a7a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              {post?.author.initials ?? "?"}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#f0ece3",
                }}
              >
                {post?.author.name} {post?.author.flag}
              </div>
              <div style={{ fontSize: 12, color: "#8a8978" }}>
                {post?.author.badge} · {post?.date}
              </div>
            </div>
          </div>
          <div style={{ fontSize: 14, color: "#8a8978" }}>
            {post?.readTime} read
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
