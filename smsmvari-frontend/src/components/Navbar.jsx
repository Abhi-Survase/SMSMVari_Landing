"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

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
    <nav className="bg-card border-b-2 border-primary w-full sticky top-0 z-50 shadow-sm">
      <div className="flex justify-between items-center w-full px-4 md:px-8 py-2 max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="font-heading text-2xl font-black text-primary tracking-tight hover:text-brand-blue"
        >
          SMSM Vari
        </Link>

        {/* Desktop Navigation Links — unchanged, hidden below md */}
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

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <Link
            href="/admin"
            className={`transition-colors ${
              pathname === "/admin"
                ? "text-primary font-bold border-primary"
                : "text-muted-foreground hover:text-primary font-medium"
            }`}
          >
            Login
          </Link>

          {/* Language toggle — desktop only */}
          <button className="font-bold text-xs text-foreground hover:text-primary transition-colors uppercase hidden md:block">
            मराठी
          </button>

          <Link href={"/donate"}>
            <Button
              size="lg"
              className="uppercase font-bold tracking-wide border-b-4 border-b-secondary/50 active:border-b-0 active:translate-y-1"
            >
              Donate Now
            </Button>
          </Link>

          {/* Hamburger — mobile only, sits right of Donate Now */}
          <button
            className="md:hidden p-1 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown — only rendered when open, hidden on md+ */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 py-3 flex flex-col">
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

          {/* Language toggle in mobile menu */}
          <div className="mt-2 pt-2 border-t border-border">
            <button className="font-bold text-xs text-foreground hover:text-primary transition-colors uppercase py-2 px-3">
              मराठी
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
