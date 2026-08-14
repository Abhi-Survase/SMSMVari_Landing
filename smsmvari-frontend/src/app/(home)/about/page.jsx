// app/(home)/about/page.jsx
// Server component — exports metadata, no "use client" needed.
// Motion lives entirely in the imported client components below.

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Route, CalendarDays } from "lucide-react";

// ── Motion components (client, safe to import from a server component) ───────
import AnimatedPageHero from "@/components/AnimatedPageHero";
import MissionSection from "@/components/MissionSection";
import FadeUp from "@/components/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/StaggerChildren";

export const metadata = {
  title: "About Us | SMSM Vari – Sahyadri Manav Seva Manch Vari Trust",
  description:
    "Learn about Sahyadri Manav Seva Manch Vari Trust — providing free medical care to remote tribal villages, disaster-affected communities, and pilgrims across Maharashtra since 1984.",
  keywords: [
    "Sahyadri Manav Seva Manch Vari Trust",
    "SMSM Vari about",
    "Pandharpur Wari NGO",
    "remote tribal healthcare Maharashtra",
    "free medical camps Maharashtra",
    "disaster relief Maharashtra NGO",
    "Varkari medical trust",
    "rural healthcare Maharashtra",
  ],
  openGraph: {
    title: "About SMSM Vari – Healthcare Without Boundaries",
    description:
      "We bring free medical care to remote tribal villages, disaster zones, and pilgrimage routes across Maharashtra — wherever people need it and no one else reaches.",
    type: "website",
    url: "https://smsmvari.org/about",
    siteName: "SMSM Vari",
    images: [
      {
        url: "/og-about.webp",
        width: 1200,
        height: 630,
        alt: "SMSM Vari volunteers at a medical camp during the Wari",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About SMSM Vari – Healthcare Without Boundaries",
    description:
      "Free medical care for remote tribal villages, disaster-affected communities, and pilgrims across Maharashtra. Serving since 1984.",
    images: ["/og-about.webp"],
  },
  alternates: { canonical: "https://smsmvari.org/about" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Sahyadri Manav Seva Manch Vari Trust",
  description:
    "The story, mission, and values of SMSM Vari — a trust dedicated to Varkari healthcare during the Pandharpur Wari.",
  url: "https://smsmvari.org/about",
  mainEntity: {
    "@type": "NGO",
    name: "Sahyadri Manav Seva Manch Vari Trust",
    alternateName: "SMSM Vari",
    url: "https://smsmvari.org",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Main Road, Chouphala",
      addressLocality: "Pandharpur",
      addressRegion: "Maharashtra",
      postalCode: "413304",
      addressCountry: "IN",
    },
  },
};

const values = [
  {
    icon: "volunteer_activism",
    title: "Seva First",
    description:
      "Every decision begins with one question: what does this person need right now? We place no condition — geographic, financial, or otherwise — on the care we provide.",
  },
  {
    icon: "verified",
    title: "Medical Excellence",
    description:
      "Trained doctors, nurses, and paramedics deliver standardised protocols whether we are at a pilgrimage camp, a flood relief site, or a tribal health camp deep in the hills.",
  },
  {
    icon: "groups",
    title: "Community Driven",
    description:
      "Our volunteers are local — they speak the language, know the terrain, and often share the hardship of those they serve. This is not charity from a distance.",
  },
  {
    icon: "transparency",
    title: "Transparency",
    description:
      "Every donation is accounted for. We publish yearly impact reports so you can see exactly where your support goes — whether it bought medicines or fuel for an ambulance.",
  },
];

export default function AboutUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Page Hero ─────────────────────────────────────────────────────
          Asymmetric two-column composition instead of a centered stack.
          Left: badge → h1 → tagline → body, all left-anchored — this is
          where the eye should land first and read a natural top-to-bottom
          line. Right: the two founding figures (250km / 21 Days) given
          real structural weight, echoing AnimatedStatCards on the
          homepage. Numbers carry the credibility argument per PRODUCT.md
          ("let concrete numbers carry weight the adjectives shouldn't")
          instead of living only in a stat strip elsewhere.

          AnimatedPageHero staggers each direct child on mount:
          Badge (100ms) → h1 (220ms) → tagline p (340ms) → body p (460ms).
          The outer section stays in this server component so its background
          and border render immediately without waiting for hydration.
      ─────────────────────────────────────────────────────────────────── */}
      <section className="bg-secondary text-white py-20 px-4 md:px-8 border-b-4 border-primary">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-center">
          <AnimatedPageHero className="text-left">
            <div className="flex items-center gap-3 mb-5">
              <Image src="/icon.webp" alt="SMSM Vari" width={44} height={44} />
              <Badge className="bg-primary/20 text-primary border-primary/30 uppercase tracking-widest text-xs">
                Since 1984
              </Badge>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-3 max-w-xl">
              About SMSM Vari
            </h1>
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-6">
              Healthcare Without Boundaries
            </p>
            <p className="text-white text-lg font-medium leading-relaxed max-w-xl">
              Sahyadri Manav Seva Manch Vari Trust was founded on a single
              conviction: that geography should never be a barrier to dignified
              medical care. We carry healthcare into Maharashtra&apos;s most
              underserved spaces — remote tribal villages, disaster-affected
              communities, rural fair grounds, and pilgrimage routes — wherever
              people have the least access and need it most.
            </p>
          </AnimatedPageHero>

          {/* Founding figures — right column, breaks the centered-stack
              habit by giving the hero real left/right tension. Not a
              "card" in the nested-card sense: flush blocks of color sitting
              directly on the section background. */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 bg-accent-marigold text-secondary px-6 py-5">
              <Route size={40} strokeWidth={2.5} className="shrink-0" />
              <div>
                <div className="font-sans text-3xl font-extrabold tabular-nums leading-none">
                  250km
                </div>
                <div className="text-xs uppercase tracking-[0.15em] font-bold mt-1">
                  Sacred Journey
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-secondary-deep text-white px-6 py-5">
              <CalendarDays size={40} strokeWidth={2.5} className="shrink-0" />
              <div>
                <div className="font-sans text-3xl font-extrabold tabular-nums leading-none">
                  21 Days
                </div>
                <div className="text-xs uppercase tracking-[0.15em] font-bold mt-1">
                  Aashad Ekadashi
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission ───────────────────────────────────────────────────────
          Extracted to MissionSection.jsx (client component).
          Left text slides from the left; image slides from the right
          with an additional zoom-out on the img itself.
      ─────────────────────────────────────────────────────────────────── */}
      <MissionSection />

      {/* ── Values ────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 md:px-8 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto">
          {/* Left-anchored heading, paired with a short supporting line on
              the right of the same row on larger screens — replaces the
              centered heading + centered rule pattern repeated across
              every section. */}
          <FadeUp className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <div className="h-1 w-16 bg-primary mb-4" />
              <h2 className="font-heading text-3xl md:text-4xl text-secondary font-black uppercase tracking-tight">
                What We Stand For
              </h2>
            </div>
            <p className="text-foreground-muted font-medium max-w-xs md:text-right">
              Four principles that hold whether we&apos;re at a pilgrimage camp
              or a flood relief site.
            </p>
          </FadeUp>

          {/* 4 value cards stagger in 100ms apart */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const isMedical = v.title === "Medical Excellence";
              return (
                <StaggerItem key={v.title}>
                  <Card className="shadow-none border-border h-full">
                    <CardContent className="pt-8 pb-6 px-6">
                      <span
                        className={`material-symbols-outlined text-4xl mb-4 block ${
                          isMedical ? "text-brand-blue" : "text-primary"
                        }`}
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {v.icon}
                      </span>
                      <h3 className="font-heading text-lg font-black text-secondary mb-2 uppercase tracking-tight">
                        {v.title}
                      </h3>
                      <p className="text-sm text-foreground-muted font-medium leading-relaxed">
                        {v.description}
                      </p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Leadership ────────────────────────────────────────────────── */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <FadeUp className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <div className="h-1 w-16 bg-primary mb-4" />
            <h2 className="font-heading text-3xl md:text-4xl text-primary font-black uppercase tracking-tight">
              Our Leadership
            </h2>
          </div>
          <p className="text-foreground-muted font-medium max-w-xs md:text-right">
            The trustees and volunteers coordinating every camp we run.
          </p>
        </FadeUp>

        {/* Trustees — 4 full cards, stagger 100ms apart */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {[
            {
              name: "Dr. Anjali Deshmukh",
              role: "Managing Trustee & CMO",
              bio: "With over 25 years of experience in public health, Dr. Deshmukh coordinates the entire medical strategy across all camps, ensuring standardised care protocols wherever our teams operate.",
              img: "/cmo_image.webp",
            },
            {
              name: "Mr. Prakash Patil",
              role: "Trustee & Logistics Head",
              bio: "A veteran in large-scale event management, Mr. Patil oversees the complex logistics of setting up mobile camps, supply chains, and volunteer deployment across every region we serve.",
              img: "/log-head_image.webp",
            },
            {
              // TODO: confirm name, role, and bio with the trust
              name: "Trustee Name 3",
              role: "Trustee & [Designation]",
              bio: "Brief bio describing this trustee's background, responsibilities, and contribution to the trust's work.",
              img: "/cmo_image.webp",
            },
            {
              // TODO: confirm name, role, and bio with the trust
              name: "Trustee Name 4",
              role: "Trustee & [Designation]",
              bio: "Brief bio describing this trustee's background, responsibilities, and contribution to the trust's work.",
              img: "/log-head_image.webp",
            },
          ].map((person) => (
            <StaggerItem key={person.name}>
              <Card className="shadow-none border-border h-full">
                <CardContent className="p-6 pt-8">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-muted rounded-full overflow-hidden border-2 border-secondary shrink-0">
                      <Image
                        src={person.img}
                        alt={person.name}
                        width={256}
                        height={256}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl text-secondary font-bold">
                        {person.name}
                      </h3>
                      <p className="text-xs text-brand-blue font-bold uppercase tracking-wider mt-1">
                        {person.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground-muted mt-6 font-medium leading-relaxed">
                    {person.bio}
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Members sub-heading — left-anchored, quieter than the section
            heading above it (smaller rule, no paired right-side copy) so
            it reads as a subordinate heading, not a repeat of the same
            pattern. */}
        <FadeUp className="mb-8 max-w-4xl mx-auto">
          <div className="h-1 w-10 bg-primary mb-3" />
          <h3 className="font-heading text-xl md:text-2xl text-secondary font-black uppercase tracking-tight">
            Our Members
          </h3>
        </FadeUp>

        {/* 6 compact member cards — uses the default 100ms stagger from StaggerContainer.
            The cards are small so 100ms is still readable at this density. */}
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {[
            // TODO: confirm names and designations with the trust
            { name: "Member Name 1", role: "Designation" },
            { name: "Member Name 2", role: "Designation" },
            { name: "Member Name 3", role: "Designation" },
            { name: "Member Name 4", role: "Designation" },
            { name: "Member Name 5", role: "Designation" },
            { name: "Member Name 6", role: "Designation" },
          ].map((person) => (
            <StaggerItem key={person.name}>
              <Card className="border-t-2 border-t-brand-blue text-center h-full">
                <CardContent className="p-4">
                  <h4 className="font-heading text-sm text-secondary font-bold leading-snug">
                    {person.name}
                  </h4>
                  <p className="text-[10px] text-brand-blue font-bold uppercase tracking-wider mt-1">
                    {person.role}
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────
          Left-anchored heading/copy, buttons break right on larger
          screens — closes the page with the same asymmetric tension as
          the hero instead of a third centered stack. Single FadeUp on the
          whole block still reads as one unit; individual item stagger
          would feel fidgety at this length.
      ─────────────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 md:px-8 bg-secondary text-white border-t-4 border-primary">
        <FadeUp className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-md">
            <h2 className="font-heading text-3xl font-black uppercase tracking-tight mb-4">
              Join the Mission
            </h2>
            <p className="text-white font-medium">
              Whether you donate, volunteer, or simply spread the word — every
              act of support helps us reach one more village, one more patient,
              one more person who needs care and has nowhere else to turn.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Button
              asChild
              size="lg"
              className="uppercase font-bold tracking-wide"
            >
              <Link href="/donate">Donate Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="uppercase font-bold tracking-wide bg-transparent border-white text-white hover:bg-white hover:text-secondary"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
