"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 1200 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Mix between ember orange and white
      const t = Math.random();
      col[i * 3]     = 1.0;
      col[i * 3 + 1] = 0.2 + t * 0.6;
      col[i * 3 + 2] = 0.1 + t * 0.3;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingOrbs() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      mesh.position.y = Math.sin(state.clock.elapsedTime * 0.5 + i * 1.3) * 0.3;
      mesh.rotation.x += 0.005;
      mesh.rotation.z += 0.003;
    });
  });

  const orbs = useMemo(
    () => [
      { pos: [-3, 1, -2] as [number, number, number], color: "#ff4d2e", size: 0.15 },
      { pos: [3, -1, -3] as [number, number, number], color: "#f0b429", size: 0.1 },
      { pos: [-1, -2, -1] as [number, number, number], color: "#a78bfa", size: 0.08 },
      { pos: [2, 2, -2] as [number, number, number], color: "#60a5fa", size: 0.12 },
      { pos: [0, 1.5, -4] as [number, number, number], color: "#ff4d2e", size: 0.06 },
    ],
    []
  );

  return (
    <group ref={group}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.pos}>
          <sphereGeometry args={[orb.size, 16, 16]} />
          <meshBasicMaterial color={orb.color} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

export function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ background: "transparent", position: "absolute", inset: 0, pointerEvents: "none" }}
      dpr={[1, 1.5]}
    >
      <Particles count={1000} />
      <FloatingOrbs />
    </Canvas>
  );
}
