"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Trip {
  id: string;
  destination: string;
  fromDate: string;
  toDate: string;
  budget: string;
  spotsTotal: number;
  spotsFilled: number;
  description: string | null;
  user: { name: string | null; image: string | null };
  city: { name: string; emoji: string; country: string } | null;
  styles: { travelStyle: { name: string; emoji: string } }[];
}

const BUDGET_COLOR: Record<string, string> = {
  budget: "#22c55e",
  "mid-range": "#f0b429",
  comfortable: "#60a5fa",
  luxury: "#a78bfa",
};

export function TripFeed({ limit = 20 }: { limit?: number }) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/trips?limit=${limit}`)
      .then((r) => r.json())
      .then((d) => { setTrips(d.trips ?? []); setLoading(false); });
  }, [limit]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: Math.min(limit, 6) }).map((_, i) => (
          <div key={i} className="skeleton h-52" />
        ))}
      </div>
    );
  }

  if (!trips.length) {
    return (
      <div className="glass rounded-2xl py-20 text-center">
        <div className="text-4xl mb-4">✈️</div>
        <p className="text-lg font-bold mb-2" style={{ color: "var(--white)", fontFamily: "Syne" }}>
          No trips posted yet
        </p>
        <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
          Be the first to post a trip and find your crew.
        </p>
        <Link href="/trips/new" className="btn btn-primary">
          Post the first trip <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {trips.map((trip, i) => {
        const spots = trip.spotsTotal - trip.spotsFilled;
        const color = BUDGET_COLOR[trip.budget] ?? "#9ca3af";
        return (
          <div key={trip.id} className="card-lift rounded-2xl p-5 flex flex-col gap-4 animate-fade-up"
            style={{
              background: "var(--bg-3)",
              border: "1px solid var(--border)",
              animationDelay: `${i * 0.05}s`
            }}>

            {/* City + badge */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--accent)" }} />
                  <span className="font-semibold text-sm" style={{ color: "var(--white)" }}>{trip.destination}</span>
                </div>
                {trip.city && (
                  <span className="text-xs" style={{ color: "var(--muted)" }}>
                    {trip.city.emoji} {trip.city.country}
                  </span>
                )}
              </div>
              <span className="badge shrink-0" style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}>
                {trip.budget === "mid-range" ? "Mid-range" : trip.budget.charAt(0).toUpperCase() + trip.budget.slice(1)}
              </span>
            </div>

            {/* Description */}
            {trip.description && (
              <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--muted)" }}>
                {trip.description}
              </p>
            )}

            {/* Dates */}
            <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted)" }}>
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(trip.fromDate)}</span>
              <span>→</span>
              <span>{formatDate(trip.toDate)}</span>
            </div>

            {/* Styles */}
            {trip.styles.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {trip.styles.map(({ travelStyle: s }) => (
                  <span key={s.name} className="badge"
                    style={{ background: "var(--bg-4)", color: "var(--subtle)", border: "1px solid var(--border)" }}>
                    {s.emoji} {s.name}
                  </span>
                ))}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 mt-auto" style={{ borderTop: "1px solid var(--border)" }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center text-xs font-bold"
                  style={{ background: "linear-gradient(135deg, #ff4d2e, #ff8c42)", color: "white" }}>
                  {trip.user.image
                    ? <img src={trip.user.image} alt="" className="w-full h-full object-cover" />
                    : trip.user.name?.[0]?.toUpperCase()}
                </div>
                <span className="text-xs font-medium" style={{ color: "var(--subtle)" }}>{trip.user.name}</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-medium"
                style={{ color: spots > 0 ? "var(--green)" : "var(--muted)" }}>
                <Users className="w-3.5 h-3.5" />
                {spots > 0 ? `${spots} spot${spots !== 1 ? "s" : ""}` : "Full"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
