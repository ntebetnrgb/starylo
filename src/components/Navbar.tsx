"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { Menu, X, LogOut, Compass, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/trips", label: "Trips" },
    { href: "/cities", label: "Cities" },
    { href: "/guides", label: "Guides" },
    { href: "/events", label: "Events" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-white/5 shadow-xl shadow-black/20"
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all group-hover:scale-105"
            style={{ background: "linear-gradient(135deg, #ff4d2e, #ff8c42)" }}>
            <Compass className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight" style={{ fontFamily: "Syne, sans-serif", color: "var(--white)" }}>
            Starylo
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/5"
              style={{ color: "var(--subtle)" }}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <>
              <Link href="/trips/new" className="btn btn-primary text-sm" style={{ padding: "8px 16px", borderRadius: "10px" }}>
                <Plus className="w-4 h-4" /> Post trip
              </Link>
              <div className="relative group">
                <button className="flex items-center gap-2 p-1 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center text-xs font-bold"
                    style={{ background: "linear-gradient(135deg, #ff4d2e, #ff8c42)", color: "white" }}>
                    {session.user?.image
                      ? <img src={session.user.image} alt="" className="w-full h-full object-cover" />
                      : session.user?.name?.[0]?.toUpperCase()}
                  </div>
                </button>
                <div className="absolute right-0 top-11 glass rounded-2xl p-2 hidden group-hover:block w-48 shadow-2xl"
                  style={{ border: "1px solid var(--border-2)" }}>
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{session.user?.name}</p>
                    <p className="text-xs mt-0.5 truncate" style={{ color: "var(--muted)" }}>{session.user?.email}</p>
                  </div>
                  <div className="h-px mx-2 my-1" style={{ background: "var(--border)" }} />
                  <button onClick={() => signOut()}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-xl hover:bg-white/5 transition-colors"
                    style={{ color: "var(--subtle)" }}>
                    <LogOut className="w-4 h-4" /> Sign out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/signin" className="btn btn-ghost text-sm" style={{ padding: "8px 16px", borderRadius: "10px" }}>
                Sign in
              </Link>
              <Link href="/auth/register" className="btn btn-primary text-sm" style={{ padding: "8px 16px", borderRadius: "10px" }}>
                Join free
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg hover:bg-white/5"
          style={{ color: "var(--subtle)" }}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden glass border-t px-6 py-4 space-y-1" style={{ borderColor: "var(--border)" }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-medium" style={{ color: "var(--subtle)" }}>
              {l.label}
            </Link>
          ))}
          <div className="pt-3 flex gap-2">
            {session ? (
              <>
                <Link href="/trips/new" onClick={() => setOpen(false)} className="btn btn-primary flex-1 text-sm">
                  Post trip
                </Link>
                <button onClick={() => { signOut(); setOpen(false); }} className="btn btn-ghost text-sm">
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/signin" onClick={() => setOpen(false)} className="btn btn-ghost flex-1 text-sm">Sign in</Link>
                <Link href="/auth/register" onClick={() => setOpen(false)} className="btn btn-primary flex-1 text-sm">Join free</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
