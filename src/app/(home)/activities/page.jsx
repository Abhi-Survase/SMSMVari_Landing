// app/(home)/activities/page.jsx
// Server component — exports metadata, no "use client" needed.
// Motion lives entirely in the imported client components.

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  HeartPulse,
  Siren,
  GraduationCap,
  Footprints,
  CalendarClock,
  Droplets,
  ShieldAlert,
  Stethoscope,
  BookOpen,
  Users,
} from "lucide-react";
import EventsSection from "./EventsSection";

// ── Motion components ─────────────────────────────────────────────────────────
import AnimatedPageHero from "@/components/AnimatedPageHero";
import FadeUp from "@/components/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/StaggerChildren";

export const metadata = {
  title: "Our Activities | Sahyadri Manav Seva Manch, Thane",
  description:
    "From monthly tribal health camps in Devbandh to disaster relief during floods and earthquakes, school health check-ups, and the annual Aarogyawari pilgrimage service — explore our work across Maharashtra.",
  keywords: [
    "Sahyadri Manav Seva Manch activities",
    "Devbandh tribal health camp",
    "disaster relief medical aid Maharashtra",
    "school health check-up camps",
    "Aarogyawari Pandharpur Wari",
    "SMSM Vari camps",
  ],
  openGraph: {
    title: "Our Activities | Sahyadri Manav Seva Manch, Thane",
    description:
      "Tribal health camps, disaster relief, school health programmes, and the Aarogyawari pilgrimage service — see the full scope of our work.",
    type: "website",
    url: "https://smsmvari.com/activities",
    siteName: "Sahyadri Manav Seva Manch",
    images: [
      {
        url: "/og-activities.webp",
        width: 1200,
        height: 630,
        alt: "Sahyadri Manav Seva Manch volunteers at a medical camp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Activities | Sahyadri Manav Seva Manch, Thane",
    description:
      "Tribal health camps, disaster relief, school health programmes, and the Aarogyawari pilgrimage service.",
    images: ["/og-activities.webp"],
  },
  alternates: { canonical: "https://smsmvari.com/activities" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Our Activities — Sahyadri Manav Seva Manch",
  description:
    "An overview of the camps and programmes run by Sahyadri Manav Seva Manch, Thane: tribal health camps, disaster relief, school health initiatives, and the Aarogyawari pilgrimage service.",
  url: "https://smsmvari.com/activities",
  about: {
    "@type": "NGO",
    name: "Sahyadri Manav Seva Manch, Thane",
    alternateName: "SMSM Vari",
    url: "https://smsmvari.com",
  },
};

const tribalCamps = [
  {
    icon: CalendarClock,
    title: "Monthly Devbandh Camps",
    description:
      "Every second Sunday of the month, our doctors and volunteers travel to Devbandh, a tribal village near Mokhada in Thane district, to conduct medical examinations and provide treatment — a commitment we have kept continuously since the year 2000.",
  },
  {
    icon: Stethoscope,
    title: "Village Health Camps",
    description:
      "Since 2000, we have continuously organised medical camps in villages across the region for people affected by illness, malnutrition, and poverty — reaching communities who would otherwise have little access to care.",
  },
  {
    icon: Users,
    title: "Community Health Check-Ups",
    description:
      "Regular medical check-up camps are conducted in schools across Thane and nearby regions, with screening, treatment, and guidance for ongoing care.",
  },
];

const disasterRelief = [
  {
    icon: Droplets,
    title: "Flood Relief — Mahad & Sangameshwar",
    description:
      "Our medical teams provided assistance to flood victims in Mahad and Sangameshwar, delivering treatment and supplies when communities needed it most.",
  },
  {
    icon: ShieldAlert,
    title: "Latur Earthquake Response",
    description:
      "Following the devastating Latur earthquake, we extended medical care to the injured and needy, working alongside other relief efforts on the ground.",
  },
  {
    icon: HeartPulse,
    title: "Jambhulpada Relief (1989)",
    description:
      "After the 1989 calamity in Jambhulpada, our volunteers provided medical aid to affected residents during a period of acute need.",
  },
  {
    icon: Siren,
    title: "Surat Plague Outbreak Screening",
    description:
      "During the Surat plague outbreak, we conducted medical examinations and treatment for truck drivers, cleaners, and others entering Maharashtra, helping contain the spread of disease.",
  },
];

const educationInitiatives = [
  {
    icon: BookOpen,
    title: "School Health Check-Ups",
    description:
      "We organise medical check-ups for students across schools in Thane, providing guidance for treatment and following up through school management to ensure proper care is received.",
  },
  {
    icon: GraduationCap,
    title: "Educational Material Distribution",
    description:
      "School uniforms, notebooks, and other essential materials are distributed to students in tribal Anganwadis and schools wherever the need arises.",
  },
  {
    icon: Users,
    title: "Health Awareness & De-Addiction",
    description:
      "We conduct health awareness lectures for students and parents and run de-addiction campaigns to support healthier communities at the grassroots level.",
  },
  {
    icon: Stethoscope,
    title: "Transport Worker Health Camps",
    description:
      "In collaboration with other social organisations in Thane, we have conducted health check-ups and awareness programmes for auto-rickshaw drivers associated with the Thane Auto Rickshaw Union.",
  },
];

export default function ActivitiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Page Hero ────────────────────────────────────────────────────
          Left-anchored against the photo instead of a centered stack —
          matches the asymmetric treatment already applied to About.
          AnimatedPageHero staggers each direct child on mount.
          The outer section (background image + overlay) stays server-side
          so it renders immediately without waiting for hydration.
      ─────────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-4 md:px-8 border-b-4 border-primary overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1717820775574-bc200d22ce40?fm=jpg&q=80&w=2000&auto=format&fit=crop"
          alt="Aerial view of a remote village in the mountains"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-secondary/90" />
        <AnimatedPageHero className="max-w-2xl relative z-10 mx-auto lg:mx-0 lg:ml-[max(2rem,calc((100%-72rem)/2))]">
          <div className="flex items-center gap-3 mb-5">
            <Image src="icon.webp" alt="SMSM Vari" width={44} height={44} />
            <Badge className="bg-primary/20 text-primary border-primary/30 uppercase tracking-widest text-xs">
              Since 1984
            </Badge>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6 text-white max-w-xl">
            Our Activities
          </h1>
          <p className="text-white text-lg font-medium leading-relaxed max-w-lg">
            From monthly medical camps in remote tribal villages to disaster
            relief, school health programmes, and the annual Aarogyawari
            pilgrimage service — this is where the work happens.
          </p>
        </AnimatedPageHero>
      </section>

      {/* ── Events — FadeUp wraps the whole section as one unit ────────── */}
      <FadeUp>
        <EventsSection />
      </FadeUp>

      {/* ── Section 1: Tribal & Community Health Camps ─────────────────── */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Intro and banner run side-by-side instead of stacked — breaks
            the repeating "centered heading → banner → grid" shape that
            would otherwise recur identically across all four sections. */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 items-center mb-12">
          <FadeUp>
            <div className="h-1 w-16 bg-primary mb-4" />
            <h2 className="font-heading text-3xl md:text-4xl text-primary font-black uppercase tracking-tight mb-4">
              Tribal & Community Health Camps
            </h2>
            <p className="text-foreground-muted font-medium leading-relaxed max-w-md">
              Year-round, our doctors and volunteers carry healthcare into
              villages that the system rarely reaches.
            </p>
          </FadeUp>

          <FadeUp delay={0.08}>
            <div className="rounded-xl overflow-hidden border border-border h-56 md:h-72">
              {/* Stock placeholder — replace with a real SMSM photo of Devbandh camps */}
              <img
                src="https://images.unsplash.com/photo-1641465756589-dc84610af2d1?fm=jpg&q=80&w=2000&auto=format&fit=crop"
                alt="A man standing in a rural field, representing the tribal villages we serve"
                className="w-full h-full object-cover"
              />
            </div>
          </FadeUp>
        </div>

        {/* 3 cards stagger in 100ms apart */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tribalCamps.map((item) => (
            <StaggerItem key={item.title}>
              <Card className="shadow-none border-border h-full">
                <CardContent className="pt-8 pb-6 px-6">
                  <item.icon
                    className="text-primary mb-4"
                    size={36}
                    strokeWidth={2}
                  />
                  <h3 className="font-heading text-lg font-black text-secondary mb-2 uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground-muted font-medium leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ── Section 2: Disaster & Emergency Relief ─────────────────────── */}
      <section className="py-16 px-4 md:px-8 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto">
          {/* No banner image in this section — deliberately, so the page
              doesn't repeat "heading → banner → grid" four times running.
              Intro pairs left-anchored heading with a right-aligned
              supporting line instead. */}
          <FadeUp className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <div className="h-1 w-16 bg-brand-blue mb-4" />
              <h2 className="font-heading text-3xl md:text-4xl text-brand-blue font-black uppercase tracking-tight">
                Disaster & Emergency Relief
              </h2>
            </div>
            <p className="text-foreground-muted font-medium max-w-xs md:text-right">
              When disaster strikes, our teams mobilise quickly to provide
              emergency medical care to affected communities.
            </p>
          </FadeUp>

          {/* 4 cards stagger in 100ms apart */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {disasterRelief.map((item) => (
              <StaggerItem key={item.title}>
                <Card className="shadow-none border-border bg-white h-full">
                  <CardContent className="pt-8 pb-6 px-6">
                    <item.icon
                      className="text-brand-blue mb-4"
                      size={32}
                      strokeWidth={2}
                    />
                    <h3 className="font-heading text-base font-black text-secondary mb-2 uppercase tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-foreground-muted font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Section 3: Education & Awareness ───────────────────────────── */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Mirrored from Section 1's image-right pairing (image-left here)
            so the two image+intro sections don't read as the same
            component reused, even though the underlying shape is similar. */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center mb-12">
          <FadeUp delay={0.08} className="lg:order-1">
            <div className="rounded-xl overflow-hidden border border-border h-56 md:h-72">
              {/* Stock placeholder — replace with a real SMSM school programme photo */}
              <img
                src="https://images.unsplash.com/photo-1673146416489-98c2e139f680?fm=jpg&q=80&w=2000&auto=format&fit=crop"
                alt="A group of people gathered outside a school building"
                className="w-full h-full object-cover"
              />
            </div>
          </FadeUp>

          <FadeUp className="lg:order-2">
            <div className="h-1 w-16 bg-primary mb-4" />
            <h2 className="font-heading text-3xl md:text-4xl text-primary font-black uppercase tracking-tight mb-4">
              Education & Awareness
            </h2>
            <p className="text-foreground-muted font-medium leading-relaxed max-w-md">
              Healthcare and education go hand in hand — we invest in both.
            </p>
          </FadeUp>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {educationInitiatives.map((item) => (
            <StaggerItem key={item.title}>
              <Card className="shadow-none border-border h-full">
                <CardContent className="pt-8 pb-6 px-6">
                  <item.icon
                    className="text-primary mb-4"
                    size={32}
                    strokeWidth={2}
                  />
                  <h3 className="font-heading text-base font-black text-secondary mb-2 uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground-muted font-medium leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ── Section 4: Aarogyawari (heritage palette) ──────────────────── */}
      <section
        className="py-16 px-4 md:px-8"
        style={{
          backgroundColor: "#E6E2D3",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a93200' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <FadeUp className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <Badge className="mb-4 bg-[#a93200]/10 text-[#a93200] border-[#a93200]/30 uppercase tracking-widest text-xs">
                Since 1984
              </Badge>
              <h2 className="font-heading text-3xl md:text-4xl text-[#a93200] font-black uppercase tracking-tight">
                Aarogyawari — The Pandharpur Wari Service
              </h2>
              <div className="h-1.5 w-24 bg-[#F39C12] mt-4" />
            </div>
          </FadeUp>

          {/* Bento cards — StaggerItem carries lg:col-span-2 to preserve the grid span */}
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StaggerItem className="lg:col-span-2">
              <Card className="rounded-none border border-[rgba(140,98,57,0.2)] shadow-sm bg-white h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4 text-[#6D1B13]">
                    <Footprints size={32} />
                    <h3 className="font-heading text-2xl font-black">
                      Camps Along the Route
                    </h3>
                  </div>
                  <p className="text-[#333333] leading-relaxed font-medium">
                    Every year during Ashadhi Ekadashi, thousands of Warkari
                    devotees walk from Alandi to Pandharpur for the darshan of
                    Lord Vitthal. We organise healthcare and support services
                    along the route — milk distribution, medical examinations,
                    treatment, and referrals for surgeries — through dedicated
                    camps near Saswad and Phaltan.
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card className="rounded-none border border-[rgba(140,98,57,0.2)] shadow-sm bg-white h-full">
                <CardContent className="p-8">
                  <h3 className="font-heading text-xl font-black text-[#6D1B13] mb-3">
                    Where Help Is Needed Most
                  </h3>
                  <p className="text-[#333333] text-sm leading-relaxed font-medium">
                    Our first camp sits between Dive Ghat and Saswad — one of
                    the most physically demanding stretches, where steep daytime
                    climbs cause the greatest strain. After Natepute, many
                    pilgrims face fatigue, muscle pain, respiratory issues,
                    infections, fever, and high blood pressure. Our doctors and
                    volunteers are there to meet that need.
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          </StaggerContainer>

          {/* Button fades up after the cards settle */}
          <FadeUp delay={0.15} className="text-center mt-8">
            <Button
              asChild
              variant="outline"
              className="uppercase font-bold tracking-wide border-[#a93200] text-[#a93200] hover:bg-[#a93200] hover:text-white"
            >
              <Link href="/activities/aarogyawari">
                Learn More About Aarogyawari
              </Link>
            </Button>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 md:px-8 bg-secondary text-white border-t-4 border-primary">
        <FadeUp className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-md">
            <h2 className="font-heading text-3xl font-black uppercase tracking-tight mb-4">
              Support Our Work
            </h2>
            <p className="text-white font-medium">
              Every camp, every check-up, every relief effort is made possible
              by people like you. Donate, volunteer, or get in touch to learn
              more.
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
              <Link href="/join">Get Involved</Link>
            </Button>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
