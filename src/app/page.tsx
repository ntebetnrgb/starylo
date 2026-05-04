import Link from "next/link";
import { Navbar }           from "@/components/Navbar";
import { TripFeed }         from "@/components/TripFeed";
import { CityGrid }         from "@/components/CityGrid";
import { GuideGrid }        from "@/components/GuideGrid";
import { EventsList }       from "@/components/EventsList";
import { PricingSection }   from "@/components/PricingSection";
import { DestinationCards } from "@/components/DestinationCards";
import { Marquee }          from "@/components/Marquee";
import { Reveal }           from "@/components/ScrollReveal";
import { ParticleField, Globe3D, FloatingCards3D } from "@/components/3d/ThreeComponents";
import { ArrowRight, Compass, ChevronDown } from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const DEST_MARQUEE = ["BALI", "TOKYO", "SANTORINI", "MARRAKECH", "KYOTO", "MEDELLÍN", "LISBON", "QUEENSTOWN", "DUBAI", "CAPE TOWN", "TBILISI", "OAXACA"];

const STATS = [
  { value: "127",  label: "Countries",     note: "and growing" },
  { value: "4.8K", label: "Active trips",  note: "right now" },
  { value: "12K+", label: "Travelers",     note: "joined free" },
  { value: "38%",  label: "Avg saved",     note: "by sharing costs" },
];

// ─── SECTION LABEL ───────────────────────────────────────────────────────────

