"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Compass } from "lucide-react";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--night)" }}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Compass className="w-5 h-5" style={{ color: "var(--ember)" }} />
            <span className="font-serif text-xl" style={{ color: "var(--white)" }}>
              Starylo
            </span>
          </Link>
          <h1 className="font-serif text-3xl" style={{ color: "var(--white)" }}>
            Join Starylo
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--mist)" }}>
            Free forever. No credit card.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-2xl p-6 space-y-4"
          style={{
            background: "var(--night-2)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {error && (
            <div
              className="text-sm p-3 rounded-xl"
              style={{
                background: "rgba(232,69,42,0.1)",
                color: "var(--ember)",
                border: "1px solid rgba(232,69,42,0.2)",
              }}
            >
              {error}
            </div>
          )}

          {[
            { label: "Full name", type: "text", value: name, set: setName, placeholder: "Alex Rivera" },
            { label: "Email", type: "email", value: email, set: setEmail, placeholder: "you@example.com" },
            { label: "Password", type: "password", value: password, set: setPassword, placeholder: "Min. 8 characters" },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-xs mb-1.5 block" style={{ color: "var(--mist)" }}>
                {f.label}
              </label>
              <input
                type={f.type}
                value={f.value}
                onChange={(e) => f.set(e.target.value)}
                required
                placeholder={f.placeholder}
                minLength={f.type === "password" ? 8 : undefined}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{
                  background: "var(--night-3)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  color: "var(--white)",
                }}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: "var(--ember)", color: "white" }}
          >
            {loading ? "Creating account…" : "Create free account"}
          </button>
        </form>

        <p className="text-center text-sm mt-4" style={{ color: "var(--mist)" }}>
          Already have an account?{" "}
          <Link href="/auth/signin" style={{ color: "var(--ember)" }} className="hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
