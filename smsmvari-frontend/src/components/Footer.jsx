"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Don't render the public footer on any admin route
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-foreground text-background border-t-4 border-primary mt-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4 md:px-8 py-12 max-w-7xl mx-auto">
        {/* Brand Column */}
        <div className="col-span-1 sm:col-span-2 md:col-span-1 flex flex-col gap-4">
          <div className="font-heading text-2xl font-black text-white tracking-tight">
            SMSM Vari
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Providing free medical care to remote tribal villages,
            disaster-affected communities, and devoted Varkaris during the
            sacred Pandharpur Wari — wherever care is needed most.
          </p>

          {/* Donation QR Card */}
          <div className="bg-white p-3 rounded w-48 flex flex-col items-center my-2 shadow-sm">
            <span className="text-primary font-bold text-xs mb-2 text-center">
              SMSM Vari Trust
            </span>
            <img
              src="/dummy_qr.webp"
              alt="Scan to Donate"
              className="w-full h-auto object-contain"
            />
            <span className="text-primary font-bold text-[11px] mt-2 text-center">
              UPI ID: smsmvari@upi
            </span>
          </div>

          <div className="flex gap-4 mt-2">
            {/* TODO: replace # with your social media profile URL */}
            <a
              href="#"
              className="text-primary hover:text-white transition-colors"
              aria-label="Share"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                share
              </span>
            </a>
            {/* TODO: confirm official email address with the trust */}
            <a
              href="mailto:contact@smsmvari.org"
              className="text-primary hover:text-white transition-colors"
              aria-label="Email us"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                mail
              </span>
            </a>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="flex flex-col gap-3">
          <h5 className="font-bold text-xs text-white uppercase tracking-widest mb-1 border-b border-white/10 pb-2">
            Organization
          </h5>
          <Link
            href="/about"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            href="/activities"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Our Activities
          </Link>
          <Link
            href="/gallery"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Gallery
          </Link>
          <Link
            href="/join"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Join Us
          </Link>
        </div>

        {/* Links Column 2 */}
        <div className="flex flex-col gap-3">
          <h5 className="font-bold text-xs text-white uppercase tracking-widest mb-1 border-b border-white/10 pb-2">
            Legal
          </h5>
          {/* TODO: create /privacy-policy page */}
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Privacy Policy
          </a>
          {/* TODO: create /terms-of-service page */}
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Terms of Service
          </a>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-3 col-span-1 sm:col-span-2 md:col-span-1">
          <h5 className="font-bold text-xs text-white uppercase tracking-widest mb-1 border-b border-white/10 pb-2">
            Reach Us
          </h5>
          <a
            href="https://maps.google.com/?q=Thane,Maharashtra"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 text-muted-foreground text-sm hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-sm mt-0.5 text-brand-blue">
              location_on
            </span>
            <span>Thane, Maharashtra 400601</span>
          </a>
          <a
            href="tel:+912186235550"
            className="flex items-center gap-2 text-muted-foreground text-sm mt-1 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-sm">call</span>
            {/* TODO: confirm registered phone number with the trust */}
            <span>021862235550</span>
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 md:px-8 py-6 bg-black/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 SMSM Vari. All Rights Reserved. Committed to Heritage &
            Healing.
          </p>
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Organized By Sahyadri Manav Seva Manch, Thane
          </div>
        </div>
      </div>
    </footer>
  );
}
