// components/MissionSection.jsx
"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

/**
 * The "Our Mission" two-column section for the About page.
 * Extracted as a client component so we can use x-axis slide animations
 * that aren't expressible with the generic FadeUp wrapper.
 *
 * Animation sequence (when section enters viewport):
 *   t = 0s    Left text column slides in from the left (x: -28 → 0)
 *   t = 0.12s Image container slides in from the right (x: 32 → 0)
 *             Image itself zooms out slightly (scale: 1.06 → 1), giving a
 *             "arriving and settling" feel — distinct from the slide-only
 *             columns used elsewhere on the page.
 */
export default function MissionSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left text column — slides in from the left */}
        <motion.div
          initial={{ opacity: 0, x: shouldReduce ? 0 : -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <h2 className="font-heading text-3xl md:text-4xl text-primary font-black uppercase tracking-tight mb-4">
            Our Mission
          </h2>
          <div className="h-1 w-20 bg-primary mb-6 rounded-full" />
          <p className="text-foreground/80 font-medium leading-relaxed mb-4">
            We mobilise doctors, nurses, trained volunteers, and essential
            supplies to bring healthcare to places the system rarely reaches.
            From wound-care stations along pilgrimage routes to health camps in
            remote tribal belts and emergency response during floods and
            disasters — our teams go wherever there is need and no one else
            going.
          </p>
          <p className="text-foreground/80 font-medium leading-relaxed">
            Our founding programme — the Pandharpur Aarogyawari — has provided
            free medical care to thousands of Varkaris every Aashad Ekadashi
            since 1984. But our work extends well beyond the Wari: year-round
            health camps in tribal villages, disaster relief medical units, and
            medical support at regional fairs and pilgrimages across
            Maharashtra. Wherever communities are underserved, that is where we
            belong.
          </p>
        </motion.div>

        {/* Right image — slides from the right; image itself zooms out */}
        <motion.div
          className="bg-muted rounded-xl overflow-hidden border border-border aspect-video"
          initial={{ opacity: 0, x: shouldReduce ? 0 : 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.12 }}
        >
          {/* The zoom-out on the img is independent of the container slide.
              Both run concurrently — the container moves while the image
              simultaneously settles to its natural scale. The overflow-hidden
              on the parent clips any overhang during the scale. */}
          <motion.img
            src="heritage1.webp"
            alt="Varkaris chanting during vaari"
            className="w-full h-full object-cover"
            initial={{ scale: shouldReduce ? 1 : 1.06 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
