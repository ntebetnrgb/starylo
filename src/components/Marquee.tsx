"use client";

interface MarqueeProps {
  items: string[];
  speed?: number;       // seconds for one full loop
  reverse?: boolean;
  size?: "sm" | "md" | "lg";
  separator?: string;
}

export function Marquee({
  items,
  speed = 28,
  reverse = false,
  size = "md",
  separator = "·",
}: MarqueeProps) {
  // Duplicate so the seam is invisible
  const doubled = [...items, ...items, ...items];

  const fontSize = size === "sm" ? "13px" : size === "lg" ? "52px" : "15px";
  const fontWeight = size === "lg" ? 800 : 600;
  const letterSpacing = size === "lg" ? "-0.03em" : "0.06em";
  const textTransform = size === "lg" ? "uppercase" : "uppercase";
  const gap = size === "lg" ? "40px" : "24px";

  return (
    <div style={{ overflow: "hidden", display: "flex", width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap,
          whiteSpace: "nowrap",
          animation: `marquee-scroll ${speed}s linear infinite ${reverse ? "reverse" : "normal"}`,
          willChange: "transform",
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap,
              fontSize,
              fontWeight,
              letterSpacing,
              textTransform: textTransform as React.CSSProperties["textTransform"],
              fontFamily: size === "lg" ? "Playfair Display, Georgia, serif" : "Syne, sans-serif",
              color: size === "lg" ? "var(--white)" : "var(--muted)",
            }}
          >
            {item}
            <span style={{ opacity: 0.35, fontSize: size === "lg" ? "32px" : "16px" }}>{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
