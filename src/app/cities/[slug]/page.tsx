"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { ArrowLeft, MapPin, Clock, Wallet, Star, Play, Lock, Users, Calendar } from "lucide-react";

/* ─── Media catalogue ─────────────────────────────────────────────────────── */
interface CityMedia {
  heroVideo: string;
  heroFps:   string;
  images: Array<{ id: number; caption: string; orient?: "portrait" }>;
  videos: Array<{ id: number; fps: string; caption: string; subtitle: string }>;
}

const CITY_MEDIA: Record<string, CityMedia> = {
  bali: {
    heroVideo: "4193130", heroFps: "24",
    images: [
      { id: 1537640,  caption: "Tegallalang Rice Terraces" },
      { id: 2166553,  caption: "Tanah Lot Temple",          orient: "portrait" },
      { id: 1320684,  caption: "Kuta Beach Sunset" },
      { id: 3571264,  caption: "Drone Over Ubud" },
      { id: 3880313,  caption: "Sacred Monkey Forest" },
      { id: 1998439,  caption: "Surfing Uluwatu" },
    ],
    videos: [
      { id: 4193130, fps: "24", caption: "Kuta Beach",   subtitle: "Golden hour at the world-famous shore" },
      { id: 7666608, fps: "30", caption: "Ocean Waves",  subtitle: "Turquoise swells crash on black-sand coves" },
    ],
  },
  tokyo: {
    heroVideo: "2248563", heroFps: "25",
    images: [
      { id: 2506923,  caption: "Tokyo Skyline" },
      { id: 2187605,  caption: "Shibuya Crossing",       orient: "portrait" },
      { id: 1440406,  caption: "Shinjuku at Night" },
      { id: 2894442,  caption: "Asakusa Senso-ji" },
      { id: 3408744,  caption: "Harajuku Street Fashion" },
      { id: 2506924,  caption: "Mount Fuji View" },
    ],
    videos: [
      { id: 2248563, fps: "25", caption: "City at Night",      subtitle: "Neon rivers beneath the city's pulse" },
      { id: 4038380, fps: "30", caption: "Streets of Shibuya", subtitle: "8 million crossings a day" },
    ],
  },
  lisbon: {
    heroVideo: "4536401", heroFps: "25",
    images: [
      { id: 1534560,  caption: "Tram 28 Alfama" },
      { id: 2677493,  caption: "Miradouro da Graça",    orient: "portrait" },
      { id: 2583852,  caption: "Belém Tower" },
      { id: 2193300,  caption: "Rooftop at Sunset" },
      { id: 3155666,  caption: "Pastéis de Nata" },
      { id: 3214944,  caption: "Lisbon Harbour" },
    ],
    videos: [
      { id: 4536401, fps: "25", caption: "Old Town Streets",   subtitle: "Cobblestone paths and fado echoes" },
      { id: 7666608, fps: "30", caption: "Atlantic Coastline", subtitle: "Where Europe meets the ocean" },
    ],
  },
  "cape-town": {
    heroVideo: "3209828", heroFps: "25",
    images: [
      { id: 259447,   caption: "Table Mountain" },
      { id: 1562058,  caption: "Cape Point Cliffs",     orient: "portrait" },
      { id: 2562541,  caption: "V&A Waterfront" },
      { id: 2614820,  caption: "Chapman's Peak Drive" },
      { id: 1526052,  caption: "Boulders Beach Penguins" },
      { id: 3280117,  caption: "Bo-Kaap Neighbourhood" },
    ],
    videos: [
      { id: 3209828, fps: "25", caption: "Aerial Cape Town",  subtitle: "Mountain meets ocean, perfectly" },
      { id: 4193276, fps: "24", caption: "Atlantic Seaboard", subtitle: "Wild coastline stretching south" },
    ],
  },
  medellin: {
    heroVideo: "5875988", heroFps: "25",
    images: [
      { id: 3738673,  caption: "El Poblado by Night" },
      { id: 2614821,  caption: "Metro Cable Views",     orient: "portrait" },
      { id: 3764026,  caption: "Guatapé El Peñón" },
      { id: 2083338,  caption: "Botero Plaza" },
      { id: 2614820,  caption: "City Panorama" },
      { id: 3880313,  caption: "Coffee Region Farms" },
    ],
    videos: [
      { id: 5875988, fps: "25", caption: "City of Eternal Spring", subtitle: "The transformation of a generation" },
      { id: 2248563, fps: "25", caption: "Nocturnal Medellín",     subtitle: "Lights dancing across the valley" },
    ],
  },
};

