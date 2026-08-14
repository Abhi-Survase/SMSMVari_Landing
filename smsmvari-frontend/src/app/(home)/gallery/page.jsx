import GalleryGrid from "./GalleryGrid";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import AnimatedPageHero from "@/components/AnimatedPageHero";
import FadeUp from "@/components/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/StaggerChildren";

export const metadata = {
  title: "Gallery | Sahyadri Manav Seva Manch – Our Work in Photos",
  description:
    "Photos from our tribal health camps, disaster relief efforts, medical camps, and the annual Aarogyawari service during the Pandharpur Wari.",
  keywords: [
    "Sahyadri Manav Seva Manch gallery",
    "tribal health camp photos",
    "disaster relief photos Maharashtra",
    "Pandharpur Wari photos",
    "Varkari medical camp pictures",
    "Aarogyawari photos",
  ],
  openGraph: {
    title: "Sahyadri Manav Seva Manch Gallery – Our Work in Photos",
    description:
      "See our volunteers, tribal health camps, disaster relief work, and the thousands of Varkaris we serve every Aashad Ekadashi.",
    type: "website",
    url: "https://smsmvari.com/gallery",
    siteName: "Sahyadri Manav Seva Manch",
    images: [
      {
        url: "/medical-camp2.webp",
        width: 1200,
        height: 630,
        alt: "Sahyadri Manav Seva Manch volunteers at a medical camp during the Pandharpur Wari",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahyadri Manav Seva Manch Gallery – Our Work in Photos",
    description:
      "See our volunteers, tribal health camps, disaster relief work, and the thousands of Varkaris we serve every Aashad Ekadashi.",
    images: ["/medical-camp2.webp"],
  },
  alternates: { canonical: "https://smsmvari.com/gallery" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "Sahyadri Manav Seva Manch Photo Gallery",
  description:
    "Photos documenting our tribal health camps, disaster relief work, medical camps, and Aarogyawari service during the Pandharpur Wari.",
  url: "https://smsmvari.com/gallery",
  author: {
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
  about: [
    {
      "@type": "Event",
      name: "Pandharpur Wari – Aashad Ekadashi",
      description:
        "The sacred 250 km pilgrimage to Pandharpur undertaken by lakhs of Varkaris every Aashad Ekadashi.",
      location: {
        "@type": "Place",
        name: "Pandharpur, Maharashtra, India",
      },
    },
    {
      "@type": "Thing",
      name: "Tribal Health Camps",
      description:
        "Year-round medical camps serving remote tribal villages such as Devbandh in Mokhada Taluka, Thane district.",
    },
    {
      "@type": "Thing",
      name: "Disaster Relief Medical Aid",
      description:
        "Emergency medical assistance provided during floods, earthquakes, and other disasters across Maharashtra.",
    },
  ],
};

export default function GalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────
          Left-anchored against the section background instead of a
          centered stack — matches the pattern already applied to About,
          Activities, and Aarogyawari.
      ─────────────────────────────────────────────────────────────────── */}
      <section className="bg-secondary text-white py-20 px-4 md:px-8 border-b-4 border-primary">
        <AnimatedPageHero className="max-w-2xl">
          <div className="flex items-center gap-3 mb-5">
            <Image src="/icon.webp" alt="SMSM Vari" width={56} height={56} />
          </div>
          <p className="text-primary font-bold uppercase tracking-widest text-sm mb-3">
            Through the Lens
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6">
            Our Gallery
          </h1>
          <p className="text-white text-lg font-medium leading-relaxed max-w-xl">
            Every photograph here is a testament to the dedication of our
            volunteers — from remote tribal health camps and disaster relief
            efforts to the devotion of lakhs of Varkaris on the sacred
            Pandharpur Wari.
          </p>
        </AnimatedPageHero>
      </section>

      {/* ── Stats bar — centered is legitimate here: compact inline stat
          pairs, same carve-out as the Aarogyawari stats row. Left
          untouched. ─────────────────────────────────────────────────── */}
      <div className="bg-muted/40 border-b border-border py-5 px-4 md:px-8">
        <StaggerContainer className="max-w-3xl mx-auto flex flex-wrap justify-center gap-x-10 gap-y-2 text-center">
          {[
            { value: "6", label: "Categories" },
            { value: "15+", label: "Photos" },
            { value: "21 Days", label: "Each Wari Season" },
            {
              value: "Since 1984",
              label: "Serving Communities",
              accent: "blue",
            },
          ].map(({ value, label, accent }) => (
            <StaggerItem key={label}>
              <span
                className={`font-heading text-xl font-black ${
                  accent === "blue" ? "text-brand-blue" : "text-secondary"
                }`}
              >
                {value}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-2">
                {label}
              </span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* ── Interactive grid (client component) ──────────────────────────── */}
      <GalleryGrid />

      {/* ── CTA ──────────────────────────────────────────────────────────
          Left-anchored copy, buttons break right — matches the shape now
          consistent across About, Activities, and Aarogyawari. Dropped
          active:translate-y-1 (named anti-pattern) and /80 opacity text.
      ─────────────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 md:px-8 bg-secondary text-white border-t-4 border-primary">
        <FadeUp className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-md">
            <h2 className="font-heading text-3xl font-black uppercase tracking-tight mb-4">
              Be Part of the Mission
            </h2>
            <p className="text-white font-medium">
              These photographs represent thousands of lives touched. Your
              support makes the next chapter possible — donate, volunteer, or
              share our story.
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
              <Link href="/join">Volunteer With Us</Link>
            </Button>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
