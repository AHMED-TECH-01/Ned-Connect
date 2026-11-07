"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

interface FloatingGeometryProps {
  position?: [number, number, number];
  color?: string;
  scale?: number;
  floatSpeed?: number;
  rotationSpeed?: number;
}

export function FloatingGeometry({
  position = [0, 0, 0],
  color = "#a7e8cf",
  scale = 0.32,
  floatSpeed = 0.35,
  rotationSpeed = 0.08,
}: FloatingGeometryProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    mesh.rotation.y += rotationSpeed * 0.016;
    mesh.rotation.x += rotationSpeed * 0.005;

    mesh.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * floatSpeed) * 0.12;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.18}
        roughness={0.3}
        metalness={0.05}
      />
    </mesh>
  );
}
