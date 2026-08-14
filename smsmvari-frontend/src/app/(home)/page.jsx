import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoveRight } from "lucide-react";
import QrSection from "@/components/QrSection";
import Image from "next/image";
import Link from "next/link";

// ── Motion components (client components, imported into this server component)
import HeroSection from "@/components/HeroSection";
import FadeUp from "@/components/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/StaggerChildren";
import AnimatedStatCards from "@/components/AnimatedStatCards";

export const metadata = {
  title: "Sahyadri Manav Seva Manch – Healthcare Without Boundaries",
  description:
    "Sahyadri Manav Seva Manch, Thane provides free medical care to remote tribal villages, disaster-affected communities, and pilgrims across Maharashtra — including the annual Aarogyawari service during the Pandharpur Wari.",
  keywords: [
    "Sahyadri Manav Seva Manch",
    "tribal health camp Maharashtra",
    "disaster relief NGO Maharashtra",
    "Pandharpur Wari medical camp",
    "Aarogyawari",
    "Varkari healthcare",
    "SMSM Vari",
  ],
  openGraph: {
    title: "Sahyadri Manav Seva Manch – Healthcare Without Boundaries",
    description:
      "Free medical care for remote tribal villages, disaster-affected communities, and pilgrims across Maharashtra since 1982.",
    type: "website",
    url: "https://smsmvari.com",
    siteName: "Sahyadri Manav Seva Manch",
    images: [
      {
        url: "/camp_services.webp",
        width: 768,
        height: 371,
        alt: "Thousands of Varkaris in procession during the Pandharpur Wari",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahyadri Manav Seva Manch – Healthcare Without Boundaries",
    description:
      "Free medical care for remote tribal villages, disaster-affected communities, and pilgrims across Maharashtra since 1982.",
    images: ["/medical_camps.webp"],
  },
  alternates: { canonical: "https://smsmvari.com" },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Sahyadri Manav Seva Manch, Thane",
  alternateName: "SMSM Vari",
  url: "https://smsmvari.com",
  description:
    "Providing free medical care to remote tribal villages, disaster-affected communities, and pilgrims across Maharashtra since 1982, including the annual Aarogyawari service during the Pandharpur Wari.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "[Office Address], Thane", // TODO: confirm with the trust
    addressLocality: "Thane",
    addressRegion: "Maharashtra",
    postalCode: "400601",
    addressCountry: "IN",
  },
  telephone: "+912186235550", // TODO: confirm with the trust
  areaServed: "Maharashtra, India",
  knowsAbout: [
    "Tribal healthcare",
    "Disaster relief medical aid",
    "School health camps",
    "Pandharpur Wari",
    "Varkari pilgrimage",
    "Emergency medical care",
    "Wound management",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <div className="font-sans text-foreground min-h-screen flex flex-col bg-background textured-bg">
        <main className="grow">
          {/* ── Hero ────────────────────────────────────────────────────────
              Extracted to HeroSection.jsx (client component).
              h1 → p → buttons arrive with a 140ms stagger on mount.
              The CTA button carries the heartbeat pulse (CSS, globals.css).
          ─────────────────────────────────────────────────────────────────── */}
          <HeroSection />

          {/* ── The Wari Section (Bento Grid) ────────────────────────────
              Collapsed from 5 nested layers (page texture > div texture >
              main > section > Card) to 2: one textured section, content
              sits directly on it. DESIGN.md: texture OR cards, never both.
              The white Card that used to hold "A Journey of Faith" is gone —
              the maroon rule + serif heading + pull-quote now carry the
              same hierarchy the card border used to fake. ─────────────── */}
          <section
            className="font-sans text-foreground py-16 px-4 md:px-8"
            style={{
              backgroundColor: "#E6E2D3",
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a93200' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
            }}
          >
            <div className="max-w-7xl mx-auto">
              {/* Section heading — left-aligned per DESIGN.md, breaking the
                  page's default center-alignment habit */}
              <FadeUp className="mb-10  text-center">
                <h2 className="font-heading text-4xl md:text-5xl text-secondary font-bold">
                  सह्याद्री मानव सेवा मंचची आरोग्यवारी
                </h2>
                <div className="h-1.5 w-32 bg-[#F39C12] mx-auto mt-4" />
              </FadeUp>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
                {/* Main copy — no card, no border, no white surface. It sits
                    directly on the parchment texture; the maroon rule above
                    the heading is the only structural device it needs. */}
                <FadeUp className="md:col-span-8" delay={0.08}>
                  <Card className="rounded-none border border-secondary shadow-sm relative overflow-hidden bg-white h-full">
                    <div className="h-1.5 w-full bg-[#a93200] absolute top-0 left-0" />
                    <CardContent className="p-8 pt-10">
                      <div className="flex items-center gap-3 mb-6 text-[#6D1B13]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="48"
                          viewBox="0 0 24 24"
                          width="48"
                          fill="#F39C12"
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7" />
                        </svg>
                        <h3 className="text-3xl translate-y-1.5">
                          A Journey of Faith
                        </h3>
                      </div>
                      <p className="text-foreground text-lg leading-relaxed mb-6 font-medium max-w-2xl">
                        Thousands of people called varkari reach Pandharpur from
                        Alandi and Dehu after walking for about 250km in Aashad
                        Ekadashi. They walk with palkhis carrying padukas of the
                        saints singing sacred songs. Warkari is a sampradaya
                        within the bhakti spiritual tradition of Hinduism,
                        geographically associated with the Indian state of
                        Maharashtra. Warkaris worship Vitthal, the presiding
                        deity of Pandharpur, regarded as a form of Krishna.
                      </p>
                      <blockquote className="text-foreground/80 leading-relaxed border-l-4 border-[#F39C12] pl-6 italic text-md font-medium max-w-2xl">
                        This walk is not just an escape from reality for lakhs
                        of people. It is something that keeps them focused and
                        connected to a power bigger than them. People spend 21
                        days on the road withering bad weather with no
                        luxuries... This is not a walk of blind faith, but the
                        Pandharpur Waari is a walk of love and showing respect
                        to Lord Vitthal.
                      </blockquote>
                    </CardContent>
                  </Card>
                </FadeUp>

                {/* Stat cards — scale reveal + count-up numbers */}
                <AnimatedStatCards />
              </div>
            </div>
          </section>

          {/* ── Mission in Action ───────────────────────────────────────── */}
          <section className="py-16 px-4 md:px-8 bg-muted/30 border-y border-border">
            <div className="max-w-7xl mx-auto">
              <FadeUp className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
                <div>
                  <h2 className="text-3xl md:text-4xl text-secondary font-semibold">
                    Mission in Action
                  </h2>
                  <div className="h-1 w-24 bg-primary mt-2 rounded-full" />
                </div>
                <Button
                  asChild
                  variant="link"
                  className="text-primary font-bold uppercase tracking-wide px-0 mt-4 md:mt-0 group"
                >
                  <Link href="/activities">
                    <span className="group-hover:underline">
                      View All Services
                    </span>{" "}
                    <MoveRight
                      strokeWidth={3}
                      className="ml-1 group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </Button>
              </FadeUp>

              {/* Cards stagger in 100ms apart as the grid enters the viewport */}
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StaggerItem>
                  <Card className="flex flex-col overflow-hidden group cursor-pointer border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                    <div className="h-1 w-full bg-secondary" />
                    <div className="h-48 relative overflow-hidden shrink-0">
                      <Badge className="absolute top-3 left-3 z-10 bg-primary hover:bg-primary uppercase font-bold tracking-wider">
                        Since 1984
                      </Badge>
                      <Image
                        src="/initiative.webp"
                        alt="Aarogyawari Initiative"
                        width={653}
                        height={315}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 text-primary">
                        <span
                          className="material-symbols-outlined"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          diversity_1
                        </span>
                        <CardTitle className="font-heading text-xl">
                          The Aarogyawari Initiative
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col grow">
                      <CardDescription className="text-foreground/80 mb-4 grow text-base">
                        Since 1984, the organization has continuously conducted
                        this Health Pilgrimage Service during Ashadhi Ekadashi.
                        We provide dedicated healthcare and support services for
                        the thousands of Warkari devotees walking from Alandi to
                        Pandharpur.
                      </CardDescription>
                      <Link href="/about">
                        <div className="w-full border-t border-border mt-auto pt-4 flex justify-between items-center text-secondary font-bold text-sm uppercase">
                          Read More
                          <span className="material-symbols-outlined">
                            chevron_right
                          </span>
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                </StaggerItem>

                <StaggerItem>
                  <Card className="flex flex-col overflow-hidden group cursor-pointer border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                    <div className="h-1 w-full bg-primary" />
                    <div className="h-48 relative overflow-hidden shrink-0">
                      <Image
                        src="/camp_services.webp"
                        alt="Camp Locations"
                        width={768}
                        height={371}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 text-primary">
                        <span
                          className="material-symbols-outlined"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          location_on
                        </span>
                        <CardTitle className="font-heading text-xl">
                          Strategic Camp Locations
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col grow">
                      <CardDescription className="text-foreground/80 mb-4 grow text-base">
                        Medical camps are set up near Saswad and Phaltan. Our
                        first camp is positioned between Dive Ghat and Saswad to
                        assist pilgrims crossing steep inclines, and we continue
                        providing support after they cross Natepute.
                      </CardDescription>
                      <div className="w-full border-t border-border mt-auto pt-4 flex justify-between items-center text-secondary font-bold text-sm uppercase">
                        View Locations{" "}
                        <span className="material-symbols-outlined">
                          chevron_right
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>

                <StaggerItem>
                  <Card className="flex flex-col overflow-hidden group cursor-pointer border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                    <div className="h-1 w-full bg-brand-blue" />
                    <div className="h-48 relative overflow-hidden shrink-0">
                      <Badge className="absolute top-3 left-3 z-10 uppercase font-bold tracking-wider bg-brand-blue text-white hover:bg-brand-blue">
                        24/7 Active
                      </Badge>
                      <Image
                        src="/medical_camps.webp"
                        alt="Comprehensive Care & Services"
                        width={750}
                        height={446}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 text-brand-blue">
                        <span
                          className="material-symbols-outlined"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          health_and_safety
                        </span>
                        <CardTitle className="font-heading text-xl">
                          Comprehensive Care & Services
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col grow">
                      <CardDescription className="text-foreground/80 mb-4 grow text-base">
                        Volunteers provide milk distribution, medical
                        examinations, treatment, and referrals for surgeries.
                        Our dedicated doctors treat conditions such as severe
                        fatigue, muscle pain, respiratory issues, fever, and
                        various infections.
                      </CardDescription>
                      <div className="w-full border-t border-border mt-auto pt-4 flex justify-between items-center text-brand-blue font-bold text-sm uppercase">
                        Volunteer{" "}
                        <span className="material-symbols-outlined">
                          chevron_right
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </section>

          <QrSection />

          {/* ── Become a Volunteer ──────────────────────────────────────── */}
          <section className="py-16 px-4 md:px-8 bg-secondary border-t-4 border-primary">
            <div className="max-w-6xl mx-auto">
              <FadeUp className="text-center mb-10">
                <span
                  className="material-symbols-outlined text-primary text-5xl mb-3 block"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  volunteer_activism
                </span>
                <h2 className="text-3xl md:text-4xl text-white font-semibold mb-4">
                  Become a Volunteer
                </h2>
                <p className="text-white/80 text-lg font-medium leading-relaxed max-w-2xl mx-auto">
                  Every camp we run depends on people who choose to show up.
                  Doctors, nurses, students, and dedicated citizens — there is a
                  place for you here.
                </p>
              </FadeUp>

              {/* Role cards stagger in */}
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                {[
                  {
                    icon: "medical_services",
                    title: "Medical Professionals",
                    description:
                      "Lend your skills at tribal camps, disaster sites, and along the Wari route.",
                  },
                  {
                    icon: "groups",
                    title: "Field Volunteers",
                    description:
                      "Help with camp logistics, supply distribution, and on-ground coordination.",
                  },
                  {
                    icon: "school",
                    title: "Education & Outreach",
                    description:
                      "Support school health check-ups, awareness lectures, and material distribution.",
                  },
                ].map(({ icon, title, description }) => (
                  <StaggerItem key={title}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6 text-center h-full">
                      <span
                        className="material-symbols-outlined text-primary text-3xl mb-3 block"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {icon}
                      </span>
                      <h3 className="font-sans text-base font-bold text-white mb-2 uppercase tracking-wide">
                        {title}
                      </h3>
                      <p className="text-sm text-white/70 font-medium leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <div className="text-center">
                <Button
                  asChild
                  size="lg"
                  className="uppercase font-bold tracking-wide border-b-4 border-b-primary/50 active:border-b-0 active:translate-y-1"
                >
                  <Link href="/join">Join the Mission</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* ── Leadership ────────────────────────────────────────────────
              Same parchment tint as the Wari section but WITHOUT the dot
              texture — that texture is the Wari section's signature; two
              sections with identical treatment reads as one motif diluted
              rather than two considered choices. Differentiated by a plain
              tint and a border instead. Grid now uses the same 12-col
              asymmetric idiom as the Wari section (there 8/4, here 5/7) so
              the page has one consistent bento logic, not a one-off. ──── */}
          <div
            className="w-full border-t border-[rgba(140,98,57,0.2)]"
            style={{ backgroundColor: "#E6E2D3" }}
          >
            <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                {/* Intro column fades up */}
                <FadeUp className="md:col-span-5">
                  <h2 className="text-3xl md:text-4xl text-primary font-semibold mb-4">
                    Our Leadership
                  </h2>
                  <p className="text-foreground/80 mb-6 font-medium">
                    Guided by steadfast devotion and professional excellence,
                    our trustees ensure that every donation translates directly
                    into impactful medical aid — for tribal villages,
                    disaster-affected communities, and Varkaris alike.
                  </p>
                  <div className="bg-white/60 backdrop-blur-sm p-6 rounded-lg border-l-4 border-l-primary shadow-sm">
                    <span
                      className="material-symbols-outlined text-primary text-4xl mb-2 opacity-50"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      format_quote
                    </span>
                    <p className="font-heading italic text-secondary font-medium text-lg leading-snug">
                      Service to those in need is service to the divine. We
                      strive to provide the highest standard of care wherever
                      our communities need us most.
                    </p>
                  </div>
                </FadeUp>

                {/* Trustee cards stagger in after the intro column */}
                <StaggerContainer className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <StaggerItem>
                    <Card className="flex flex-col shadow-sm border-border bg-white h-full">
                      <CardContent className="p-6 pt-8 grow">
                        <div className="flex items-start gap-4">
                          <div className="w-20 h-20 bg-muted rounded-full overflow-hidden border-2 border-secondary shrink-0">
                            <Image
                              src="/cmo_image.webp"
                              alt="Dr. Anjali Deshmukh"
                              width={256}
                              height={256}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-heading text-xl text-secondary font-bold">
                              Dr. Anjali K. Deshmukh
                            </h4>
                            <p className="text-xs text-brand-blue font-bold uppercase tracking-wider mt-1">
                              Managing Trustee & CMO
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-foreground/80 mt-6 font-medium leading-relaxed">
                          With over 25 years of experience in public health, Dr.
                          Deshmukh coordinates the organisation's entire medical
                          strategy, ensuring standardised care protocols across
                          tribal health camps, disaster relief efforts, and the
                          annual Aarogyawari pilgrimage service.
                        </p>
                      </CardContent>
                    </Card>
                  </StaggerItem>

                  <StaggerItem>
                    <Card className="flex flex-col shadow-sm border-border bg-white h-full">
                      <CardContent className="p-6 pt-8 grow">
                        <div className="flex items-start gap-4">
                          <div className="w-20 h-20 bg-muted rounded-full overflow-hidden border-2 border-secondary shrink-0">
                            <Image
                              src="/log-head_image.webp"
                              alt="Mr. Prakash Patil"
                              width={256}
                              height={256}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-heading text-xl text-secondary font-bold">
                              Mr. Prakash M. Patil
                            </h4>
                            <p className="text-xs text-brand-blue font-bold uppercase tracking-wider mt-1">
                              Trustee & Logistics Head
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-foreground/80 mt-6 font-medium leading-relaxed">
                          A veteran in large-scale event management, Mr. Patil
                          oversees the complex logistics of setting up mobile
                          camps, supply chains, and volunteer deployment across
                          every region the organisation serves — from remote
                          tribal villages to the 250 km Wari route.
                        </p>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                </StaggerContainer>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
