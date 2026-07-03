// components/JourneySection.jsx
// Used by: app/(home)/activities/aarogyawari/page.jsx
"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

/**
 * "A Journey of Faith" two-column section for the Aarogyawari page.
 *
 * Column order (mirrors MissionSection — image is on the LEFT on desktop):
 *   Mobile : text first  (order-1), image second (order-2) — stacked
 *   Desktop: image left  (lg:order-1), text right (lg:order-2) — side by side
 *
 * Animation directions match the visual positions, not DOM order:
 *   Image → x: -32 → 0  (slides in from the left, where it visually sits on desktop)
 *   Text  → x:  32 → 0  (slides in from the right, slight delay)
 *   Image also zooms out (scale: 1.06 → 1) exactly as in MissionSection.
 */
export default function JourneySection() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image — DOM order 2, visually LEFT on desktop via lg:order-1 */}
        <motion.div
          className="bg-muted rounded-xl overflow-hidden border border-border aspect-video order-2 lg:order-1"
          initial={{ opacity: 0, x: shouldReduce ? 0 : -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          {/* Zoom-out on img: parent clips any overhang during scale */}
          <motion.img
            src="https://images.unsplash.com/photo-1687577562667-370a09a48590?fm=jpg&q=80&w=2000&auto=format&fit=crop"
            alt="Crowd of devotees gathered during the Pandharpur pilgrimage"
            className="w-full h-full object-cover"
            initial={{ scale: shouldReduce ? 1 : 1.06 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
          />
          {/* TODO: replace with a real SMSM Aarogyawari photo */}
        </motion.div>

        {/* Text — DOM order 1, visually RIGHT on desktop via lg:order-2 */}
        <motion.div
          className="order-1 lg:order-2"
          initial={{ opacity: 0, x: shouldReduce ? 0 : 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.12 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl text-[#a93200] font-black uppercase tracking-tight mb-4">
            A Journey of Faith
          </h2>
          <div className="h-1.5 w-24 bg-[#F39C12] mb-6" />
          <p className="text-foreground/80 font-medium leading-relaxed mb-4">
            Many of the Warkaris undertaking this pilgrimage are 50 years of age
            or older, testing their physical strength and endurance over 250
            kilometres on foot. Along the way, they face adverse weather, lack
            of water, and exposure to disease — yet they continue with
            unwavering devotion.
          </p>
          <p className="text-foreground/80 font-medium leading-relaxed">
            Aarogyawari exists for this reason alone: so that no Warkari has to
            choose between their faith and their health. This initiative has run
            continuously since 1984, and continues to enjoy enthusiastic
            participation from people of all age groups — both pilgrims and
            volunteers.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
