"use client";
import { QrCode, ReceiptText, Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function QrSection() {
  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto flex justify-center">
      <Card className="w-full max-w-5xl border-2 border-primary shadow-lg overflow-hidden relative bg-card">
        <div className="absolute top-0 left-0 w-full h-2 bg-[#F39C12]"></div>

        <CardContent className="p-8 md:p-12">
          {/* Header - Centered */}
          <div className="flex items-center justify-center gap-3 mb-10 text-primary w-full">
            <QrCode size={40} strokeWidth={2.5} />
            <h2 className="font-heading text-3xl md:text-4xl font-black uppercase tracking-tight text-center">
              Make a Contribution
            </h2>
          </div>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 relative">
            {/* Left Column: QR Code & Receipt Info */}
            <div className="flex flex-col items-center justify-start gap-6">
              {/* QR Code Container */}
              <div className="bg-white p-4 border-4 border-muted rounded-xl shadow-sm hover:scale-105 transition-transform duration-300">
                <img
                  src="dummy_qr.webp"
                  alt="Scan to Donate"
                  className="w-56 h-56 object-contain"
                />
              </div>

              {/* Receipt Info Box */}
              <div className="bg-muted/40 w-full max-w-sm rounded-lg p-5 border border-border/50 text-center">
                <div className="flex items-center justify-center gap-2 text-foreground font-bold mb-2">
                  <ReceiptText className="text-secondary" size={22} />
                  <p className="uppercase tracking-wider text-sm">
                    Instant Receipt
                  </p>
                </div>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  You will securely receive an automated receipt directly on the
                  phone number used for the transaction.
                </p>
              </div>
            </div>

            {/* The Divider (Heart Icon) */}
            {/* Desktop: Vertical Divider */}
            <div className="hidden md:flex absolute left-1/2 top-4 bottom-4 flex-col items-center -translate-x-1/2 z-10">
              {/* The vertical line */}
              <div className="w-px h-full bg-border/60"></div>

              {/* The icon (absolutely centered on the line) */}
              <div className="absolute top-1/2 -translate-y-1/2 bg-card rounded-full">
                <Heart
                  className="text-[#F39C12] p-1.5 fill-[#F39C12]/10 rounded-full border border-border/50 shadow-sm"
                  size={48}
                  strokeWidth={1.5}
                />
              </div>
            </div>

            {/* Mobile: Horizontal Divider */}
            <div className="flex md:hidden w-full h-px bg-border/60 items-center justify-center my-2 z-10">
              <Heart
                className="bg-card text-[#F39C12] p-1.5 fill-[#F39C12]/10 rounded-full border border-border/50 shadow-sm"
                size={44}
                strokeWidth={1.5}
              />
            </div>

            {/* Right Column: Thank You Message */}
            <div className="flex items-center justify-center h-full px-4 md:px-8">
              <p className="text-xl md:text-2xl text-foreground/90 font-semibold italic leading-relaxed text-center md:text-left">
                "Thank you for making a difference. Your generous support
                provides essential healing, comfort, and care to those walking
                this sacred journey."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
