"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { FloatingGeometry } from "./FloatingGeometry";
import { FloatingParticles } from "./FloatingParticles";

export default function NedScene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 8],
        fov: 45,
      }}
      dpr={[1, 1.5]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      }}
      frameloop="always"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 4, 5]} intensity={0.6} />
        <FloatingParticles count={55} spread={14} />
        <FloatingGeometry position={[3.2, 0.8, -1.2]} color="#a7e8cf" scale={0.28} />
        <FloatingGeometry position={[-3.5, -0.5, -0.8]} color="#bff0d4" scale={0.22} floatSpeed={0.28} rotationSpeed={0.05} />
        <FloatingGeometry position={[1.8, -1.2, -1.5]} color="#c8f0e0" scale={0.18} floatSpeed={0.42} rotationSpeed={0.12} />
      </Suspense>
    </Canvas>
  );
}
