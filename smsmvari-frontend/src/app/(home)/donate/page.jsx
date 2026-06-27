// app/(home)/donate/page.jsx
// ─── "use client" removed ─ server component so metadata export works ────────

import QrSection from "@/components/QrSection";
import { Heart, Users, Stethoscope, ShieldCheck } from "lucide-react";
import { NumberTicker } from "@/components/shadcn-space/number-ticker/number-ticker-01";

export const metadata = {
  title: "Donate | SMSM Vari – Fund Varkari Healthcare",
  description:
    "Support the Pandharpur Wari medical mission. Donate via UPI to fund emergency care, wound treatment, and medicine for thousands of Varkaris walking 250 km.",
  keywords: [
    "donate Pandharpur Wari",
    "SMSM Vari donation",
    "Varkari healthcare fund",
    "Sahyadri Manav Seva Manch Vari Trust",
    "UPI donation NGO Maharashtra",
  ],
  openGraph: {
    title: "Donate to SMSM Vari – Serve the Varkaris",
    description:
      "Fund life-saving medical care for lakhs of Varkaris during the sacred 250 km Pandharpur Wari pilgrimage.",
    type: "website",
    url: "https://smsmvari.com/donate",
    siteName: "SMSM Vari",
    images: [
      {
        url: "/og_donate.webp",
        width: 1200,
        height: 630,
        alt: "Volunteer providing medical care to a Varkari during the Pandharpur Wari",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Donate to SMSM Vari – Serve the Varkaris",
    description:
      "Fund life-saving medical care for lakhs of Varkaris during the sacred 250 km Pandharpur Wari pilgrimage.",
    images: ["/og_donate.webp"],
  },
  alternates: { canonical: "https://smsmvari.com/donate" },
};

const jsonLd = {
  "@context": "https://schema.com",
  "@type": "DonateAction",
  name: "Donate to SMSM Vari",
  description:
    "Support Varkari healthcare during the Pandharpur Wari pilgrimage.",
  agent: {
    "@type": "NGO",
    name: "Sahyadri Manav Seva Manch Vari Trust",
    alternateName: "SMSM Vari",
    url: "https://smsmvari.com",
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

// Updated array to pass numeric values to the animated ticker
const impactStats = [
  {
    icon: Users,
    number: 12000,
    suffix: "+",
    label: "Varkaris Treated Annually",
  },
  { icon: Stethoscope, number: 40, suffix: "+", label: "Medical Camps Set Up" },
  { icon: Heart, value: "250 km", label: "Route Covered" },
  { icon: ShieldCheck, value: "21 Days", label: "Continuous Service" },
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
          <p className="text-primary font-bold uppercase tracking-widest text-sm mb-3">
            Make a Difference
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">
            Support the Wari Mission
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-medium leading-relaxed">
            Every rupee you give provides emergency care, wound treatment, and
            medicine to devoted Varkaris walking barefoot for 250 km over 21
            days. Your support sustains their sacred journey.
          </p>
        </div>
      </section>

      {/* Impact stats — gives donors context before the QR */}
      <section
        aria-label="Our impact"
        className="bg-muted/40 border-b border-border py-10 px-4 md:px-8"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {impactStats.map(({ icon: Icon, number, suffix, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <Icon className="text-primary" size={28} strokeWidth={2} />
              <p className="font-heading text-2xl md:text-3xl font-black text-secondary">
                {number ? (
                  <NumberTicker
                    start={number * 0.85}
                    end={number}
                    suffix={suffix}
                    duration={8}
                  />
                ) : (
                  value
                )}
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* QR / UPI section */}
      <QrSection />
    </>
  );
}
