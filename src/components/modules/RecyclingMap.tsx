"use client";

import { Compass, Navigation } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { binTypeMeta } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { RecyclingPoint } from "@/lib/types";

export interface RecyclingMapProps {
  points: RecyclingPoint[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function RecyclingMap({ points, activeId, onSelect }: RecyclingMapProps) {
  return (
    <div className="relative overflow-hidden rounded-card border border-line bg-brand-50">
      <div aria-hidden className="grid-lines absolute inset-0 opacity-70" />

      {/* Stylised campus roads */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute left-0 top-[38%] h-6 w-full -rotate-3 bg-white/70" />
        <div className="absolute left-[30%] top-0 h-full w-6 rotate-6 bg-white/70" />
        <div className="absolute left-0 top-[72%] h-4 w-full rotate-2 bg-white/50" />
        <div className="absolute left-[68%] top-0 h-full w-4 -rotate-3 bg-white/50" />
      </div>

      {/* Stylised campus buildings */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute left-[8%] top-[10%] h-16 w-24 rounded-md border border-brand-200 bg-white/80" />
        <div className="absolute left-[42%] top-[8%] h-20 w-28 rounded-md border border-brand-200 bg-white/80" />
        <div className="absolute left-[76%] top-[14%] h-14 w-20 rounded-md border border-brand-200 bg-white/80" />
        <div className="absolute left-[14%] top-[52%] h-20 w-28 rounded-md border border-brand-200 bg-white/80" />
        <div className="absolute left-[54%] top-[58%] h-16 w-24 rounded-md border border-brand-200 bg-white/80" />
        <div className="absolute bottom-[6%] right-[6%] h-14 w-20 rounded-md border border-brand-200 bg-white/70" />
        <div className="absolute bottom-[8%] left-[38%] h-12 w-16 rounded-md border border-brand-200 bg-white/70" />
      </div>

      <div className="relative aspect-[16/11] w-full">
        {points.map((point, index) => {
          const active = point.id === activeId;
          return (
            <button
              key={point.id}
              type="button"
              onClick={() => onSelect(point.id)}
              aria-label={`${point.name}, ${point.address}`}
              aria-pressed={active}
              style={{ left: `${point.markerX}%`, top: `${point.markerY}%` }}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-200",
                active ? "z-20 scale-110" : "z-10 hover:scale-105"
              )}
            >
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border-2 text-[12.5px] font-bold shadow-[var(--shadow-pop)]",
                  active
                    ? "border-white bg-brand-700 text-white"
                    : "border-white bg-surface text-brand-700"
                )}
              >
                {index + 1}
              </span>
              {active ? (
                <span className="absolute left-1/2 top-full mt-1.5 w-44 -translate-x-1/2 rounded-lg bg-brand-900 px-3 py-2 text-center text-[11.5px] font-semibold leading-snug text-white shadow-[var(--shadow-pop)]">
                  {point.name}
                </span>
              ) : null}
            </button>
          );
        })}

        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg border border-line bg-surface/95 px-3 py-2 backdrop-blur">
          <Compass className="h-4 w-4 text-brand-600" />
          <span className="text-[11.5px] font-semibold text-ink">
            NED Main Campus
          </span>
        </div>
        <div className="absolute right-3 top-3 rounded-lg border border-line bg-surface/95 px-3 py-2 backdrop-blur">
          <span className="flex items-center gap-1.5 text-[11.5px] font-semibold text-muted">
            <Navigation className="h-3.5 w-3.5 text-brand-600" />
            Map placeholder
          </span>
        </div>
      </div>

      <div className="relative flex flex-wrap items-center gap-2 border-t border-line bg-surface px-4 py-3">
        {Object.entries(binTypeMeta).map(([key, meta]) => (
          <span key={key} className="flex items-center gap-1.5">
            <span
              aria-hidden
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: meta.color }}
            />
            <span className="text-[11.5px] font-medium text-muted">
              {meta.label}
            </span>
          </span>
        ))}
        <Badge tone="brand" className="ml-auto hidden sm:inline-flex">
          {points.length} drop-off points
        </Badge>
      </div>
    </div>
  );
}
