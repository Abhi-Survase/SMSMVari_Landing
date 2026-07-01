// app/(home)/activities/page.jsx
// Server component — exports metadata, no "use client" needed

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
  Calendar,
  MapPin,
  Radio,
} from "lucide-react";

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
        url: "/og-activities.webp", // TODO: create a 1200×630 OG image
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

// ── Live & Past Events ───────────────────────────────────────────────────
// TODO: replace with real event data from your backend or CMS
// status: "LIVE" | "UPCOMING" | "COMPLETED"
const events = [
  {
    title: "Monthly Devbandh Health Camp",
    date: "Sunday, 13 July 2025",
    location: "Devbandh, Mokhada Taluka, Thane District",
    description:
      "Our monthly medical camp at Devbandh — medical examinations, treatment, and essential medicines for tribal community residents affected by illness and malnutrition.",
    category: "Tribal Health Camp",
    status: "LIVE",
  },
  {
    title: "Aarogyawari 2025 — Pandharpur Wari",
    date: "August 2025",
    location: "Alandi to Pandharpur Route",
    description:
      "Our annual health pilgrimage service along the 250 km Wari route — milk distribution, medical camps at Dive Ghat, Saswad, Phaltan, and Natepute.",
    category: "Aarogyawari",
    status: "UPCOMING",
  },
  {
    title: "School Health Camp — Thane",
    date: "May 2025",
    location: "Multiple Schools, Thane",
    description: null,
    category: "Education",
    status: "COMPLETED",
  },
  {
    title: "Monthly Devbandh Camp",
    date: "June 2025",
    location: "Devbandh, Mokhada",
    description: null,
    category: "Tribal Health Camp",
    status: "COMPLETED",
  },
  {
    title: "Aarogyawari 2024",
    date: "June 2024",
    location: "Alandi to Pandharpur Route",
    description: null,
    category: "Aarogyawari",
    status: "COMPLETED",
  },
];

// ── Section 1: Tribal & Community Health Camps ─────────────────────────
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

// ── Section 2: Disaster & Emergency Relief ──────────────────────────────
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

