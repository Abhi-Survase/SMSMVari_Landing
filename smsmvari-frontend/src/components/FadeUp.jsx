// components/FadeUp.jsx
"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Wraps children in a scroll-triggered fade-up reveal.
 * Drop it around any section, heading, or block you want to animate in.
 *
 * Props:
 *   className  — forwarded to the wrapper div (keeps layout intact)
 *   delay      — optional stagger offset in seconds (default 0)
 *   margin     — IntersectionObserver root margin (default "-80px"
 *                means trigger fires 80px before the element reaches
 *                the viewport bottom — a comfortable early trigger)
 */
export default function FadeUp({
  children,
  className,
  delay = 0,
  margin = "-80px",
}) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: shouldReduce ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin }}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
