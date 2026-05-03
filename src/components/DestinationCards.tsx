"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

const DESTINATIONS = [
  {
    city: "Bali, Indonesia",
    tag: "🌺 Tropical Paradise",
    desc: "Temples, rice terraces & surf culture",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    accent: "#f59e0b",
    trips: 142,
  },
  {
    city: "Tokyo, Japan",
    tag: "🏙️ Urban Explorer",
    desc: "Neon skylines, ancient shrines & ramen at 2am",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
    accent: "#ff4d2e",
    trips: 98,
  },
  {
    city: "Santorini, Greece",
    tag: "⛵ Coastal Dream",
    desc: "Blue domes, volcanic black beaches & endless views",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    accent: "#a78bfa",
    trips: 74,
  },
  {
    city: "Marrakech, Morocco",
    tag: "🕌 Ancient Medina",
    desc: "Spiced souks, rooftop cafés & desert sunsets",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c7f8aa?auto=format&fit=crop&w=800&q=80",
    accent: "#f0b429",
    trips: 56,
  },
  {
    city: "Medellín, Colombia",
    tag: "🎶 Culture & Vibe",
    desc: "Eternal spring, street art murals & salsa nights",
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=800&q=80",
    accent: "#34d399",
    trips: 63,
  },
  {
    city: "Queenstown, NZ",
    tag: "🏔️ Adventure Base",
    desc: "Bungee, fjords, ski fields & the world's best burgers",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    accent: "#38bdf8",
    trips: 41,
  },
];

function DestCard({ d, index }: { d: typeof DESTINATIONS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - r.top)  / r.height - 0.5;
    const y = (e.clientX - r.left) / r.width  - 0.5;
    setTilt({ rx: x * -18, ry: y * 18 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ rx: 0, ry: 0 }); setHovered(false); }}
      style={{
        position: "relative",
        borderRadius: "24px",
        overflow: "hidden",
        height: "400px",
        cursor: "pointer",
        transformStyle: "preserve-3d",
        willChange: "transform",
        opacity: visible ? 1 : 0,
        transform: visible
          ? `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(${hovered ? "-6px" : "0px"})`
          : `perspective(900px) translateY(60px)`,
        transition: visible
          ? `opacity 0.7s ease ${index * 0.08}s, transform 0.12s ease-out`
          : `opacity 0.7s ease ${index * 0.08}s, transform 0.7s ease ${index * 0.08}s`,
        boxShadow: hovered
          ? `0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08), 0 0 40px ${d.accent}33`
          : "0 12px 40px rgba(0,0,0,0.4)",
      }}
    >
      {/* Photo */}
      <div
        style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${d.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: hovered
            ? `scale(1.08) translateX(${tilt.ry * 0.3}px) translateY(${tilt.rx * 0.3}px)`
            : "scale(1.03)",
          transition: "transform 0.15s ease-out",
        }}
      />

      {/* Gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.1) 100%)",
      }} />

      {/* Top accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "3px",
        background: `linear-gradient(90deg, ${d.accent}, transparent)`,
        opacity: hovered ? 1 : 0.7,
        transition: "opacity 0.2s",
      }} />

      {/* Trip count badge */}
      <div style={{
        position: "absolute", top: 16, right: 16,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "20px",
        padding: "4px 10px",
        fontSize: "11px",
        color: "rgba(255,255,255,0.8)",
        fontWeight: 600,
      }}>
        {d.trips} trips
      </div>

      {/* Bottom content */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 24px" }}>
        <span style={{
          display: "inline-block",
          background: `${d.accent}22`,
          border: `1px solid ${d.accent}55`,
          borderRadius: "20px",
          padding: "4px 12px",
          fontSize: "11px",
          color: d.accent,
          marginBottom: "10px",
          fontWeight: 600,
          backdropFilter: "blur(8px)",
        }}>{d.tag}</span>

        <h3 style={{
          color: "#fff",
          fontSize: "22px",
          fontWeight: 800,
          fontFamily: "Syne, sans-serif",
          marginBottom: "6px",
          letterSpacing: "-0.02em",
        }}>{d.city}</h3>

        <p style={{
          color: "rgba(255,255,255,0.65)",
          fontSize: "13px",
          lineHeight: 1.5,
          marginBottom: "16px",
        }}>{d.desc}</p>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(8px)",
          transition: "all 0.2s ease",
        }}>
          <Link href="/trips/new" style={{
            background: d.accent,
            color: "#fff",
            padding: "8px 18px",
            borderRadius: "10px",
            fontSize: "12px",
            fontWeight: 700,
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}>
            Post trip here →
          </Link>
          <Link href="/trips" style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "12px",
            textDecoration: "none",
          }}>
            Browse trips
          </Link>
        </div>
      </div>
    </div>
  );
}

export function DestinationCards() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "20px",
    }}>
      {DESTINATIONS.map((d, i) => (
        <DestCard key={d.city} d={d} index={i} />
      ))}
    </div>
  );
}
