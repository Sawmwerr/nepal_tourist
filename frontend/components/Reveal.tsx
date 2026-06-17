"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

// Matches --ease-out CSS token: cubic-bezier(0.16, 1, 0.3, 1)
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return className ? <div className={className}>{children}</div> : <>{children}</>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}
