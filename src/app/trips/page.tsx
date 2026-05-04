import { Navbar } from "@/components/Navbar";
import { TripFeed } from "@/components/TripFeed";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function TripsPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: "96px", paddingBottom: "80px" }}>
        {/* Header glow */}
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: "600px", height: "300px",
          background: "radial-gradient(ellipse, rgba(255,107,53,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div className="container px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs tracking-widest uppercase mb-3 font-semibold" style={{ color: "var(--accent)" }}>
                Live feed
              </p>
              <h1 style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 800,
                fontStyle: "italic",
                color: "var(--white)",
                lineHeight: 1.1,
              }}>
                Active <span className="text-gradient">trips</span>
              </h1>
              <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                Real travellers, real destinations, open spots waiting for you.
              </p>
            </div>
            <Link
              href="/trips/new"
              className="btn btn-primary hidden md:inline-flex"
              style={{ borderRadius: "50px", padding: "12px 24px" }}
            >
              <Plus className="w-4 h-4" /> Post a trip
            </Link>
          </div>

          <TripFeed limit={20} />

          <div className="mt-10 md:hidden">
            <Link href="/trips/new" className="btn btn-primary w-full justify-center" style={{ borderRadius: "50px" }}>
              <Plus className="w-4 h-4" /> Post a trip
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
