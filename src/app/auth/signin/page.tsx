"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, Compass, MapPin, Star } from "lucide-react";

const QUOTES = [
  { text: "The world is a book, and those who do not travel read only one page.", author: "Saint Augustine" },
  { text: "Travel makes one modest. You see what a tiny place you occupy in the world.", author: "Gustave Flaubert" },
  { text: "Not all those who wander are lost.", author: "J.R.R. Tolkien" },
];
const quote = QUOTES[0];

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]  = useState(false);
  const [error, setError]    = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.error) { setError("Invalid email or password"); setLoading(false); }
    else router.push("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "var(--bg)",
      }}
    >
      {/* ── LEFT: immersive travel photo ───────────────────────── */}
      <div
        style={{
          flex: "0 0 55%",
          position: "relative",
          overflow: "hidden",
          display: "none",
        }}
        className="lg:block"
      >
        {/* Background video */}
        <video
          autoPlay muted loop playsInline
          poster="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
          }}
        >
          <source
            src="https://videos.pexels.com/video-files/4193276/4193276-hd_1920_1080_24fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Warm cinematic overlay */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(
              to bottom right,
              rgba(8,4,2,0.72) 0%,
              rgba(8,4,2,0.18) 50%,
              rgba(8,4,2,0.65) 100%
            )`,
          }}
        />

        {/* Brand in top-left */}
        <div
          style={{
            position: "absolute",
            top: "32px", left: "36px",
            display: "flex", alignItems: "center", gap: "10px",
          }}
        >
          <div
            style={{
              width: "36px", height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #ff6b35, #f59e0b)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <Compass className="w-5 h-5 text-white" />
          </div>
          <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "18px", color: "#fff" }}>
            Starylo
          </span>
        </div>

        {/* Bottom quote card */}
        <div
          style={{
            position: "absolute",
            bottom: "40px", left: "36px", right: "36px",
            background: "rgba(12,7,3,0.75)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,190,110,0.15)",
            borderRadius: "20px",
            padding: "24px 28px",
          }}
        >
          <div style={{ display: "flex", gap: "4px", marginBottom: "12px" }}>
            {[1,2,3,4,5].map(i => (
              <Star key={i} className="w-3.5 h-3.5" style={{ color: "#f59e0b", fill: "#f59e0b" }} />
            ))}
          </div>
          <p style={{ color: "rgba(255,250,243,0.9)", fontSize: "15px", lineHeight: 1.65, fontStyle: "italic", marginBottom: "12px" }}>
            &ldquo;{quote.text}&rdquo;
          </p>
          <p style={{ color: "var(--muted)", fontSize: "12px", fontWeight: 600 }}>— {quote.author}</p>
        </div>

        {/* Floating trip indicators */}
        {[
          { city: "Bali, Indonesia",    flag: "🇮🇩", top: "28%",  left: "8%" },
          { city: "Kyoto, Japan",       flag: "🇯🇵", top: "45%",  right: "8%" },
          { city: "Santorini, Greece",  flag: "🇬🇷", top: "62%",  left: "12%" },
        ].map((t) => (
          <div
            key={t.city}
            style={{
              position: "absolute",
              top: t.top,
              left: t.left ?? undefined,
              right: (t as { right?: string }).right ?? undefined,
              background: "rgba(12,7,3,0.72)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,190,110,0.18)",
              borderRadius: "40px",
              padding: "8px 14px",
              display: "flex", alignItems: "center", gap: "8px",
              animation: "float-simple 4s ease-in-out infinite",
            }}
          >
            <span style={{ fontSize: "16px" }}>{t.flag}</span>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 600, color: "#fff", whiteSpace: "nowrap" }}>{t.city}</p>
              <p style={{ fontSize: "10px", color: "var(--muted)" }}>Trip open</p>
            </div>
            <div
              style={{
                width: "6px", height: "6px",
                borderRadius: "50%",
                background: "#10b981",
                boxShadow: "0 0 6px #10b981",
                animation: "glow-pulse 2s infinite",
              }}
            />
          </div>
        ))}
      </div>


      {/* ── RIGHT: form panel ──────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
          overflowY: "auto",
        }}
      >
        <div style={{ width: "100%", maxWidth: "400px" }}>

          {/* Mobile logo */}
          <div className="lg:hidden" style={{ textAlign: "center", marginBottom: "32px" }}>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
              <div
                style={{
                  width: "40px", height: "40px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #ff6b35, #f59e0b)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "20px", color: "var(--white)" }}>
                Starylo
              </span>
            </Link>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: "32px" }}>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: 800,
                fontFamily: "Syne, sans-serif",
                color: "var(--white)",
                letterSpacing: "-0.03em",
                marginBottom: "8px",
              }}
            >
              Welcome back 👋
            </h1>
            <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.5 }}>
              Sign in to continue your journey around the world.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                padding: "12px 16px",
                borderRadius: "12px",
                fontSize: "13px",
                background: "rgba(255,107,53,0.1)",
                color: "#ff8c5e",
                border: "1px solid rgba(255,107,53,0.25)",
                marginBottom: "20px",
              }}
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label
                style={{
                  fontSize: "12px", fontWeight: 600,
                  color: "var(--subtle)",
                  display: "block", marginBottom: "6px",
                  letterSpacing: "0.03em",
                }}
              >
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="input"
              />
            </div>

            <div>
              <label
                style={{
                  fontSize: "12px", fontWeight: 600,
                  color: "var(--subtle)",
                  display: "block", marginBottom: "6px",
                  letterSpacing: "0.03em",
                }}
              >
                PASSWORD
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="input"
                  style={{ paddingRight: "44px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{
                    position: "absolute", right: "12px", top: "50%",
                    transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer",
                    color: "var(--muted)", padding: "4px",
                    display: "flex", alignItems: "center",
                  }}
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "14px",
                fontSize: "15px",
                fontWeight: 700,
                marginTop: "4px",
              }}
            >
              {loading ? "Signing in…" : (
                <><span>Sign in</span><ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          {/* Divider */}
          <div
            style={{
              display: "flex", alignItems: "center", gap: "12px",
              margin: "24px 0",
            }}
          >
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
            <span style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 500 }}>OR TRY A DEMO</span>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          </div>

          {/* Demo accounts */}
          <div
            className="glass-warm rounded-2xl"
            style={{ padding: "16px 20px" }}
          >
            <p
              style={{
                fontSize: "11px", fontWeight: 700,
                color: "var(--subtle)", letterSpacing: "0.05em",
                textTransform: "uppercase", marginBottom: "12px",
              }}
            >
              Demo accounts
            </p>
            {[
              { role: "Traveler", email: "demo@starylo.com",  pw: "demo123" },
              { role: "Guide",    email: "yuki@starylo.com",  pw: "guide123" },
            ].map((d) => (
              <button
                key={d.email}
                type="button"
                onClick={() => { setEmail(d.email); setPassword(d.pw); }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  width: "100%", padding: "10px 12px",
                  background: "rgba(255,190,110,0.05)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  cursor: "pointer",
                  marginBottom: "8px",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ textAlign: "left" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--text)" }}>{d.role}</p>
                  <p style={{ fontSize: "11px", color: "var(--muted)" }}>{d.email}</p>
                </div>
                <span
                  style={{
                    fontSize: "10px", fontWeight: 700,
                    background: "var(--bg-4)",
                    padding: "3px 8px", borderRadius: "6px",
                    color: "var(--subtle)",
                    fontFamily: "monospace",
                  }}
                >
                  {d.pw}
                </span>
              </button>
            ))}
          </div>

          {/* Bottom link */}
          <p
            style={{
              textAlign: "center",
              fontSize: "13px",
              color: "var(--muted)",
              marginTop: "24px",
            }}
          >
            No account yet?{" "}
            <Link
              href="/auth/register"
              style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "none" }}
            >
              Join free →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
