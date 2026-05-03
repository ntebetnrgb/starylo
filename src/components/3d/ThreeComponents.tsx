"use client";

import dynamic from "next/dynamic";

export const ParticleField = dynamic(
  () => import("./ParticleField").then((m) => m.ParticleField),
  { ssr: false, loading: () => null }
);

export const Globe3D = dynamic(
  () => import("./Globe3D").then((m) => m.Globe3D),
  { ssr: false, loading: () => <div style={{ width: "100%", height: "100%" }} /> }
);

export const FloatingCards3D = dynamic(
  () => import("./FloatingCard3D").then((m) => m.FloatingCards3D),
  { ssr: false, loading: () => <div style={{ height: "220px" }} /> }
);
