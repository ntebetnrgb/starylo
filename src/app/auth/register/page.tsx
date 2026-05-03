"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, Compass, Check } from "lucide-react";

const PERKS = [
  "Post trips & find travel partners",
  "Book verified local guides",
  "Join spontaneous city events",
  "Free forever · No credit card",
];

export default function Register() {
  const router   = useRouter();
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]   = useState(false);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const d = await res.json();
      setError(d.error ?? "Registration failed");
      setLoading(false);
      return;
    }

    await signIn("credentials", { email, password, redirect: false });
    router.push("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "var(--bg)",
      }}
    >
      {/* ── LEFT: destination showcase ─────────────────────────── */}
      <div
        style={{
          flex: "0 0 52%",
          position: "relative",
          overflow: "hidden",
          display: "none",
        }}
        className="lg:block"
      >
        {/* Background photo */}
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage:
              "url(https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1200&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Warm overlay */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(
              to bottom,
              rgba(8,4,2,0.55) 0%,
              rgba(8,4,2,0.22) 40%,
              rgba(8,4,2,0.75) 100%
            )`,
          }}
        />

        {/* Brand */}
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

        {/* Headline overlay */}
        <div
          style={{
            position: "absolute",
            top: "50%", left: "36px", right: "36px",
            transform: "translateY(-50%)",
          }}
        >
          <p
            style={{
              fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#f59e0b",
              marginBottom: "16px",
            }}
          >
            JOIN 12,000+ TRAVELERS
          </p>
          <h2
            style={{
              fontSize: "42px",
              fontWeight: 800,
              fontFamily: "Syne, sans-serif",
              color: "#fff",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              marginBottom: "24px",
            }}
          >
            Your next<br />adventure<br />
            <span
              style={{
                background: "linear-gradient(135deg, #ff6b35 0%, #f59e0b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              starts with a crew.
            </span>
          </h2>
        </div>

        {/* Perks list */}
        <div
          style={{
            position: "absolute",
            bottom: "40px", left: "36px", right: "36px",
            background: "rgba(12,7,3,0.78)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,190,110,0.14)",
            borderRadius: "20px",
            padding: "20px 24px",
          }}
        >
          {PERKS.map((perk) => (
            <div
              key={perk}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  width: "20px", height: "20px",
                  borderRadius: "50%",
                  background: "rgba(16,185,129,0.15)",
                  border: "1px solid rgba(16,185,129,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Check className="w-3 h-3" style={{ color: "#10b981" }} />
              </div>
              <span style={{ fontSize: "13px", color: "rgba(255,250,243,0.85)", fontWeight: 500 }}>
                {perk}
              </span>
            </div>
          ))}
        </div>
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
              Create your account 🌍
            </h1>
            <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.5 }}>
              Free forever. No credit card. Start in 30 seconds.
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
            {[
              { label: "FULL NAME",   type: "text",     value: name,     set: setName,     placeholder: "Alex Rivera", show: null },
              { label: "EMAIL",       type: "email",    value: email,    set: setEmail,    placeholder: "you@example.com", show: null },
              { label: "PASSWORD",    type: showPw ? "text" : "password", value: password, set: setPassword, placeholder: "Min. 8 characters", show: showPw },
            ].map((f) => (
              <div key={f.label}>
                <label
                  style={{
                    fontSize: "12px", fontWeight: 600,
                    color: "var(--subtle)",
                    display: "block", marginBottom: "6px",
                    letterSpacing: "0.03em",
                  }}
                >
                  {f.label}
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={f.type}
                    value={f.value}
                    onChange={(e) => f.set(e.target.value)}
                    required
                    placeholder={f.placeholder}
                    minLength={f.label === "PASSWORD" ? 8 : undefined}
                    className="input"
                    style={f.show !== null ? { paddingRight: "44px" } : undefined}
                  />
                  {f.show !== null && (
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
                  )}
                </div>
              </div>
            ))}

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
              {loading ? "Creating account…" : (
                <><span>Create free account</span><ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          {/* Perks — mobile only */}
          <div
            className="lg:hidden glass-warm rounded-2xl"
            style={{ padding: "16px 20px", marginTop: "24px" }}
          >
            {PERKS.map((perk) => (
              <div key={perk} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <Check className="w-3.5 h-3.5" style={{ color: "#10b981", flexShrink: 0 }} />
                <span style={{ fontSize: "12px", color: "var(--subtle)" }}>{perk}</span>
              </div>
            ))}
          </div>

          {/* Terms note */}
          <p style={{ fontSize: "11px", color: "var(--bg-4)", textAlign: "center", marginTop: "16px", lineHeight: 1.6 }}>
            By creating an account you agree to our{" "}
            <Link href="#" style={{ color: "var(--muted)" }}>Terms</Link>
            {" "}and{" "}
            <Link href="#" style={{ color: "var(--muted)" }}>Privacy Policy</Link>.
          </p>

          {/* Bottom link */}
          <p
            style={{
              textAlign: "center",
              fontSize: "13px",
              color: "var(--muted)",
              marginTop: "20px",
            }}
          >
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "none" }}
            >
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
