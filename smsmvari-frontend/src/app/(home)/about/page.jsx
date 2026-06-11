import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AboutUsPage() {
  return (
    <div className="font-sans text-foreground min-h-screen flex flex-col bg-background textured-bg">
      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 space-y-12 md:space-y-16">
        {/* Hero Section */}
        <section className="relative bg-card border border-border/50 shadow-sm overflow-hidden">
          <div className="h-2 bg-primary w-full absolute top-0 left-0 z-10"></div>
          <div className="flex flex-col md:flex-row items-stretch gap-8 p-6 md:p-10 pt-10 md:pt-14 relative z-0">
            <div className="flex-1 flex flex-col justify-center space-y-4">
              <div>
                <Badge className="bg-[#F39C12] hover:bg-[#F39C12]/90 text-white uppercase tracking-widest mb-3 font-bold rounded-sm px-3 py-1">
                  Our Story
                </Badge>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl text-primary font-black leading-tight tracking-tight uppercase">
                Committed to Heritage & Healing.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground pt-4 border-t border-border/50 font-medium">
                Founded on the principles of community service and cultural
                preservation, SMSM Vari bridges the gap between traditional
                heritage and modern medical assistance for the most vulnerable.
              </p>
            </div>
            <div className="flex-1 w-full min-h-[300px] md:min-h-[400px] bg-muted border-2 border-border/50 relative overflow-hidden group">
              <img
                alt="Heritage"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="/heritage2.webp"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="font-bold text-sm uppercase tracking-wider text-white">
                  Our Historic Roots
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vision Card */}
          <Card className="rounded-none border border-border/50 shadow-sm relative pt-6 bg-card">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#F39C12]"></div>
            <CardContent className="p-6 md:p-8">
              <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center border border-border/50 mb-6">
                <span
                  className="material-symbols-outlined text-[#F39C12] text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  visibility
                </span>
              </div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground font-black uppercase tracking-tight mb-3">
                Our Vision
              </h2>
              <div className="w-16 h-1 bg-primary mb-6"></div>
              <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                To create a society where traditional cultural heritage is
                seamlessly integrated with robust health and social welfare
                systems, ensuring every individual has access to holistic
                well-being and community support.
              </p>
            </CardContent>
          </Card>

          {/* Mission Card */}
          <Card className="rounded-none border border-border/50 shadow-sm relative pt-6 bg-card">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-primary"></div>
            <CardContent className="p-6 md:p-8">
              <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center border border-border/50 mb-6">
                <span
                  className="material-symbols-outlined text-primary text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  flag
                </span>
              </div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground font-black uppercase tracking-tight mb-3">
                Our Mission
              </h2>
              <div className="w-16 h-1 bg-[#F39C12] mb-6"></div>
              <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                To deliver direct medical assistance, organize community health
                camps, and preserve cultural traditions through active community
                engagement and the unwavering dedication of our volunteers.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Leadership Section */}
        <section className="bg-card border border-border/50 p-6 md:p-10 relative shadow-sm">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-secondary"></div>

          <div className="flex items-center gap-3 mb-6">
            <span
              className="material-symbols-outlined text-secondary text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              groups
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground font-black uppercase tracking-tight">
              Our Leadership
            </h2>
          </div>

          <p className="text-lg text-muted-foreground mb-10 border-l-4 border-[#F39C12] pl-4 font-medium max-w-3xl">
            Guided by experience and driven by compassion, our board of trustees
            ensures that SMSM Vari remains true to its foundational values while
            expanding its impact.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Leader 1 */}
            <Card className="bg-muted/30 border border-border/50 relative overflow-hidden rounded-none shadow-sm">
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full z-10"></div>
              <CardContent className="p-5">
                <img
                  alt="Dr. Prakash Deshmukh"
                  className="w-full h-56 object-cover object-top border-2 border-border/50 mb-5 grayscale hover:grayscale-0 transition-all duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzXES9N9KdYxpRsBDfeFVwUtq58zj_Fmw9ArmLal2UtdRbSyinYRadlta4mVyih2BS5ttzetpNpL2jkhtCOkAeZgz41X5CFcfk-UMHROyAMR3etv0j_XNF5olo2gV0m1q2-msQT5Gvg8jqY7sPEGRJ3Zv1P0622QSCPArsZsAjZU3MHdFZyTitUhIveGerSOATGw42muc0DfLK-E3N8wySFEm_r06VqtJ-ixuj8RXbL4O3LbU-D7cj4GUQPMslSi1Wqupela1AH8g"
                />
                <h3 className="font-heading text-2xl text-foreground font-black uppercase">
                  Dr. Prakash Deshmukh
                </h3>
                <p className="text-xs text-primary font-bold uppercase tracking-wider mb-3">
                  Founder & Chairman
                </p>
                <p className="text-sm text-muted-foreground border-t border-border/50 pt-3 font-medium leading-relaxed">
                  A retired chief medical officer with 40 years of experience
                  serving rural communities across Maharashtra.
                </p>
              </CardContent>
            </Card>

            {/* Leader 2 */}
            <Card className="bg-muted/30 border border-border/50 relative overflow-hidden rounded-none shadow-sm">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#F39C12]/10 rounded-bl-full z-10"></div>
              <CardContent className="p-5">
                <img
                  alt="Smt. Anjali Kulkarni"
                  className="w-full h-56 object-cover object-top border-2 border-border/50 mb-5 grayscale hover:grayscale-0 transition-all duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZbHRHpCRh18q31gdgjRB2GtZDTI3gJ9v2Qb7HLpyfRlweL79b6Pat1Aai4ydB0QJwNFHNBy3acbgibExk7xzcaKrGsqnzv5rg1s92y1-JDVgHfOteqekX5Dq6RuwgcppQl2JN3NaAcPzOa3tA3te6_vSZX2ttoAu9CRTlRCEP13O_zthQG5JaajtUyqNQWsI_5ZI7jJ2SQ4EtrXNH4KO9Va1MzXfoaw8g3Ld7FnwUVKKDno-qFxJ__mSMjQ6Xb870UqC9kkoPX1I"
                />
                <h3 className="font-heading text-2xl text-foreground font-black uppercase">
                  Smt. Anjali Kulkarni
                </h3>
                <p className="text-xs text-[#F39C12] font-bold uppercase tracking-wider mb-3">
                  Managing Trustee
                </p>
                <p className="text-sm text-muted-foreground border-t border-border/50 pt-3 font-medium leading-relaxed">
                  Spearheads the cultural preservation initiatives and manages
                  daily operations with a focus on holistic care.
                </p>
              </CardContent>
            </Card>

            {/* Leader 3 */}
            <Card className="bg-muted/30 border border-border/50 relative overflow-hidden rounded-none shadow-sm">
              <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/10 rounded-bl-full z-10"></div>
              <CardContent className="p-5">
                <img
                  alt="Dr. Rajesh Patil"
                  className="w-full h-56 object-cover object-top border-2 border-border/50 mb-5 grayscale hover:grayscale-0 transition-all duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV50Vs-XYHRqqScXbmVCZA7WqBuwKyqhE5ZeMEoB0Rel8c1xQYC0oVx-3f8KBksvxVs6LV6NgBkGPeaqcpdJ2faLDuosaoMJwDD3FcuoSxKDKBLLjSK72ivn_f0e6TYu6Lh_2SzXpL_pH5UMcvfyC2YACGGvqa4P0k8CafE_yC186WL3VVKbjQRUItDkJCbtQwsEGC8O2Bh7i0rXotA9srVUVSg-DI71O1GXMGJcz3n5wRDW5LtJuq8pWXPwgPrx-btF5bdTWBW2c"
                />
                <h3 className="font-heading text-2xl text-foreground font-black uppercase">
                  Dr. Rajesh Patil
                </h3>
                <p className="text-xs text-secondary font-bold uppercase tracking-wider mb-3">
                  Medical Director
                </p>
                <p className="text-sm text-muted-foreground border-t border-border/50 pt-3 font-medium leading-relaxed">
                  Coordinates the medical relief camps and volunteer doctors
                  network during the annual Vari procession.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Ongoing Initiatives (Bento Style) */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <span
              className="material-symbols-outlined text-primary text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              volunteer_activism
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground font-black uppercase tracking-tight">
              Ongoing Initiatives
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px] md:auto-rows-[200px]">
            {/* Large Feature - Mobile Medical Camps */}
            <Card className="md:col-span-2 md:row-span-2 bg-card border-border/50 relative overflow-hidden group rounded-none shadow-sm">
              <img
                alt="Medical Camp"
                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                src="/medical-camp2.webp"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full z-10">
                <Badge className="bg-primary hover:bg-primary text-white uppercase font-bold tracking-wider mb-3 rounded-sm">
                  Urgent Need
                </Badge>
                <h3 className="font-heading text-2xl md:text-3xl text-white font-black uppercase mb-2">
                  Mobile Medical Camps
                </h3>
                <p className="text-white/80 text-sm md:text-base line-clamp-2 border-t border-white/20 pt-3 mt-2 font-medium">
                  Deploying fully equipped mobile clinics along the Vari route
                  to provide immediate first-aid, hydration, and emergency
                  medical response to thousands of devotees.
                </p>
              </div>
            </Card>

            {/* Initiative 2 - Clean Water Drive */}
            <Card className="md:col-span-2 bg-[#F39C12] border-2 border-secondary/50 p-6 relative text-white rounded-none shadow-sm flex flex-col justify-center overflow-hidden">
              <span className="material-symbols-outlined absolute -bottom-4 -right-2 text-white/20 text-9xl rotate-12">
                water_drop
              </span>
              <div className="relative z-10">
                <h3 className="font-heading text-2xl md:text-3xl font-black uppercase mb-3">
                  Clean Water Drive
                </h3>
                <p className="text-white/90 text-sm md:text-base max-w-[85%] font-medium leading-relaxed">
                  Establishing safe drinking water stations and sanitation
                  facilities across key halting points to prevent waterborne
                  diseases during the pilgrimage.
                </p>
              </div>
            </Card>

            {/* Initiative 3 - Pharmacy Kit Distro */}
            <Card className="md:col-span-1 bg-card border-border/50 p-6 flex flex-col justify-between rounded-none shadow-sm group hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-primary text-2xl">
                  local_pharmacy
                </span>
              </div>
              <div>
                <h3 className="font-heading text-xl text-foreground font-black uppercase mb-2">
                  Pharmacy Kits
                </h3>
                <p className="text-sm text-muted-foreground font-medium line-clamp-2">
                  Providing essential medicines to local clinics and emergency
                  outposts.
                </p>
              </div>
            </Card>

            {/* Initiative 4 - Heritage Restoration */}
            <Card className="md:col-span-1 bg-muted/30 border-border/50 p-6 flex flex-col justify-between textured-bg rounded-none shadow-sm group hover:border-secondary/50 transition-colors">
              <div className="w-12 h-12 bg-secondary/10 rounded flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                <span className="material-symbols-outlined text-secondary text-2xl">
                  temple_hindu
                </span>
              </div>
              <div>
                <h3 className="font-heading text-xl text-foreground font-black uppercase mb-2">
                  Heritage Care
                </h3>
                <p className="text-sm text-muted-foreground font-medium line-clamp-2">
                  Maintaining historic resting sites and traditional markers
                  along the route.
                </p>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
