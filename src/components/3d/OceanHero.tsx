"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import * as THREE from "three";

// ─── WAVE SHADERS ──────────────────────────────────────────────────────────

const VERT = /* glsl */ `
  uniform float uTime;
  varying float vElevation;
  varying vec2 vUv;

  void main() {
    vec4 mPos = modelMatrix * vec4(position, 1.0);

    float a = sin(mPos.x * 1.8 + uTime * 0.7)  * 0.22;
    float b = sin(mPos.z * 1.4 + uTime * 0.55) * 0.17;
    float c = sin((mPos.x + mPos.z) * 3.2 + uTime * 1.3) * 0.06;
    float d = sin(mPos.x * 5.0 + uTime * 2.0) * 0.02;

    mPos.y += a + b + c + d;
    vElevation = a + b + c + d;
    vUv = uv;

    gl_Position = projectionMatrix * viewMatrix * mPos;
  }
`;

const FRAG = /* glsl */ `
  uniform vec3 uDeep;
  uniform vec3 uShallow;
  varying float vElevation;
  varying vec2 vUv;

  void main() {
    float t = clamp((vElevation + 0.48) * 1.4, 0.0, 1.0);
    vec3 col = mix(uDeep, uShallow, t);

    // Foam on wave peaks
    float foam = smoothstep(0.18, 0.45, vElevation);
    col = mix(col, vec3(0.88, 0.97, 1.0), foam * 0.5);

    // Sun glint (top-left scatter)
    float glint = pow(max(0.0, vElevation - 0.1), 3.0) * 0.6;
    col += vec3(1.0, 0.95, 0.8) * glint;

    gl_FragColor = vec4(col, 1.0);
  }
`;

// ─── OCEAN MESH ─────────────────────────────────────────────────────────────

function Ocean({ scroll }: { scroll: React.MutableRefObject<number> }) {
  const uniforms = useMemo(
    () => ({
      uTime:    { value: 0 },
      uDeep:    { value: new THREE.Color("#0c4a6e") },
      uShallow: { value: new THREE.Color("#38bdf8") },
    }),
    []
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;

    const s = scroll.current;
    state.camera.position.y = 1.7 + s * 0.007;
    state.camera.position.z = 4.5 - s * 0.002;
    state.camera.lookAt(0, 0.4 + s * 0.002, -4);
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[80, 80, 160, 160]} />
      <shaderMaterial
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
      />
    </mesh>
  );
}

// ─── TROPICAL ISLAND ────────────────────────────────────────────────────────

function PalmTree({ x, z, lean }: { x: number; z: number; lean: number }) {
  return (
    <group position={[x, 0.5, z]}>
      {/* Trunk */}
      <mesh rotation={[lean, 0, lean * 0.5]}>
        <cylinderGeometry args={[0.07, 0.12, 1.8, 6]} />
        <meshStandardMaterial color="#7c5c30" roughness={0.9} />
      </mesh>
      {/* Fronds */}
      {Array.from({ length: 6 }).map((_, j) => (
        <mesh
          key={j}
          position={[lean * 0.6, 1.5, 0]}
          rotation={[0.55, (j / 6) * Math.PI * 2, 0]}
        >
          <coneGeometry args={[0.55, 1.1, 3]} />
          <meshStandardMaterial color="#1a5c2a" side={THREE.DoubleSide} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function Island() {
  return (
    <group position={[0, -0.55, -14]}>
      {/* Rock base */}
      <mesh>
        <cylinderGeometry args={[0.3, 4.5, 3.2, 14]} />
        <meshStandardMaterial color="#1a3a20" roughness={0.95} />
      </mesh>
      {/* Sand top */}
      <mesh position={[0, 1.4, 0]}>
        <sphereGeometry args={[2.8, 20, 10, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
        <meshStandardMaterial color="#d4a96e" roughness={1} />
      </mesh>
      {/* Palm trees */}
      <PalmTree x={-1.5} z={0.6}  lean={0.12} />
      <PalmTree x={0.3}  z={-1.0} lean={-0.1} />
      <PalmTree x={1.8}  z={0.2}  lean={0.15} />
    </group>
  );
}

// ─── DISTANT MOUNTAINS ──────────────────────────────────────────────────────

function Silhouettes() {
  const peaks = [
    { x: -18, y: -1, z: -22, s: 6 },
    { x: -10, y: -1, z: -20, s: 4 },
    { x:  14, y: -1, z: -21, s: 5 },
    { x:  22, y: -1, z: -23, s: 7 },
    { x:   6, y: -1, z: -25, s: 3 },
  ];
  return (
    <group>
      {peaks.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <coneGeometry args={[p.s * 0.6, p.s, 5]} />
          <meshBasicMaterial color="#0d2a18" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

// ─── FLOATING PARTICLES (sea spray) ─────────────────────────────────────────

function SeaSpray() {
  const ref = useRef<THREE.Points>(null);
  const { positions } = useMemo(() => {
    const n = 300;
    const positions = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = Math.random() * 1.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 2;
    }
    return { positions };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.01;
    const arr = (ref.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    for (let i = 0; i < arr.length / 3; i++) {
      arr[i * 3 + 1] += Math.sin(state.clock.elapsedTime * 2 + i) * 0.002;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#a8d8ea" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

// ─── EXPORT ─────────────────────────────────────────────────────────────────

export function OceanHero() {
  const scroll = useRef(0);

  useEffect(() => {
    const fn = () => { scroll.current = window.scrollY; };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 1.7, 4.5], fov: 55 }}
      style={{ position: "absolute", inset: 0 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 8, -2]}  intensity={2.5} color="#fff5db" />
      <pointLight       position={[-10, 4, -6]} intensity={1.2} color="#ff9a4a" />
      <pointLight       position={[10, 2, 2]}   intensity={0.5} color="#7dd3fc" />

      <Sky
        distance={450000}
        sunPosition={[1, 0.12, -1] as [number, number, number]}
        turbidity={8}
        rayleigh={2}
        mieCoefficient={0.005}
        mieDirectionalG={0.92}
      />

      <fog attach="fog" args={["#87ceeb", 22, 50]} />

      <Ocean scroll={scroll} />
      <Island />
      <Silhouettes />
      <SeaSpray />
    </Canvas>
  );
}
