// app/(home)/about/page.jsx
// Server component — exports metadata, no "use client" needed

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About Us | SMSM Vari – Sahyadri Manav Seva Manch Vari Trust",
  description:
    "Learn about Sahyadri Manav Seva Manch Vari Trust — our mission to provide free medical care, wound management, and emergency response to Varkaris during the Pandharpur Wari.",
  keywords: [
    "Sahyadri Manav Seva Manch Vari Trust",
    "SMSM Vari about",
    "Pandharpur Wari NGO",
    "Varkari medical trust Maharashtra",
    "Wari healthcare organisation",
  ],
  openGraph: {
    title: "About SMSM Vari – Serving Varkaris Since Our Founding",
    description:
      "We set up medical camps, wound-care stations, and ambulance units along the 250 km Pandharpur Wari route every Aashad Ekadashi.",
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
    title: "About SMSM Vari – Serving Varkaris Since Our Founding",
    description:
      "We set up medical camps, wound-care stations, and ambulance units along the 250 km Pandharpur Wari route every Aashad Ekadashi.",
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
      "Every decision is guided by one principle: serve the devotee. We place no condition on the care we provide.",
  },
  {
    icon: "verified",
    title: "Medical Excellence",
    description:
      "Trained doctors, nurses, and paramedics deliver standardised protocols, not ad-hoc help.",
  },
  {
    icon: "groups",
    title: "Community Driven",
    description:
      "Our volunteers are drawn from local communities who walk alongside the Varkaris they serve.",
  },
  {
    icon: "transparency",
    title: "Transparency",
    description:
      "Every donation is accounted for. We publish yearly impact reports so you can see exactly where your support goes.",
  },
];

export default function AboutUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Page Hero */}
      <section className="bg-secondary text-white py-16 px-4 md:px-8 border-b-4 border-primary">
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 uppercase tracking-widest text-xs">
            Our Story
          </Badge>
          <h1 className="font-heading text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">
            About SMSM Vari
          </h1>
          <p className="text-white/80 text-lg font-medium leading-relaxed">
            Sahyadri Manav Seva Manch Vari Trust was born from a simple
            conviction: that every Varkari who undertakes the sacred 250 km
            Pandharpur Wari deserves access to dignified, professional medical
            care — free of charge.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-primary font-black uppercase tracking-tight mb-4">
              Our Mission
            </h2>
            <div className="h-1 w-20 bg-primary mb-6 rounded-full" />
            <p className="text-foreground/80 font-medium leading-relaxed mb-4">
              {/* TODO: replace with actual mission statement from the trust */}
              We mobilise medical professionals, trained volunteers, and
              essential supplies to set up camps at key points along the Wari
              route every Aashad Ekadashi. From basic first aid and wound care
              for bare feet to emergency ambulance response, our teams are
              present wherever the procession walks.
            </p>
            <p className="text-foreground/80 font-medium leading-relaxed">
              The Wari is not just a pilgrimage — it is a 21-day act of devotion
              in gruelling conditions. We exist so that no Varkari has to choose
              between faith and health.
            </p>
          </div>
          <div className="bg-muted rounded-xl overflow-hidden border border-border aspect-video">
            {/* TODO: replace with an actual photo from the trust */}
            <img
              src="/heritage1.webp"
              // alt="SMSM Vari volunteers treating Varkaris at a medical camp along the Wari route"
              alt="Varkaris chanting during vaari"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 md:px-8 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl text-secondary font-black uppercase tracking-tight">
              What We Stand For
            </h2>
            <div className="h-1 w-24 bg-primary mt-3 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <Card
                key={v.title}
                className="border-t-4 border-t-primary hover:shadow-md transition-shadow"
              >
                <CardContent className="pt-8 pb-6 px-6">
                  <span
                    className="material-symbols-outlined text-primary text-4xl mb-4 block"
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
            ))}
          </div>
        </div>
      </section>

      {/* Leadership — reused from homepage, centralised here for the About page */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl text-primary font-black uppercase tracking-tight">
            Our Leadership
          </h2>
          <div className="h-1 w-24 bg-primary mt-3 mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {[
            {
              name: "Dr. Anjali Deshmukh",
              role: "Managing Trustee & CMO",
              bio: "With over 25 years of experience in public health, Dr. Deshmukh coordinates the entire medical strategy for the Wari route, ensuring standardised care protocols across all camps.",
              img: "/cmo_image.webp",
            },
            {
              name: "Mr. Prakash Patil",
              role: "Trustee & Logistics Head",
              bio: "A veteran in large-scale event management, Mr. Patil oversees the complex logistics of setting up mobile camps, supply chains, and volunteer deployment across the 250 km stretch.",
              img: "/log-head_image.webp",
            },
          ].map((person) => (
            <Card
              key={person.name}
              className="border-t-4 border-t-primary shadow-md"
            >
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
                    <p className="text-xs text-primary font-bold uppercase tracking-wider mt-1">
                      {person.role}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-foreground/80 mt-6 font-medium leading-relaxed">
                  {person.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 md:px-8 bg-secondary text-white text-center border-t-4 border-primary">
        <h2 className="font-heading text-3xl font-black uppercase tracking-tight mb-4">
          Join the Mission
        </h2>
        <p className="text-white/80 max-w-xl mx-auto mb-8 font-medium">
          Whether you donate, volunteer, or simply spread the word — every act
          of support keeps a Varkari safe on their sacred journey.
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
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
