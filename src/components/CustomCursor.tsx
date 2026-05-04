"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    document.documentElement.style.cursor = "none";

    let mx = -100, my = -100; // mouse position
    let rx = -100, ry = -100; // ring position (lerped)

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
      }
    };

    let frame: number;
    const animate = () => {
      // Ring follows with inertia (lerp 0.12)
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx - 22}px, ${ry - 22}px)`;
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    // Expand on hoverable elements
    const onEnter = () => {
      if (!ringRef.current) return;
      ringRef.current.style.width  = "72px";
      ringRef.current.style.height = "72px";
      ringRef.current.style.borderColor = "rgba(245,158,11,0.8)";
      ringRef.current.style.background = "rgba(255,107,53,0.06)";
    };
    const onLeave = () => {
      if (!ringRef.current) return;
      ringRef.current.style.width  = "44px";
      ringRef.current.style.height = "44px";
      ringRef.current.style.borderColor = "rgba(255,107,53,0.6)";
      ringRef.current.style.background = "transparent";
    };

    document.addEventListener("mousemove", onMove);

    const addHoverListeners = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    addHoverListeners();

    // Re-attach on DOM changes
    const obs = new MutationObserver(addHoverListeners);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.documentElement.style.cursor = "";
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      {/* Lagging ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "44px", height: "44px",
          borderRadius: "50%",
          border: "1.5px solid rgba(255,107,53,0.6)",
          background: "transparent",
          pointerEvents: "none",
          zIndex: 99998,
          willChange: "transform",
          transition: "width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background 0.25s ease",
          mixBlendMode: "normal",
        }}
      />
      {/* Instant dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "6px", height: "6px",
          borderRadius: "50%",
          background: "#ff6b35",
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform",
          boxShadow: "0 0 6px rgba(255,107,53,0.8)",
        }}
      />
    </>
  );
}
