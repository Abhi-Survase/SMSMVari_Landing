// app/(home)/contact/page.jsx
// Server component — exports metadata; interactive form is in ./ContactForm.jsx

import ContactForm from "./ContactForm";
import Link from "next/link";

export const metadata = {
  title: "Contact Us | Sahyadri Manav Seva Manch, Thane",
  description:
    "Reach out to Sahyadri Manav Seva Manch, Thane. Contact us to volunteer, support our medical camps, or get involved in our work across Thane, tribal villages, and the annual Aarogyawari pilgrimage service.",
  keywords: [
    "contact Sahyadri Manav Seva Manch",
    "SMSM Thane contact",
    "Aarogyawari volunteer",
    "Devbandh medical camp contact",
    "tribal health camp Thane NGO",
  ],
  openGraph: {
    title: "Contact Sahyadri Manav Seva Manch – Get in Touch",
    description:
      "Questions, donations, or volunteering — we would love to hear from you.",
    type: "website",
    url: "https://smsmvari.org/contact",
    siteName: "Sahyadri Manav Seva Manch",
    images: [
      {
        url: "/og-contact.webp",
        width: 1200,
        height: 630,
        alt: "Sahyadri Manav Seva Manch contact",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Contact Sahyadri Manav Seva Manch – Get in Touch",
    description:
      "Questions, donations, or volunteering — we would love to hear from you.",
  },
  alternates: { canonical: "https://smsmvari.org/contact" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Sahyadri Manav Seva Manch",
  url: "https://smsmvari.org/contact",
  mainEntity: {
    "@type": "NGO",
    name: "Sahyadri Manav Seva Manch, Thane",
    // TODO: confirm registered phone number with the trust
    telephone: "+912186235550",
    // TODO: confirm official email address with the trust
    email: "contact@smsmvari.org",
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
};

const contactDetails = [
  {
    icon: "location_on",
    label: "Head Office",
    // TODO: confirm exact HQ street address in Thane with the trust
    value: "[Office Address], Thane, Maharashtra 400601",
    href: "https://maps.google.com/?q=Thane,Maharashtra",
  },
  {
    icon: "call",
    label: "Phone",
    // TODO: confirm registered phone number with the trust
    value: "021862235550",
    href: "tel:+912186235550",
  },
  {
    icon: "mail",
    label: "Email",
    // TODO: confirm official email address with the trust
    value: "contact@smsmvari.org",
    href: "mailto:contact@smsmvari.org",
  },
];

export default function ContactUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Page Hero */}
      <section className="bg-secondary text-white py-16 px-4 md:px-8 border-b-4 border-primary">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-white/80 text-lg font-medium leading-relaxed">
            Whether you want to volunteer at a tribal health camp, support
            Aarogyawari, donate supplies, or simply learn more about our work —
            we would love to hear from you.
          </p>
        </div>
      </section>

      {/* Two-column layout: contact info + form */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info — 2 of 5 columns */}
          <aside className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <h2 className="font-heading text-2xl text-primary font-black uppercase tracking-tight mb-2">
                Contact Details
              </h2>
              <div className="h-1 w-16 bg-primary rounded-full mb-6" />
              <ul className="space-y-5">
                {contactDetails.map(({ icon, label, value, href }) => {
                  const isOffice = label === "Head Office";
                  return (
                    <li key={label}>
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                        {label}
                      </p>
                      <Link
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="flex items-start gap-3 text-foreground hover:text-primary transition-colors font-medium"
                      >
                        <span
                          className={`material-symbols-outlined mt-0.5 text-xl ${
                            isOffice ? "text-brand-blue" : "text-primary"
                          }`}
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {icon}
                        </span>
                        {value}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Seasonal camp note — Aarogyawari / Pandharpur Wari */}
            <div className="bg-muted rounded-lg p-5 border-l-4 border-brand-blue">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-blue mb-2">
                During Aarogyawari (Ashadhi Ekadashi)
              </p>
              <p className="text-sm text-foreground/80 font-medium leading-relaxed mb-2">
                Every year, our teams set up medical camps along the
                Alandi–Pandharpur pilgrimage route, with key camps near Dive
                Ghat, Saswad, Phaltan, and Natepute. During this period our core
                team is deployed on the route and response times for other
                enquiries may be longer.
              </p>
              <p className="text-sm text-foreground/80 font-medium leading-relaxed">
                For medical emergencies on the route during the pilgrimage,
                please contact our camp coordinators directly or call us.
              </p>
            </div>

            {/* HQ note */}
            <div className="bg-muted rounded-lg p-5 border-l-4 border-primary">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
                Year-Round Work
              </p>
              <p className="text-sm text-foreground/80 font-medium leading-relaxed">
                Outside of the pilgrimage season, our office in Thane
                coordinates tribal health camps in Devbandh, school health
                programmes, and disaster relief efforts across Maharashtra.
                Reach out anytime to volunteer or get involved.
              </p>
            </div>
          </aside>

          {/* Contact form — 3 of 5 columns */}
          <div className="lg:col-span-3">
            <h2 className="font-heading text-2xl text-primary font-black uppercase tracking-tight mb-2">
              Send Us a Message
            </h2>
            <div className="h-1 w-16 bg-primary rounded-full mb-6" />
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
