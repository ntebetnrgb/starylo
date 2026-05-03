"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function RotatingCard({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const speed = 0.003 + index * 0.001;
  const offset = index * (Math.PI * 2) / 3;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * speed * 10 + offset) * 0.3;
    ref.current.rotation.x = Math.cos(t * speed * 8 + offset) * 0.15;
    ref.current.position.y = Math.sin(t * 0.5 + offset) * 0.15;
  });

  const colors = ["#ff4d2e", "#f0b429", "#a78bfa"];
  const color = colors[index % colors.length];

  return (
    <mesh ref={ref} position={[(index - 1) * 2.2, 0, 0]}>
      <RoundedBox args={[1.6, 1, 0.05]} radius={0.08} smoothness={4}>
        <meshPhongMaterial
          color="#0f1628"
          emissive="#1a2a4a"
          shininess={80}
          transparent
          opacity={0.9}
        />
      </RoundedBox>
      {/* Card accent stripe */}
      <mesh position={[0, 0.45, 0.03]}>
        <planeGeometry args={[1.5, 0.08]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
    </mesh>
  );
}

export function FloatingCards3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ background: "transparent", width: "100%", height: "220px" }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-3, 2, 2]} intensity={0.5} color="#ff4d2e" />
      {[0, 1, 2].map((i) => (
        <RotatingCard key={i} index={i} />
      ))}
    </Canvas>
  );
}
