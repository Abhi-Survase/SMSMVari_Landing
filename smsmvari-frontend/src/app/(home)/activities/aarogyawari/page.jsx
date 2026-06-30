// app/(home)/activities/aarogyawari/page.jsx
// Server component — exports metadata, no "use client" needed

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Footprints,
  Milk,
  Stethoscope,
  Scissors,
  MapPin,
  Mountain,
  Wind,
  Droplet,
  HeartPulse,
  Users,
} from "lucide-react";

export const metadata = {
  title: "Aarogyawari | Health Pilgrimage Service — Sahyadri Manav Seva Manch",
  description:
    "Since 1984, Sahyadri Manav Seva Manch has organised Aarogyawari — medical camps along the 250 km Alandi to Pandharpur pilgrimage, providing milk distribution, medical examinations, treatment, and surgery referrals to thousands of Warkari devotees.",
  keywords: [
    "Aarogyawari",
    "Pandharpur Wari medical camp",
    "Alandi to Pandharpur pilgrimage healthcare",
    "Warkari medical aid",
    "Dive Ghat Saswad medical camp",
    "Ashadhi Ekadashi healthcare",
    "Sahyadri Manav Seva Manch Aarogyawari",
  ],
  openGraph: {
    title: "Aarogyawari — Our Health Pilgrimage Service",
    description:
      "250 km. 21 days. Since 1984. Medical camps along the sacred Pandharpur Wari route, caring for thousands of Warkari devotees every Ashadhi Ekadashi.",
    type: "website",
    url: "https://smsmvari.com/activities/aarogyawari",
    siteName: "Sahyadri Manav Seva Manch",
    images: [
      {
        url: "/og-aarogyawari.webp", // TODO: create a 1200×630 OG image
        width: 1200,
        height: 630,
        alt: "Thousands of Warkari pilgrims in procession during the Pandharpur Wari",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aarogyawari — Our Health Pilgrimage Service",
    description:
      "Medical camps along the sacred Pandharpur Wari route, caring for thousands of Warkari devotees every Ashadhi Ekadashi since 1984.",
    images: ["/og-aarogyawari.webp"],
  },
  alternates: { canonical: "https://smsmvari.com/activities/aarogyawari" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Aarogyawari — Pandharpur Wari Health Pilgrimage Service",
  description:
    "Medical camps and healthcare support organised along the 250 km Alandi to Pandharpur pilgrimage route every Ashadhi Ekadashi, continuously since 1984.",
  url: "https://smsmvari.com/activities/aarogyawari",
  location: {
    "@type": "Place",
    name: "Alandi to Pandharpur Pilgrimage Route, Maharashtra, India",
  },
  organizer: {
    "@type": "NGO",
    name: "Sahyadri Manav Seva Manch, Thane",
    alternateName: "SMSM Vari",
    url: "https://smsmvari.com",
  },
};

const offerings = [
  {
    icon: Milk,
    title: "Milk Distribution",
    description:
      "Nourishment for pilgrims walking long stretches with little access to food or rest, distributed directly at our camps.",
  },
  {
    icon: Stethoscope,
    title: "Medical Examinations",
    description:
      "Doctors and paramedics screen pilgrims for fatigue, infections, blood pressure issues, and other conditions common on the route.",
  },
  {
    icon: HeartPulse,
    title: "On-the-Spot Treatment",
    description:
      "Wound care, hydration support, and treatment for fever, chest infections, and muscle pain — delivered where pilgrims need it.",
  },
  {
    icon: Scissors,
    title: "Surgery Referrals",
    description:
      "When a condition needs more than our camps can provide, we refer and coordinate further treatment and surgery.",
  },
];

const routePoints = [
  {
    icon: Mountain,
    title: "Dive Ghat – Saswad",
    tag: "First Camp",
    description:
      "One of the most physically demanding stretches of the entire pilgrimage. Pilgrims cross steep inclines during the heat of the day, and the added physical strain creates the greatest need for medical assistance on the route. Our first camp is set up here to meet that need head-on.",
  },
  {
    icon: MapPin,
    title: "Saswad & Phaltan",
    tag: "Core Camps",
    description:
      "Our dedicated medical camps near Saswad and Phaltan are where most pilgrims receive milk distribution, examinations, treatment, and — where needed — referrals for surgery.",
  },
  {
    icon: Wind,
    title: "After Natepute",
    tag: "Recovery Stretch",
    description:
      "Past Natepute, fatigue catches up with many pilgrims. Leg pain, muscle pain, respiratory issues, and infections of the eyes, ears, and skin become common, alongside fever, chest infections, and occasionally high blood pressure. Our doctors and volunteers are stationed here to respond.",
  },
];

export default function AarogyawariPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero — full heritage treatment */}
      <section
        className="py-20 px-4 md:px-8 border-b-4"
        style={{
          backgroundColor: "#6D1B13",
          borderColor: "#F39C12",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23F39C12' fill-opacity='0.06' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="mb-4 bg-[#F39C12]/15 text-[#F39C12] border-[#F39C12]/40 uppercase tracking-widest text-xs">
            Since 1984
          </Badge>
          <h1 className="font-heading text-4xl md:text-6xl font-black uppercase tracking-tight mb-4 text-white">
            Aarogyawari
          </h1>
          <p className="text-[#F39C12] font-bold uppercase tracking-widest text-sm mb-6">
            Health Pilgrimage Service
          </p>
          <p className="text-white/85 text-lg md:text-xl font-medium leading-relaxed">
            Every year during Ashadhi Ekadashi, thousands of Warkari devotees
            walk from Alandi to Pandharpur for the darshan of Lord Vitthal. We
            walk alongside them — with milk, medicine, and care.
          </p>
        </div>
      </section>

      {/* Stats row */}
      <section className="bg-muted/40 border-b border-border py-10 px-4 md:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: Footprints, value: "250 km", label: "Route Covered" },
            { icon: MapPin, value: "21 Days", label: "Continuous Service" },
            { icon: Users, value: "Since 1984", label: "Every Single Year" },
            { icon: HeartPulse, value: "Age 50+", label: "Many Devotees" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <Icon className="text-primary" size={28} strokeWidth={2} />
              <p className="font-heading text-2xl md:text-3xl font-black text-secondary">
                {value}
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* The Journey — context */}
      <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto text-center">
        <h2 className="font-heading text-3xl md:text-4xl text-[#a93200] font-black uppercase tracking-tight mb-4">
          A Journey of Faith
        </h2>
        <div className="h-1.5 w-24 bg-[#F39C12] mx-auto mb-6" />
        <p className="text-foreground/80 font-medium leading-relaxed mb-4">
          Many of the Warkaris undertaking this pilgrimage are 50 years of age
          or older, testing their physical strength and endurance over 250
          kilometres on foot. Along the way, they face adverse weather, lack of
          water, and exposure to disease — yet they continue with unwavering
          devotion.
        </p>
        <p className="text-foreground/80 font-medium leading-relaxed">
          Aarogyawari exists for this reason alone: so that no Warkari has to
          choose between their faith and their health. This initiative has run
          continuously since 1984, and continues to enjoy enthusiastic
          participation from people of all age groups — both pilgrims and
          volunteers.
        </p>
      </section>

      {/* What We Provide */}
      <section className="py-16 px-4 md:px-8 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl text-primary font-black uppercase tracking-tight">
              What We Provide
            </h2>
            <div className="h-1 w-24 bg-primary mt-3 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offerings.map((item) => (
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
        </div>
      </section>

      {/* The Route — camp by camp */}
      <section
        className="py-16 px-4 md:px-8"
        style={{
          backgroundColor: "#E6E2D3",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a93200' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl text-[#a93200] font-black uppercase tracking-tight">
              Along the Route
            </h2>
            <div className="h-1.5 w-24 bg-[#F39C12] mx-auto mt-4" />
            <p className="text-[#333333]/80 font-medium leading-relaxed max-w-2xl mx-auto mt-4">
              From Dive Ghat to Pandharpur, our camps are placed exactly where
              the journey gets hardest.
            </p>
          </div>

          <div className="space-y-6">
            {routePoints.map((point, index) => (
              <Card
                key={point.title}
                className="rounded-none border border-[rgba(140,98,57,0.2)] shadow-sm bg-white"
              >
                <CardContent className="p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex items-center gap-3 sm:w-56 shrink-0">
                      <point.icon
                        className="text-[#6D1B13]"
                        size={32}
                        strokeWidth={2}
                      />
                      <div>
                        <Badge className="bg-[#F39C12]/15 text-[#a93200] border-[#F39C12]/40 uppercase tracking-wider text-[10px] mb-1">
                          {point.tag}
                        </Badge>
                        <h3 className="font-heading text-lg font-black text-[#6D1B13] leading-tight">
                          {point.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-[#333333] text-sm leading-relaxed font-medium">
                      {point.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Droplet quote / closing thought */}
      <section className="py-16 px-4 md:px-8 max-w-3xl mx-auto text-center">
        <Droplet
          className="text-primary mx-auto mb-4"
          size={36}
          strokeWidth={2}
        />
        <p className="text-xl md:text-2xl text-foreground/90 font-semibold italic leading-relaxed">
          Despite adverse weather, lack of water, and the risk of disease, they
          continue their journey with devotion. We are simply here to make sure
          that devotion doesn't come at the cost of their health.
        </p>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 md:px-8 bg-secondary text-white text-center border-t-4 border-primary">
        <h2 className="font-heading text-3xl font-black uppercase tracking-tight mb-4">
          Be Part of Aarogyawari
        </h2>
        <p className="text-white/80 max-w-xl mx-auto mb-8 font-medium">
          Every camp along the route runs on volunteers and donors who believe
          no pilgrim should walk this journey alone. Join us, or help fund the
          next camp.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="uppercase font-bold tracking-wide border-b-4 border-b-primary/50 active:border-b-0 active:translate-y-1"
          >
            <Link href="/join">Join the Mission</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="uppercase font-bold tracking-wide bg-transparent border-white text-white hover:bg-white hover:text-secondary"
          >
            <Link href="/donate">Donate Now</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
