import { Navbar } from "@/components/Navbar";
import { CityGrid } from "@/components/CityGrid";

export default function CitiesPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: "96px", paddingBottom: "80px" }}>
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: "600px", height: "300px",
          background: "radial-gradient(ellipse, rgba(245,158,11,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div className="container px-6">
          <div className="mb-12">
            <p className="text-xs tracking-widest uppercase mb-3 font-semibold" style={{ color: "var(--gold)" }}>
              Destinations
            </p>
            <h1 style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 800,
              fontStyle: "italic",
              color: "var(--white)",
              lineHeight: 1.1,
              marginBottom: "8px",
            }}>
              Explore <span className="text-gradient">cities</span>
            </h1>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Curated destinations with hidden local spots, guides and live events.
            </p>
          </div>
          <CityGrid limit={10} />
        </div>
      </main>
    </>
  );
}
