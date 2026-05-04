"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { MapPin, Calendar, Users, ArrowRight, Plane, Globe, Star } from "lucide-react";

const TRAVEL_STYLES = [
  { name: "hiking",      emoji: "🥾" },
  { name: "beach",       emoji: "🏖️" },
  { name: "nightlife",   emoji: "🎉" },
  { name: "culture",     emoji: "🏛️" },
  { name: "food",        emoji: "🍜" },
  { name: "music",       emoji: "🎵" },
  { name: "adventure",   emoji: "🧗" },
  { name: "photography", emoji: "📸" },
];

const BUDGETS = [
  { value: "budget",     label: "Budget",     icon: "🌿", sub: "< $50 / day" },
  { value: "mid-range",  label: "Mid-range",  icon: "✈️", sub: "$50–150 / day" },
  { value: "comfortable",label: "Comfortable",icon: "🌟", sub: "$150–300 / day" },
  { value: "luxury",     label: "Luxury",     icon: "💎", sub: "$300+ / day" },
];

export default function NewTripPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [destination, setDestination] = useState("");
  const [fromDate, setFromDate]       = useState("");
  const [toDate, setToDate]           = useState("");
  const [budget, setBudget]           = useState("mid-range");
  const [styles, setStyles]           = useState<string[]>([]);
  const [spots, setSpots]             = useState(4);
  const [description, setDescription] = useState("");
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");

  const toggleStyle = (name: string) =>
    setStyles((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) { router.push("/auth/signin"); return; }
    setLoading(true);
    setError("");

    const res = await fetch("/api/trips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destination, fromDate, toDate, budget, styles, spotsTotal: spots, description }),
    });

    if (!res.ok) {
      const d = await res.json();
      setError(d.error ?? "Failed to post trip");
      setLoading(false);
      return;
    }
    router.push("/trips");
  };

  /* ─── Unauthenticated gate ─── */
  if (status === "unauthenticated") {
    return (
      <>
        <Navbar />
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: "var(--bg)" }}
        >
          <div className="text-center max-w-sm px-6">
            <div className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, var(--accent), var(--gold))" }}>
              <Plane className="w-9 h-9 text-white" />
            </div>
            <h2 className="font-playfair text-3xl italic mb-2" style={{ color: "var(--white)" }}>
              Sign in first
            </h2>
            <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
              Create an account to post a trip and find your travel crew.
            </p>
            <Link href="/auth/signin" className="btn btn-primary w-full justify-center"
              style={{ borderRadius: "50px" }}>
              Sign in <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </>
    );
  }

  /* ─── Main form ─── */
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh" }}>

        {/* ── Warm hero strip ── */}
        <div className="relative overflow-hidden" style={{ paddingTop: "96px", paddingBottom: "40px" }}>
          {/* Background glow */}
          <div style={{
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: "800px", height: "400px",
            background: "radial-gradient(ellipse at center, rgba(255,107,53,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div className="container-sm px-6 relative">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/trips"
                className="text-xs tracking-widest uppercase transition-colors hover:opacity-100"
                style={{ color: "var(--muted)" }}>
                Trips
              </Link>
              <span style={{ color: "var(--border-2)" }}>/</span>
              <span className="text-xs tracking-widest uppercase" style={{ color: "var(--accent)" }}>New</span>
            </div>
            <h1 style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 800,
              fontStyle: "italic",
              color: "var(--white)",
              lineHeight: 1.1,
              marginBottom: "8px",
            }}>
              Post your <span className="text-gradient">next trip</span>
            </h1>
            <p style={{ color: "var(--muted)", fontSize: "15px" }}>
              Free forever — find your crew in minutes.
            </p>
          </div>
        </div>

        {/* ── Form ── */}
        <div className="container-sm px-6 pb-24">
          <form onSubmit={submit} className="space-y-6">

            {error && (
              <div className="p-4 rounded-2xl text-sm"
                style={{ background: "rgba(255,107,53,0.1)", color: "var(--accent)", border: "1px solid rgba(255,107,53,0.2)" }}>
                {error}
              </div>
            )}

            {/* ── Destination ── */}
            <div className="glass-warm rounded-2xl p-6">
              <h2 className="text-xs tracking-widest uppercase mb-4 font-semibold" style={{ color: "var(--accent)" }}>
                01 · Where are you going?
              </h2>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--accent)" }} />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                  placeholder="Kyoto, Japan"
                  className="input pl-11"
                  style={{ fontSize: "16px" }}
                />
              </div>
            </div>

            {/* ── Dates ── */}
            <div className="glass-warm rounded-2xl p-6">
              <h2 className="text-xs tracking-widest uppercase mb-4 font-semibold" style={{ color: "var(--accent)" }}>
                02 · When are you travelling?
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Departure", value: fromDate, set: setFromDate },
                  { label: "Return",    value: toDate,   set: setToDate   },
                ].map((d) => (
                  <div key={d.label}>
                    <label className="text-xs mb-2 block" style={{ color: "var(--muted)" }}>
                      {d.label}
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--gold)" }} />
                      <input
                        type="date"
                        value={d.value}
                        onChange={(e) => d.set(e.target.value)}
                        required
                        className="input pl-10"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Budget ── */}
            <div className="glass-warm rounded-2xl p-6">
              <h2 className="text-xs tracking-widest uppercase mb-4 font-semibold" style={{ color: "var(--accent)" }}>
                03 · Budget level
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {BUDGETS.map((b) => (
                  <button
                    key={b.value}
                    type="button"
                    onClick={() => setBudget(b.value)}
                    className="p-4 rounded-2xl text-left transition-all"
                    style={
                      budget === b.value
                        ? { background: "linear-gradient(135deg, var(--accent), var(--gold))", color: "white", boxShadow: "0 8px 24px rgba(255,107,53,0.3)" }
                        : { background: "var(--bg-3)", color: "var(--subtle)", border: "1px solid var(--border)" }
                    }
                  >
                    <div className="text-2xl mb-1">{b.icon}</div>
                    <div className="font-semibold text-sm">{b.label}</div>
                    <div className="text-xs mt-0.5 opacity-70">{b.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Travel style ── */}
            <div className="glass-warm rounded-2xl p-6">
              <h2 className="text-xs tracking-widest uppercase mb-4 font-semibold" style={{ color: "var(--accent)" }}>
                04 · Travel style
              </h2>
              <div className="flex flex-wrap gap-2">
                {TRAVEL_STYLES.map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => toggleStyle(s.name)}
                    className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                    style={
                      styles.includes(s.name)
                        ? { background: "var(--accent)", color: "white", boxShadow: "0 4px 12px rgba(255,107,53,0.25)" }
                        : { background: "var(--bg-3)", color: "var(--subtle)", border: "1px solid var(--border)" }
                    }
                  >
                    {s.emoji} {s.name}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Open spots ── */}
            <div className="glass-warm rounded-2xl p-6">
              <h2 className="text-xs tracking-widest uppercase mb-4 font-semibold" style={{ color: "var(--accent)" }}>
                05 · Open spots
              </h2>
              <div className="flex items-center gap-4 mb-3">
                <Users className="w-5 h-5" style={{ color: "var(--gold)" }} />
                <span style={{ fontFamily: "Playfair Display, serif", fontSize: "32px", fontWeight: 700, color: "var(--white)" }}>
                  {spots}
                </span>
                <span className="text-sm" style={{ color: "var(--muted)" }}>
                  {spots === 1 ? "traveller" : "travellers"} wanted
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={spots}
                onChange={(e) => setSpots(Number(e.target.value))}
                className="w-full"
                style={{ accentColor: "var(--accent)", height: "4px" }}
              />
              <div className="flex justify-between text-xs mt-2" style={{ color: "var(--muted)" }}>
                <span>1 person</span>
                <span>10 people</span>
              </div>
            </div>

            {/* ── Description ── */}
            <div className="glass-warm rounded-2xl p-6">
              <h2 className="text-xs tracking-widest uppercase mb-4 font-semibold" style={{ color: "var(--accent)" }}>
                06 · Tell your story
              </h2>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="What's the vibe? What are you hoping to do? Who's your ideal travel mate?"
                className="input resize-none"
                style={{ lineHeight: "1.6" }}
              />
            </div>

            {/* ── Submit ── */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full justify-center"
              style={{ padding: "16px 32px", borderRadius: "50px", fontSize: "15px" }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Posting your trip…
                </span>
              ) : (
                <>
                  <Globe className="w-5 h-5" />
                  Post my trip
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-center text-xs" style={{ color: "var(--muted)" }}>
              <Star className="w-3 h-3 inline mr-1" style={{ color: "var(--gold)" }} />
              Free forever · No credit card · Cancel anytime
            </p>
          </form>
        </div>
      </main>
    </>
  );
}