function SectionLabel({ num, text }: { num: string; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "32px" }}>
      <span style={{
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.14em",
        color: "var(--accent)",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        fontFamily: "Syne, sans-serif",
      }}>
        {num} / {text}
      </span>
      <div style={{ height: "1px", background: "var(--border)", width: "60px", flexShrink: 0 }} />
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>

        {/* ╔══════════════════════════════════════════════════════╗
            ║  HERO — video + editorial Playfair Display           ║
            ╚══════════════════════════════════════════════════════╝ */}
        <section
          style={{
            minHeight: "100vh",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: "80px",
            paddingLeft: "24px",
            paddingRight: "24px",
          }}
        >
          {/* ── Real drone beach video ── */}
          <video
            autoPlay muted loop playsInline preload="auto"
            poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=60"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", zIndex: 0,
            }}
          >
            <source src="https://videos.pexels.com/video-files/4193130/4193130-hd_1920_1080_24fps.mp4" type="video/mp4" />
          </video>

          {/* ── Warm golden particles overlay ── */}
          <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}>
            <ParticleField />
          </div>

          {/* ── Cinematic gradient ── */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
            background: "linear-gradient(to bottom, rgba(8,4,2,0.6) 0%, rgba(8,4,2,0.05) 35%, rgba(8,4,2,0.08) 55%, rgba(8,4,2,0.85) 100%)",
          }} />

          {/* ── PT top-left logo stamp ── */}
          <div style={{
            position: "absolute", top: "100px", left: "28px",
            display: "flex", alignItems: "center", gap: "10px", zIndex: 3,
            opacity: 0.5,
          }}>
            <Compass className="w-4 h-4" style={{ color: "#fff" }} />
            <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", color: "#fff", textTransform: "uppercase" }}>Est. 2026</span>
          </div>

          {/* ── Scroll indicator ── */}
          <div style={{
            position: "absolute", top: "50%", right: "28px",
            transform: "translateY(-50%) rotate(90deg)",
            zIndex: 3, display: "flex", alignItems: "center", gap: "8px",
            color: "rgba(255,250,243,0.4)",
          }}>
            <ChevronDown className="w-3.5 h-3.5" style={{ transform: "rotate(-90deg)", animation: "float-simple 2s ease-in-out infinite" }} />
            <span style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase" }}>Scroll</span>
          </div>

          {/* ── Main content (bottom-aligned editorial style) ── */}
          <div style={{ position: "relative", zIndex: 3, maxWidth: "1200px", width: "100%" }}>

            {/* Badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(255,107,53,0.16)", border: "1px solid rgba(255,107,53,0.4)",
              borderRadius: "100px", padding: "6px 14px", marginBottom: "24px",
              backdropFilter: "blur(12px)",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ff6b35", animation: "glow-pulse 2s infinite", display: "inline-block" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#ff8c5e", textTransform: "uppercase" }}>
                4,800+ active trips worldwide
              </span>
            </div>

            {/* BIG Playfair Display headline */}
            <h1 style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontSize: "clamp(52px, 9vw, 120px)",
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: "#fffaf3",
              marginBottom: "32px",
              textShadow: "0 8px 60px rgba(0,0,0,0.5)",
            }}>
              Travel.<br />
              <em style={{ fontStyle: "italic", color: "#f59e0b" }}>Your way.</em>
            </h1>

            {/* Divider row */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "28px" }}>
              <div style={{ height: "1px", width: "60px", background: "rgba(255,250,243,0.3)" }} />
              <p style={{ fontSize: "15px", color: "rgba(255,250,243,0.75)", lineHeight: 1.6, maxWidth: "440px" }}>
                Post trips, find your crew, book local guides. Free forever.
              </p>
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "48px" }}>
              <Link href="/trips/new" className="btn btn-primary" style={{
                padding: "16px 36px", borderRadius: "50px",
                fontSize: "14px", fontWeight: 700,
                letterSpacing: "0.04em", textTransform: "uppercase",
              }}>
                Start exploring <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/trips" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "16px 28px",
                fontSize: "13px", fontWeight: 600,
                color: "rgba(255,250,243,0.7)",
                textDecoration: "none",
                letterSpacing: "0.04em",
                border: "1px solid rgba(255,250,243,0.2)",
                borderRadius: "50px",
                backdropFilter: "blur(10px)",
                transition: "all 0.2s",
              }}>
                Browse live trips
              </Link>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "32px" }}>
              {STATS.map((s) => (
                <div key={s.label}>
                  <div style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "32px", fontWeight: 800,
                    color: "#fffaf3",
                    lineHeight: 1,
                  }}>{s.value}</div>
                  <div style={{ fontSize: "11px", color: "rgba(255,250,243,0.5)", marginTop: "4px" }}>
                    {s.label} <span style={{ opacity: 0.5 }}>— {s.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ╔══════════════════════════════════════════════════════╗
            ║  MARQUEE — scrolling destinations ticker             ║
            ╚══════════════════════════════════════════════════════╝ */}
        <div style={{
          background: "var(--bg-2)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "28px 0",
          overflow: "hidden",
        }}>
          <Marquee items={DEST_MARQUEE} speed={32} size="lg" />
        </div>


        {/* ╔══════════════════════════════════════════════════════╗
            ║  BIG STATEMENT                                        ║
            ╚══════════════════════════════════════════════════════╝ */}
        <section style={{ background: "var(--bg)", padding: "100px 24px" }}>
          <div className="container">
            <Reveal y={60}>
              <h2 style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontSize: "clamp(36px, 6vw, 84px)",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "var(--white)",
                maxWidth: "900px",
              }}>
                The world is full of places you haven&apos;t been yet.{" "}
                <em style={{ color: "var(--accent)", fontStyle: "italic" }}>Who will you go with?</em>
              </h2>
            </Reveal>
            <Reveal delay={150} y={40}>
              <div style={{
                display: "flex", flexWrap: "wrap",
                alignItems: "center", gap: "20px", marginTop: "36px",
              }}>
                <div style={{ height: "1px", width: "80px", background: "var(--border)" }} />
                <p style={{ color: "var(--muted)", fontSize: "15px", maxWidth: "420px", lineHeight: 1.7 }}>
                  Starylo connects solo travelers, couples, and groups planning their next adventure. Post a trip in 60 seconds.
                </p>
                <Link href="/auth/register" className="btn btn-primary" style={{
                  padding: "14px 28px", borderRadius: "50px",
                  fontSize: "13px", fontWeight: 700,
                  letterSpacing: "0.04em", textTransform: "uppercase",
                }}>
                  Join free →
                </Link>
              </div>
            </Reveal>
          </div>
        </section>


        {/* ╔══════════════════════════════════════════════════════╗
            ║  01 / DESTINATIONS — 3D tilt photo cards             ║
            ╚══════════════════════════════════════════════════════╝ */}
        <section className="section" style={{ background: "var(--bg-2)" }}>
          <div className="container">
            <Reveal>
              <SectionLabel num="01" text="Destinations" />
              <h2 style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontSize: "clamp(34px, 5vw, 64px)",
                fontWeight: 900,
                letterSpacing: "-0.025em",
                color: "var(--white)",
                marginBottom: "12px",
              }}>
                Explore the world
              </h2>
              <p style={{ color: "var(--muted)", fontSize: "15px", marginBottom: "48px", maxWidth: "400px" }}>
                Hover to feel the depth. Click to find a crew going there.
              </p>
            </Reveal>
            <DestinationCards />
          </div>
        </section>


        {/* ── Second marquee (reversed) ── */}
        <div style={{
          background: "var(--bg)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "20px 0",
          overflow: "hidden",
        }}>
          <Marquee items={["FIND YOUR CREW", "TRAVEL TOGETHER", "FREE FOREVER", "127 CITIES", "REAL EXPERIENCES", "NO CREDIT CARD"]} speed={22} size="sm" reverse separator="★" />
        </div>


        {/* ╔══════════════════════════════════════════════════════╗
            ║  02 / THE MAP — live globe                           ║
            ╚══════════════════════════════════════════════════════╝ */}
        <section className="section overflow-hidden" style={{ background: "var(--bg-2)" }}>
          <div className="container">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <Reveal>
                  <SectionLabel num="02" text="Live Map" />
                  <h2 style={{
                    fontFamily: "Playfair Display, Georgia, serif",
                    fontSize: "clamp(34px, 4.5vw, 58px)",
                    fontWeight: 900,
                    letterSpacing: "-0.025em",
                    color: "var(--white)",
                    marginBottom: "16px",
                    lineHeight: 1.1,
                  }}>
                    Travelers everywhere,<br /><em style={{ color: "var(--accent)", fontStyle: "italic" }}>right now.</em>
                  </h2>
                </Reveal>
                <Reveal delay={100}>
                  <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.75, marginBottom: "28px" }}>
                    Each dot is a real posted trip. Drag the globe to see where the world is going today.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {[
                      { city: "Kyoto, Japan",       detail: "3 travelers seeking hiking crew", color: "#ff6b35" },
                      { city: "Bali, Indonesia",     detail: "Temple tour · 2 spots left",      color: "#f59e0b" },
                      { city: "Medellín, Colombia",  detail: "Street art + salsa · 4 spots",    color: "#a78bfa" },
                    ].map((item) => (
                      <div key={item.city} className="glass rounded-xl card-lift" style={{
                        display: "flex", alignItems: "center", gap: "14px", padding: "14px 18px",
                      }}>
                        <div style={{
                          width: "8px", height: "8px", borderRadius: "50%",
                          background: item.color, flexShrink: 0,
                          boxShadow: `0 0 10px ${item.color}80`,
                        }} />
                        <div>
                          <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--white)" }}>{item.city}</p>
                          <p style={{ fontSize: "11px", color: "var(--muted)" }}>{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

              <div style={{ position: "relative", height: "460px" }}>
                <Globe3D />
                <div style={{
                  position: "absolute", bottom: 0, left: "50%",
                  transform: "translateX(-50%)",
                  width: "240px", height: "50px", borderRadius: "50%",
                  background: "var(--accent)", filter: "blur(40px)", opacity: 0.2,
                }} />
              </div>
            </div>
          </div>
        </section>


        {/* ╔══════════════════════════════════════════════════════╗
            ║  03 / ACTIVE TRIPS — live feed                       ║
            ╚══════════════════════════════════════════════════════╝ */}
        <section className="section" style={{ background: "var(--bg)" }}>
          <div className="container">
            <Reveal>
              <SectionLabel num="03" text="Active Trips" />
              <div style={{
                display: "flex", flexWrap: "wrap",
                alignItems: "flex-end", justifyContent: "space-between",
                gap: "16px", marginBottom: "48px",
              }}>
                <h2 style={{
                  fontFamily: "Playfair Display, Georgia, serif",
                  fontSize: "clamp(34px, 5vw, 60px)",
                  fontWeight: 900,
                  letterSpacing: "-0.025em",
                  color: "var(--white)",
                }}>
                  Who&apos;s going?
                </h2>
                <Link href="/trips" className="btn btn-ghost" style={{
                  padding: "12px 24px", borderRadius: "50px", fontSize: "13px",
                  letterSpacing: "0.04em", textTransform: "uppercase",
                }}>
                  All trips <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Reveal>
            <TripFeed limit={6} />
          </div>
        </section>


        {/* ╔══════════════════════════════════════════════════════╗
            ║  CITY NIGHT VIDEO BANNER                             ║
            ╚══════════════════════════════════════════════════════╝ */}
        <section style={{
          position: "relative", height: "520px",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
        }}>
          <video autoPlay muted loop playsInline preload="none"
            poster="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1920&q=60"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}>
            <source src="https://videos.pexels.com/video-files/2248563/2248563-hd_1920_1080_25fps.mp4" type="video/mp4" />
          </video>
          <div style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "linear-gradient(135deg, rgba(8,4,2,0.88) 0%, rgba(8,4,2,0.42) 100%)",
          }} />
          <div className="relative text-center px-6" style={{ zIndex: 2 }}>
            <Reveal>
              <p style={{
                fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em",
                textTransform: "uppercase", color: "var(--accent)", marginBottom: "20px",
              }}>
                Every city. Every crew.
              </p>
              <h2 style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontSize: "clamp(36px, 7vw, 76px)",
                fontWeight: 900,
                color: "#fff",
                letterSpacing: "-0.03em",
                marginBottom: "32px",
                lineHeight: 1.0,
              }}>
                Your next story<br />
                <em style={{ color: "var(--gold)", fontStyle: "italic" }}>starts here.</em>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <Link href="/trips/new" className="btn btn-primary" style={{
                padding: "15px 36px", borderRadius: "50px",
                fontSize: "13px", fontWeight: 700,
                letterSpacing: "0.06em", textTransform: "uppercase",
              }}>
                Post a trip <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>
        </section>


        {/* ╔══════════════════════════════════════════════════════╗
            ║  04 / HOW IT WORKS — 3D cards + steps               ║
            ╚══════════════════════════════════════════════════════╝ */}
        <section className="section" style={{ background: "var(--bg-2)" }}>
          <div className="container-sm">
            <Reveal>
              <SectionLabel num="04" text="How It Works" />
              <h2 style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontSize: "clamp(34px, 5vw, 60px)",
                fontWeight: 900,
                letterSpacing: "-0.025em",
                color: "var(--white)",
                marginBottom: "40px",
              }}>
                Three steps to your next adventure.
              </h2>
            </Reveal>

            <div style={{ marginBottom: "32px" }}>
              <FloatingCards3D />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { num: "01", icon: "✈️", title: "Post your trip",     desc: "Destination, dates, travel style. Done in 60 seconds." },
                { num: "02", icon: "🤝", title: "Match your crew",    desc: "Filter by budget, vibe, dates. Message instantly." },
                { num: "03", icon: "🌍", title: "Go together",        desc: "Split costs, find hidden spots, make real memories." },
              ].map((s, i) => (
                <Reveal key={s.num} delay={i * 100}>
                  <div className="glass rounded-2xl card-lift" style={{ padding: "28px" }}>
                    <div style={{ fontSize: "32px", marginBottom: "20px" }}>{s.icon}</div>
                    <div style={{
                      fontFamily: "Playfair Display, Georgia, serif",
                      fontSize: "42px", fontWeight: 900,
                      color: "var(--border-2)",
                      lineHeight: 1,
                      marginBottom: "12px",
                    }}>
                      {s.num}
                    </div>
                    <h3 style={{
                      fontSize: "17px", fontWeight: 700,
                      color: "var(--white)", fontFamily: "Syne",
                      marginBottom: "8px",
                    }}>{s.title}</h3>
                    <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.65 }}>{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>


        {/* ╔══════════════════════════════════════════════════════╗
            ║  05 / CITIES                                         ║
            ╚══════════════════════════════════════════════════════╝ */}
        <section className="section" style={{ background: "var(--bg)" }}>
          <div className="container">
            <Reveal>
              <SectionLabel num="05" text="Cities" />
              <h2 style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontSize: "clamp(34px, 5vw, 60px)",
                fontWeight: 900,
                letterSpacing: "-0.025em",
                color: "var(--white)",
                marginBottom: "12px",
              }}>Explore cities</h2>
              <p style={{ color: "var(--muted)", fontSize: "14px", marginBottom: "48px" }}>
                Curated guides — hidden spots only locals know.
              </p>
            </Reveal>
            <CityGrid limit={5} />
          </div>
        </section>


        {/* ╔══════════════════════════════════════════════════════╗
            ║  BEACH OCEAN VIDEO BANNER                            ║
            ╚══════════════════════════════════════════════════════╝ */}
        <section style={{
          position: "relative", height: "480px",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
        }}>
          <video autoPlay muted loop playsInline preload="none"
            poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=60"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}>
            <source src="https://videos.pexels.com/video-files/7666608/7666608-hd_1920_1080_30fps.mp4" type="video/mp4" />
          </video>
          <div style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "linear-gradient(to bottom, rgba(8,4,2,0.5) 0%, rgba(8,4,2,0.65) 100%)",
          }} />
          <div className="text-center px-6" style={{ zIndex: 2, position: "relative" }}>
            <Reveal>
              <h2 style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontSize: "clamp(30px, 6vw, 68px)",
                fontWeight: 900,
                color: "#fff",
                letterSpacing: "-0.03em",
                marginBottom: "16px",
              }}>
                🌊 Beach or city?<br />
                <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Why not both.</em>
              </h2>
              <p style={{ color: "rgba(255,250,243,0.75)", fontSize: "15px", marginBottom: "28px" }}>
                Find your travel crew — it&apos;s free forever.
              </p>
              <Link href="/auth/register" className="btn btn-primary" style={{
                padding: "14px 36px", borderRadius: "50px",
                fontSize: "13px", fontWeight: 700,
                letterSpacing: "0.05em", textTransform: "uppercase",
              }}>
                Join free — no credit card <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>
        </section>


        {/* ╔══════════════════════════════════════════════════════╗
            ║  06 / GUIDES                                         ║
            ╚══════════════════════════════════════════════════════╝ */}
        <section className="section" style={{ background: "var(--bg-2)" }}>
          <div className="container">
            <Reveal>
              <SectionLabel num="06" text="Local Guides" />
              <div style={{
                display: "flex", flexWrap: "wrap",
                alignItems: "flex-end", justifyContent: "space-between", gap: "16px",
                marginBottom: "48px",
              }}>
                <h2 style={{
                  fontFamily: "Playfair Display, Georgia, serif",
                  fontSize: "clamp(34px, 5vw, 60px)",
                  fontWeight: 900,
                  letterSpacing: "-0.025em",
                  color: "var(--white)",
                }}>
                  Locals who know the real city.
                </h2>
                <Link href="/guides" className="btn btn-ghost" style={{
                  padding: "12px 24px", borderRadius: "50px",
                  fontSize: "13px", letterSpacing: "0.04em", textTransform: "uppercase",
                }}>
                  All guides <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Reveal>
            <GuideGrid limit={4} />
          </div>
        </section>


        {/* ╔══════════════════════════════════════════════════════╗
            ║  07 / EVENTS                                         ║
            ╚══════════════════════════════════════════════════════╝ */}
        <section className="section" style={{ background: "var(--bg)" }}>
          <div className="container">
            <Reveal>
              <SectionLabel num="07" text="Events" />
              <h2 style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontSize: "clamp(34px, 5vw, 60px)",
                fontWeight: 900,
                letterSpacing: "-0.025em",
                color: "var(--white)",
                marginBottom: "12px",
              }}>Local events</h2>
              <p style={{ color: "var(--muted)", fontSize: "14px", marginBottom: "48px" }}>
                When 10+ travelers cluster in a city — magic happens.
              </p>
            </Reveal>
            <EventsList />
          </div>
        </section>


        {/* ╔══════════════════════════════════════════════════════╗
            ║  08 / PRICING                                        ║
            ╚══════════════════════════════════════════════════════╝ */}
        <PricingSection />


        {/* ╔══════════════════════════════════════════════════════╗
            ║  FINAL CTA                                           ║
            ╚══════════════════════════════════════════════════════╝ */}
        <section style={{
          position: "relative", overflow: "hidden",
          padding: "120px 24px",
          background: "var(--bg-2)",
        }}>
          {/* Warm glow */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            width: "700px", height: "350px", borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(255,107,53,0.14) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div className="container-sm text-center" style={{ position: "relative" }}>
            <Reveal>
              <p style={{
                fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em",
                textTransform: "uppercase", color: "var(--accent)", marginBottom: "24px",
              }}>
                12,000+ travelers. Free forever.
              </p>
              <h2 style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontSize: "clamp(40px, 7vw, 88px)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 1.0,
                color: "var(--white)",
                marginBottom: "16px",
              }}>
                Your best trip<br />
                <em style={{ color: "var(--accent)", fontStyle: "italic" }}>hasn&apos;t happened yet.</em>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p style={{ color: "var(--muted)", marginBottom: "40px", fontSize: "16px" }}>
                No credit card. No subscription. Just go.
              </p>
              <Link href="/auth/register" className="btn btn-primary" style={{
                padding: "18px 48px", borderRadius: "50px",
                fontSize: "15px", fontWeight: 700,
                letterSpacing: "0.05em", textTransform: "uppercase",
              }}>
                Start for free <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>
        </section>


        {/* ╔══════════════════════════════════════════════════════╗
            ║  FOOTER                                              ║
            ╚══════════════════════════════════════════════════════╝ */}
        <footer style={{
          padding: "48px 24px",
          borderTop: "1px solid var(--border)",
          background: "var(--bg)",
        }}>
          <div className="container" style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: "20px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "10px",
                background: "linear-gradient(135deg, #ff6b35, #f59e0b)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Compass className="w-4 h-4 text-white" />
              </div>
              <span style={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 700, fontSize: "20px",
                fontStyle: "italic", color: "var(--text)",
              }}>Starylo</span>
            </div>

            <p style={{ fontSize: "12px", color: "var(--muted)" }}>
              © 2026 Starylo · Travel with people who get it
            </p>

            <div style={{ display: "flex", gap: "28px" }}>
              {["Privacy", "Terms", "Safety", "Contact"].map((l) => (
                <Link key={l} href="#" style={{
                  fontSize: "12px", color: "var(--muted)",
                  textDecoration: "none", transition: "color 0.2s",
                  letterSpacing: "0.04em",
                }}>{l}</Link>
              ))}
            </div>

            <p style={{ fontSize: "10px", color: "var(--bg-4)", marginTop: "4px" }}>
              Videos: Pexels (free license) · Photos: Unsplash (free license)
            </p>
          </div>
        </footer>

      </main>
    </>
  );
}
