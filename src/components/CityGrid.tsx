"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, Wallet, MapPin, Lock, ArrowRight } from "lucide-react";

interface Spot {
  id: string; name: string; description: string; emoji: string | null; isHidden: boolean;
}
interface City {
  id: string; slug: string; name: string; country: string; emoji: string;
  description: string; bestTime: string; dailyBudget: string;
  spots: Spot[]; _count: { trips: number; events: number };
}

/* A tiny city hero image map — Pexels thumbnails */
const CITY_THUMB: Record<string, number> = {
  bali:        1537640,
  tokyo:       2506923,
  lisbon:      1534560,
  "cape-town": 259447,
  medellin:    3738673,
};

export function CityGrid({ limit = 10 }: { limit?: number }) {
  const [cities, setCities]   = useState<City[]>([]);
  const [active, setActive]   = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cities").then((r) => r.json()).then((d: City[]) => {
      const list = d.slice(0, limit);
      setCities(list);
      if (list.length) setActive(list[0].slug);
      setLoading(false);
    });
  }, [limit]);

  if (loading) return <div className="skeleton h-96 rounded-2xl" />;

  const city = cities.find((c) => c.slug === active);

  return (
    <div className="space-y-4">
      {/* ── Tab row ── */}
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {cities.map((c) => (
          <button
            key={c.slug}
            onClick={() => setActive(c.slug)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all"
            style={
              active === c.slug
                ? {
                    background: "linear-gradient(135deg, var(--accent), var(--gold))",
                    color: "white",
                    boxShadow: "0 4px 16px rgba(255,107,53,0.3)",
                  }
                : {
                    background: "var(--bg-3)",
                    color: "var(--muted)",
                    border: "1px solid var(--border)",
                  }
            }
          >
            <span>{c.emoji}</span> {c.name}
          </button>
        ))}
      </div>

      {/* ── City card ── */}
      {city && (
        <div
          className="glass-warm rounded-3xl overflow-hidden animate-fade-in"
          style={{ border: "1px solid var(--border-2)" }}
        >
          {/* ── Hero image strip ── */}
          <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
            {CITY_THUMB[city.slug] && (
              <img
                src={`https://images.pexels.com/photos/${CITY_THUMB[city.slug]}/pexels-photo-${CITY_THUMB[city.slug]}.jpeg?auto=compress&cs=tinysrgb&w=1280`}
                alt={city.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, var(--bg-3) 0%, rgba(18,13,8,0.4) 60%, transparent 100%)",
            }} />
            {/* City name on image */}
            <div style={{ position: "absolute", bottom: "20px", left: "24px" }}>
              <div className="flex items-center gap-3">
                <span style={{ fontSize: "36px" }}>{city.emoji}</span>
                <div>
                  <h3 style={{
                    fontFamily: "Playfair Display, Georgia, serif",
                    fontSize: "28px", fontWeight: 800, fontStyle: "italic",
                    color: "var(--white)",
                  }}>
                    {city.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--subtle)" }}>
                    <MapPin className="w-3 h-3" /> {city.country}
                  </div>
                </div>
              </div>
            </div>
            {/* View full guide link */}
            <Link
              href={`/cities/${city.slug}`}
              className="absolute top-4 right-4 btn btn-ghost text-xs flex items-center gap-1.5"
              style={{ borderRadius: "50px", padding: "8px 16px", fontSize: "12px" }}
            >
              Full guide <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="p-6 grid md:grid-cols-5 gap-6">
            {/* ── Left: info ── */}
            <div className="md:col-span-3 space-y-4">
              <p className="text-sm leading-relaxed" style={{ color: "var(--subtle)" }}>
                {city.description}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl p-3.5 flex items-center gap-3" style={{ background: "var(--bg-4)" }}>
                  <Clock className="w-4 h-4 shrink-0" style={{ color: "var(--accent)" }} />
                  <div>
                    <div className="text-xs" style={{ color: "var(--muted)" }}>Best time</div>
                    <div className="text-sm font-semibold mt-0.5" style={{ color: "var(--text)" }}>{city.bestTime}</div>
                  </div>
                </div>
                <div className="rounded-2xl p-3.5 flex items-center gap-3" style={{ background: "var(--bg-4)" }}>
                  <Wallet className="w-4 h-4 shrink-0" style={{ color: "var(--gold)" }} />
                  <div>
                    <div className="text-xs" style={{ color: "var(--muted)" }}>Daily budget</div>
                    <div className="text-sm font-semibold mt-0.5" style={{ color: "var(--text)" }}>{city.dailyBudget}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-center px-5 py-3 rounded-2xl flex-1" style={{ background: "var(--bg-4)" }}>
                  <div className="text-2xl font-bold" style={{ color: "var(--accent)", fontFamily: "Playfair Display, serif" }}>
                    {city._count.trips}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>active trips</div>
                </div>
                <div className="text-center px-5 py-3 rounded-2xl flex-1" style={{ background: "var(--bg-4)" }}>
                  <div className="text-2xl font-bold" style={{ color: "var(--gold)", fontFamily: "Playfair Display, serif" }}>
                    {city._count.events}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>local events</div>
                </div>
              </div>

              <Link
                href={`/cities/${city.slug}`}
                className="btn btn-primary w-full justify-center"
                style={{ borderRadius: "50px", padding: "12px" }}
              >
                Explore {city.name} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* ── Right: spots ── */}
            <div className="md:col-span-2 space-y-2">
              <h4 className="text-xs font-semibold tracking-wider uppercase mb-3" style={{ color: "var(--muted)" }}>
                Local Spots
              </h4>
              {city.spots.map((spot) => (
                <div
                  key={spot.id}
                  className="flex items-start gap-3 p-3 rounded-2xl transition-colors hover:bg-white/5"
                  style={{ background: "var(--bg-4)" }}
                >
                  <span className="text-base shrink-0">{spot.emoji ?? "📍"}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium flex items-center gap-1.5" style={{ color: "var(--text)" }}>
                      {spot.name}
                      {spot.isHidden && <Lock className="w-3 h-3 shrink-0" style={{ color: "var(--gold)" }} />}
                    </div>
                    <div className="text-xs mt-0.5 line-clamp-1" style={{ color: "var(--muted)" }}>
                      {spot.description}
                    </div>
                  </div>
                  {spot.isHidden && (
                    <span
                      className="badge shrink-0"
                      style={{ background: "rgba(245,158,11,0.1)", color: "var(--gold)", border: "1px solid rgba(245,158,11,0.2)", fontSize: "10px" }}
                    >
                      Hidden
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
