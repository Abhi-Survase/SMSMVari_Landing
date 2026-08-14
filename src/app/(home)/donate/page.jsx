// app/(home)/donate/page.jsx
// ─── "use client" removed ─ server component so metadata export works ────────

import QrSection from "@/components/QrSection";
import { Heart, Users, Stethoscope, ShieldCheck, Calendar } from "lucide-react";
import { NumberTicker } from "@/components/shadcn-space/number-ticker/number-ticker-01";
import Image from "next/image";

export const metadata = {
  title:
    "Donate | Sahyadri Manav Seva Manch – Fund Healthcare for the Underserved",
  description:
    "Support our work across tribal health camps, disaster relief, and the annual Aarogyawari pilgrimage service. Donate via UPI to fund medical camps, treatment, and medicines for thousands.",
  keywords: [
    "donate Sahyadri Manav Seva Manch",
    "Aarogyawari donation",
    "tribal health camp donation Maharashtra",
    "Devbandh medical camp donation",
    "UPI donation NGO Maharashtra",
  ],
  openGraph: {
    title: "Donate to Sahyadri Manav Seva Manch",
    description:
      "Fund life-saving medical care for tribal communities, disaster-affected families, and Varkaris during the Pandharpur pilgrimage.",
    type: "website",
    url: "https://smsmvari.com/donate",
    siteName: "Sahyadri Manav Seva Manch",
    images: [
      {
        url: "/og_donate.webp",
        width: 1200,
        height: 630,
        alt: "Volunteer providing medical care at a Sahyadri Manav Seva Manch camp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Donate to Sahyadri Manav Seva Manch",
    description:
      "Fund life-saving medical care for tribal communities, disaster-affected families, and Varkaris during the Pandharpur pilgrimage.",
    images: ["/og_donate.webp"],
  },
  alternates: { canonical: "https://smsmvari.com/donate" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "DonateAction",
  name: "Donate to Sahyadri Manav Seva Manch",
  description:
    "Support healthcare for tribal communities, disaster-affected families, and Varkaris during the Pandharpur pilgrimage.",
  agent: {
    "@type": "NGO",
    name: "Sahyadri Manav Seva Manch, Thane",
    alternateName: "SMSM Vari",
    url: "https://smsmvari.com",
    address: {
      "@type": "PostalAddress",
      // TODO: confirm exact HQ street address in Thane with the trust
      streetAddress: "[Office Address], Thane",
      addressLocality: "Thane",
      addressRegion: "Maharashtra",
      postalCode: "400601",
      addressCountry: "IN",
    },
  },
};

// Updated array to pass numeric values to the animated ticker
const impactStats = [
  {
    icon: Users,
    number: 12000,
    suffix: "+",
    label: "Lives Touched Annually",
  },
  {
    icon: Stethoscope,
    number: 40,
    suffix: "+",
    label: "Medical Camps Set Up",
  },
  { icon: Heart, value: "250 km", label: "Wari Route Covered" },
  { icon: ShieldCheck, value: "21 Days", label: "Continuous Wari Service" },
  {
    icon: Calendar,
    value: "Since 1982",
    label: "Serving Communities",
    accent: "blue",
  },
];

export default function DonatePage() {
  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-secondary text-white py-16 px-4 md:px-8 border-b-4 border-primary">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block items-center">
            <Image src="/icon.webp" alt="SMSM Vari" width={56} height={56} />
          </div>
          <p className="text-primary font-bold uppercase tracking-widest text-sm mb-3">
            Make a Difference
          </p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-6">
            Support Our <br /> Healthcare Mission
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-medium leading-relaxed">
            Every rupee you give funds medical camps in remote tribal villages,
            emergency relief during disasters, and round-the-clock care for
            Varkaris walking 250 km during the annual Aarogyawari pilgrimage
            service. Your support reaches communities that need it most.
          </p>
        </div>
      </section>

      {/* Impact stats — gives donors context before the QR */}
      <section
        aria-label="Our impact"
        className="bg-muted/40 border-b border-border py-10 px-4 md:px-8"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {impactStats.map(
            ({ icon: Icon, number, suffix, value, label, accent }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Icon
                  className={
                    accent === "blue" ? "text-brand-blue" : "text-primary"
                  }
                  size={28}
                  strokeWidth={2}
                />
                <p className="font-heading text-2xl md:text-3xl font-black text-secondary">
                  {number ? (
                    <NumberTicker
                      start={number > 50 ? number * 0.997 : number - 7}
                      end={number}
                      suffix={suffix}
                      duration={4}
                    />
                  ) : (
                    value
                  )}
                </p>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {label}
                </p>
              </div>
            ),
          )}
        </div>
      </section>

      {/* QR / UPI section */}
      <QrSection />
    </>
  );
}
