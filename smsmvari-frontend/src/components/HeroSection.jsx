// components/HeroSection.jsx
"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

// Custom ease that feels deliberate and unhurried — suits the Wari spirit.
const EASE = [0.22, 1, 0.36, 1];

export default function HeroSection() {
  const shouldReduce = useReducedMotion();
  const sectionRef = useRef(null);

  // 1. Track scroll progress from top of the page until the hero exits the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // 2. Parallax vertical translation (moves downward slower than scroll speed)
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduce ? ["0%", "0%"] : ["0%", "28%"],
  );

  // 3. Subtle scale effect on scroll for extra depth (optional, clean SaaS feel)
  const bgScale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduce ? [1, 1] : [1, 1.06],
  );

  // Stagger container: orchestrates children arriving one by one.
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduce ? 0 : 0.14,
        delayChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full border-b-4 border-secondary overflow-hidden min-h-[560px] md:min-h-[819px] flex items-center"
    >
      {/* ── Parallax Background Wrapper ────────────────────────────────────── */}
      <motion.div
        className="absolute inset-x-0 -top-[10%] h-[125%] w-full z-0 pointer-events-none"
        style={{ y: bgY, scale: bgScale }}
      >
        <Image
          src="/home-hero.webp"
          alt="A grand procession of thousands of Varkaris (devotees) during the Pandharpur Wari"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      {/* ── Foreground Content ─────────────────────────────────────────────── */}
      <motion.div
        className="relative z-20 flex flex-col justify-center items-center text-center px-4 py-16 md:py-0 max-w-5xl mx-auto w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="mb-4 md:mb-6">
          <Image
            src="/icon.webp"
            alt="SMSM Vari"
            width={80}
            height={80}
            className="w-16 h-16 md:w-20 md:h-20 drop-shadow-xl"
          />
        </motion.div>

        <motion.h1
          variants={item}
          className="text-4xl md:text-6xl lg:text-7xl text-white font-extrabold mb-4 md:mb-6 drop-shadow-xl leading-[1.05] tracking-[-0.02em]"
        >
          Walking with Devotion,
          <br />
          Serving with Compassion
        </motion.h1>

        <motion.p
          variants={item}
          className="text-base md:text-xl text-white max-w-2xl mb-6 md:mb-8 font-medium bg-black/5 p-4 md:p-6 rounded-md border border-white/20 backdrop-blur-sm"
        >
          Delivering essential medical care and humanitarian service to remote
          tribal villages, disaster-affected regions, and dedicated pilgrims
          across Maharashtra.
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
          <Link href="/donate">
            <Button
              size="lg"
              className="uppercase font-bold tracking-wide text-md px-8 py-6 border-b-4 border-b-secondary/50 shadow-xl active:border-b-0 active:translate-y-1"
            >
              Support the Mission
            </Button>
          </Link>
          <Link href="/activities/aarogyawari">
            <Button
              variant="secondary"
              size="lg"
              className="uppercase font-bold tracking-wide text-md px-8 py-6 border-b-4 border-b-secondary/50 shadow-xl active:border-b-0 active:translate-y-1 bg-white/90 text-secondary hover:bg-white backdrop-blur-md"
            >
              Learn More
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
