import Link from "next/link";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Explorer",
    price: "Free",
    period: "forever",
    color: "var(--muted)",
    features: ["Post unlimited trips", "Browse trip feed", "Message 3/month", "All city guides", "Event access"],
  },
  {
    name: "Adventurer",
    price: "$9",
    period: "/mo",
    highlight: true,
    badge: "Most popular",
    color: "var(--accent)",
    features: ["Everything in Explorer", "Unlimited messaging", "AI trip planner", "Hidden spots", "Verified badge", "Priority listing", "Early events"],
  },
  {
    name: "Nomad",
    price: "$19",
    period: "/mo",
    color: "var(--gold)",
    features: ["Everything in Adventurer", "Concierge planning", "1 guide fee waiver/mo", "Cost split tools", "VIP event seats", "Travel alerts", "Offline guides"],
  },
];

export function PricingSection() {
  return (
    <section className="section" style={{ background: "var(--bg)" }}>
      <div className="container-sm">
        <div className="text-center mb-12">
          <div className="badge mx-auto mb-4" style={{ background: "rgba(255,77,46,0.1)", color: "var(--accent)", border: "1px solid rgba(255,77,46,0.2)" }}>
            <Zap className="w-3 h-3" /> Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "var(--white)" }}>Simple, transparent pricing</h2>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>Start free. No credit card. Cancel any time.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div key={plan.name} className={`rounded-2xl overflow-hidden flex flex-col relative ${plan.highlight ? "" : "card-lift"}`}
              style={plan.highlight
                ? { background: "var(--accent)", boxShadow: "0 24px 64px rgba(255,77,46,0.3)", transform: "scale(1.02)" }
                : { background: "var(--bg-3)", border: "1px solid var(--border)" }}>

              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 badge"
                  style={{ background: "var(--gold)", color: "var(--bg)", fontWeight: 700 }}>
                  {plan.badge}
                </div>
              )}

              {/* Top stripe */}
              <div className="h-1" style={{ background: plan.color }} />

              <div className="p-6 flex flex-col gap-5 flex-1">
                <div>
                  <p className="text-sm font-semibold mb-1" style={{ color: plan.highlight ? "rgba(255,255,255,0.75)" : "var(--muted)" }}>
                    {plan.name}
                  </p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold" style={{ color: "var(--white)", fontFamily: "Syne" }}>{plan.price}</span>
                    <span className="text-sm mb-1" style={{ color: plan.highlight ? "rgba(255,255,255,0.6)" : "var(--muted)" }}>{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className="w-4 h-4 mt-0.5 shrink-0"
                        style={{ color: plan.highlight ? "rgba(255,255,255,0.9)" : "var(--green)" }} />
                      <span style={{ color: plan.highlight ? "rgba(255,255,255,0.85)" : "var(--subtle)" }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/auth/register"
                  className="btn w-full justify-center"
                  style={plan.highlight
                    ? { background: "rgba(0,0,0,0.2)", color: "white", borderRadius: "12px", padding: "12px", fontWeight: 600 }
                    : { background: "var(--accent)", color: "white", borderRadius: "12px", padding: "12px", fontWeight: 600 }}>
                  Get started
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "var(--muted)" }}>
          All plans include: No ads · No data selling · Cancel anytime
        </p>
      </div>
    </section>
  );
}
