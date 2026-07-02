// app/(home)/activities/EventsSection.jsx
// ─── Client component — keeps "use client" isolated so activities/page.jsx
//     can remain a server component and export metadata.
"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Radio } from "lucide-react";

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
// ^ uncomment when activating the fetch block below

// ── Skeleton ─────────────────────────────────────────────────────────────────

function EventsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      {/* Left column skeleton — 2 of 3 */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        {/* Live event card skeleton */}
        <Card className="animate-pulse border-2 border-muted">
          <CardContent className="p-6 md:p-8 space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-5 w-14 rounded-full bg-muted" />
              <div className="h-5 w-28 rounded-full bg-muted" />
            </div>
            <div className="h-6 w-3/4 rounded bg-muted" />
            <div className="flex gap-4">
              <div className="h-4 w-28 rounded bg-muted" />
              <div className="h-4 w-36 rounded bg-muted" />
            </div>
            <div className="h-3.5 w-full rounded bg-muted" />
            <div className="h-3.5 w-5/6 rounded bg-muted" />
            <div className="h-9 w-40 rounded bg-muted mt-2" />
          </CardContent>
        </Card>
        {/* Upcoming label + card skeleton */}
        <div className="flex flex-col gap-3">
          <div className="h-3 w-20 rounded bg-muted" />
          <Card className="animate-pulse">
            <CardContent className="p-5 space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="h-4 w-20 rounded-full bg-muted" />
                <div className="h-4 w-24 rounded-full bg-muted" />
              </div>
              <div className="h-4 w-2/3 rounded bg-muted" />
              <div className="flex gap-3">
                <div className="h-3.5 w-24 rounded bg-muted" />
                <div className="h-3.5 w-32 rounded bg-muted" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right column skeleton — 1 of 3 */}
      <div className="flex flex-col gap-3">
        <div className="h-3 w-20 rounded bg-muted" />
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className="animate-pulse border border-border opacity-60"
          >
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="h-3.5 w-16 rounded-full bg-muted" />
                <div className="h-3.5 w-16 rounded bg-muted" />
              </div>
              <div className="h-4 w-3/4 rounded bg-muted" />
              <div className="h-3 w-1/2 rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── Hardcoded events — replace with fetch block below when API is ready ──────
// status: "LIVE" | "UPCOMING" | "COMPLETED"
const STATIC_EVENTS = [
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

// ── Main component ────────────────────────────────────────────────────────────

export default function EventsSection() {
  // ── TODO: swap to fetch block when /api/v1/events is ready ───────────────
  // Step 1: delete the two lines below (STATIC_EVENTS assignment + loading false)
  // Step 2: uncomment the useState/useEffect block beneath them
  // ─────────────────────────────────────────────────────────────────────────
  const [events, setEvents] = useState(STATIC_EVENTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   // TODO: confirm GET events endpoint path with backend
  //   fetch(`${BASE_URL}/api/v1/events`)
  //     .then((res) => {
  //       if (!res.ok) throw new Error();
  //       return res.json();
  //     })
  //     .then((data) => {
  //       // TODO: confirm response shape — assuming array or { events: [] }
  //       setEvents(Array.isArray(data) ? data : (data.events ?? []));
  //     })
  //     .catch(() => setError(true))
  //     .finally(() => setLoading(false));
  // }, []);

  const liveEvent = events.find((e) => e.status === "LIVE");
  const upcomingEvents = events.filter((e) => e.status === "UPCOMING");
  const pastEvents = events.filter((e) => e.status === "COMPLETED");

  return (
    <section className="py-14 px-4 md:px-8 bg-muted/30 border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Radio className="text-primary" size={22} strokeWidth={2} />
          <h2 className="font-heading text-2xl md:text-3xl text-primary font-black uppercase tracking-tight">
            Events
          </h2>
        </div>

        {/* Loading skeleton */}
        {loading && <EventsSkeleton />}

        {/* Error state */}
        {!loading && error && (
          <div className="border-2 border-dashed border-border rounded-lg p-10 text-center text-muted-foreground text-sm font-medium">
            Could not load events. Please try again later.
          </div>
        )}

        {/* Events grid */}
        {!loading && !error && (
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
                                <MapPin size={11} className="text-brand-blue" />
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

            {/* Right column: Past events */}
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
        )}
      </div>
    </section>
  );
}
