// components/AnimatedPageHero.jsx
"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

// Container drives the stagger timing; children inherit the "show" state.
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// Each direct child slides up and fades in.
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

/**
 * Reusable inner-page hero wrapper.
 * Each direct child staggers in on mount — no scroll required.
 * Use inside the outer <section> so the section's background/border
 * styles are applied by the server component.
 *
 * Usage (in a server component):
 *   <section className="bg-secondary …">
 *     <AnimatedPageHero className="max-w-3xl mx-auto text-center">
 *       <Badge>Since 1984</Badge>
 *       <h1>About SMSM Vari</h1>
 *       <p className="text-primary …">Healthcare Without Boundaries</p>
 *       <p className="text-white/80 …">Long description…</p>
 *     </AnimatedPageHero>
 *   </section>
 *
 * Children keep their own className/styles — AnimatedPageHero only adds
 * the motion wrapper, which inherits text-align and other layout
 * properties through the normal CSS cascade.
 */
export default function AnimatedPageHero({ children, className }) {
  const shouldReduce = useReducedMotion();

  // Reduced motion: instant appearance, no y-movement.
  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {React.Children.map(children, (child) =>
        // Guard against null/undefined children (e.g. conditional renders).
        child != null ? (
          <motion.div variants={itemVariants}>{child}</motion.div>
        ) : null
      )}
    </motion.div>
  );
}
