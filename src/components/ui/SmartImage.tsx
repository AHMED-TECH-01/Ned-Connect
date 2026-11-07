"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function SmartImage({ src, alt, className }: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex items-center justify-center bg-brand-100 text-brand-400",
          className
        )}
      >
        <ImageIcon className="h-6 w-6" aria-hidden />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn("object-cover", className)}
    />
  );
}
