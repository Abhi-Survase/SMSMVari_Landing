// components/StaggerChildren.jsx
"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

// Parent orchestrates timing; children inherit "show" → trigger their own variant.
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1, // 100ms between each card
      delayChildren: 0.05, // tiny pause before first child fires
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

/**
 * Replace a grid/flex container div with this.
 * Forward the grid className here so layout is unchanged.
 *
 * Example:
 *   <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
 *     <StaggerItem><Card>…</Card></StaggerItem>
 *   </StaggerContainer>
 */
export function StaggerContainer({ children, className }) {
  const shouldReduce = useReducedMotion();

  // Reduced-motion: render a plain div, children appear instantly.
  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Wrap each direct child inside a StaggerContainer.
 * The className is forwarded so the grid cell sizing is unaffected.
 */
export function StaggerItem({ children, className }) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
