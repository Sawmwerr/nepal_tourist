// Five-colour Tibetan prayer-flag rule:
// blue (sky) · white (wind/air) · red (fire) · green (water/earth) · yellow (earth/knowledge)

interface Props {
  className?: string;
  opacity?: number;
}

export default function PrayerFlagDivider({ className = "", opacity = 1 }: Props) {
  return (
    <div
      className={`prayer-flag-rule ${className}`}
      style={{ opacity }}
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