const FALLBACK_MEDIA: CityMedia = {
  heroVideo: "4193130", heroFps: "24",
  images: [
    { id: 1320684, caption: "Local Landmark" },
    { id: 2166553, caption: "City Centre" },
    { id: 1537640, caption: "Street Life" },
    { id: 3571264, caption: "Aerial View" },
    { id: 3880313, caption: "Local Food" },
    { id: 1998439, caption: "Neighbourhood" },
  ],
  videos: [
    { id: 4193130, fps: "24", caption: "City Highlights", subtitle: "The best of this destination" },
    { id: 7666608, fps: "30", caption: "Local Scene",     subtitle: "Life through the streets" },
  ],
};

/* ─── Types ───────────────────────────────────────────────────────────────── */
interface Spot {
  id: string; name: string; description: string; emoji: string | null; isHidden: boolean;
}
interface City {
  id: string; slug: string; name: string; country: string; emoji: string;
  description: string; bestTime: string; dailyBudget: string;
  spots: Spot[]; _count: { trips: number; events: number };
}

/* ─── Image component with soft fade-in ──────────────────────────────────── */
function CityImage({ id, caption, orient }: { id: number; caption: string; orient?: "portrait" }) {
  const [loaded, setLoaded] = useState(false);
  const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900`;

  return (
    <div
      className="relative overflow-hidden rounded-2xl group"
      style={{
        gridRow: orient === "portrait" ? "span 2" : "span 1",
        aspectRatio: orient === "portrait" ? "auto" : "4/3",
        minHeight: orient === "portrait" ? "320px" : "200px",
        background: "var(--bg-3)",
      }}
    >
      <img
        src={url}
        alt={caption}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%", height: "100%",
          objectFit: "cover",
          transition: "opacity 0.5s ease, transform 0.6s ease",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "scale(1)" : "scale(1.04)",
        }}
      />
      {/* skeleton */}
      {!loaded && <div className="absolute inset-0 skeleton" />}
      {/* caption overlay */}
      <div
        className="absolute inset-x-0 bottom-0 p-4"
        style={{
          background: "linear-gradient(to top, rgba(8,6,4,0.9) 0%, transparent 100%)",
          transform: "translateY(4px)",
          transition: "transform 0.3s ease",
        }}
      >
        <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: "var(--sand)" }}>
          {caption}
        </span>
      </div>
      {/* zoom on hover */}
      <style>{`
        .group:hover img { transform: scale(1.06) !important; }
      `}</style>
    </div>
  );
}

/* ─── Video card ─────────────────────────────────────────────────────────── */
function CityVideo({ id, fps, caption, subtitle }: { id: number; fps: string; caption: string; subtitle: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!ref.current) return;
    if (ref.current.paused) { ref.current.play(); setPlaying(true); }
    else                    { ref.current.pause(); setPlaying(false); }
  };

  const url = `https://videos.pexels.com/video-files/${id}/${id}-hd_1920_1080_${fps}fps.mp4`;

  return (
    <div
      className="relative overflow-hidden rounded-3xl cursor-pointer group"
      style={{ aspectRatio: "16/9", background: "var(--bg-3)" }}
      onClick={toggle}
    >
      <video
        ref={ref}
        src={url}
        loop
        muted
        playsInline
        preload="metadata"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      {/* overlay */}
      <div
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(8,6,4,0.85) 0%, rgba(8,6,4,0.2) 60%, transparent 100%)",
        }}
      />
      {/* play button */}
      <div
        style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: "64px", height: "64px", borderRadius: "50%",
          background: "rgba(255,107,53,0.9)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          opacity: playing ? 0 : 1,
          boxShadow: "0 0 40px rgba(255,107,53,0.5)",
        }}
        className="group-hover:scale-110"
      >
        <Play className="w-7 h-7 text-white ml-1" fill="white" />
      </div>
      {/* caption */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px" }}>
        <p className="font-playfair text-2xl font-bold italic" style={{ color: "var(--white)" }}>{caption}</p>
        <p className="text-sm mt-1" style={{ color: "var(--subtle)" }}>{subtitle}</p>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function CityDetailPage() {
  const params  = useParams();
  const slug    = params?.slug as string;
  const [city, setCity]     = useState<City | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cities")
      .then((r) => r.json())
      .then((all: City[]) => {
        setCity(all.find((c) => c.slug === slug) ?? null);
        setLoading(false);
      });
  }, [slug]);

  const media = CITY_MEDIA[slug] ?? FALLBACK_MEDIA;
  const heroUrl = `https://videos.pexels.com/video-files/${media.heroVideo}/${media.heroVideo}-hd_1920_1080_${media.heroFps}fps.mp4`;

  /* ── Loading ── */
  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: "96px" }}>
          <div className="container px-6">
            <div className="skeleton h-96 rounded-3xl mb-6" />
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-52 rounded-2xl" />)}
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ── 404 ── */
  if (!city) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
          <div className="text-center">
            <p className="text-6xl mb-4">🗺️</p>
            <h2 className="font-playfair text-3xl italic mb-3" style={{ color: "var(--white)" }}>
              City not found
            </h2>
            <Link href="/cities" className="btn btn-primary" style={{ borderRadius: "50px" }}>
              <ArrowLeft className="w-4 h-4" /> Back to Cities
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh" }}>

        {/* ══════════════════════════════════════
            HERO — fullscreen video
        ══════════════════════════════════════ */}
        <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
          <video
            src={heroUrl}
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              zIndex: 0,
            }}
          />
          {/* gradient overlays */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "linear-gradient(to top, rgba(8,6,4,1) 0%, rgba(8,6,4,0.3) 50%, rgba(8,6,4,0.15) 100%)",
          }} />
          <div style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "radial-gradient(ellipse at 30% 60%, rgba(255,107,53,0.12) 0%, transparent 60%)",
          }} />

          {/* Back button */}
          <div style={{ position: "absolute", top: "88px", left: "24px", zIndex: 10 }}>
            <Link
              href="/cities"
              className="glass flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all hover:bg-white/10"
              style={{ color: "var(--subtle)" }}
            >
              <ArrowLeft className="w-4 h-4" /> Cities
            </Link>
          </div>

          {/* Hero text — bottom aligned, editorial */}
          <div
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10,
              padding: "48px clamp(16px, 4vw, 80px)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span style={{ fontSize: "40px" }}>{city.emoji}</span>
              <span className="text-xs tracking-widest uppercase font-semibold"
                style={{ color: "var(--accent)" }}>
                {city.country}
              </span>
            </div>
            <h1 style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontSize: "clamp(52px, 9vw, 120px)",
              fontWeight: 900,
              fontStyle: "italic",
              color: "var(--white)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              marginBottom: "20px",
            }}>
              {city.name}
            </h1>
            <p style={{
              color: "var(--subtle)",
              fontSize: "clamp(14px, 1.5vw, 17px)",
              maxWidth: "520px",
              lineHeight: 1.6,
              marginBottom: "32px",
            }}>
              {city.description}
            </p>

            {/* quick stats */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: <Clock className="w-3.5 h-3.5" />,  label: city.bestTime,   color: "var(--gold)"  },
                { icon: <Wallet className="w-3.5 h-3.5" />, label: city.dailyBudget, color: "var(--green)" },
                { icon: <Users className="w-3.5 h-3.5" />,  label: `${city._count.trips} trips`, color: "var(--accent)" },
                { icon: <Calendar className="w-3.5 h-3.5" />, label: `${city._count.events} events`, color: "var(--teal)" },
              ].map((s, i) => (
                <div key={i}
                  className="glass flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium"
                  style={{ color: s.color }}>
                  {s.icon} {s.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            BEST PLACES — image grid
        ══════════════════════════════════════ */}
        <section style={{ padding: "96px clamp(16px, 4vw, 80px)" }}>
          <div className="container">
            {/* section label */}
            <div className="flex items-center gap-4 mb-3">
              <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: "var(--accent)" }}>
                01 / Best Places to See
              </span>
              <div style={{ flex: 1, height: "1px", background: "var(--border)", maxWidth: "80px" }} />
            </div>
            <h2 style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              fontStyle: "italic",
              color: "var(--white)",
              marginBottom: "32px",
            }}>
              Must-see <em style={{ color: "var(--gold)" }}>moments</em> in {city.name}
            </h2>

            {/* Bento-style grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "240px 240px",
              gap: "12px",
            }}
              className="md:grid"
            >
              {/* Mobile: 2-col simple grid */}
              <style>{`
                @media (max-width: 768px) {
                  .city-img-grid {
                    grid-template-columns: repeat(2, 1fr) !important;
                    grid-template-rows: auto !important;
                  }
                  .city-img-grid > *[style*="span 2"] {
                    grid-row: span 1 !important;
                  }
                }
              `}</style>

              {media.images.map((img, i) => (
                <CityImage key={i} id={img.id} caption={img.caption} orient={img.orient} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            VIDEOS — city in motion
        ══════════════════════════════════════ */}
        <section style={{
          padding: "0 clamp(16px, 4vw, 80px) 96px",
          background: "linear-gradient(to bottom, var(--bg) 0%, var(--bg-2) 50%, var(--bg) 100%)",
        }}>
          <div className="container">
            <div className="flex items-center gap-4 mb-3">
              <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: "var(--gold)" }}>
                02 / City in Motion
              </span>
              <div style={{ flex: 1, height: "1px", background: "var(--border)", maxWidth: "80px" }} />
            </div>
            <h2 style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              fontStyle: "italic",
              color: "var(--white)",
              marginBottom: "32px",
            }}>
              Experience <em style={{ color: "var(--accent)" }}>{city.name}</em> live
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {media.videos.map((v, i) => (
                <CityVideo key={i} id={v.id} fps={v.fps} caption={v.caption} subtitle={v.subtitle} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            LOCAL SPOTS
        ══════════════════════════════════════ */}
        {city.spots.length > 0 && (
          <section style={{ padding: "0 clamp(16px, 4vw, 80px) 96px" }}>
            <div className="container">
              <div className="flex items-center gap-4 mb-3">
                <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: "var(--teal)" }}>
                  03 / Local Spots
                </span>
                <div style={{ flex: 1, height: "1px", background: "var(--border)", maxWidth: "80px" }} />
              </div>
              <h2 style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 800,
                fontStyle: "italic",
                color: "var(--white)",
                marginBottom: "32px",
              }}>
                Hidden <em style={{ color: "var(--teal)" }}>gems</em>
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {city.spots.map((spot) => (
                  <div
                    key={spot.id}
                    className="card-lift glass-warm rounded-2xl p-5 flex items-start gap-4"
                  >
                    <span style={{ fontSize: "32px", lineHeight: 1 }}>{spot.emoji ?? "📍"}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm" style={{ color: "var(--white)" }}>
                          {spot.name}
                        </h3>
                        {spot.isHidden && (
                          <span
                            className="badge"
                            style={{ background: "rgba(245,158,11,0.12)", color: "var(--gold)", border: "1px solid rgba(245,158,11,0.2)", fontSize: "10px" }}
                          >
                            <Lock className="w-2.5 h-2.5" /> Hidden
                          </span>
                        )}
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                        {spot.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════
            CTA
        ══════════════════════════════════════ */}
        <section style={{ padding: "0 clamp(16px, 4vw, 80px) 120px" }}>
          <div className="container">
            <div
              className="rounded-3xl overflow-hidden relative"
              style={{
                background: "linear-gradient(135deg, var(--bg-3) 0%, var(--bg-2) 100%)",
                border: "1px solid var(--border-2)",
                padding: "clamp(40px, 6vw, 80px)",
              }}
            >
              {/* decorative glow */}
              <div style={{
                position: "absolute", top: "-60px", right: "-60px",
                width: "300px", height: "300px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />
              <div className="relative">
                <span className="badge mb-4" style={{ background: "rgba(255,107,53,0.12)", color: "var(--accent)", border: "1px solid rgba(255,107,53,0.2)" }}>
                  <Star className="w-3 h-3" /> Free to join
                </span>
                <h2 style={{
                  fontFamily: "Playfair Display, Georgia, serif",
                  fontSize: "clamp(28px, 4vw, 52px)",
                  fontWeight: 800,
                  fontStyle: "italic",
                  color: "var(--white)",
                  marginBottom: "16px",
                  lineHeight: 1.1,
                }}>
                  Ready to explore <em style={{ color: "var(--accent)" }}>{city.name}</em>?
                </h2>
                <p className="text-sm mb-8 max-w-md" style={{ color: "var(--muted)", lineHeight: 1.6 }}>
                  Post your trip, find your crew, or book a local guide. No fees, just adventures.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/trips/new" className="btn btn-primary" style={{ borderRadius: "50px", padding: "14px 28px" }}>
                    Post a trip to {city.name}
                  </Link>
                  <Link href="/guides" className="btn btn-ghost" style={{ borderRadius: "50px", padding: "14px 28px" }}>
                    Find a local guide
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
