// Five-colour Tibetan prayer-flag rule:
// blue (sky) · white (wind/air) · red (fire) · green (water/earth) · yellow (earth/knowledge)

import type { CSSProperties } from "react";

interface Props {
  className?: string;
  opacity?: number;
  style?: CSSProperties;
}

export default function PrayerFlagDivider({ className = "", opacity = 1, style }: Props) {
  return (
    <div
      className={`prayer-flag-rule ${className}`}
      style={{ opacity, ...style }}
      aria-hidden="true"
      role="presentation"
    >
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}
