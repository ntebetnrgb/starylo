"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, Wallet, MapPin, Lock } from "lucide-react";

interface Spot { id: string; name: string; description: string; emoji: string | null; isHidden: boolean; }
interface City {
  id: string; slug: string; name: string; country: string; emoji: string;
  description: string; bestTime: string; dailyBudget: string;
  spots: Spot[]; _count: { trips: number; events: number };
}

export function CityGrid({ limit = 10 }: { limit?: number }) {
  const [cities, setCities] = useState<City[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cities").then((r) => r.json()).then((d: City[]) => {
      const list = d.slice(0, limit);
      setCities(list);
      if (list.length) setActive(list[0].slug);
      setLoading(false);
    });
  }, [limit]);

  if (loading) return <div className="skeleton h-96" />;

  const city = cities.find((c) => c.slug === active);

  return (
    <div className="space-y-4">
      {/* Tab row */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {cities.map((c) => (
          <button key={c.slug} onClick={() => setActive(c.slug)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all"
            style={active === c.slug
              ? { background: "var(--accent)", color: "white", boxShadow: "0 4px 16px rgba(255,77,46,0.35)" }
              : { background: "var(--bg-3)", color: "var(--muted)", border: "1px solid var(--border)" }}>
            <span>{c.emoji}</span> {c.name}
          </button>
        ))}
      </div>

      {/* City card */}
      {city && (
        <div className="glass rounded-2xl overflow-hidden animate-fade-in">
          {/* Header bar */}
          <div className="px-6 pt-6 pb-4 flex items-center gap-4"
            style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-3)" }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
              style={{ background: "var(--bg-4)" }}>
              {city.emoji}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold" style={{ color: "var(--white)", fontFamily: "Syne" }}>{city.name}</h3>
                <span className="badge" style={{ background: "var(--bg-4)", color: "var(--muted)", border: "1px solid var(--border)" }}>
                  <MapPin className="w-3 h-3" /> {city.country}
                </span>
              </div>
              <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>{city.description}</p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="text-center px-4 py-2 rounded-xl" style={{ background: "var(--bg-4)" }}>
                <div className="text-lg font-bold" style={{ color: "var(--accent)", fontFamily: "Syne" }}>{city._count.trips}</div>
                <div className="text-xs" style={{ color: "var(--muted)" }}>trips</div>
              </div>
              <div className="text-center px-4 py-2 rounded-xl" style={{ background: "var(--bg-4)" }}>
                <div className="text-lg font-bold" style={{ color: "var(--gold)", fontFamily: "Syne" }}>{city._count.events}</div>
                <div className="text-xs" style={{ color: "var(--muted)" }}>events</div>
              </div>
            </div>
          </div>

          <div className="p-6 grid md:grid-cols-5 gap-6">
            {/* Left: info + spots */}
            <div className="md:col-span-3 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl p-3.5 flex items-center gap-3" style={{ background: "var(--bg-4)" }}>
                  <Clock className="w-4 h-4 shrink-0" style={{ color: "var(--accent)" }} />
                  <div>
                    <div className="text-xs" style={{ color: "var(--muted)" }}>Best time</div>
                    <div className="text-sm font-semibold mt-0.5" style={{ color: "var(--text)" }}>{city.bestTime}</div>
                  </div>
                </div>
                <div className="rounded-xl p-3.5 flex items-center gap-3" style={{ background: "var(--bg-4)" }}>
                  <Wallet className="w-4 h-4 shrink-0" style={{ color: "var(--gold)" }} />
                  <div>
                    <div className="text-xs" style={{ color: "var(--muted)" }}>Daily budget</div>
                    <div className="text-sm font-semibold mt-0.5" style={{ color: "var(--text)" }}>{city.dailyBudget}</div>
                  </div>
                </div>
              </div>

              <Link href={`/cities/${city.slug}`} className="btn btn-ghost w-full justify-center" style={{ padding: "10px" }}>
                Full city guide for {city.name} →
              </Link>
            </div>

            {/* Right: spots */}
            <div className="md:col-span-2 space-y-2">
              <h4 className="text-xs font-semibold tracking-wider uppercase mb-3" style={{ color: "var(--muted)" }}>
                Spots
              </h4>
              {city.spots.map((spot) => (
                <div key={spot.id} className="flex items-start gap-3 p-3 rounded-xl transition-colors hover:bg-white/5"
                  style={{ background: "var(--bg-4)" }}>
                  <span className="text-base shrink-0">{spot.emoji ?? "📍"}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium flex items-center gap-1.5" style={{ color: "var(--text)" }}>
                      {spot.name}
                      {spot.isHidden && <Lock className="w-3 h-3 shrink-0" style={{ color: "var(--gold)" }} />}
                    </div>
                    <div className="text-xs mt-0.5 line-clamp-1" style={{ color: "var(--muted)" }}>{spot.description}</div>
                  </div>
                  {spot.isHidden && (
                    <span className="badge shrink-0" style={{ background: "rgba(240,180,41,0.1)", color: "var(--gold)", border: "1px solid rgba(240,180,41,0.2)", fontSize: "10px" }}>
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
