"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Star, BadgeCheck } from "lucide-react";

interface Guide {
  id: string;
  bio: string;
  specialties: string;
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  verified: boolean;
  user: { name: string | null; image: string | null };
  city: { name: string; emoji: string; country: string };
}

export function GuideGrid({ limit = 10 }: { limit?: number }) {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/guides")
      .then((r) => r.json())
      .then((d: Guide[]) => { setGuides(d.slice(0, limit)); setLoading(false); });
  }, [limit]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: limit }).map((_, i) => <div key={i} className="skeleton h-72" />)}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {guides.map((guide, i) => (
        <div key={guide.id} className="card-lift rounded-2xl overflow-hidden flex flex-col animate-fade-up"
          style={{ background: "var(--bg-3)", border: "1px solid var(--border)", animationDelay: `${i * 0.07}s` }}>

          {/* Top gradient bar */}
          <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #ff4d2e, #f0b429)" }} />

          <div className="p-5 flex flex-col gap-4 flex-1">
            {/* Avatar + name */}
            <div className="flex items-start gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 flex items-center justify-center text-xl font-bold"
                style={{ background: "linear-gradient(135deg, #ff4d2e20, #f0b42920)", border: "1px solid var(--border)" }}>
                {guide.user.image
                  ? <img src={guide.user.image} alt="" className="w-full h-full object-cover" />
                  : <span style={{ fontFamily: "Syne" }}>{guide.user.name?.[0]}</span>}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-sm truncate" style={{ color: "var(--white)", fontFamily: "Syne" }}>
                    {guide.user.name}
                  </span>
                  {guide.verified && <BadgeCheck className="w-4 h-4 shrink-0" style={{ color: "var(--green)" }} />}
                </div>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                  {guide.city.emoji} {guide.city.name}
                </p>
                <div className="flex items-center gap-1 mt-1.5">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className="w-2.5 h-2.5 fill-current"
                        style={{ color: s <= Math.round(guide.rating) ? "var(--gold)" : "var(--bg-4)" }} />
                    ))}
                  </div>
                  <span className="text-xs font-semibold" style={{ color: "var(--gold)" }}>
                    {guide.rating.toFixed(2)}
                  </span>
                  <span className="text-xs" style={{ color: "var(--muted)" }}>({guide.reviewCount})</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--muted)" }}>
              {guide.bio}
            </p>

            {/* Specialty tags */}
            <div className="flex flex-wrap gap-1.5">
              {guide.specialties.split(",").slice(0, 3).map((s) => (
                <span key={s} className="badge"
                  style={{ background: "var(--bg-4)", color: "var(--subtle)", border: "1px solid var(--border)", fontSize: "10px" }}>
                  {s.trim()}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-auto flex items-center justify-between pt-3"
              style={{ borderTop: "1px solid var(--border)" }}>
              <div>
                <span className="text-base font-bold" style={{ color: "var(--white)", fontFamily: "Syne" }}>
                  ${guide.hourlyRate}
                </span>
                <span className="text-xs" style={{ color: "var(--muted)" }}>/hr</span>
              </div>
              <Link href={`/guides/${guide.id}`} className="btn btn-primary"
                style={{ padding: "8px 16px", fontSize: "12px", borderRadius: "10px" }}>
                Book
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
