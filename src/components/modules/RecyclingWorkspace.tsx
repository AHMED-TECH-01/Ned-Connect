"use client";

import { useState } from "react";
import { Clock, MapPin, Recycle } from "lucide-react";
import { useMockLoading } from "@/hooks/useMockLoading";
import { RecyclingMap } from "@/components/modules/RecyclingMap";
import { WasteReportForm } from "@/components/modules/WasteReportForm";
import { Badge } from "@/components/ui/Badge";
import { Card, SectionCard } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonList } from "@/components/ui/Skeleton";
import { binTypeMeta, recyclingPoints } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function RecyclingWorkspace() {
  const loading = useMockLoading();
  const [activeId, setActiveId] = useState(recyclingPoints[0].id);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr] lg:items-start">
        <SectionCard
          title="Campus recycling map"
          description="Tap a numbered marker to see the drop-off point details"
          action={<Badge tone="success">Live demo data</Badge>}
          bodyClassName="p-4 sm:p-5"
        >
          <RecyclingMap
            points={recyclingPoints}
            activeId={activeId}
            onSelect={setActiveId}
          />
        </SectionCard>

        <WasteReportForm />
      </div>

      <SectionCard
        title="Recycling locations"
        description="Drop-off points and the waste streams each one accepts"
        bodyClassName="p-0"
      >
        {loading ? (
          <SkeletonList count={6} />
        ) : recyclingPoints.length === 0 ? (
          <EmptyState
            icon={<Recycle className="h-6 w-6" />}
            title="No recycling points yet"
            description="Campus recycling points will be listed here once they are added by administration."
            className="m-5 border-0 bg-transparent sm:m-6"
          />
        ) : (
          <ul className="divide-y divide-line">
            {recyclingPoints.map((point, index) => {
              const active = point.id === activeId;
              return (
                <li key={point.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(point.id)}
                    aria-pressed={active}
                    className={cn(
                      "flex w-full flex-wrap items-start gap-4 px-5 py-4 text-left transition-colors sm:px-6",
                      active ? "bg-brand-50" : "hover:bg-brand-50/60"
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-[13px] font-bold",
                        active
                          ? "border-brand-700 bg-brand-700 text-white"
                          : "border-line bg-surface text-brand-700"
                      )}
                    >
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-semibold text-ink">
                        {point.name}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-[12px] text-muted">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        {point.address}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-[12px] text-muted">
                        <Clock className="h-3.5 w-3.5 shrink-0" />
                        {point.hours}
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {point.binTypes.map((bin) => (
                          <span
                            key={bin}
                            className="inline-flex items-center gap-1.5 rounded-full bg-page px-2.5 py-1 text-[11px] font-semibold text-muted"
                          >
                            <span
                              aria-hidden
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: binTypeMeta[bin].color }}
                            />
                            {binTypeMeta[bin].label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </SectionCard>

      <Card className="flex flex-wrap items-center gap-4 bg-brand-900 text-white">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/12">
          <Recycle className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-bold">
            Campus recycling drive — Fall 2026
          </p>
          <p className="mt-0.5 text-[12.5px] text-white/75">
            Collect 5 kg of recyclable waste from any drop-off point and earn a
            green campus badge.
          </p>
        </div>
        <Badge className="bg-white/12 text-white ring-white/25">
          Every Tuesday &amp; Friday
        </Badge>
      </Card>
    </div>
  );
}
