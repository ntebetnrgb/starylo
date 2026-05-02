import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { TripFeed } from "@/components/TripFeed";
import { CityGrid } from "@/components/CityGrid";
import { GuideGrid } from "@/components/GuideGrid";
import { EventsList } from "@/components/EventsList";
import { PricingSection } from "@/components/PricingSection";
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

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16 overflow-hidden">

          {/* Background blobs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
              style={{ background: "radial-gradient(circle, #ff4d2e 0%, transparent 70%)" }} />
            <div className="absolute top-1/3 -right-40 w-80 h-80 rounded-full opacity-15 blur-3xl"
              style={{ background: "radial-gradient(circle, #f0b429 0%, transparent 70%)" }} />
            <div className="absolute bottom-0 left-1/3 w-96 h-64 opacity-10 blur-3xl"
              style={{ background: "radial-gradient(ellipse, #7c3aed 0%, transparent 70%)" }} />
          </div>

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(var(--border-2) 1px, transparent 1px), linear-gradient(90deg, var(--border-2) 1px, transparent 1px)",
              backgroundSize: "60px 60px"
            }} />

          <div className="relative z-10 text-center max-w-5xl mx-auto">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8 animate-fade-up"
              style={{
                background: "rgba(255,77,46,0.1)",
                border: "1px solid rgba(255,77,46,0.25)",
                color: "var(--accent)",
                animationDelay: "0s"
              }}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              4,800+ active trip posts right now
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] mb-6 animate-fade-up"
              style={{ animationDelay: "0.1s", fontFamily: "Syne, sans-serif", color: "var(--white)", letterSpacing: "-0.03em" }}>
              Travel is better<br />
              <span className="text-gradient">with a crew.</span>
            </h1>

            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up"
              style={{ color: "var(--muted)", animationDelay: "0.2s" }}>
              Post your trip, find travel partners, book local guides.
              <br className="hidden md:block" />
              <strong style={{ color: "var(--subtle)" }}>Free forever.</strong> No credit card.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16 animate-fade-up"
              style={{ animationDelay: "0.3s" }}>
              <Link href="/trips/new" className="btn btn-primary w-full sm:w-auto"
                style={{ padding: "14px 28px", borderRadius: "14px", fontSize: "15px", fontWeight: 600 }}>
                Post your trip — it&apos;s free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/cities" className="btn btn-ghost w-full sm:w-auto"
                style={{ padding: "14px 28px", borderRadius: "14px", fontSize: "15px" }}>
                Explore destinations
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto animate-fade-up"
              style={{ animationDelay: "0.4s" }}>
              {stats.map(({ value, label, icon: Icon }) => (
                <div key={label} className="glass rounded-2xl p-4 text-center card-lift">
                  <div className="w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center"
                    style={{ background: "rgba(255,77,46,0.1)" }}>
                    <Icon className="w-4 h-4" style={{ color: "var(--accent)" }} />
                  </div>
                  <div className="text-2xl font-bold" style={{ fontFamily: "Syne", color: "var(--white)" }}>{value}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
            <div className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1.5"
              style={{ borderColor: "var(--border-2)" }}>
              <div className="w-1 h-2 rounded-full animate-bounce" style={{ background: "var(--accent)" }} />
            </div>
          </div>
        </section>

        {/* ── TRIP FEED ── */}
        <section className="section" style={{ background: "var(--bg-2)" }}>
          <div className="container">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <div className="badge mb-3" style={{ background: "rgba(255,77,46,0.1)", color: "var(--accent)", border: "1px solid rgba(255,77,46,0.2)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /> Live feed
                </div>
                <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "var(--white)" }}>
                  Active trips
                </h2>
                <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                  Real trips, posted by real travelers right now.
                </p>
              </div>
              <Link href="/trips" className="btn btn-ghost text-sm shrink-0" style={{ padding: "10px 20px" }}>
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <TripFeed limit={6} />
          </div>
        </section>

        {/* ── CITIES ── */}
        <section className="section" style={{ background: "var(--bg)" }}>
          <div className="container">
            <div className="mb-12">
              <div className="badge mb-3" style={{ background: "rgba(240,180,41,0.1)", color: "var(--gold)", border: "1px solid rgba(240,180,41,0.2)" }}>
                Destinations
              </div>
              <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "var(--white)" }}>
                Explore cities
              </h2>
              <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                Curated guides with hidden spots only locals know.
              </p>
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
                <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "var(--white)" }}>
                  Local guides
                </h2>
                <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                  Handpicked experts rated by traveler community.
                </p>
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
              <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "var(--white)" }}>
                Local events
              </h2>
              <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                When 10+ travelers cluster in a city — magic happens.
              </p>
            </div>
            <EventsList />
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="section" style={{ background: "var(--bg-2)" }}>
          <div className="container-sm text-center">
            <div className="badge mx-auto mb-4" style={{ background: "rgba(255,77,46,0.1)", color: "var(--accent)", border: "1px solid rgba(255,77,46,0.2)" }}>
              Simple
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-12" style={{ color: "var(--white)" }}>How it works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: "01", title: "Post your trip", desc: "Share where you're going and when. Takes 60 seconds.", icon: "✈️" },
                { step: "02", title: "Find your crew", desc: "Browse travelers with matching styles and budget.", icon: "🤝" },
                { step: "03", title: "Go together", desc: "Split costs, discover hidden spots, make memories.", icon: "🌍" },
              ].map((s) => (
                <div key={s.step} className="glass rounded-2xl p-6 text-left card-lift">
                  <div className="text-3xl mb-4">{s.icon}</div>
                  <div className="text-xs font-bold mb-2 tracking-wider" style={{ color: "var(--accent)" }}>{s.step}</div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: "var(--white)" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <PricingSection />

        {/* ── CTA ── */}
        <section className="section-sm relative overflow-hidden" style={{ background: "var(--bg-2)" }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 opacity-20 blur-3xl"
              style={{ background: "radial-gradient(ellipse, #ff4d2e 0%, transparent 70%)" }} />
          </div>
          <div className="container-sm text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--white)" }}>
              Your best trip<br /><span className="text-gradient">hasn't happened yet.</span>
            </h2>
            <p className="mb-8 text-sm" style={{ color: "var(--muted)" }}>
              Join 12,000+ travelers. No credit card. Free forever.
            </p>
            <Link href="/auth/register" className="btn btn-primary"
              style={{ padding: "16px 36px", borderRadius: "14px", fontSize: "16px", fontWeight: 600 }}>
              Start for free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="py-10 px-4" style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}>
          <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #ff4d2e, #ff8c42)" }}>
                <span className="text-white text-xs font-bold">S</span>
              </div>
              <span className="text-sm font-bold" style={{ fontFamily: "Syne", color: "var(--text)" }}>Starylo</span>
            </div>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              © 2026 Starylo · Travel with people who get it
            </p>
            <div className="flex items-center gap-4 text-xs" style={{ color: "var(--muted)" }}>
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
