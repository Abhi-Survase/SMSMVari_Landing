// app/(home)/join/page.jsx
// Server component — exports metadata; interactive form is in ./JoinForm.jsx

// import JoinForm from "./JoinForm";
import ContactForm from "./ContactForm";
import Link from "next/link";

export const metadata = {
  title: "Join Us | Sahyadri Manav Seva Manch, Thane",
  description:
    "Volunteer with Sahyadri Manav Seva Manch, Thane. Join our doctors, nurses, and volunteers serving tribal villages, disaster-affected communities, and pilgrims across Maharashtra.",
  keywords: [
    "volunteer Sahyadri Manav Seva Manch",
    "join SMSM Thane",
    "Aarogyawari volunteer",
    "Devbandh medical camp volunteer",
    "tribal health camp volunteer Maharashtra",
    "medical volunteer NGO Thane",
  ],
  openGraph: {
    title: "Join Sahyadri Manav Seva Manch – Become a Volunteer",
    description:
      "Doctors, nurses, students, and dedicated citizens — there is a place for you in our work across Maharashtra.",
    type: "website",
    url: "https://smsmvari.org/join",
    siteName: "Sahyadri Manav Seva Manch",
    images: [
      {
        url: "/og-join.webp", // TODO: create a 1200×630 OG image
        width: 1200,
        height: 630,
        alt: "Sahyadri Manav Seva Manch volunteers at a medical camp",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Join Sahyadri Manav Seva Manch – Become a Volunteer",
    description:
      "Doctors, nurses, students, and dedicated citizens — there is a place for you in our work across Maharashtra.",
  },
  alternates: { canonical: "https://smsmvari.org/join" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Join Sahyadri Manav Seva Manch",
  description:
    "Volunteer sign-up page for Sahyadri Manav Seva Manch, Thane — covering tribal health camps, disaster relief, school programmes, and the Aarogyawari pilgrimage service.",
  url: "https://smsmvari.org/join",
  about: {
    "@type": "NGO",
    name: "Sahyadri Manav Seva Manch, Thane",
    alternateName: "SMSM Vari",
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

const waysToHelp = [
  {
    icon: "medical_services",
    title: "Medical Professionals",
    description:
      "Doctors, nurses, and paramedics lend their skills at camps in Devbandh, disaster sites, and along the Wari route.",
  },
  {
    icon: "groups",
    title: "Field Volunteers",
    description:
      "Help with camp logistics, supply distribution, registration, and on-ground coordination — no medical background required.",
  },
  {
    icon: "school",
    title: "Education & Outreach",
    description:
      "Support school health check-ups, awareness lectures, and the distribution of uniforms and learning materials.",
  },
];

export default function JoinUsPage() {
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
            Join Us
          </h1>
          <p className="text-white/80 text-lg font-medium leading-relaxed">
            Doctors, nurses, students, and dedicated citizens — every camp we
            run depends on people who choose to show up. There's a place for you
            here.
          </p>
        </div>
      </section>

      {/* Ways to help */}
      <section className="py-14 px-4 md:px-8 bg-muted/30 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl md:text-3xl text-primary font-black uppercase tracking-tight">
              Ways to Help
            </h2>
            <div className="h-1 w-16 bg-primary mt-3 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {waysToHelp.map(({ icon, title, description }) => (
              <div
                key={title}
                className="bg-card rounded-lg border border-border p-6 text-center"
              >
                <span
                  className="material-symbols-outlined text-primary text-4xl mb-3 block"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {icon}
                </span>
                <h3 className="font-heading text-lg font-black text-secondary mb-2 uppercase tracking-tight">
                  {title}
                </h3>
                <p className="text-sm text-foreground/80 font-medium leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two-column layout: contact info + sign-up form */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info — 2 of 5 columns */}
          <aside className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <h2 className="font-heading text-2xl text-primary font-black uppercase tracking-tight mb-2">
                Reach Us Directly
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
                Our teams set up medical camps along the Alandi–Pandharpur
                pilgrimage route, with key camps near Dive Ghat, Saswad,
                Phaltan, and Natepute. This is one of our biggest annual
                opportunities for volunteers.
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
                Volunteers are welcome year-round.
              </p>
            </div>
          </aside>

          {/* Sign-up form — 3 of 5 columns */}
          <div className="lg:col-span-3">
            <h2 className="font-heading text-2xl text-primary font-black uppercase tracking-tight mb-2">
              Sign Up to Volunteer
            </h2>
            <div className="h-1 w-16 bg-primary rounded-full mb-6" />
            {/* <JoinForm />*/}
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
