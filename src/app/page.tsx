import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { TripFeed } from "@/components/TripFeed";
import { CityGrid } from "@/components/CityGrid";
import { GuideGrid } from "@/components/GuideGrid";
import { EventsList } from "@/components/EventsList";
import { PricingSection } from "@/components/PricingSection";
import { DestinationCards } from "@/components/DestinationCards";
import { ParticleField, Globe3D, FloatingCards3D } from "@/components/3d/ThreeComponents";
import { ArrowRight, Globe, Users, TrendingUp, DollarSign, ChevronDown, Star, Compass } from "lucide-react";

const stats = [
  { value: "127",  label: "Cities covered",  icon: Globe },
  { value: "4.8K", label: "Active trips",    icon: TrendingUp },
  { value: "38%",  label: "Avg cost saved",  icon: DollarSign },
  { value: "12K+", label: "Travelers joined", icon: Users },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>

        {/* ══════════════════════════════════════════════════════════
            HERO  — Real drone beach video + warm particle overlay
        ══════════════════════════════════════════════════════════ */}
        <section
          style={{
            minHeight: "100vh",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "88px",
            paddingBottom: "72px",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          {/* 🎬 Real drone footage — Pexels / free license */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=60"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              zIndex: 0,
            }}
          >
            <source
              src="https://videos.pexels.com/video-files/4193130/4193130-hd_1920_1080_24fps.mp4"
              type="video/mp4"
            />
          </video>

          {/* 🔥 Warm particle field overlay */}
          <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}>
            <ParticleField />
          </div>

          {/* 🌅 Warm cinematic gradient */}
          <div
            style={{
              position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
              background: `
                linear-gradient(
                  to bottom,
                  rgba(8, 4, 2, 0.72) 0%,
                  rgba(8, 4, 2, 0.18) 30%,
                  rgba(8, 4, 2, 0.08) 55%,
                  rgba(8, 4, 2, 0.65) 100%
                )
              `,
            }}
          />
          {/* Side warm vignette */}
          <div
            style={{
              position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
              background: "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 50%, rgba(8,4,2,0.5) 100%)",
            }}
          />

          {/* Content */}
          <div
            className="relative text-center"
            style={{ zIndex: 3, maxWidth: "900px", width: "100%", margin: "0 auto" }}
          >
            {/* Live badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 animate-fade-up"
              style={{
                background: "rgba(255, 107, 53, 0.18)",
                border: "1px solid rgba(255, 107, 53, 0.45)",
                color: "#ff8c5e",
                backdropFilter: "blur(12px)",
                animationDelay: "0s",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#ff6b35" }} />
              4,800+ active trips · Real people · Real places
            </div>

            {/* Headline */}
            <h1
              className="animate-fade-up"
              style={{
                fontSize: "clamp(44px, 8vw, 92px)",
                fontWeight: 800,
                lineHeight: 0.93,
                letterSpacing: "-0.038em",
                color: "#fffaf3",
                fontFamily: "Syne, sans-serif",
                marginBottom: "24px",
                textShadow: "0 4px 48px rgba(0,0,0,0.7)",
                animationDelay: "0.1s",
              }}
            >
              The world is waiting<br />
              <span className="text-gradient">for your crew.</span>
            </h1>

            <p
              className="animate-fade-up"
              style={{
                fontSize: "18px",
                color: "rgba(255,250,243,0.78)",
                maxWidth: "500px",
                margin: "0 auto 40px",
                lineHeight: 1.65,
                animationDelay: "0.2s",
                textShadow: "0 2px 20px rgba(0,0,0,0.8)",
              }}
            >
              Post trips, find travel partners, book local guides.{" "}
              <strong style={{ color: "#fff", fontWeight: 600 }}>Free forever.</strong>
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up"
              style={{ marginBottom: "64px", animationDelay: "0.3s" }}
            >
              <Link
                href="/trips/new"
                className="btn btn-primary w-full sm:w-auto"
                style={{ padding: "16px 36px", borderRadius: "16px", fontSize: "15px", fontWeight: 700 }}
              >
                Post your trip — it&apos;s free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cities"
                className="btn btn-ghost w-full sm:w-auto"
                style={{
                  padding: "16px 36px",
                  borderRadius: "16px",
                  fontSize: "15px",
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "#fff",
                }}
              >
                Explore destinations
              </Link>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-up"
              style={{ maxWidth: "640px", margin: "0 auto", animationDelay: "0.4s" }}
            >
              {stats.map(({ value, label, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-2xl p-4 text-center card-lift"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,190,110,0.14)",
                  }}
                >
                  <Icon className="w-4 h-4 mx-auto mb-2" style={{ color: "#f59e0b" }} />
                  <div
                    className="text-2xl font-bold"
                    style={{ fontFamily: "Syne", color: "#fffaf3" }}
                  >
                    {value}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "rgba(255,250,243,0.5)" }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            style={{
              position: "absolute",
              bottom: "32px",
              left: "50%",
              zIndex: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
              color: "rgba(255,250,243,0.45)",
              animation: "float 2.5s ease-in-out infinite",
              transform: "translateX(-50%)",
            }}
          >
            <span style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase" }}>Scroll</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            TRUST BAR
        ══════════════════════════════════════════════════════════ */}
        <div
          style={{
            background: "var(--bg-2)",
            borderTop:    "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            padding: "18px 16px",
            overflow: "hidden",
          }}
        >
          <div
            className="container"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "32px",
            }}
          >
            {[
              "🌏 127 countries",
              "⭐ 4.9 avg rating",
              "🔒 Safe & verified",
              "💸 Free forever",
              "✈️ 4,800+ trips live",
            ].map((t) => (
              <span
                key={t}
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--subtle)",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.02em",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>


        {/* ══════════════════════════════════════════════════════════
            DESTINATIONS — 3D tilt photo cards
        ══════════════════════════════════════════════════════════ */}
        <section className="section" style={{ background: "var(--bg)" }}>
          <div className="container">
            <div className="text-center" style={{ marginBottom: "56px" }}>
              <div
                className="badge"
                style={{
                  background: "rgba(255,107,53,0.12)",
                  color: "var(--accent)",
                  border: "1px solid rgba(255,107,53,0.25)",
                  marginBottom: "16px",
                }}
              >
                ✈️ Where will you go next?
              </div>
              <h2
                style={{
                  fontSize: "clamp(32px, 5vw, 54px)",
                  fontWeight: 800,
                  color: "var(--white)",
                  fontFamily: "Syne, sans-serif",
                  letterSpacing: "-0.03em",
                  marginBottom: "12px",
                }}
              >
                Explore the world
              </h2>
              <p style={{ color: "var(--muted)", maxWidth: "420px", margin: "0 auto", fontSize: "15px", lineHeight: 1.6 }}>
                Hover to go deep. Click to find travel partners heading the same way.
              </p>
            </div>
            <DestinationCards />
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            GLOBE SECTION
        ══════════════════════════════════════════════════════════ */}
        <section className="section overflow-hidden" style={{ background: "var(--bg-2)" }}>
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div
                  className="badge"
                  style={{
                    background: "rgba(255,107,53,0.1)",
                    color: "var(--accent)",
                    border: "1px solid rgba(255,107,53,0.2)",
                    marginBottom: "16px",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#ff6b35" }} />
                  {" "}Live worldwide
                </div>
                <h2
                  style={{
                    fontSize: "clamp(30px, 4vw, 48px)",
                    fontWeight: 800,
                    color: "var(--white)",
                    fontFamily: "Syne, sans-serif",
                    marginBottom: "16px",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Travelers everywhere,<br />right now.
                </h2>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, marginBottom: "24px" }}>
                  Each dot is a real active trip post. Kyoto to Bali, Lisbon to Medellín — your crew is out there.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    { city: "Kyoto, Japan",       detail: "3 travelers looking for hiking crew",  color: "#ff6b35" },
                    { city: "Bali, Indonesia",     detail: "Temple tour this weekend · 2 spots",   color: "#f59e0b" },
                    { city: "Medellín, Colombia",  detail: "Street art + salsa night · 4 spots",   color: "#a78bfa" },
                  ].map((item) => (
                    <div
                      key={item.city}
                      className="glass rounded-xl card-lift"
                      style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px" }}
                    >
                      <div
                        style={{
                          width: "8px", height: "8px",
                          borderRadius: "50%",
                          background: item.color,
                          boxShadow: `0 0 8px ${item.color}88`,
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--white)" }}>{item.city}</p>
                        <p style={{ fontSize: "11px", color: "var(--muted)" }}>{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ position: "relative", height: "440px" }}>
                <Globe3D />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0, left: "50%",
                    transform: "translateX(-50%)",
                    width: "260px", height: "60px",
                    borderRadius: "50%",
                    background: "var(--accent)",
                    filter: "blur(40px)",
                    opacity: 0.25,
                  }}
                />
              </div>
            </div>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            LIVE TRIP FEED
        ══════════════════════════════════════════════════════════ */}
        <section className="section" style={{ background: "var(--bg)" }}>
          <div className="container">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginBottom: "48px",
              }}
              className="sm:flex-row sm:items-end sm:justify-between"
            >
              <div>
                <div
                  className="badge"
                  style={{
                    background: "rgba(255,107,53,0.1)",
                    color: "var(--accent)",
                    border: "1px solid rgba(255,107,53,0.2)",
                    marginBottom: "10px",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#ff6b35" }} />
                  {" "}Live now
                </div>
                <h2
                  style={{
                    fontSize: "clamp(30px, 4vw, 48px)",
                    fontWeight: 800,
                    color: "var(--white)",
                    fontFamily: "Syne, sans-serif",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Active trips
                </h2>
                <p style={{ marginTop: "6px", fontSize: "14px", color: "var(--muted)" }}>
                  Real people posting real trips right now.
                </p>
              </div>
              <Link
                href="/trips"
                className="btn btn-ghost"
                style={{ padding: "10px 20px", fontSize: "13px", flexShrink: 0 }}
              >
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <TripFeed limit={6} />
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            HOW IT WORKS — 3D floating cards
        ══════════════════════════════════════════════════════════ */}
        <section className="section" style={{ background: "var(--bg-2)" }}>
          <div className="container-sm">
            <div className="text-center" style={{ marginBottom: "40px" }}>
              <div
                className="badge"
                style={{
                  background: "rgba(245,158,11,0.12)",
                  color: "var(--gold)",
                  border: "1px solid rgba(245,158,11,0.25)",
                  marginBottom: "14px",
                }}
              >
                Simple · 3 steps
              </div>
              <h2
                style={{
                  fontSize: "clamp(30px, 4vw, 48px)",
                  fontWeight: 800,
                  color: "var(--white)",
                  fontFamily: "Syne, sans-serif",
                  letterSpacing: "-0.03em",
                }}
              >
                How it works
              </h2>
            </div>

            <div style={{ marginBottom: "32px" }}>
              <FloatingCards3D />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { step: "01", title: "Post your trip",       desc: "Where you're going, when, what you're into. 60 seconds.", icon: "✈️" },
                { step: "02", title: "Match travelers",      desc: "Filter by budget, vibe, dates. Message instantly.",        icon: "🤝" },
                { step: "03", title: "Go together",          desc: "Split costs, explore hidden spots, make real memories.",   icon: "🌍" },
              ].map((s) => (
                <div
                  key={s.step}
                  className="glass rounded-2xl card-lift"
                  style={{ padding: "28px 24px" }}
                >
                  <div style={{ fontSize: "32px", marginBottom: "16px" }}>{s.icon}</div>
                  <div
                    style={{
                      fontSize: "11px", fontWeight: 700,
                      letterSpacing: "0.08em", marginBottom: "8px",
                      color: "var(--accent)",
                    }}
                  >
                    {s.step}
                  </div>
                  <h3
                    style={{
                      fontSize: "17px", fontWeight: 700,
                      color: "var(--white)", fontFamily: "Syne",
                      marginBottom: "8px",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            CITIES
        ══════════════════════════════════════════════════════════ */}
        <section className="section" style={{ background: "var(--bg)" }}>
          <div className="container">
            <div style={{ marginBottom: "48px" }}>
              <div
                className="badge"
                style={{
                  background: "rgba(245,158,11,0.1)",
                  color: "var(--gold)",
                  border: "1px solid rgba(245,158,11,0.2)",
                  marginBottom: "12px",
                }}
              >
                Destinations
              </div>
              <h2
                style={{
                  fontSize: "clamp(30px, 4vw, 48px)",
                  fontWeight: 800,
                  color: "var(--white)",
                  fontFamily: "Syne, sans-serif",
                  letterSpacing: "-0.03em",
                }}
              >
                Explore cities
              </h2>
              <p style={{ marginTop: "6px", fontSize: "14px", color: "var(--muted)" }}>
                Curated guides with hidden spots only locals know.
              </p>
            </div>
            <CityGrid limit={5} />
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            CITY NIGHT VIDEO BANNER
        ══════════════════════════════════════════════════════════ */}
        <section
          style={{
            position: "relative",
            height: "520px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <video
            autoPlay muted loop playsInline preload="none"
            poster="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1920&q=60"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", zIndex: 0,
            }}
          >
            <source
              src="https://videos.pexels.com/video-files/2248563/2248563-hd_1920_1080_25fps.mp4"
              type="video/mp4"
            />
          </video>

          <div
            style={{
              position: "absolute", inset: 0, zIndex: 1,
              background: "linear-gradient(135deg, rgba(8,4,2,0.88) 0%, rgba(8,4,2,0.5) 100%)",
            }}
          />

          <div className="relative text-center px-4" style={{ zIndex: 2 }}>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "16px",
              }}
            >
              Every city. Every crew.
            </p>
            <h2
              style={{
                fontSize: "clamp(34px, 6vw, 64px)",
                fontWeight: 800,
                color: "var(--white)",
                fontFamily: "Syne, sans-serif",
                letterSpacing: "-0.035em",
                marginBottom: "28px",
                lineHeight: 1.0,
              }}
            >
              Your next story<br />
              <span className="text-gradient">starts here.</span>
            </h2>
            <Link
              href="/trips/new"
              className="btn btn-primary"
              style={{ padding: "15px 36px", borderRadius: "16px", fontSize: "15px", fontWeight: 700 }}
            >
              Post a trip <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            LOCAL GUIDES
        ══════════════════════════════════════════════════════════ */}
        <section className="section" style={{ background: "var(--bg-2)" }}>
          <div className="container">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "48px" }}
              className="sm:flex-row sm:items-end sm:justify-between"
            >
              <div>
                <div
                  className="badge"
                  style={{
                    background: "rgba(16,185,129,0.1)",
                    color: "var(--green)",
                    border: "1px solid rgba(16,185,129,0.2)",
                    marginBottom: "10px",
                  }}
                >
                  ✓ Verified locals
                </div>
                <h2
                  style={{
                    fontSize: "clamp(30px, 4vw, 48px)",
                    fontWeight: 800,
                    color: "var(--white)",
                    fontFamily: "Syne, sans-serif",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Local guides
                </h2>
                <p style={{ marginTop: "6px", fontSize: "14px", color: "var(--muted)" }}>
                  Handpicked experts rated by the community.
                </p>
              </div>
              <Link
                href="/guides"
                className="btn btn-ghost"
                style={{ padding: "10px 20px", fontSize: "13px", flexShrink: 0 }}
              >
                All guides <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <GuideGrid limit={4} />
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            BEACH OCEAN VIDEO BANNER
        ══════════════════════════════════════════════════════════ */}
        <section
          style={{
            position: "relative",
            height: "460px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <video
            autoPlay muted loop playsInline preload="none"
            poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=60"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", zIndex: 0,
            }}
          >
            <source
              src="https://videos.pexels.com/video-files/7666608/7666608-hd_1920_1080_30fps.mp4"
              type="video/mp4"
            />
          </video>

          <div
            style={{
              position: "absolute", inset: 0, zIndex: 1,
              background: "linear-gradient(to bottom, rgba(8,4,2,0.45) 0%, rgba(8,4,2,0.65) 100%)",
            }}
          />

          <div className="relative text-center px-4" style={{ zIndex: 2 }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🌊</div>
            <h2
              style={{
                fontSize: "clamp(30px, 5vw, 52px)",
                fontWeight: 800,
                color: "var(--white)",
                fontFamily: "Syne, sans-serif",
                letterSpacing: "-0.03em",
                marginBottom: "12px",
              }}
            >
              Find your travel crew
            </h2>
            <p
              style={{
                color: "rgba(255,250,243,0.75)",
                fontSize: "16px",
                marginBottom: "28px",
              }}
            >
              Beach or city, solo or squad — there&apos;s a trip waiting for you.
            </p>
            <Link
              href="/auth/register"
              className="btn btn-primary"
              style={{ padding: "14px 36px", borderRadius: "16px", fontSize: "15px", fontWeight: 700 }}
            >
              Join free — no credit card <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            EVENTS
        ══════════════════════════════════════════════════════════ */}
        <section className="section" style={{ background: "var(--bg)" }}>
          <div className="container">
            <div style={{ marginBottom: "48px" }}>
              <div
                className="badge"
                style={{
                  background: "rgba(167,139,250,0.1)",
                  color: "#a78bfa",
                  border: "1px solid rgba(167,139,250,0.22)",
                  marginBottom: "12px",
                }}
              >
                ✨ Spontaneous
              </div>
              <h2
                style={{
                  fontSize: "clamp(30px, 4vw, 48px)",
                  fontWeight: 800,
                  color: "var(--white)",
                  fontFamily: "Syne, sans-serif",
                  letterSpacing: "-0.03em",
                }}
              >
                Local events
              </h2>
              <p style={{ marginTop: "6px", fontSize: "14px", color: "var(--muted)" }}>
                When 10+ travelers cluster in a city — magic happens.
              </p>
            </div>
            <EventsList />
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            PRICING
        ══════════════════════════════════════════════════════════ */}
        <PricingSection />


        {/* ══════════════════════════════════════════════════════════
            FINAL CTA — warm ambient
        ══════════════════════════════════════════════════════════ */}
        <section
          className="section-sm"
          style={{
            position: "relative",
            overflow: "hidden",
            background: "var(--bg-2)",
          }}
        >
          {/* Warm glow orbs */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
            <div
              style={{
                position: "absolute",
                top: "-20%", left: "50%", transform: "translateX(-50%)",
                width: "600px", height: "300px",
                borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(255,107,53,0.18) 0%, transparent 65%)",
                filter: "blur(1px)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-30%", right: "10%",
                width: "300px", height: "300px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)",
              }}
            />
          </div>

          <div className="container-sm text-center" style={{ position: "relative", zIndex: 2 }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🌅</div>
            <h2
              style={{
                fontSize: "clamp(34px, 6vw, 64px)",
                fontWeight: 800,
                color: "var(--white)",
                fontFamily: "Syne, sans-serif",
                letterSpacing: "-0.04em",
                marginBottom: "16px",
                lineHeight: 1.05,
              }}
            >
              Your best trip<br />
              <span className="text-gradient">hasn&apos;t happened yet.</span>
            </h2>
            <p style={{ color: "var(--muted)", marginBottom: "32px", fontSize: "16px" }}>
              Join 12,000+ travelers. Free forever. No credit card.
            </p>
            <Link
              href="/auth/register"
              className="btn btn-primary"
              style={{ padding: "17px 44px", borderRadius: "16px", fontSize: "16px", fontWeight: 700 }}
            >
              Start for free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════════════════════ */}
        <footer
          style={{
            padding: "40px 16px",
            borderTop: "1px solid var(--border)",
            background: "var(--bg)",
          }}
        >
          <div
            className="container"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "32px", height: "32px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #ff6b35, #f59e0b)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <Compass className="w-4 h-4 text-white" />
              </div>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: "17px",
                  fontFamily: "Syne, sans-serif",
                  color: "var(--text)",
                }}
              >
                Starylo
              </span>
            </div>

            <p style={{ fontSize: "12px", color: "var(--muted)" }}>
              © 2026 Starylo · Travel with people who get it
            </p>

            <div style={{ display: "flex", gap: "24px" }}>
              {["Privacy", "Terms", "Safety", "Contact"].map((l) => (
                <Link
                  key={l}
                  href="#"
                  style={{
                    fontSize: "12px",
                    color: "var(--muted)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  className="hover:text-white"
                >
                  {l}
                </Link>
              ))}
            </div>

            <p style={{ fontSize: "10px", color: "var(--bg-4)", marginTop: "4px" }}>
              Videos courtesy of Pexels (free license)
            </p>
          </div>
        </footer>

      </main>
    </>
  );
}
