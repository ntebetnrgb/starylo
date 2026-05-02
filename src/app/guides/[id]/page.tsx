"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Navbar } from "@/components/Navbar";
import { Star, CheckCircle2, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";

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
  reviews: {
    id: string;
    rating: number;
    comment: string;
    user: { name: string | null; image: string | null };
  }[];
}

export default function GuideDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: session } = useSession();
  const router = useRouter();
  const [guide, setGuide] = useState<Guide | null>(null);
  const [date, setDate] = useState("");
  const [hours, setHours] = useState(3);
  const [message, setMessage] = useState("");
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    fetch(`/api/guides?id=${id}`)
      .then((r) => r.json())
      .then((d: Guide[]) => {
        const g = d.find((g) => g.id === id);
        if (g) setGuide(g);
      });
  }, [id]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) { router.push("/auth/signin"); return; }
    setBooking(true);
    await fetch(`/api/guides/${id}/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, hours, message }),
    });
    setBooked(true);
    setBooking(false);
  };

  if (!guide) {
    return (
      <>
        <Navbar />
        <div
          className="min-h-screen flex items-center justify-center pt-16"
          style={{ background: "var(--night)" }}
        >
          <div className="h-8 w-8 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: "var(--ember)", borderTopColor: "transparent" }} />
        </div>
      </>
    );
  }

  const total = guide.hourlyRate * hours;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4" style={{ background: "var(--night)" }}>
        <div className="max-w-5xl mx-auto">
          <Link href="/guides" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors"
            style={{ color: "var(--mist)" }}>
            <ArrowLeft className="w-4 h-4" /> Back to guides
          </Link>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Profile */}
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-start gap-4">
                {guide.user.image ? (
                  <img src={guide.user.image} alt="" className="w-20 h-20 rounded-2xl object-cover" />
                ) : (
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold"
                    style={{ background: "var(--ember)", color: "white" }}>
                    {guide.user.name?.[0]?.toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="font-serif text-3xl" style={{ color: "var(--white)" }}>
                      {guide.user.name}
                    </h1>
                    {guide.verified && (
                      <CheckCircle2 className="w-5 h-5" style={{ color: "var(--sage)" }} />
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-sm" style={{ color: "var(--mist)" }}>
                    <MapPin className="w-3.5 h-3.5" />
                    {guide.city.emoji} {guide.city.name}, {guide.city.country}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-current"
                          style={{ color: s <= Math.round(guide.rating) ? "var(--gold)" : "var(--night-4)" }} />
                      ))}
                    </div>
                    <span className="text-sm font-medium" style={{ color: "var(--gold)" }}>
                      {guide.rating.toFixed(2)}
                    </span>
                    <span className="text-sm" style={{ color: "var(--mist)" }}>
                      ({guide.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-6" style={{ background: "var(--night-2)", border: "1px solid rgba(255,255,255,0.04)" }}>
                <h2 className="font-serif text-xl mb-3" style={{ color: "var(--white)" }}>About</h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--cloud)" }}>{guide.bio}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {guide.specialties.split(",").map((s) => (
                    <span key={s} className="text-xs px-3 py-1 rounded-full"
                      style={{ background: "var(--night-3)", color: "var(--mist)" }}>
                      {s.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {guide.reviews.length > 0 && (
                <div className="rounded-2xl p-6" style={{ background: "var(--night-2)", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <h2 className="font-serif text-xl mb-4" style={{ color: "var(--white)" }}>Reviews</h2>
                  <div className="space-y-4">
                    {guide.reviews.map((r) => (
                      <div key={r.id} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold"
                          style={{ background: "var(--ember)", color: "white" }}>
                          {r.user.name?.[0]?.toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium" style={{ color: "var(--white)" }}>{r.user.name}</span>
                            <div className="flex gap-0.5">
                              {[1,2,3,4,5].map((s) => (
                                <Star key={s} className="w-3 h-3 fill-current"
                                  style={{ color: s <= r.rating ? "var(--gold)" : "var(--night-4)" }} />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--cloud)" }}>{r.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Booking */}
            <div className="md:col-span-1">
              <div className="sticky top-24 rounded-2xl p-5" style={{ background: "var(--night-2)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="text-2xl font-serif mb-1" style={{ color: "var(--white)" }}>
                  ${guide.hourlyRate}<span className="text-sm font-sans" style={{ color: "var(--mist)" }}>/hr</span>
                </div>

                {booked ? (
                  <div className="mt-4 p-4 rounded-xl text-center text-sm" style={{ background: "rgba(92,122,94,0.15)", color: "var(--sage)", border: "1px solid rgba(92,122,94,0.3)" }}>
                    ✓ Booking request sent! {guide.user.name} will confirm shortly.
                  </div>
                ) : (
                  <form onSubmit={submit} className="space-y-3 mt-4">
                    <div>
                      <label className="text-xs mb-1 block" style={{ color: "var(--mist)" }}>Date</label>
                      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required
                        className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                        style={{ background: "var(--night-3)", border: "1px solid rgba(255,255,255,0.06)", color: "var(--white)", colorScheme: "dark" }} />
                    </div>
                    <div>
                      <label className="text-xs mb-1 block" style={{ color: "var(--mist)" }}>
                        Hours: <span style={{ color: "var(--white)" }}>{hours}</span>
                      </label>
                      <input type="range" min={1} max={8} value={hours} onChange={(e) => setHours(Number(e.target.value))}
                        className="w-full" style={{ accentColor: "var(--ember)" }} />
                    </div>
                    <div>
                      <label className="text-xs mb-1 block" style={{ color: "var(--mist)" }}>Message (optional)</label>
                      <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={2} placeholder="What do you want to see?"
                        className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none"
                        style={{ background: "var(--night-3)", border: "1px solid rgba(255,255,255,0.06)", color: "var(--white)" }} />
                    </div>
                    <div className="flex justify-between text-sm pt-1" style={{ color: "var(--mist)" }}>
                      <span>Total</span>
                      <span style={{ color: "var(--white)" }} className="font-medium">${total}</span>
                    </div>
                    <button type="submit" disabled={booking}
                      className="w-full py-3 rounded-xl font-semibold text-sm disabled:opacity-50"
                      style={{ background: "var(--ember)", color: "white" }}>
                      {booking ? "Booking…" : session ? "Request booking" : "Sign in to book"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
