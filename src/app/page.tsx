import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { TripFeed } from "@/components/TripFeed";
import { CityGrid } from "@/components/CityGrid";
import { GuideGrid } from "@/components/GuideGrid";
import { EventsList } from "@/components/EventsList";
import { PricingSection } from "@/components/PricingSection";
import { DestinationCards } from "@/components/DestinationCards";
import { Globe3D, FloatingCards3D, OceanHero } from "@/components/3d/ThreeComponents";
import { ArrowRight, Globe, Users, TrendingUp, DollarSign, ChevronDown } from "lucide-react";

const stats = [
  { value: "127",  label: "Cities covered", icon: Globe },
  { value: "4.8K", label: "Active trips",   icon: TrendingUp },
  { value: "38%",  label: "Avg cost saved", icon: DollarSign },
  { value: "12K+", label: "Travelers joined",icon: Users },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>

        {/* ══════════════════════════════════════════════════════════════
            HERO — 3D OCEAN SCENE
        ══════════════════════════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "80px",
            paddingBottom: "60px",
            paddingLeft: "16px",
            paddingRight: "16px",
            background: "#0a1628",
          }}
        >
          {/* 3D Ocean canvas — fills the whole section */}
          <OceanHero />

          {/* Dark gradient overlay — top & bottom for readability */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(5,10,30,0.55) 0%, rgba(5,10,30,0.05) 40%, rgba(5,10,30,0.75) 100%)",
              zIndex: 2,
            }}
          />

          {/* Content — floats over the ocean */}
          <div className="relative text-center max-w-5xl mx-auto" style={{ zIndex: 3 }}>

            {/* Live badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 animate-fade-up"
              style={{
                background: "rgba(255,77,46,0.15)",
                border: "1px solid rgba(255,77,46,0.4)",
                color: "var(--accent)",
                backdropFilter: "blur(8px)",
                animationDelay: "0s",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              4,800+ active trips · Real people · Real experiences
            </div>

            {/* Headline */}
            <h1
              className="text-5xl md:text-7xl lg:text-[88px] font-extrabold leading-[0.92] mb-6 animate-fade-up"
              style={{
                animationDelay: "0.1s",
                fontFamily: "Syne, sans-serif",
                color: "#fff",
                letterSpacing: "-0.035em",
                textShadow: "0 4px 40px rgba(0,0,0,0.6)",
              }}
            >
              The world is waiting<br />
              <span className="text-gradient">for your crew.</span>
            </h1>

            {/* Sub */}
            <p
              className="text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed animate-fade-up"
              style={{
                color: "rgba(255,255,255,0.75)",
                animationDelay: "0.2s",
                textShadow: "0 2px 16px rgba(0,0,0,0.7)",
              }}
            >
              Post trips, find travel partners, book local guides.{" "}
              <span className="font-semibold" style={{ color: "#fff" }}>Free forever.</span>
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16 animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Link
                href="/trips/new"
                className="btn btn-primary w-full sm:w-auto"
                style={{ padding: "15px 32px", borderRadius: "14px", fontSize: "15px", fontWeight: 700 }}
              >
                Post your trip — it&apos;s free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cities"
                className="btn btn-ghost w-full sm:w-auto"
                style={{
                  padding: "15px 32px",
                  borderRadius: "14px",
                  fontSize: "15px",
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#fff",
                }}
              >
                Explore destinations
              </Link>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              {stats.map(({ value, label, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-2xl p-4 text-center"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <Icon className="w-4 h-4 mx-auto mb-2" style={{ color: "var(--accent)" }} />
                  <div className="text-2xl font-bold" style={{ fontFamily: "Syne", color: "#fff" }}>{value}</div>
                  <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
            style={{ zIndex: 3, color: "rgba(255,255,255,0.5)", animation: "float 2s ease-in-out infinite" }}
          >
            <span style={{ fontSize: "11px", letterSpacing: "0.1em" }}>SCROLL</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════════
            DESTINATIONS — 3D TILT PHOTO CARDS
        ══════════════════════════════════════════════════════════════ */}
        <section className="section" style={{ background: "var(--bg)" }}>
          <div className="container">
            <div className="text-center mb-14">
              <div
                className="badge mx-auto mb-4"
                style={{
                  background: "rgba(255,77,46,0.1)",
                  color: "var(--accent)",
                  border: "1px solid rgba(255,77,46,0.2)",
                }}
              >
                ✈️ Where will you go next?
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold mb-3"
                style={{ color: "var(--white)", fontFamily: "Syne, sans-serif" }}
              >
                Explore the world
              </h2>
              <p style={{ color: "var(--muted)", maxWidth: "480px", margin: "0 auto", fontSize: "15px" }}>
                Hover to go deep. Click to find travel partners heading the same way.
              </p>
            </div>
            <DestinationCards />
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════════
            GLOBE — LIVE TRIP MAP
        ══════════════════════════════════════════════════════════════ */}
        <section className="section overflow-hidden" style={{ background: "var(--bg-2)" }}>
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div
                  className="badge mb-4"
                  style={{
                    background: "rgba(255,77,46,0.1)",
                    color: "var(--accent)",
                    border: "1px solid rgba(255,77,46,0.2)",
                  }}
                >
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
                    { city: "Kyoto, Japan",        detail: "3 travelers looking for hiking crew",  color: "#ff4d2e" },
                    { city: "Bali, Indonesia",      detail: "Temple tour this weekend · 2 spots",   color: "#f0b429" },
                    { city: "Medellín, Colombia",   detail: "Street art + salsa night · 4 spots",   color: "#a78bfa" },
                  ].map((item) => (
                    <div
                      key={item.city}
                      className="flex items-center gap-3 p-3 rounded-xl"
                      style={{ background: "var(--bg-3)" }}
                    >
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: item.color }} />
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "var(--white)" }}>{item.city}</p>
                        <p className="text-xs"               style={{ color: "var(--muted)" }}>{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative h-[420px] md:h-[500px]">
                <Globe3D />
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-16 blur-2xl opacity-30 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
              </div>
            </div>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════════
            LIVE TRIP FEED
        ══════════════════════════════════════════════════════════════ */}
        <section className="section" style={{ background: "var(--bg)" }}>
          <div className="container">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <div
                  className="badge mb-3"
                  style={{
                    background: "rgba(255,77,46,0.1)",
                    color: "var(--accent)",
                    border: "1px solid rgba(255,77,46,0.2)",
                  }}
                >
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


        {/* ══════════════════════════════════════════════════════════════
            HOW IT WORKS — 3D FLOATING CARDS
        ══════════════════════════════════════════════════════════════ */}
        <section className="section" style={{ background: "var(--bg-2)" }}>
          <div className="container-sm">
            <div className="text-center mb-8">
              <div
                className="badge mx-auto mb-4"
                style={{
                  background: "rgba(255,77,46,0.1)",
                  color: "var(--accent)",
                  border: "1px solid rgba(255,77,46,0.2)",
                }}
              >
                Simple
              </div>
              <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "var(--white)" }}>How it works</h2>
            </div>

            <div className="mb-8">
              <FloatingCards3D />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { step: "01", title: "Post your trip",          desc: "Where you're going, when, and what you're into. 60 seconds.", icon: "✈️" },
                { step: "02", title: "Match with travelers",    desc: "Filter by budget, style, and dates. Message instantly.",       icon: "🤝" },
                { step: "03", title: "Go together",             desc: "Split costs, explore hidden spots, make real memories.",       icon: "🌍" },
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


        {/* ══════════════════════════════════════════════════════════════
            CITIES
        ══════════════════════════════════════════════════════════════ */}
        <section className="section" style={{ background: "var(--bg)" }}>
          <div className="container">
            <div className="mb-12">
              <div
                className="badge mb-3"
                style={{
                  background: "rgba(240,180,41,0.1)",
                  color: "var(--gold)",
                  border: "1px solid rgba(240,180,41,0.2)",
                }}
              >
                Destinations
              </div>
              <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "var(--white)" }}>Explore cities</h2>
              <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>Curated guides with hidden spots only locals know.</p>
            </div>
            <CityGrid limit={5} />
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════════
            CITY SHOWCASE BANNER — parallax photo
        ══════════════════════════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden"
          style={{ height: "480px", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {/* Full-bleed city photo */}
          <div
            style={{
              position: "absolute", inset: 0,
              backgroundImage:
                "url(https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1920&q=80)",
              backgroundSize: "cover",
              backgroundPosition: "center 60%",
              backgroundAttachment: "fixed",
            }}
          />
          <div
            style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(135deg, rgba(5,10,30,0.85) 0%, rgba(5,10,30,0.5) 100%)",
            }}
          />
          <div className="relative text-center px-4" style={{ zIndex: 2 }}>
            <p
              className="text-sm font-semibold tracking-widest mb-4"
              style={{ color: "var(--accent)", textTransform: "uppercase" }}
            >
              Every city. Every crew.
            </p>
            <h2
              className="text-4xl md:text-6xl font-extrabold mb-6"
              style={{ color: "#fff", fontFamily: "Syne, sans-serif", letterSpacing: "-0.035em" }}
            >
              Your next story<br />starts here.
            </h2>
            <Link
              href="/trips/new"
              className="btn btn-primary"
              style={{ padding: "14px 32px", borderRadius: "14px", fontSize: "15px", fontWeight: 700 }}
            >
              Post a trip <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════════
            LOCAL GUIDES
        ══════════════════════════════════════════════════════════════ */}
        <section className="section" style={{ background: "var(--bg-2)" }}>
          <div className="container">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <div
                  className="badge mb-3"
                  style={{
                    background: "rgba(34,197,94,0.1)",
                    color: "var(--green)",
                    border: "1px solid rgba(34,197,94,0.2)",
                  }}
                >
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


        {/* ══════════════════════════════════════════════════════════════
            BEACH CTA BANNER — parallax photo
        ══════════════════════════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden"
          style={{ height: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <div
            style={{
              position: "absolute", inset: 0,
              backgroundImage:
                "url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80)",
              backgroundSize: "cover",
              backgroundPosition: "center 40%",
              backgroundAttachment: "fixed",
            }}
          />
          <div
            style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.65) 100%)",
            }}
          />
          <div className="relative text-center px-4" style={{ zIndex: 2 }}>
            <h2
              className="text-3xl md:text-5xl font-extrabold mb-3"
              style={{ color: "#fff", fontFamily: "Syne, sans-serif" }}
            >
              🌊 Find your travel crew
            </h2>
            <p className="mb-6" style={{ color: "rgba(255,255,255,0.8)", fontSize: "16px" }}>
              Beach or city, solo or squad — there&apos;s a trip waiting for you.
            </p>
            <Link
              href="/auth/register"
              className="btn btn-primary"
              style={{ padding: "14px 32px", borderRadius: "14px", fontSize: "15px", fontWeight: 700 }}
            >
              Join free — no credit card <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════════
            EVENTS
        ══════════════════════════════════════════════════════════════ */}
        <section className="section" style={{ background: "var(--bg)" }}>
          <div className="container">
            <div className="mb-12">
              <div
                className="badge mb-3"
                style={{
                  background: "rgba(167,139,250,0.1)",
                  color: "#a78bfa",
                  border: "1px solid rgba(167,139,250,0.2)",
                }}
              >
                Spontaneous
              </div>
              <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "var(--white)" }}>Local events</h2>
              <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                When 10+ travelers cluster in a city — magic happens.
              </p>
            </div>
            <EventsList />
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════════
            PRICING
        ══════════════════════════════════════════════════════════════ */}
        <PricingSection />


        {/* ══════════════════════════════════════════════════════════════
            FINAL CTA
        ══════════════════════════════════════════════════════════════ */}
        <section
          className="section-sm relative overflow-hidden"
          style={{ background: "var(--bg-2)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1920&q=80)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.08,
            }}
          />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-48 opacity-20 blur-3xl rounded-full"
            style={{ background: "radial-gradient(ellipse, #ff4d2e 0%, transparent 70%)" }}
          />
          <div className="container-sm text-center relative" style={{ zIndex: 2 }}>
            <h2
              className="text-4xl md:text-6xl font-bold mb-4"
              style={{ color: "var(--white)", fontFamily: "Syne" }}
            >
              Your best trip<br />
              <span className="text-gradient">hasn&apos;t happened yet.</span>
            </h2>
            <p className="mb-8" style={{ color: "var(--muted)" }}>
              Join 12,000+ travelers. Free forever. No credit card.
            </p>
            <Link
              href="/auth/register"
              className="btn btn-primary"
              style={{ padding: "16px 40px", borderRadius: "14px", fontSize: "16px", fontWeight: 700 }}
            >
              Start for free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════════════════════════ */}
        <footer className="py-10 px-4" style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}>
          <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #ff4d2e, #ff8c42)" }}
              >
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
