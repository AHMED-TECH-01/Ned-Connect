"use client";

interface HeroBackgroundProps {
  imageUrl: string;
}

export function HeroBackground({ imageUrl }: HeroBackgroundProps) {
  return (
    <>
      {/* Base NED entrance photograph */}
      <div
        className="ned-hero__image"
        aria-hidden="true"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />

      {/* Dark tint overlay — preserves photograph visibility with a green tint */}
      <div
        className="ned-hero__tint"
        aria-hidden="true"
      />

      {/* Feathered edges — blend photograph into surrounding sections */}
      <div
        className="ned-hero__feather"
        aria-hidden="true"
      />
    </>
  );
}
