"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* Warm golden particles that float over the video hero */
function Particles({ count = 800 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Warm golden spectrum: amber → coral → warm white
      const t = Math.random();
      col[i * 3]     = 1.0;               // R always full
      col[i * 3 + 1] = 0.45 + t * 0.45;  // G — amber to white
      col[i * 3 + 2] = 0.05 + t * 0.35;  // B — hint of warmth
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.018;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.012) * 0.08;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors,    3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

/* Warm glowing orbs */
function WarmOrbs() {
  const group = useRef<THREE.Group>(null);

  const orbs = useMemo(() => [
    { pos: [-4, 1.5, -3]  as [number, number, number], color: "#ff6b35", size: 0.14 },
    { pos: [ 3.5, -1, -4] as [number, number, number], color: "#f59e0b", size: 0.10 },
    { pos: [-1.5, -2, -2] as [number, number, number], color: "#fbbf24", size: 0.08 },
    { pos: [ 2.5, 2, -3]  as [number, number, number], color: "#ff8c5e", size: 0.12 },
    { pos: [ 0, 1.2, -5]  as [number, number, number], color: "#d97706", size: 0.07 },
  ], []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      mesh.position.y = orbs[i].pos[1] + Math.sin(state.clock.elapsedTime * 0.5 + i * 1.4) * 0.25;
      mesh.rotation.x += 0.004;
      mesh.rotation.z += 0.003;
    });
  });

  return (
    <group ref={group}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.pos}>
          <sphereGeometry args={[orb.size, 16, 16]} />
          <meshBasicMaterial color={orb.color} transparent opacity={0.55} />
        </mesh>
      ))}
    </group>
  );
}

export function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{
        background: "transparent",
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
      dpr={[1, 1.5]}
    >
      <Particles count={800} />
      <WarmOrbs />
    </Canvas>
  );
}
