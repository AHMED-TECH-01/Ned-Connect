"use client";

import dynamic from "next/dynamic";

const NedScene = dynamic(
  () => import("@/components/three/NedScene"),
  {
    ssr: false,
    loading: () => null,
  }
);

export function HeroSceneLoader() {
  return <NedScene />;
}
