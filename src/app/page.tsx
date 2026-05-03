import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { TripFeed } from "@/components/TripFeed";
import { CityGrid } from "@/components/CityGrid";
import { GuideGrid } from "@/components/GuideGrid";
import { EventsList } from "@/components/EventsList";
import { PricingSection } from "@/components/PricingSection";
import { ParticleField, Globe3D, FloatingCards3D } from "@/components/3d/ThreeComponents";
import { ArrowRight, Globe, Users, TrendingUp, DollarSign } from "lucide-react";

const stats = [
  { value: "127", label: "Cities covered", icon: Globe },
  { value: "4.8K", label: "Active trips", icon: TrendingUp },
  { value: "38%", label: "Avg cost saved", icon: DollarSign },
  { value: "12K+", label: "Travelers joined", icon: Users },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>

        {/* ── HERO (3D PARTICLES) ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16 overflow-hidden"
          style={{ background: "var(--bg)" }}>

          {/* 3D particle field behind everything */}
          <ParticleField />

          {/* Radial glow blobs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] opacity-15 blur-3xl rounded-full"
              style={{ background: "radial-gradient(ellipse, #ff4d2e 0%, transparent 65%)" }} />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 opacity-10 blur-3xl rounded-full"
              style={{ background: "radial-gradient(circle, #f0b429 0%, transparent 70%)" }} />
          </div>

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "64px 64px"
            }} />

          <div className="relative z-10 text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 animate-fade-up"
              style={{ background: "rgba(255,77,46,0.12)", border: "1px solid rgba(255,77,46,0.3)", color: "var(--accent)", animationDelay: "0s" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              4,800+ active trips · Real people · Real experiences
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[88px] font-extrabold leading-[0.92] mb-6 animate-fade-up"
              style={{ animationDelay: "0.1s", fontFamily: "Syne, sans-serif", color: "var(--white)", letterSpacing: "-0.035em" }}>
              The world is waiting<br />
              <span className="text-gradient">for your crew.</span>
            </h1>

            <p className="text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed animate-fade-up"
              style={{ color: "var(--muted)", animationDelay: "0.2s" }}>
              Post trips, find travel partners, book local guides.
              <span className="font-semibold" style={{ color: "var(--subtle)" }}> Free forever.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20 animate-fade-up"
              style={{ animationDelay: "0.3s" }}>
              <Link href="/trips/new" className="btn btn-primary w-full sm:w-auto"
                style={{ padding: "15px 32px", borderRadius: "14px", fontSize: "15px", fontWeight: 700 }}>
                Post your trip — it&apos;s free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/cities" className="btn btn-ghost w-full sm:w-auto"
                style={{ padding: "15px 32px", borderRadius: "14px", fontSize: "15px" }}>
                Explore destinations
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto animate-fade-up"
              style={{ animationDelay: "0.4s" }}>
              {stats.map(({ value, label, icon: Icon }) => (
                <div key={label} className="glass rounded-2xl p-4 text-center card-lift">
                  <Icon className="w-4 h-4 mx-auto mb-2" style={{ color: "var(--accent)" }} />
                  <div className="text-2xl font-bold" style={{ fontFamily: "Syne", color: "var(--white)" }}>{value}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3D GLOBE SECTION ── */}
        <section className="section overflow-hidden" style={{ background: "var(--bg-2)" }}>
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left text */}
              <div>
                <div className="badge mb-4" style={{ background: "rgba(255,77,46,0.1)", color: "var(--accent)", border: "1px solid rgba(255,77,46,0.2)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /> Live worldwide
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--white)" }}>
                  Travelers everywhere,<br />right now.
                </h2>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
                  Dots on the globe are real active trip posts from our community — Kyoto, Lisbon, Bali, Marrakech and beyond.
                </p>
                <div className="space-y-3">
                  {[
                    { city: "Kyoto, Japan", detail: "3 travelers looking for hiking crew", color: "#ff4d2e" },
                    { city: "Bali, Indonesia", detail: "Temple tour this weekend · 2 spots", color: "#f0b429" },
                    { city: "Medellín, Colombia", detail: "Street art + salsa night · 4 spots", color: "#a78bfa" },
                  ].map((item) => (
                    <div key={item.city} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "var(--bg-3)" }}>
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: item.color }} />
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "var(--white)" }}>{item.city}</p>
                        <p className="text-xs" style={{ color: "var(--muted)" }}>{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3D Globe */}
              <div className="relative h-[420px] md:h-[500px]">
                <Globe3D />
                {/* Glow under globe */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-16 blur-2xl opacity-30 rounded-full"
                  style={{ background: "var(--accent)" }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── TRIP FEED ── */}
        <section className="section" style={{ background: "var(--bg)" }}>
          <div className="container">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <div className="badge mb-3" style={{ background: "rgba(255,77,46,0.1)", color: "var(--accent)", border: "1px solid rgba(255,77,46,0.2)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /> Live feed
                </div>
                <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "var(--white)" }}>Active trips</h2>
                <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>Real people posting real trips right now.</p>
              </div>
              <Link href="/trips" className="btn btn-ghost text-sm shrink-0" style={{ padding: "10px 20px" }}>
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <TripFeed limit={6} />
          </div>
        </section>

        {/* ── HOW IT WORKS (3D CARDS) ── */}
        <section className="section" style={{ background: "var(--bg-2)" }}>
          <div className="container-sm">
            <div className="text-center mb-8">
              <div className="badge mx-auto mb-4" style={{ background: "rgba(255,77,46,0.1)", color: "var(--accent)", border: "1px solid rgba(255,77,46,0.2)" }}>
                Simple
              </div>
              <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "var(--white)" }}>How it works</h2>
            </div>

            {/* 3D floating cards preview */}
            <div className="mb-8">
              <FloatingCards3D />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { step: "01", title: "Post your trip", desc: "Where you're going, when, and what you're into. 60 seconds.", icon: "✈️" },
                { step: "02", title: "Match with travelers", desc: "Filter by budget, style, and dates. Message instantly.", icon: "🤝" },
                { step: "03", title: "Go together", desc: "Split costs, explore hidden spots, make real memories.", icon: "🌍" },
              ].map((s) => (
                <div key={s.step} className="glass rounded-2xl p-6 card-lift">
                  <div className="text-3xl mb-4">{s.icon}</div>
                  <div className="text-xs font-bold mb-2 tracking-wider" style={{ color: "var(--accent)" }}>{s.step}</div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: "var(--white)", fontFamily: "Syne" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CITIES ── */}
        <section className="section" style={{ background: "var(--bg)" }}>
          <div className="container">
            <div className="mb-12">
              <div className="badge mb-3" style={{ background: "rgba(240,180,41,0.1)", color: "var(--gold)", border: "1px solid rgba(240,180,41,0.2)" }}>
                Destinations
              </div>
              <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "var(--white)" }}>Explore cities</h2>
              <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>Curated guides with hidden spots only locals know.</p>
            </div>
            <CityGrid limit={5} />
          </div>
        </section>

        {/* ── GUIDES ── */}
        <section className="section" style={{ background: "var(--bg-2)" }}>
          <div className="container">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <div className="badge mb-3" style={{ background: "rgba(34,197,94,0.1)", color: "var(--green)", border: "1px solid rgba(34,197,94,0.2)" }}>
                  Verified locals
                </div>
                <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "var(--white)" }}>Local guides</h2>
                <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>Handpicked experts rated by the community.</p>
              </div>
              <Link href="/guides" className="btn btn-ghost text-sm shrink-0" style={{ padding: "10px 20px" }}>
                All guides <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <GuideGrid limit={4} />
          </div>
        </section>

        {/* ── EVENTS ── */}
        <section className="section" style={{ background: "var(--bg)" }}>
          <div className="container">
            <div className="mb-12">
              <div className="badge mb-3" style={{ background: "rgba(167,139,250,0.1)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.2)" }}>
                Spontaneous
              </div>
              <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "var(--white)" }}>Local events</h2>
              <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>When 10+ travelers cluster in a city — magic happens.</p>
            </div>
            <EventsList />
          </div>
        </section>

        {/* ── PRICING ── */}
        <PricingSection />

        {/* ── CTA ── */}
        <section className="section-sm relative overflow-hidden" style={{ background: "var(--bg-2)" }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-48 opacity-20 blur-3xl rounded-full"
              style={{ background: "radial-gradient(ellipse, #ff4d2e 0%, transparent 70%)" }} />
          </div>
          <div className="container-sm text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: "var(--white)", fontFamily: "Syne" }}>
              Your best trip<br /><span className="text-gradient">hasn&apos;t happened yet.</span>
            </h2>
            <p className="mb-8" style={{ color: "var(--muted)" }}>Join 12,000+ travelers. Free forever. No credit card.</p>
            <Link href="/auth/register" className="btn btn-primary"
              style={{ padding: "16px 40px", borderRadius: "14px", fontSize: "16px", fontWeight: 700 }}>
              Start for free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="py-10 px-4" style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}>
          <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #ff4d2e, #ff8c42)" }}>
                <span className="text-white text-sm font-bold">S</span>
              </div>
              <span className="font-bold" style={{ fontFamily: "Syne", color: "var(--text)" }}>Starylo</span>
            </div>
            <p className="text-xs" style={{ color: "var(--muted)" }}>© 2026 Starylo · Travel with people who get it</p>
            <div className="flex gap-5 text-xs" style={{ color: "var(--muted)" }}>
              {["Privacy", "Terms", "Safety", "Contact"].map((l) => (
                <Link key={l} href="#" className="hover:text-white transition-colors">{l}</Link>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
