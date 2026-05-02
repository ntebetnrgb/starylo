import { Navbar } from "@/components/Navbar";
import { TripFeed } from "@/components/TripFeed";
import Link from "next/link";

export default function TripsPage() {
  return (
    <>
      <Navbar />
      <main
        className="min-h-screen pt-24 pb-16 px-4"
        style={{ background: "var(--night)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "var(--ember)" }}>
                Live feed
              </p>
              <h1 className="font-serif text-4xl md:text-5xl" style={{ color: "var(--white)" }}>
                Active trips
              </h1>
            </div>
            <Link
              href="/trips/new"
              className="px-6 py-3 rounded-full text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: "var(--ember)", color: "white" }}
            >
              Post a trip
            </Link>
          </div>
          <TripFeed limit={20} />
        </div>
      </main>
    </>
  );
}
