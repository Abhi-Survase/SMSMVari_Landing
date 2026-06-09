"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const pathname = usePathname();

  // Array to make rendering and styling the links much cleaner
  const navLinks = [
    { name: "Homepage", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav className="bg-card border-b-2 border-primary w-full sticky top-0 z-50 shadow-sm">
      <div className="flex justify-between items-center w-full px-4 md:px-8 py-2 max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="font-heading text-2xl font-black text-primary tracking-tight"
        >
          SMSM Vari
        </Link>

        {/* Dynamic Navigation Links */}
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
                    : "text-muted-foreground border-transparent hover:text-primary"
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
            className={`transition-colors ${pathname === "/admin" ? "text-primary font-bold border-primary" : "text-muted-foreground hover:text-primary font-medium"}`}
          >
            Login
          </Link>
          <button className="font-bold text-xs text-foreground hover:text-primary transition-colors uppercase hidden md:block">
            मराठी
          </button>
          <Button
            size="lg"
            className="uppercase font-bold tracking-wide border-b-4 border-b-secondary/50 active:border-b-0 active:translate-y-1"
          >
            Donate Now
          </Button>
        </div>
      </div>
    </nav>
  );
}
