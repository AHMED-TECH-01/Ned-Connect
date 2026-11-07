"use client";

import { useState } from "react";
import { BadgeCheck, GraduationCap } from "lucide-react";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { SmartImage } from "@/components/ui/SmartImage";
import { formatPkr } from "@/lib/utils";
import type { StudyMaterial } from "@/lib/types";

const conditionTone: Record<StudyMaterial["condition"], BadgeTone> = {
  New: "success",
  "Like New": "info",
  Good: "brand",
  Fair: "warning",
};

export function StudyMaterialCard({ material }: { material: StudyMaterial }) {
  const [open, setOpen] = useState(false);
  const [requested, setRequested] = useState(false);

  return (
    <>
      <article className="flex flex-col overflow-hidden rounded-card border border-line bg-surface shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-pop)]">
        <div className="relative">
          <SmartImage
            src={material.image}
            alt={material.title}
            className="h-44 w-full"
          />
          <span className="absolute left-3 top-3">
            <Badge tone={conditionTone[material.condition]}>
              {material.condition}
            </Badge>
          </span>
          <span className="absolute bottom-3 right-3 rounded-lg bg-brand-900 px-3 py-1.5 text-[13px] font-bold text-white shadow-[var(--shadow-card)]">
            {formatPkr(material.price)}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-brand-100 px-2 py-0.5 text-[11px] font-bold text-brand-800">
              {material.courseCode}
            </span>
            <span className="text-[11.5px] font-medium text-muted">
              {material.category}
            </span>
          </div>

          <h3 className="mt-2.5 text-[15px] font-bold leading-snug text-ink">
            {material.title}
          </h3>

          <div className="mt-3 flex-1 space-y-1.5 text-[12.5px] text-muted">
            <p className="flex items-center gap-2">
              <GraduationCap className="h-3.5 w-3.5 text-brand-500" aria-hidden />
              {material.department}
            </p>
            <p className="flex items-center gap-2">
              <BadgeCheck className="h-3.5 w-3.5 text-brand-500" aria-hidden />
              Seller: {material.seller}
            </p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            className="mt-5 w-full"
            onClick={() => setOpen(true)}
          >
            View details
          </Button>
        </div>
      </article>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={material.title}
        description={`${material.courseCode} · listed by ${material.seller}`}
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => setRequested(true)}
              disabled={requested}
            >
              {requested ? "Request sent" : "Request to buy"}
            </Button>
          </>
        }
      >
        <SmartImage
          src={material.image}
          alt={material.title}
          className="h-48 w-full rounded-xl"
        />
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge tone={conditionTone[material.condition]}>
            {material.condition}
          </Badge>
          <Badge tone="neutral">{material.department}</Badge>
          <Badge tone="brand">{formatPkr(material.price)}</Badge>
        </div>
        {requested ? (
          <p className="mt-4 rounded-xl border border-[#bbf7d0] bg-success-soft px-4 py-3 text-[13px] text-[#14532d]">
            Your request was sent to {material.seller}. You will be notified when
            they respond. (UI demo only.)
          </p>
        ) : (
          <p className="mt-4 text-[13px] leading-relaxed text-muted">
            Meet at the campus library or the department office to inspect the
            item before paying. Never share bank details over chat.
          </p>
        )}
      </Modal>
    </>
  );
}
