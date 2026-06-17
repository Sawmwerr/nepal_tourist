"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#07070d",
          color: "#f0ece3",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "24px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.55em",
            textTransform: "uppercase",
            color: "#d4a843",
            marginBottom: 24,
          }}
        >
          Critical error
        </p>

        <h1
          style={{
            fontSize: "clamp(4rem, 14vw, 10rem)",
            fontWeight: 900,
            lineHeight: 1,
            marginBottom: 24,
            background: "linear-gradient(135deg, #f0ece3 0%, #d4a843 45%, #e8c547 65%, #f0ece3 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Error
        </h1>

        <p
          style={{
            fontSize: 14,
            color: "#8a8978",
            maxWidth: 280,
            lineHeight: 1.7,
            marginBottom: 40,
          }}
        >
          The application encountered a critical error. Reload to try again.
        </p>

        <button
          onClick={reset}
          style={{
            padding: "12px 28px",
            borderRadius: 999,
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontWeight: 600,
            background: "linear-gradient(135deg, #d4a843, #e8c547)",
            color: "#07070d",
            border: "none",
            cursor: "pointer",
          }}
        >
          Reload
        </button>
      </body>
    </html>
  );
}
