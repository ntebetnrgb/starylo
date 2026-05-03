"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const TRIP_DOTS = [
  { lat: 35.01, lng: 135.77, label: "Kyoto" },
  { lat: 38.72, lng: -9.14, label: "Lisbon" },
  { lat: -8.34, lng: 115.09, label: "Bali" },
  { lat: 31.63, lng: -8.0, label: "Marrakech" },
  { lat: 6.25, lng: -75.56, label: "Medellín" },
  { lat: 48.86, lng: 2.35, label: "Paris" },
  { lat: 40.71, lng: -74.01, label: "New York" },
  { lat: -33.87, lng: 151.21, label: "Sydney" },
  { lat: 1.35, lng: 103.82, label: "Singapore" },
  { lat: 25.2, lng: 55.27, label: "Dubai" },
];

function latLngToXYZ(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function GlobeMesh() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.12;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.8, 64, 64]} />
      <meshPhongMaterial
        color="#0f1628"
        emissive="#1a2a4a"
        shininess={30}
        transparent
        opacity={0.95}
        wireframe={false}
      />
    </mesh>
  );
}

function GlobeWireframe() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.12;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.82, 24, 24]} />
      <meshBasicMaterial
        color="#1e3a5f"
        wireframe
        transparent
        opacity={0.25}
      />
    </mesh>
  );
}

function TripDots() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.12;
  });

  const dots = useMemo(
    () =>
      TRIP_DOTS.map((d) => ({
        ...d,
        pos: latLngToXYZ(d.lat, d.lng, 1.85),
      })),
    []
  );

  return (
    <group ref={groupRef}>
      {dots.map((d) => (
        <mesh key={d.label} position={d.pos}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#ff4d2e" />
        </mesh>
      ))}
      {dots.map((d) => (
        <mesh key={d.label + "-ring"} position={d.pos}>
          <ringGeometry args={[0.045, 0.065, 16]} />
          <meshBasicMaterial color="#ff4d2e" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

function AtmosphereGlow() {
  return (
    <mesh>
      <sphereGeometry args={[2.05, 32, 32]} />
      <meshBasicMaterial
        color="#1a3a6e"
        transparent
        opacity={0.08}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

export function Globe3D() {
  return (
    <div style={{ width: "100%", height: "100%", cursor: "grab" }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 3, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-5, -3, -5]} intensity={0.4} color="#4466ff" />
        <pointLight position={[0, 5, 0]} intensity={0.3} color="#ff4d2e" />

        <AtmosphereGlow />
        <GlobeMesh />
        <GlobeWireframe />
        <TripDots />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={(3 * Math.PI) / 4}
        />
      </Canvas>
    </div>
  );
}
