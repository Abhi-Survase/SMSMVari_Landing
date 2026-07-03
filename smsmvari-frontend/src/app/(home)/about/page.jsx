// app/(home)/about/page.jsx
// Server component — exports metadata, no "use client" needed.
// Motion lives entirely in the imported client components below.

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
          AnimatedPageHero staggers each direct child on mount:
          Badge (100ms) → h1 (220ms) → tagline p (340ms) → body p (460ms).
          The outer section stays in this server component so its background
          and border render immediately without waiting for hydration.
      ─────────────────────────────────────────────────────────────────── */}
      <section className="bg-secondary text-white py-16 px-4 md:px-8 border-b-4 border-primary">
        <AnimatedPageHero className="max-w-3xl mx-auto text-center">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 uppercase tracking-widest text-xs">
            Since 1984
          </Badge>
          <h1 className="font-heading text-4xl md:text-5xl font-black uppercase tracking-tight mb-3">
            About SMSM Vari
          </h1>
          <p className="text-primary font-bold uppercase tracking-widest text-sm mb-6">
            Healthcare Without Boundaries
          </p>
          <p className="text-white/80 text-lg font-medium leading-relaxed">
            Sahyadri Manav Seva Manch Vari Trust was founded on a single
            conviction: that geography should never be a barrier to dignified
            medical care. We carry healthcare into Maharashtra's most
            underserved spaces — remote tribal villages, disaster-affected
            communities, rural fair grounds, and pilgrimage routes — wherever
            people have the least access and need it most.
          </p>
        </AnimatedPageHero>
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

          {/* Heading + underline fade up together */}
          <FadeUp className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl text-secondary font-black uppercase tracking-tight">
              What We Stand For
            </h2>
            <div className="h-1 w-24 bg-primary mt-3 mx-auto rounded-full" />
          </FadeUp>

          {/* 4 value cards stagger in 100ms apart */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const isMedical = v.title === "Medical Excellence";
              return (
                <StaggerItem key={v.title}>
                  <Card
                    className={`border-t-4 hover:shadow-md transition-shadow h-full ${
                      isMedical ? "border-t-brand-blue" : "border-t-primary"
                    }`}
                  >
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
                      <p className="text-sm text-foreground/80 font-medium leading-relaxed">
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

        <FadeUp className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl text-primary font-black uppercase tracking-tight">
            Our Leadership
          </h2>
          <div className="h-1 w-24 bg-primary mt-3 mx-auto rounded-full" />
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
              img: "/trustee3_image.webp",
            },
            {
              // TODO: confirm name, role, and bio with the trust
              name: "Trustee Name 4",
              role: "Trustee & [Designation]",
              bio: "Brief bio describing this trustee's background, responsibilities, and contribution to the trust's work.",
              img: "/trustee4_image.webp",
            },
          ].map((person) => (
            <StaggerItem key={person.name}>
              <Card className="border-t-4 border-t-primary shadow-md h-full">
                <CardContent className="p-6 pt-8">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-muted rounded-full overflow-hidden border-2 border-secondary shrink-0">
                      <img
                        src={person.img}
                        alt={person.name}
                        className="w-full h-full object-cover"
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
                  <p className="text-sm text-foreground/80 mt-6 font-medium leading-relaxed">
                    {person.bio}
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Members sub-heading fades up before its grid */}
        <FadeUp className="text-center mb-8">
          <h3 className="font-heading text-xl md:text-2xl text-secondary font-black uppercase tracking-tight">
            Our Members
          </h3>
          <div className="h-1 w-16 bg-primary mt-2 mx-auto rounded-full" />
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
          Single FadeUp on the whole block — it reads as one unit and the
          section is short enough that individual item stagger would feel
          fidgety. Donate button carries animate-heartbeat for consistency
          with the homepage hero CTA.
      ─────────────────────────────────────────────────────────────────── */}
      <section className="py-14 px-4 md:px-8 bg-secondary text-white text-center border-t-4 border-primary">
        <FadeUp className="max-w-xl mx-auto">
          <h2 className="font-heading text-3xl font-black uppercase tracking-tight mb-4">
            Join the Mission
          </h2>
          <p className="text-white/80 mb-8 font-medium">
            Whether you donate, volunteer, or simply spread the word — every act
            of support helps us reach one more village, one more patient, one
            more person who needs care and has nowhere else to turn.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="uppercase font-bold tracking-wide border-b-4 border-b-primary/50 active:border-b-0 active:translate-y-1 animate-heartbeat"
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