// ── Section 3: Education & Awareness ────────────────────────────────────
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

      {/* Page Hero */}
      <section className="relative py-16 px-4 md:px-8 border-b-4 border-primary overflow-hidden">
        {/* Stock placeholder — replace with a real SMSM photo */}
        <img
          src="https://images.unsplash.com/photo-1717820775574-bc200d22ce40?fm=jpg&q=80&w=2000&auto=format&fit=crop"
          alt="Aerial view of a remote village in the mountains"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-secondary/90" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 uppercase tracking-widest text-xs">
            Since 1982
          </Badge>
          <h1 className="font-heading text-4xl md:text-5xl font-black uppercase tracking-tight mb-6 text-white">
            Our Activities
          </h1>
          <p className="text-white/80 text-lg font-medium leading-relaxed">
            From monthly medical camps in remote tribal villages to disaster
            relief, school health programmes, and the annual Aarogyawari
            pilgrimage service — this is where the work happens.
          </p>
        </div>
      </section>

      {/* Events */}
      <section className="py-14 px-4 md:px-8 bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Radio className="text-primary" size={22} strokeWidth={2} />
            <h2 className="font-heading text-2xl md:text-3xl text-primary font-black uppercase tracking-tight">
              Events
            </h2>
          </div>

          {(() => {
            const liveEvent = events.find((e) => e.status === "LIVE");
            const upcomingEvents = events.filter(
              (e) => e.status === "UPCOMING",
            );
            const pastEvents = events.filter((e) => e.status === "COMPLETED");

            return (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Left column: Live + Upcoming — 2 of 3 columns */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                  {/* Live event */}
                  {liveEvent ? (
                    <Card className="border-2 border-green-500 shadow-md">
                      <CardContent className="p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="relative flex items-center gap-1.5 bg-green-500 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60 animate-ping" />
                            <span className="relative h-1.5 w-1.5 rounded-full bg-white" />
                            Live
                          </span>
                          <Badge className="bg-primary/10 text-primary border-primary/30 uppercase tracking-wider text-[10px]">
                            {liveEvent.category}
                          </Badge>
                        </div>
                        <h3 className="font-heading text-xl md:text-2xl font-black text-secondary uppercase tracking-tight mb-3">
                          {liveEvent.title}
                        </h3>
                        <div className="flex flex-col sm:flex-row gap-3 mb-4 text-sm text-foreground/70 font-medium">
                          <span className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-primary" />
                            {liveEvent.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={14} className="text-primary" />
                            {liveEvent.location}
                          </span>
                        </div>
                        {liveEvent.description && (
                          <p className="text-sm text-foreground/80 font-medium leading-relaxed mb-6">
                            {liveEvent.description}
                          </p>
                        )}
                        <Button
                          asChild
                          size="sm"
                          className="uppercase font-bold tracking-wide border-b-4 border-b-secondary/50 active:border-b-0 active:translate-y-1"
                        >
                          <Link href="/join">Volunteer for This Camp</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center text-muted-foreground text-sm font-medium">
                      No live event right now.
                    </div>
                  )}

                  {/* Upcoming events */}
                  {upcomingEvents.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Upcoming
                      </p>
                      {upcomingEvents.map((event) => (
                        <Card
                          key={event.title + event.date}
                          className="border border-brand-blue/40 bg-brand-blue/5"
                        >
                          <CardContent className="p-5">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <Badge className="bg-brand-blue text-white text-[9px] uppercase tracking-widest">
                                    Upcoming
                                  </Badge>
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground border border-border rounded-full px-2 py-0.5">
                                    {event.category}
                                  </span>
                                </div>
                                <p className="text-sm font-black text-secondary mt-1 leading-snug">
                                  {event.title}
                                </p>
                                <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-muted-foreground font-medium">
                                  <span className="flex items-center gap-1">
                                    <Calendar
                                      size={11}
                                      className="text-brand-blue"
                                    />
                                    {event.date}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MapPin
                                      size={11}
                                      className="text-brand-blue"
                                    />
                                    {event.location}
                                  </span>
                                </div>
                                {event.description && (
                                  <p className="text-xs text-foreground/70 mt-1.5 leading-relaxed">
                                    {event.description}
                                  </p>
                                )}
                              </div>
                              <Button
                                asChild
                                size="sm"
                                variant="outline"
                                className="text-xs uppercase font-bold tracking-wide shrink-0 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                              >
                                <Link href="/join">Join</Link>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right column: Past events — compact greyed cards, 1 of 3 columns */}
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                    Past Events
                  </p>
                  {pastEvents.length === 0 ? (
                    <p className="text-xs text-muted-foreground font-medium">
                      No past events yet.
                    </p>
                  ) : (
                    pastEvents.map((event) => (
                      <Card
                        key={event.title + event.date}
                        className="border border-border opacity-60"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-1">
                            <Badge
                              variant="outline"
                              className="text-[9px] uppercase tracking-wider text-muted-foreground border-muted-foreground/30"
                            >
                              Completed
                            </Badge>
                            <span className="text-[10px] text-muted-foreground font-medium">
                              {event.date}
                            </span>
                          </div>
                          <p className="text-sm font-bold text-foreground/60 mt-1 leading-snug">
                            {event.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                            <MapPin size={10} />
                            {event.location}
                          </p>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Section 1: Tribal & Community Health Camps */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl text-primary font-black uppercase tracking-tight">
            Tribal & Community Health Camps
          </h2>
          <div className="h-1 w-24 bg-primary mt-3 mx-auto rounded-full" />
          <p className="text-foreground/80 font-medium leading-relaxed max-w-2xl mx-auto mt-4">
            Year-round, our doctors and volunteers carry healthcare into
            villages that the system rarely reaches.
          </p>
        </div>
        <div className="rounded-xl overflow-hidden border border-border mb-8 h-56 md:h-72">
          {/* Stock placeholder — replace with a real SMSM photo of Devbandh camps */}
          <img
            src="https://images.unsplash.com/photo-1641465756589-dc84610af2d1?fm=jpg&q=80&w=2000&auto=format&fit=crop"
            alt="A man standing in a rural field, representing the tribal villages we serve"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tribalCamps.map((item) => (
            <Card
              key={item.title}
              className="border-t-4 border-t-primary hover:shadow-md transition-shadow"
            >
              <CardContent className="pt-8 pb-6 px-6">
                <item.icon
                  className="text-primary mb-4"
                  size={36}
                  strokeWidth={2}
                />
                <h3 className="font-heading text-lg font-black text-secondary mb-2 uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-foreground/80 font-medium leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 2: Disaster & Emergency Relief — brand-blue accent */}
      <section className="py-16 px-4 md:px-8 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl text-brand-blue font-black uppercase tracking-tight">
              Disaster & Emergency Relief
            </h2>
            <div className="h-1 w-24 bg-brand-blue mt-3 mx-auto rounded-full" />
            <p className="text-foreground/80 font-medium leading-relaxed max-w-2xl mx-auto mt-4">
              When disaster strikes, our teams mobilise quickly to provide
              emergency medical care to affected communities.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden border border-border mb-8 h-56 md:h-72 bg-muted">
            {/* TODO: replace with a real SMSM disaster relief photo */}
            <img
              src="/activities-disaster-relief.webp"
              alt="Medical volunteers providing emergency aid to a disaster-affected community"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {disasterRelief.map((item) => (
              <Card
                key={item.title}
                className="border-t-4 border-t-brand-blue hover:shadow-md transition-shadow bg-white"
              >
                <CardContent className="pt-8 pb-6 px-6">
                  <item.icon
                    className="text-brand-blue mb-4"
                    size={32}
                    strokeWidth={2}
                  />
                  <h3 className="font-heading text-base font-black text-secondary mb-2 uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground/80 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Education & Awareness */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl text-primary font-black uppercase tracking-tight">
            Education & Awareness
          </h2>
          <div className="h-1 w-24 bg-primary mt-3 mx-auto rounded-full" />
          <p className="text-foreground/80 font-medium leading-relaxed max-w-2xl mx-auto mt-4">
            Healthcare and education go hand in hand — we invest in both.
          </p>
        </div>
        <div className="rounded-xl overflow-hidden border border-border mb-8 h-56 md:h-72">
          {/* Stock placeholder — replace with a real SMSM school programme photo */}
          <img
            src="https://images.unsplash.com/photo-1673146416489-98c2e139f680?fm=jpg&q=80&w=2000&auto=format&fit=crop"
            alt="A group of people gathered outside a school building"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {educationInitiatives.map((item) => (
            <Card
              key={item.title}
              className="border-t-4 border-t-primary hover:shadow-md transition-shadow"
            >
              <CardContent className="pt-8 pb-6 px-6">
                <item.icon
                  className="text-primary mb-4"
                  size={32}
                  strokeWidth={2}
                />
                <h3 className="font-heading text-base font-black text-secondary mb-2 uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-foreground/80 font-medium leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 4: Aarogyawari — Pandharpur Wari Service (heritage palette) */}
      <section
        className="py-16 px-4 md:px-8"
        style={{
          backgroundColor: "#E6E2D3",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a93200' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#a93200]/10 text-[#a93200] border-[#a93200]/30 uppercase tracking-widest text-xs">
              Since 1984
            </Badge>
            <h2 className="font-heading text-3xl md:text-4xl text-[#a93200] font-black uppercase tracking-tight">
              Aarogyawari — The Pandharpur Wari Service
            </h2>
            <div className="h-1.5 w-32 bg-[#F39C12] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 rounded-none border border-[rgba(140,98,57,0.2)] shadow-sm bg-white">
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

            <Card className="rounded-none border border-[rgba(140,98,57,0.2)] shadow-sm bg-white">
              <CardContent className="p-8">
                <h3 className="font-heading text-xl font-black text-[#6D1B13] mb-3">
                  Where Help Is Needed Most
                </h3>
                <p className="text-[#333333] text-sm leading-relaxed font-medium">
                  Our first camp sits between Dive Ghat and Saswad — one of the
                  most physically demanding stretches, where steep daytime
                  climbs cause the greatest strain. After Natepute, many
                  pilgrims face fatigue, muscle pain, respiratory issues,
                  infections, fever, and high blood pressure. Our doctors and
                  volunteers are there to meet that need.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button
              asChild
              variant="outline"
              className="uppercase font-bold tracking-wide border-[#a93200] text-[#a93200] hover:bg-[#a93200] hover:text-white"
            >
              <Link href="/activities/aarogyawari">
                Learn More About Aarogyawari
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 md:px-8 bg-secondary text-white text-center border-t-4 border-primary">
        <h2 className="font-heading text-3xl font-black uppercase tracking-tight mb-4">
          Support Our Work
        </h2>
        <p className="text-white/80 max-w-xl mx-auto mb-8 font-medium">
          Every camp, every check-up, every relief effort is made possible by
          people like you. Donate, volunteer, or get in touch to learn more.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="uppercase font-bold tracking-wide border-b-4 border-b-primary/50 active:border-b-0 active:translate-y-1"
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
      </section>
    </>
  );
}
