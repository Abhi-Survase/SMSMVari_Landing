"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  // True once the page has scrolled past 50px — deepens the nav shadow.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Don't render the public navbar on any admin route
  if (pathname.startsWith("/admin")) return null;

  const navLinks = [
    { name: "Homepage", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Our Activities", href: "/activities" },
    { name: "Join Us", href: "/join" },
  ];

  return (
    <nav
      className={`bg-card border-b-2 border-primary w-full sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-lg shadow-foreground/10" : "shadow-sm"
      }`}
    >
      <div className="flex justify-between items-center w-full px-3 sm:px-6 md:px-8 py-2 md:py-2.5 max-w-7xl mx-auto">
        {/* ── Brand Logo & Text (Responsive scale) ─────────────────────────── */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <Image
            src="/icon.webp"
            alt="SMSM Vari"
            width={40}
            height={40}
            className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 object-contain"
          />
          <span className="inline-block origin-left font-heading text-lg sm:text-xl md:text-2xl font-black text-primary tracking-tight leading-none translate-y-0.5 transition-all duration-200 ease-out group-hover:text-brand-blue group-hover:scale-105">
            SMSM Vari
          </span>
        </Link>

        {/* ── Desktop Navigation Links ────────────────────────────────────── */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-all pb-1 border-b-2 ${
                  isActive
                    ? "text-primary font-bold border-primary"
                    : "text-muted-foreground border-transparent hover:text-brand-blue"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* ── Action Buttons ──────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Desktop-only Login */}
          <Link
            href="/admin"
            className={`hidden md:block transition-colors ${
              pathname === "/admin"
                ? "text-primary font-bold border-primary"
                : "text-muted-foreground hover:text-primary font-medium"
            }`}
          >
            Login
          </Link>

          {/* Desktop-only Language toggle */}
          <button className="font-bold text-xs text-foreground hover:text-primary transition-colors uppercase hidden md:block">
            मराठी
          </button>

          {/* Responsive Donate Button */}
          <Link href="/donate">
            <Button className="h-8 px-3 text-xs sm:h-9 sm:px-4 sm:text-sm md:h-10 md:px-5 uppercase font-bold tracking-wide border-b-4 border-b-secondary/50 active:border-b-0 active:translate-y-1 translate-y-0.5 shadow-sm">
              Donate Now
            </Button>
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden p-1 text-foreground hover:text-primary transition-colors focus:outline-none"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Dropdown Menu ────────────────────────────────────────── */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 py-3 flex flex-col space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`py-2.5 px-3 rounded-md font-medium transition-all ${
                  isActive
                    ? "text-primary font-bold bg-primary/10"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Mobile Login Link */}
          <Link
            href="/admin"
            onClick={() => setIsOpen(false)}
            className={`py-2.5 px-3 rounded-md font-medium transition-all ${
              pathname === "/admin"
                ? "text-primary font-bold bg-primary/10"
                : "text-muted-foreground hover:text-primary hover:bg-primary/5"
            }`}
          >
            Login
          </Link>

          {/* Language toggle inside mobile menu */}
          <div className="mt-2 pt-2 border-t border-border">
            <button className="w-full text-left font-bold text-xs text-foreground hover:text-primary transition-colors uppercase py-2 px-3">
              मराठी
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
