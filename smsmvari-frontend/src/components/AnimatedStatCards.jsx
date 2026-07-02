// components/AnimatedStatCards.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView, useReducedMotion } from "motion/react";
import { Route, CalendarDays } from "lucide-react";
import { Card } from "@/components/ui/card";

/**
 * Counts from 0 to `to` when it enters the viewport.
 * Snaps to final value immediately for reduced-motion users.
 */
function CountUp({ to, suffix = "", duration = 1.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const shouldReduce = useReducedMotion();
  // Start at final value if reduced motion, otherwise start at 0
  const [display, setDisplay] = useState(shouldReduce ? to : 0);

  useEffect(() => {
    if (!inView) return;
    if (shouldReduce) {
      setDisplay(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    // Cleanup: stop animation if component unmounts mid-count
    return controls.stop;
  }, [inView, to, duration, shouldReduce]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function AnimatedStatCards() {
  return (
    // Matches the original: md:col-span-4 in the bento grid
    <div className="md:col-span-4 flex flex-col gap-6">
      {/* 250km card — scale reveal + count-up */}
      <motion.div
        className="h-full"
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="bg-[#F39C12] text-white rounded-none border-2 border-[#6D1B13] shadow-none flex flex-col justify-center items-center text-center h-full py-5">
          <Route size={54} strokeWidth={3} />
          <div className="font-heading text-5xl font-black mb-1">
            <CountUp to={250} suffix="km" duration={1.3} />
          </div>
          <div className="text-base uppercase tracking-[0.15em] font-bold">
            Sacred Journey
          </div>
        </Card>
      </motion.div>

      {/* 21 Days card — slight delay so the two cards arrive in sequence */}
      <motion.div
        className="h-full"
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.12 }}
      >
        <Card className="bg-[#a93200] text-white rounded-none border-2 border-[#6D1B13] shadow-none flex flex-col justify-center items-center text-center h-full py-5">
          <CalendarDays size={56} strokeWidth={3} />
          <div className="font-heading text-5xl font-black mb-1">
            <CountUp to={21} suffix=" Days" duration={1.0} />
          </div>
          <div className="text-base uppercase tracking-[0.15em] font-bold">
            Aashad Ekadashi
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
