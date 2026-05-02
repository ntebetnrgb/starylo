"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Calendar, Music, Users, MapPin } from "lucide-react";

interface Event {
  id: string; title: string; description: string;
  venue: string | null; eventDate: string;
  artist: string | null; genre: string | null;
  isFree: boolean; maxRsvp: number;
  city: { name: string; emoji: string };
  rsvps: { userId: string }[];
}

export function EventsList() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [rsvping, setRsvping] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/events").then((r) => r.json()).then((d: Event[]) => { setEvents(d); setLoading(false); });
  }, []);

  const handleRsvp = async (eventId: string) => {
    if (!session) return;
    setRsvping(eventId);
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId }),
    });
    const data = await res.json();
    setEvents((prev) => prev.map((e) => {
      if (e.id !== eventId) return e;
      return data.rsvped
        ? { ...e, rsvps: [...e.rsvps, { userId: session.user?.id ?? "" }] }
        : { ...e, rsvps: e.rsvps.filter((r) => r.userId !== session.user?.id) };
    }));
    setRsvping(null);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[0,1,2].map((i) => <div key={i} className="skeleton h-52" />)}
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="glass rounded-2xl py-16 text-center">
        <Music className="w-8 h-8 mx-auto mb-3 opacity-30" style={{ color: "var(--text)" }} />
        <p className="font-bold" style={{ color: "var(--white)", fontFamily: "Syne" }}>No upcoming events</p>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>Post a trip to start the cluster!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {events.map((event, i) => {
        const rsvpCount = event.rsvps.length;
        const userRsvped = session ? event.rsvps.some((r) => r.userId === session.user?.id) : false;
        const pct = Math.round((rsvpCount / event.maxRsvp) * 100);

        return (
          <div key={event.id} className="card-lift rounded-2xl overflow-hidden flex flex-col animate-fade-up"
            style={{ background: "var(--bg-3)", border: "1px solid var(--border)", animationDelay: `${i * 0.1}s` }}>

            {/* Top image-like banner */}
            <div className="h-2 w-full" style={{
              background: `linear-gradient(90deg, ${i % 3 === 0 ? "#ff4d2e,#ff8c42" : i % 3 === 1 ? "#a78bfa,#60a5fa" : "#f0b429,#22c55e"})`
            }} />

            <div className="p-5 flex flex-col gap-3 flex-1">
              {/* City + free/paid */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium flex items-center gap-1" style={{ color: "var(--muted)" }}>
                  <span>{event.city.emoji}</span> {event.city.name}
                </span>
                <span className="badge" style={event.isFree
                  ? { background: "rgba(34,197,94,0.1)", color: "var(--green)", border: "1px solid rgba(34,197,94,0.2)" }
                  : { background: "rgba(240,180,41,0.1)", color: "var(--gold)", border: "1px solid rgba(240,180,41,0.2)" }}>
                  {event.isFree ? "Free" : "Paid"}
                </span>
              </div>

              <h3 className="font-bold text-base leading-snug" style={{ color: "var(--white)", fontFamily: "Syne" }}>
                {event.title}
              </h3>

              <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--muted)" }}>
                {event.description}
              </p>

              {event.artist && (
                <div className="flex items-center gap-2 text-xs" style={{ color: "var(--subtle)" }}>
                  <Music className="w-3.5 h-3.5 shrink-0" />
                  <span className="font-medium">{event.artist}</span>
                  {event.genre && (
                    <span className="badge" style={{ background: "var(--bg-4)", color: "var(--muted)", border: "1px solid var(--border)", fontSize: "10px" }}>
                      {event.genre}
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-center gap-3 text-xs" style={{ color: "var(--muted)" }}>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(event.eventDate).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                </span>
                {event.venue && (
                  <span className="flex items-center gap-1 truncate">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{event.venue}</span>
                  </span>
                )}
              </div>

              {/* Capacity bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs" style={{ color: "var(--muted)" }}>
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {rsvpCount} / {event.maxRsvp} going
                  </div>
                  <span>{pct}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg-4)" }}>
                  <div className="h-full rounded-full transition-all" style={{
                    width: `${pct}%`,
                    background: pct > 75 ? "var(--accent)" : pct > 40 ? "var(--gold)" : "var(--green)"
                  }} />
                </div>
              </div>

              {/* RSVP button */}
              <button onClick={() => handleRsvp(event.id)}
                disabled={rsvping === event.id || !session}
                className="btn mt-auto w-full"
                style={userRsvped
                  ? { background: "var(--bg-4)", color: "var(--muted)", border: "1px solid var(--border)", borderRadius: "10px", padding: "10px", fontSize: "13px" }
                  : { background: "var(--accent)", color: "white", borderRadius: "10px", padding: "10px", fontSize: "13px" }}>
                {rsvping === event.id ? "…" : userRsvped ? "✓ Going — cancel?" : session ? "RSVP for free" : "Sign in to RSVP"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
