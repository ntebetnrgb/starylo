import { Navbar } from "@/components/Navbar";
import { EventsList } from "@/components/EventsList";

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <main
        className="min-h-screen pt-24 pb-16 px-4"
        style={{ background: "var(--night)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "var(--ember)" }}>
              Spontaneous
            </p>
            <h1 className="font-serif text-4xl md:text-5xl" style={{ color: "var(--white)" }}>
              Local events
            </h1>
            <p className="mt-2 text-sm" style={{ color: "var(--mist)" }}>
              When travelers cluster, magic happens. RSVP your spot.
            </p>
          </div>
          <EventsList />
        </div>
      </main>
    </>
  );
}
