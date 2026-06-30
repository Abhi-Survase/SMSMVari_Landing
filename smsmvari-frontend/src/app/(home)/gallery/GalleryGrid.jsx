// app/(home)/gallery/GalleryGrid.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// ---------------------------------------------------------------------------
// Data — replace src paths with your real images. alt text is read by screen
// readers and crawled by Google Images so keep it descriptive.
// ---------------------------------------------------------------------------
const galleryItems = [
  // Medical Camps
  {
    id: 1,
    src: "/medical-camps.webp",
    alt: "Doctors and nurses treating Varkaris at a roadside medical camp along the Pandharpur Wari route",
    title: "Route Medical Camp",
    category: "Medical Camps",
  },
  {
    id: 2,
    src: "/medical-camp2.webp",
    alt: "Sahyadri Manav Seva Manch medical volunteers attending to a line of pilgrims at a camp",
    title: "Volunteer Medical Team",
    category: "Medical Camps",
  },
  {
    id: 3,
    src: "/gallery-medcamp3.webp", // TODO: add your image
    alt: "First-aid station set up under a tent for Varkari pilgrims during the Wari",
    title: "First Aid Station",
    category: "Medical Camps",
  },
  {
    id: 4,
    src: "/gallery-medcamp4.webp", // TODO: add your image
    alt: "A doctor checking the blood pressure of an elderly Varkari at a medical camp",
    title: "Health Check Camp",
    category: "Medical Camps",
  },

  // Wound Care
  {
    id: 5,
    src: "/wound-care.webp",
    alt: "A nurse carefully treating the bleeding foot wounds of a barefoot Varkari",
    title: "Foot Wound Treatment",
    category: "Wound Care",
  },
  {
    id: 6,
    src: "/gallery-wound2.webp", // TODO: add your image
    alt: "Paramedic applying wound dressing to a Varkari's feet after 250 km of walking",
    title: "Wound Dressing",
    category: "Wound Care",
  },
  {
    id: 7,
    src: "/gallery-wound3.webp", // TODO: add your image
    alt: "Medical supplies and wound-care materials laid out at a Sahyadri Manav Seva Manch camp",
    title: "Medical Supplies",
    category: "Wound Care",
  },

  // Emergency Response
  {
    id: 8,
    src: "/emergency-response.webp",
    alt: "Sahyadri Manav Seva Manch ambulance unit stationed along the Pandharpur Wari route ready for emergencies",
    title: "Mobile Ambulance Unit",
    category: "Emergency Response",
  },
  {
    id: 9,
    src: "/gallery-emergency2.webp", // TODO: add your image
    alt: "Emergency response team assisting a Varkari who collapsed during the pilgrimage",
    title: "Rapid Response Team",
    category: "Emergency Response",
  },

  // Wari Journey
  {
    id: 10,
    src: "/home-hero.webp",
    alt: "Thousands of Varkaris in a grand procession during the sacred Pandharpur Wari",
    title: "The Sacred Procession",
    category: "Wari Journey",
  },
  {
    id: 11,
    src: "/heritage1.webp",
    alt: "Varkaris singing abhangas and chanting during the Pandharpur Wari procession",
    title: "Devotion in Motion",
    category: "Wari Journey",
  },
  {
    id: 12,
    src: "/gallery-wari3.webp", // TODO: add your image
    alt: "The Palkhi procession carrying padukas of saints through a village during the Wari",
    title: "Palkhi Procession",
    category: "Wari Journey",
  },
  {
    id: 13,
    src: "/gallery-wari4.webp", // TODO: add your image
    alt: "Aerial view of the Pandharpur Wari procession stretching kilometres through the countryside",
    title: "The Journey Ahead",
    category: "Wari Journey",
  },

  // Tribal & Disaster Relief
  {
    id: 16,
    src: "/gallery-tribal1.webp", // TODO: add your image
    alt: "Doctors examining patients at a tribal health camp in Devbandh, Mokhada Taluka",
    title: "Devbandh Health Camp",
    category: "Tribal & Disaster Relief",
  },
  {
    id: 17,
    src: "/gallery-tribal2.webp", // TODO: add your image
    alt: "Volunteers distributing school uniforms and notebooks to children at a tribal Anganwadi",
    title: "School Supplies Distribution",
    category: "Tribal & Disaster Relief",
  },
  {
    id: 18,
    src: "/gallery-disaster1.webp", // TODO: add your image
    alt: "Medical team providing emergency aid to flood-affected residents",
    title: "Flood Relief Camp",
    category: "Tribal & Disaster Relief",
  },

  // Volunteers
  {
    id: 14,
    src: "/gallery-vol1.webp", // TODO: add your image
    alt: "Sahyadri Manav Seva Manch medical volunteers assembled for a briefing before the Wari begins",
    title: "Volunteer Briefing",
    category: "Volunteers",
  },
  {
    id: 15,
    src: "/gallery-vol2.webp", // TODO: add your image
    alt: "Young volunteers distributing medicines to Varkaris",
    title: "Medicines Distribution",
    category: "Volunteers",
  },
];

