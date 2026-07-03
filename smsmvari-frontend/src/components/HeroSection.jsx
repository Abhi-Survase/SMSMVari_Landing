// components/HeroSection.jsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

// Custom ease that feels deliberate and unhurried — suits the Wari spirit.
const EASE = [0.22, 1, 0.36, 1];

export default function HeroSection() {
  const shouldReduce = useReducedMotion();

  // Stagger container: orchestrates children arriving one by one.
  // Reduced-motion users get instant opacity-only reveal, no movement.
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
    <section className="relative w-full border-b-4 border-secondary">
      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="relative h-[614px] md:h-[819px] w-full">
        <Image
          src="/home-hero.webp"
          alt="A grand procession of thousands of Varkaris (devotees) during the Pandharpur Wari"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* The three elements (h1, p, buttons) arrive in sequence, 140ms apart */}
      <motion.div
        className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4 max-w-5xl mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="mb-6">
          <Image
            src="/icon.webp"
            alt="SMSM Vari"
            width={80}
            height={80}
            className="drop-shadow-xl"
          />
        </motion.div>

        <motion.h1
          variants={item}
          className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-black mb-6 drop-shadow-xl uppercase tracking-tight"
        >
          Walking with Devotion,
          <br />
          Serving with Compassion
        </motion.h1>

        <motion.p
          variants={item}
          className="font-sans text-lg md:text-xl text-white max-w-2xl mb-8 drop-shadow-md font-medium bg-black/30 p-6 rounded-md border border-white/20 backdrop-blur-sm"
        >
          Delivering essential medical care and humanitarian service to remote
          tribal villages, disaster-affected regions, and dedicated pilgrims
          across Maharashtra.
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
          <Link href="/donate">
            <Button
              size="lg"
              className="uppercase font-bold tracking-wide text-md px-8 py-6 border-b-4 border-b-secondary/50 shadow-xl active:border-b-0 active:translate-y-1 animate-heartbeat"
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
