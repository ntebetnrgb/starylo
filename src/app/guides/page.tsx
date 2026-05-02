import { Navbar } from "@/components/Navbar";
import { GuideGrid } from "@/components/GuideGrid";

export default function GuidesPage() {
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
              Verified locals
            </p>
            <h1 className="font-serif text-4xl md:text-5xl" style={{ color: "var(--white)" }}>
              Local guides
            </h1>
            <p className="mt-2 text-sm" style={{ color: "var(--mist)" }}>
              Handpicked experts who live, breathe and love their city.
            </p>
          </div>
          <GuideGrid limit={20} />
        </div>
      </main>
    </>
  );
}
