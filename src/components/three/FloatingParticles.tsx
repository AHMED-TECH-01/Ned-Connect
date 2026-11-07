"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import type { Float32BufferAttribute, Points } from "three";

interface FloatingParticlesProps {
  count?: number;
  spread?: number;
  color?: string;
  size?: number;
}

export function FloatingParticles({
  count = 60,
  spread = 12,
  color = "#bfe9d7",
  size = 0.025,
}: FloatingParticlesProps) {
  const pointsRef = useRef<Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.4 - 2;
    }
    return arr;
  }, [count, spread]);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;
    const pos = points.geometry.attributes.position as Float32BufferAttribute | undefined;
    if (!pos) return;
    for (let i = 0; i < count; i++) {
      const base = i * 3;
      pos.array[base + 1] +=
        Math.sin(state.clock.elapsedTime * 0.3 + i * 0.5) * 0.0008;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  );
}
