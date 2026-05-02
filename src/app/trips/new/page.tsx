"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { MapPin, Calendar, Users, ArrowRight } from "lucide-react";

const TRAVEL_STYLES = [
  { name: "hiking", emoji: "🥾" },
  { name: "beach", emoji: "🏖️" },
  { name: "nightlife", emoji: "🎉" },
  { name: "culture", emoji: "🏛️" },
  { name: "food", emoji: "🍜" },
  { name: "music", emoji: "🎵" },
  { name: "adventure", emoji: "🧗" },
  { name: "photography", emoji: "📸" },
];

const BUDGETS = [
  { value: "budget", label: "Budget" },
  { value: "mid-range", label: "Mid-range" },
  { value: "comfortable", label: "Comfortable" },
  { value: "luxury", label: "Luxury" },
];

export default function NewTripPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [destination, setDestination] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [budget, setBudget] = useState("mid-range");
  const [styles, setStyles] = useState<string[]>([]);
  const [spots, setSpots] = useState(4);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  if (status === "unauthenticated") {
    return (
      <>
        <Navbar />
        <div
          className="min-h-screen flex items-center justify-center pt-16"
          style={{ background: "var(--night)" }}
        >
          <div className="text-center">
            <h2 className="font-serif text-3xl mb-3" style={{ color: "var(--white)" }}>
              Sign in to post a trip
            </h2>
            <Link
              href="/auth/signin"
              className="inline-block mt-2 px-6 py-3 rounded-full text-sm font-semibold"
              style={{ background: "var(--ember)", color: "white" }}
            >
              Sign in
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main
        className="min-h-screen pt-24 pb-16 px-4"
        style={{ background: "var(--night)" }}
      >
        <div className="max-w-lg mx-auto">
          <div className="mb-8">
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "var(--ember)" }}>
              New trip
            </p>
            <h1 className="font-serif text-4xl" style={{ color: "var(--white)" }}>
              Post your trip
            </h1>
            <p className="mt-2 text-sm" style={{ color: "var(--mist)" }}>
              Free forever — find your crew in minutes.
            </p>
          </div>

          <form
            onSubmit={submit}
            className="rounded-2xl p-6 space-y-5"
            style={{
              background: "var(--night-2)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {error && (
              <div
                className="text-sm p-3 rounded-xl"
                style={{ background: "rgba(232,69,42,0.1)", color: "var(--ember)", border: "1px solid rgba(232,69,42,0.2)" }}
              >
                {error}
              </div>
            )}

            {/* Destination */}
            <div>
              <label className="text-xs mb-1.5 block" style={{ color: "var(--mist)" }}>
                Destination
              </label>
              <div className="relative">
                <MapPin
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "var(--ember)" }}
                />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                  placeholder="Kyoto, Japan"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
                  style={{
                    background: "var(--night-3)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "var(--white)",
                  }}
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "From", value: fromDate, set: setFromDate },
                { label: "To", value: toDate, set: setToDate },
              ].map((d) => (
                <div key={d.label}>
                  <label className="text-xs mb-1.5 block" style={{ color: "var(--mist)" }}>
                    {d.label}
                  </label>
                  <input
                    type="date"
                    value={d.value}
                    onChange={(e) => d.set(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{
                      background: "var(--night-3)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      color: "var(--white)",
                      colorScheme: "dark",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Budget */}
            <div>
              <label className="text-xs mb-2 block" style={{ color: "var(--mist)" }}>
                Budget level
              </label>
              <div className="grid grid-cols-2 gap-2">
                {BUDGETS.map((b) => (
                  <button
                    key={b.value}
                    type="button"
                    onClick={() => setBudget(b.value)}
                    className="py-2.5 px-3 rounded-xl text-sm transition-all"
                    style={
                      budget === b.value
                        ? { background: "var(--ember)", color: "white" }
                        : { background: "var(--night-3)", color: "var(--mist)", border: "1px solid rgba(255,255,255,0.04)" }
                    }
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Travel styles */}
            <div>
              <label className="text-xs mb-2 block" style={{ color: "var(--mist)" }}>
                Travel style (pick all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {TRAVEL_STYLES.map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => toggleStyle(s.name)}
                    className="px-3 py-1.5 rounded-full text-sm transition-all"
                    style={
                      styles.includes(s.name)
                        ? { background: "var(--ember)", color: "white" }
                        : { background: "var(--night-3)", color: "var(--mist)", border: "1px solid rgba(255,255,255,0.06)" }
                    }
                  >
                    {s.emoji} {s.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Spots */}
            <div>
              <label className="text-xs mb-1.5 block" style={{ color: "var(--mist)" }}>
                Open spots: <span style={{ color: "var(--white)" }}>{spots}</span>
              </label>
              <input
                type="range"
                min={1}
                max={10}
                value={spots}
                onChange={(e) => setSpots(Number(e.target.value))}
                className="w-full accent-ember"
                style={{ accentColor: "var(--ember)" }}
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: "var(--mist)" }}>
                <span>1</span><span>10</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs mb-1.5 block" style={{ color: "var(--mist)" }}>
                Description (optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Tell people what you're planning…"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                style={{
                  background: "var(--night-3)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  color: "var(--white)",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
              style={{ background: "var(--ember)", color: "white" }}
            >
              {loading ? "Posting…" : (
                <>Post trip <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
