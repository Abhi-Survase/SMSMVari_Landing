"use client";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background border-t-4 border-primary mt-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4 md:px-8 py-12 max-w-7xl mx-auto">
        {/* Brand Column */}
        <div className="col-span-1 sm:col-span-2 md:col-span-1 flex flex-col gap-4">
          <div className="font-heading text-2xl font-black text-white tracking-tight">
            SMSM Vari
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Committed to providing medical aid and support to the devoted
            Varkaris during the sacred Pandharpur Wari.
          </p>

          {/* Donation QR Card */}
          <div className="bg-white p-3 rounded w-48 flex flex-col items-center my-2 shadow-sm">
            <span className="text-primary font-bold text-xs mb-2 text-center">
              SMSM Vari Trust
            </span>
            <img
              src="dummy_qr.webp"
              alt="Scan to Donate"
              className="w-full h-auto object-contain"
            />
            <span className="text-primary font-bold text-[11px] mt-2 text-center">
              UPI ID: smsmvari@upi
            </span>
          </div>

          <div className="flex gap-4 mt-2">
            <a
              href="#"
              className="text-primary hover:text-white transition-colors"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                share
              </span>
            </a>
            <a
              href="#"
              className="text-primary hover:text-white transition-colors"
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
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            About
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Services
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Media
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Links Column 2 */}
        <div className="flex flex-col gap-3">
          <h5 className="font-bold text-xs text-white uppercase tracking-widest mb-1 border-b border-white/10 pb-2">
            Legal
          </h5>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Privacy Policy
          </a>
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
          <div className="flex items-start gap-2 text-muted-foreground text-sm">
            <span className="material-symbols-outlined text-sm mt-0.5">
              location_on
            </span>
            <span>Main Road, Chouphala, Pandharpur, Maharashtra 4133</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
            <span className="material-symbols-outlined text-sm">call</span>
            <span>021862235550</span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 md:px-8 py-6 bg-black/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 SMSM Vari. All Rights Reserved. Committed to Heritage &
            Healing.
          </p>
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Organized By Sahyadri Manav Seva Manch Vari Trust
          </div>
        </div>
      </div>
    </footer>
  );
}
