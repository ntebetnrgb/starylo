import { Navbar } from "@/components/Navbar";
import { CityGrid } from "@/components/CityGrid";

export default function CitiesPage() {
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
              Destinations
            </p>
            <h1 className="font-serif text-4xl md:text-5xl" style={{ color: "var(--white)" }}>
              Explore cities
            </h1>
            <p className="mt-2 text-sm" style={{ color: "var(--mist)" }}>
              5 curated destinations with hidden local spots.
            </p>
          </div>
          <CityGrid limit={10} />
        </div>
      </main>
    </>
  );
}
