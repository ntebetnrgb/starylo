import { Navbar } from "@/components/Navbar";
import { EventsList } from "@/components/EventsList";

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: "96px", paddingBottom: "80px" }}>
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: "600px", height: "300px",
          background: "radial-gradient(ellipse, rgba(8,145,178,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div className="container px-6">
          <div className="mb-12">
            <p className="text-xs tracking-widest uppercase mb-3 font-semibold" style={{ color: "var(--teal)" }}>
              Spontaneous
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
              Local <span className="text-gradient-teal">events</span>
            </h1>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              When travellers cluster, magic happens. RSVP your spot.
            </p>
          </div>
          <EventsList />
        </div>
      </main>
    </>
  );
}
