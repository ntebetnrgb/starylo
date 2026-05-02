"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, Compass } from "lucide-react";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
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
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "var(--bg)" }}>
      {/* blobs */}
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #ff4d2e, transparent)" }} />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #f0b429, transparent)" }} />

      <div className="w-full max-w-sm relative z-10 animate-fade-up">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, #ff4d2e, #ff8c42)" }}>
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold" style={{ fontFamily: "Syne", color: "var(--white)" }}>Starylo</span>
          </Link>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "Syne", color: "var(--white)" }}>Welcome back</h1>
          <p className="text-sm mt-1.5" style={{ color: "var(--muted)" }}>Sign in to continue your journey</p>
        </div>

        <div className="glass rounded-2xl p-6 space-y-4" style={{ border: "1px solid var(--border-2)" }}>
          {error && (
            <div className="p-3 rounded-xl text-sm" style={{ background: "rgba(255,77,46,0.1)", color: "var(--accent)", border: "1px solid rgba(255,77,46,0.2)" }}>
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--muted)" }}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                placeholder="you@example.com" className="input" />
            </div>
            <div>
              <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--muted)" }}>Password</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required
                  placeholder="••••••••" className="input pr-10" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-white/5"
                  style={{ color: "var(--muted)" }}>
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary w-full" style={{ padding: "13px", borderRadius: "12px", fontWeight: 600 }}>
              {loading ? "Signing in…" : <><span>Sign in</span> <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="h-px" style={{ background: "var(--border)" }} />

          <div className="rounded-xl p-3 text-xs space-y-1" style={{ background: "var(--bg-3)" }}>
            <p className="font-semibold mb-1.5" style={{ color: "var(--subtle)" }}>Demo accounts</p>
            <p style={{ color: "var(--muted)" }}>demo@starylo.com / <strong style={{ color: "var(--subtle)" }}>demo123</strong></p>
            <p style={{ color: "var(--muted)" }}>yuki@starylo.com / <strong style={{ color: "var(--subtle)" }}>guide123</strong></p>
          </div>
        </div>

        <p className="text-center text-sm mt-4" style={{ color: "var(--muted)" }}>
          No account?{" "}
          <Link href="/auth/register" style={{ color: "var(--accent)" }} className="font-medium hover:underline">
            Join free →
          </Link>
        </p>
      </div>
    </div>
  );
}
