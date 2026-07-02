import GalleryGrid from "./GalleryGrid";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-secondary text-white py-16 px-4 md:px-8 border-b-4 border-primary">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary font-bold uppercase tracking-widest text-sm mb-3">
            Through the Lens
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">
            Our Gallery
          </h1>
          <p className="text-white/80 text-lg font-medium leading-relaxed">
            Every photograph here is a testament to the dedication of our
            volunteers — from remote tribal health camps and disaster relief
            efforts to the devotion of lakhs of Varkaris on the sacred
            Pandharpur Wari.
          </p>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────────── */}
      <div className="bg-muted/40 border-b border-border py-5 px-4 md:px-8">
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-x-10 gap-y-2 text-center">
          {[
            { value: "6", label: "Categories" },
            { value: "15+", label: "Photos" },
            { value: "21 Days", label: "Each Wari Season" },
            {
              value: "Since 1982",
              label: "Serving Communities",
              accent: "blue",
            },
          ].map(({ value, label, accent }) => (
            <div key={label}>
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
            </div>
          ))}
        </div>
      </div>

      {/* ── Interactive grid (client component) ──────────────────────────── */}
      <GalleryGrid />

      {/* ── CTA — matches About and Donate pages exactly ─────────────────── */}
      <section className="py-14 px-4 md:px-8 bg-secondary text-white text-center border-t-4 border-primary">
        <h2 className="font-heading text-3xl font-black uppercase tracking-tight mb-4">
          Be Part of the Mission
        </h2>
        <p className="text-white/80 max-w-xl mx-auto mb-8 font-medium">
          These photographs represent thousands of lives touched. Your support
          makes the next chapter possible — donate, volunteer, or share our
          story.
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
            <Link href="/join">Volunteer With Us</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
