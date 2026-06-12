import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Route, CalendarDays } from "lucide-react";
import Link from "next/link";
import QrSection from "@/components/QrSection";

export default function HomePage() {
  return (
    <div className="font-sans text-foreground min-h-screen flex flex-col bg-background textured-bg">
      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative w-full border-b-4 border-secondary">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          {/* Hero Image Background */}
          <div
            className="h-[614px] md:h-[819px] w-full bg-cover bg-center relative"
            style={{ backgroundImage: "url('/home-hero.webp')" }}
            title="A grand, vibrant procession of thousands of devotees (Varkaris) walking in the Pandharpur Wari."
          ></div>
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4 max-w-5xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-black mb-6 drop-shadow-xl uppercase tracking-tight">
              Walking with Devotion,
              <br />
              Serving with Compassion
            </h1>
            <p className="font-sans text-lg md:text-xl text-white max-w-2xl mb-8 drop-shadow-md font-medium bg-black/30 p-6 rounded-md border border-white/20 backdrop-blur-sm">
              Providing essential medical care, wound management, and emergency
              response to the dedicated Varkaris during the sacred 250km
              Pandharpur Wari.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="uppercase font-bold tracking-wide text-md px-8 py-6 border-b-4 border-b-secondary/50 shadow-xl active:border-b-0 active:translate-y-1"
              >
                Support the Mission
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="uppercase font-bold tracking-wide text-md px-8 py-6 border-b-4 border-b-secondary/50 shadow-xl active:border-b-0 active:translate-y-1 bg-white/90 text-secondary hover:bg-white backdrop-blur-md"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* The Wari Section (Bento Grid) */}
        <div
          className="font-sans text-[#333333] min-h-screen flex flex-col"
          style={{
            backgroundColor: "#E6E2D3",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a93200' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
          }}
        >
          <main className="flex-grow">
            {/* The Wari Section */}
            <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
              <div className="mb-10 text-center">
                {/* Restored font-black (900 weight) and uppercase */}
                <h2 className="font-heading text-4xl md:text-5xl text-[#a93200] font-black uppercase tracking-tight">
                  The Pandharpur Wari
                </h2>
                <div className="h-1.5 w-32 bg-[#F39C12] mx-auto mt-4"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Main Info Card - Forced rounded-none and original borders */}
                <Card className="md:col-span-8 rounded-none border border-[rgba(140,98,57,0.2)] shadow-sm relative overflow-hidden bg-white">
                  <div className="h-1.5 w-full bg-[#a93200] absolute top-0 left-0"></div>
                  <CardContent className="p-8 pt-10">
                    <div className="flex items-center gap-3 mb-6 text-[#6D1B13]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="34"
                        viewBox="0 0 24 24"
                        width="34"
                        fill="#F39C12"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7" />
                      </svg>
                      <h3 className="font-heading text-3xl font-black">
                        A Journey of Faith
                      </h3>
                    </div>
                    <p className="text-[#333333] text-lg leading-relaxed mb-6 font-medium">
                      Thousands of people called varkari reach Pandharpur from
                      Alandi and Dehu after walking for about 250km in Aashad
                      Ekadashi. They walk with palkhis carrying padukas of the
                      saints singing sacred songs. Warkari is a sampradaya
                      within the bhakti spiritual tradition of Hinduism,
                      geographically associated with the Indian state of
                      Maharashtra. Warkaris worship Vitthal, the presiding deity
                      of Pandharpur, regarded as a form of Krishna.
                    </p>
                    <blockquote className="text-[#333333]/80 leading-relaxed border-l-4 border-[#F39C12] pl-6 italic text-md font-medium">
                      "This walk is not just an escape from reality for lakhs of
                      people. It is something that keeps them focused and
                      connected to a power bigger than them. People spend 21
                      days on the road withering bad weather with no luxuries...
                      This is not a walk of blind faith, but the Pandharpur
                      Waari is a walk of love and showing respect to Lord
                      Vitthal."
                    </blockquote>
                  </CardContent>
                </Card>

                {/* Stats Vertical - Restored exact solid colors and heavy borders */}
                <div className="md:col-span-4 flex flex-col gap-6">
                  <Card className="bg-[#F39C12] text-white rounded-none border-2 border-[#6D1B13] shadow-none flex flex-col justify-center items-center text-center h-full py-5">
                    <Route size={54} strokeWidth={3} />
                    <div className="font-heading text-5xl font-black mb-1">
                      250km
                    </div>
                    <div className="text-base uppercase tracking-[0.15em] font-bold">
                      Sacred Journey
                    </div>
                  </Card>

                  <Card className="bg-[#a93200] text-white rounded-none border-2 border-[#6D1B13] shadow-none flex flex-col justify-center items-center text-center h-full py-5">
                    <CalendarDays size={56} strokeWidth={3} />
                    <div className="font-heading text-5xl font-black mb-1">
                      21 Days
                    </div>
                    <div className="text-base uppercase tracking-[0.15em] font-bold">
                      Aashad Ekadashi
                    </div>
                  </Card>
                </div>
              </div>
            </section>
          </main>
        </div>

        {/* Mission in Action */}
        <section className="py-16 px-4 md:px-8 bg-muted/30 border-y border-border">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl text-secondary font-black uppercase tracking-tight">
                  Mission in Action
                </h2>
                <div className="h-1 w-24 bg-primary mt-2 rounded-full"></div>
              </div>
              <Button
                variant="link"
                className="text-primary font-bold uppercase tracking-wide px-0 mt-4 md:mt-0 group"
              >
                View All Services{" "}
                <span className="material-symbols-outlined ml-1 group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Service Card 1 */}
              <Card className="overflow-hidden group cursor-pointer border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="h-1 w-full bg-secondary"></div>
                <div className="h-48 relative overflow-hidden">
                  <Badge className="absolute top-3 left-3 z-10 bg-primary hover:bg-primary uppercase font-bold tracking-wider">
                    Critical Need
                  </Badge>
                  <img
                    src="/medical-camps.webp"
                    alt="Medical Camps"
                    className="w-full h-full origin-bottom object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-primary">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      local_hospital
                    </span>
                    <CardTitle className="font-heading text-xl">
                      Medical Camps
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground/80 h-16 line-clamp-3">
                    Setting up extensive medical infrastructure along the route
                    to treat thousands of devotees daily for exhaustion and
                    illness.
                  </CardDescription>
                  <div className="w-full border-t border-border mt-4 pt-4 flex justify-between items-center text-secondary font-bold text-sm uppercase">
                    Support Team
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Service Card 2 */}
              <Card className="overflow-hidden group cursor-pointer border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="h-1 w-full bg-primary"></div>
                <div className="h-48 relative overflow-hidden">
                  <img
                    src="/wound-care.webp"
                    alt="Wound Care"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-primary">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      healing
                    </span>
                    <CardTitle className="font-heading text-xl">
                      Wound Care
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground/80 h-16 line-clamp-3">
                    Specialized foot care and wound management for Varkaris
                    walking barefoot for 250km over 21 days.
                  </CardDescription>
                  <div className="w-full border-t border-border mt-4 pt-4 flex justify-between items-center text-secondary font-bold text-sm uppercase">
                    Donate Supplies{" "}
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Service Card 3 */}
              <Card className="overflow-hidden group cursor-pointer border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="h-1 w-full bg-accent"></div>
                <div className="h-48 relative overflow-hidden">
                  <Badge
                    variant="secondary"
                    className="absolute top-3 left-3 z-10 uppercase font-bold tracking-wider"
                  >
                    24/7 Active
                  </Badge>
                  <img
                    src="emergency-response.webp"
                    alt="Emergency Response"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-primary">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      emergency
                    </span>
                    <CardTitle className="font-heading text-xl">
                      Emergency Response
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground/80 h-16 line-clamp-3">
                    Mobile ambulance units and rapid response teams deployed
                    along the route for immediate critical care.
                  </CardDescription>
                  <div className="w-full border-t border-border mt-4 pt-4 flex justify-between items-center text-secondary font-bold text-sm uppercase">
                    Volunteer{" "}
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <QrSection />

        {/* Leadership Section */}
        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/3">
              <h2 className="font-heading text-3xl md:text-4xl text-primary font-black uppercase tracking-tight mb-4">
                Our Leadership
              </h2>
              <p className="text-foreground/80 mb-6 font-medium">
                Guided by steadfast devotion and professional excellence, our
                trustees ensure that every donation translates directly into
                impactful medical aid for the Varkaris.
              </p>
              <div className="bg-muted p-6 rounded-lg border-l-4 border-l-primary shadow-sm">
                <span
                  className="material-symbols-outlined text-primary text-4xl mb-2 opacity-50"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  format_quote
                </span>
                <p className="italic text-secondary font-semibold text-lg leading-snug">
                  "Service to the devotees is service to the divine. We strive
                  to provide the highest standard of care on this sacred
                  journey."
                </p>
              </div>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Trustee 1 */}
              <Card className="flex flex-col border-t-4 border-t-primary shadow-md border-x-border border-b-border">
                <CardContent className="p-6 pt-8 flex-grow">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-muted rounded-full overflow-hidden border-2 border-secondary shrink-0">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJoZliLQL3Z3WIO2jzNtzc21WM_dcWCxTu_OQ5CNCdUcG8ysP9djESmK1qfZpcYywGMhwg5pGFLwVS3vLPigm49SO6dqKtIw4WKwPxeZpYTkRWW_hGTl3_pUFfd0FIAlDvPo8A28nxtyPk8gW1VapLg_HZAgeYrCANykS4pL6ojQtuM-NaAU6iA7tP_AevY47WWYdteY9ZfM1PcYx91EzJmjo-E6YeH9zbBZZPCbnlW-OrA4HHcHv45U7N0NfnJFbU5WFshEhxgAI"
                        alt="Dr. Anjali Deshmukh"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-heading text-xl text-secondary font-bold">
                        Dr. Anjali Deshmukh
                      </h4>
                      <p className="text-xs text-primary font-bold uppercase tracking-wider mt-1">
                        Managing Trustee & CMO
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80 mt-6 font-medium leading-relaxed">
                    With over 25 years of experience in public health, Dr.
                    Deshmukh coordinates the entire medical strategy for the
                    Wari route, ensuring standardized care protocols across all
                    camps.
                  </p>
                </CardContent>
              </Card>

              {/* Trustee 2 */}
              <Card className="flex flex-col border-t-4 border-t-primary shadow-md border-x-border border-b-border">
                <CardContent className="p-6 pt-8 flex-grow">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-muted rounded-full overflow-hidden border-2 border-secondary shrink-0">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHjIKnSrjpXfulN0rw6faU4mvRwdSTntBntr4UyRZ3QLmlkUY1c6HR-gocD37X_lFQF5KysPzb-HwM_-fzOni4W5LudwTD_-EWkVGfW6goxzfwtPZxOdi8P23ZHVgFSQc_Lwi-0qm2Jhw3nnVbfVGCDos0PBg6Pd0evvyaHVVH5gmIS1G6VTIEJ7vKAaimPq3yoG7TF_dBNLdQeXOV-S5JllaDpusNQRqJe7qvddor46tAAQV6jMZEUlismnq7gjKzYxuOZHN1DXU"
                        alt="Mr. Prakash Patil"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-heading text-xl text-secondary font-bold">
                        Mr. Prakash Patil
                      </h4>
                      <p className="text-xs text-primary font-bold uppercase tracking-wider mt-1">
                        Trustee & Logistics Head
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80 mt-6 font-medium leading-relaxed">
                    A veteran in large-scale event management, Mr. Patil
                    oversees the complex logistics of setting up mobile camps,
                    supply chains, and volunteer deployment across the 250km
                    stretch.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
