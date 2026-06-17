"use client";

// Overlay-slide reveal for prominent images.
// An opaque panel (matching the site background) covers the image and translates
// upward off it, while the image simultaneously scales from 1.08 → 1.0.
// Both transforms are GPU-composited — no layout properties animated.
//
// Composing with ParallaxImage:
//   ImageReveal (outer, scale wrapper + overlay)
//     ParallaxImage (inner, y-translate + 1.12 base scale on motion.img)
// The two transforms live on different DOM elements and don't conflict.

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
// Matches the site's dark background so the overlay is seamless
const OVERLAY_BG = "#07070d";

interface Props {
  children: ReactNode;
  delay?: number;
}

export default function ImageReveal({ children, delay = 0 }: Props) {
  const reduceMotion = useReducedMotion();

  // Reduced-motion: render image fully visible with no overlay animation
  if (reduceMotion) {
    return <div className="absolute inset-0">{children}</div>;
  }

  return (
    // Outer wrapper — fills whatever image container it sits in
    <div className="absolute inset-0">
      {/* Image scale layer — settles from 1.08 → 1.0 as overlay lifts */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7, ease: EASE_OUT, delay }}
        style={{ willChange: "transform" }}
      >
        {children}
      </motion.div>

      {/* Overlay panel — slides upward to uncover the image beneath */}
      <motion.div
        className="absolute inset-0"
        initial={{ y: "0%" }}
        whileInView={{ y: "-101%" }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7, ease: EASE_OUT, delay }}
        style={{
          background: OVERLAY_BG,
          zIndex: 20,
          willChange: "transform",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
