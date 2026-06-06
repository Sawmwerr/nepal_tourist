"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

// Drop-in for absolutely-positioned images inside overflow:hidden containers.
// The outer div takes absolute inset-0; the img gets subtle vertical parallax.
interface Props {
  src: string;
  alt?: string;
  imgClassName?: string;
}

export default function ParallaxImage({ src, alt = "", imgClassName = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // ±6 % shift — scale(1.12) on the img provides the gap buffer
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  if (reduceMotion) {
    return (
      <div className="absolute inset-0">
        <img src={src} alt={alt} className={imgClassName} />
      </div>
    );
  }

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.img
        src={src}
        alt={alt}
        className={imgClassName}
        style={{ y, scale: 1.12 }}
      />
    </div>
  );
}
