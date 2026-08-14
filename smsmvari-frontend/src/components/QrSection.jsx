"use client";
import { motion, useReducedMotion } from "motion/react";
import { QrCode, ReceiptText, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

// Shared easing — same curve used across all homepage motion components.
const EASE = [0.22, 1, 0.36, 1];

export default function QrSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto flex justify-center">
      {/* ── Card entrance ─────────────────────────────────────────────────
          Replaces the outer <FadeUp> wrapper that was in page.jsx.
          Slight scale (0.97 → 1) makes the card feel like it materialises
          rather than just sliding up. Keeps the reveal feeling solid.
      ───────────────────────────────────────────────────────────────────── */}
      <motion.div
        className="w-full max-w-5xl"
        initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <Card className="w-full border-2 border-primary shadow-lg overflow-hidden relative bg-card">
          {/* ── Orange bar — scaleX reveal from the left edge ─────────────
              transformOrigin "left" keeps the left edge pinned while the
              bar draws rightward, like a progress indicator "opening" the card.
          ─────────────────────────────────────────────────────────────────── */}
          <motion.div
            className="absolute top-0 left-0 w-full h-2 bg-[#F39C12]"
            style={{ transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          />

          <CardContent className="p-8 md:p-12">
            {/* ── Header — fades up after card settles ─────────────────── */}
            <motion.div
              className="flex items-center justify-center gap-3 mb-10 text-primary w-full"
              initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: EASE, delay: 0.2 }}
            >
              <QrCode size={40} strokeWidth={2.5} />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-center translate-y-1">
                Make a Contribution
              </h2>
            </motion.div>

            {/* ── Two-column body ──────────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 relative">
              {/* Left column — plain layout div; children animate separately
                  so each element has its own timing rather than moving as a block. */}
              <div className="flex flex-col items-center justify-start gap-6">
                {/* QR code — slides in from the left */}
                <motion.div
                  className="bg-white p-4 border-4 border-muted rounded-xl shadow-sm hover:scale-105 transition-transform duration-300 flex flex-col items-center gap-3"
                  initial={{ opacity: 0, x: shouldReduce ? 0 : -32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
                >
                  <div className="flex items-center gap-1.5">
                    <Image src="/icon.webp" alt="" width={18} height={18} />
                    <span className="text-primary font-bold text-xs uppercase tracking-wide">
                      SMSM Vari Trust
                    </span>
                  </div>
                  <Image
                    src="/dummy_qr.webp"
                    alt="Scan to Donate"
                    width={256}
                    height={256}
                    className="object-contain"
                  />
                </motion.div>

                {/* Receipt box — fades up 170ms after the QR settles,
                    giving a clear visual read that it's subordinate info. */}
                <motion.div
                  className="bg-muted/40 w-full max-w-sm rounded-lg p-5 border border-border/50 text-center"
                  initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.52 }}
                >
                  <div className="flex items-center justify-center gap-2 text-foreground font-bold mb-2">
                    <ReceiptText className="text-brand-blue" size={22} />
                    <p className="uppercase tracking-wider text-sm">
                      Instant Receipt
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    You will securely receive an automated receipt directly on
                    the phone number used for the transaction.
                  </p>
                </motion.div>
              </div>

              {/* ── Desktop: vertical divider ─────────────────────────── */}
              <div className="hidden md:flex absolute left-1/2 top-4 bottom-4 flex-col items-center -translate-x-1/2 z-10">
                {/* Divider line — draws down from the top, making the
                    separation between columns feel structural rather than
                    decorative. transformOrigin "top" keeps the top pinned. */}
                <motion.div
                  className="w-px h-full bg-border/60"
                  style={{ transformOrigin: "top" }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
                />

                {/* Heart — two nested motion divs:
                    Outer  → one-shot entrance: bounces in with a spring overshoot.
                    Inner  → repeating pulse: starts only after the entrance settles
                             (delay: 1.2 = entrance delay 0.65s + duration 0.35s + buffer).
                    This prevents the pulse from running while the heart is still invisible. */}
                <div className="absolute top-1/2 -translate-y-1/2 bg-card rounded-full">
                  <motion.div
                    initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.3 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.35,
                      ease: [0.34, 1.56, 0.64, 1], // spring overshoot — heart "bounces" into place
                      delay: 0.65,
                    }}
                  >
                    <motion.div
                      animate={shouldReduce ? {} : { scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 1.2,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 1.2,
                        delay: 1.2, // clears the entrance before pulsing begins
                      }}
                    >
                      <Heart
                        className="text-[#F39C12] p-1.5 fill-[#F39C12]/10 rounded-full border border-border/50 shadow-sm"
                        size={48}
                        strokeWidth={1.5}
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* ── Mobile: horizontal divider (static — too small to animate) */}
              <div className="flex md:hidden w-full h-px bg-border/60 items-center justify-center my-2 z-10">
                <Heart
                  className="bg-card text-[#F39C12] p-1.5 fill-[#F39C12]/10 rounded-full border border-border/50 shadow-sm"
                  size={44}
                  strokeWidth={1.5}
                />
              </div>

              {/* Right column — slides in from the right, same delay as QR
                  so both halves of the card arrive in tandem. */}
              <motion.div
                className="flex items-center justify-center h-full px-4 md:px-8"
                initial={{ opacity: 0, x: shouldReduce ? 0 : 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
              >
                <p className="text-xl md:text-2xl text-foreground/90 font-semibold italic leading-relaxed text-center md:text-left">
                  "Thank you for making a difference. Your generous support
                  provides essential healing, comfort, and care to communities
                  who need it most — from remote tribal villages to the sacred
                  Wari pilgrimage."
                </p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