const CATEGORIES = [
  "All",
  "Medical Camps",
  "Wound Care",
  "Emergency Response",
  "Wari Journey",
  "Tribal & Disaster Relief",
  "Volunteers",
];

// ---------------------------------------------------------------------------

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState(null); // index into filteredItems

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  // ── Lightbox helpers ────────────────────────────────────────────────────
  const openLightbox = (index) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);

  const prev = useCallback(() => {
    setLightbox((i) => (i === 0 ? filteredItems.length - 1 : i - 1));
  }, [filteredItems.length]);

  const next = useCallback(() => {
    setLightbox((i) => (i === filteredItems.length - 1 ? 0 : i + 1));
  }, [filteredItems.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, prev, next]);

  // Lock body scroll while lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  const selectedItem = lightbox !== null ? filteredItems[lightbox] : null;

  return (
    <section className="py-14 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ── Category filter tabs ─────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map((cat) => {
            const isTribalDisaster = cat === "Tribal & Disaster Relief";
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setLightbox(null);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-200 ${
                  isActive
                    ? isTribalDisaster
                      ? "bg-brand-blue text-white border-brand-blue shadow-sm"
                      : "bg-primary text-primary-foreground border-primary shadow-sm"
                    : isTribalDisaster
                      ? "bg-card text-muted-foreground border-border hover:border-brand-blue hover:text-brand-blue"
                      : "bg-card text-muted-foreground border-border hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ── Image grid ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filteredItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => openLightbox(index)}
              aria-label={`View image: ${item.title}`}
              className="group relative overflow-hidden rounded-lg border border-border/50 bg-muted aspect-square cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {/* Image */}
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-secondary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <Badge
                      className={`uppercase text-[10px] tracking-wider mb-1.5 ${
                        item.category === "Tribal & Disaster Relief"
                          ? "bg-brand-blue hover:bg-brand-blue text-white"
                          : "bg-primary hover:bg-primary text-primary-foreground"
                      }`}
                    >
                      {item.category}
                    </Badge>
                    <p className="text-white font-bold text-sm leading-tight">
                      {item.title}
                    </p>
                  </div>
                  <ZoomIn className="text-white shrink-0" size={20} />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-muted-foreground font-medium">
            No photos in this category yet.
          </div>
        )}
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-8"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title}
        >
          {/* Inner panel — stop propagation so clicking image doesn't close */}
          <div
            className="relative w-full max-w-4xl flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              aria-label="Close image viewer"
              className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
            >
              <X size={28} />
            </button>

            {/* Counter */}
            <span className="absolute -top-10 left-0 text-xs text-white/50 font-bold uppercase tracking-widest">
              {lightbox + 1} / {filteredItems.length}
            </span>

            {/* Image */}
            <img
              src={selectedItem.src}
              alt={selectedItem.alt}
              className="w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
            />

            {/* Caption */}
            <div className="text-center">
              <p className="text-white font-heading font-black uppercase tracking-tight text-lg">
                {selectedItem.title}
              </p>
              <Badge
                className={`mt-1 uppercase text-[10px] tracking-wider ${
                  selectedItem.category === "Tribal & Disaster Relief"
                    ? "bg-brand-blue hover:bg-brand-blue text-white"
                    : "bg-primary hover:bg-primary"
                }`}
              >
                {selectedItem.category}
              </Badge>
            </div>

            {/* Prev / Next */}
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
