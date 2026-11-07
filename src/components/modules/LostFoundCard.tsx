"use client";

import { useState } from "react";
import { MapPin, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { SmartImage } from "@/components/ui/SmartImage";
import { cn } from "@/lib/utils";
import type { LostFoundItem } from "@/lib/types";

export interface LostFoundCardProps {
  item: LostFoundItem;
}

export function LostFoundCard({ item }: LostFoundCardProps) {
  const [open, setOpen] = useState(false);
  const isLost = item.kind === "lost";

  return (
    <>
      <div className="group overflow-hidden rounded-[24px] border border-line bg-surface shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
        {/* Item Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-page">
          <SmartImage
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-4 top-4">
            <Badge
              className={cn(
                "px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white border-0",
                isLost ? "bg-danger" : "bg-success"
              )}
            >
              {item.kind}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-brand-600">
              {item.category}
            </p>
            <h3 className="text-[17px] font-bold leading-tight text-ink line-clamp-1">
              {item.title}
            </h3>
            
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2 text-[13px] text-muted">
                <MapPin className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.location}</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-muted">
                <Calendar className="h-4 w-4 shrink-0" />
                <span>{item.date}</span>
              </div>
            </div>

            <div className="mt-2">
              <Button
                variant="outline"
                className="w-full h-11 rounded-xl border-line text-[14px] font-bold hover:bg-page hover:text-brand-700"
                onClick={() => setOpen(true)}
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={item.title}
        description={`${item.kind.toUpperCase()} · ${item.category}`}
        footer={
          <div className="flex w-full gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button className="flex-1 bg-brand-700 hover:bg-brand-800">
              Contact Reporter
            </Button>
          </div>
        }
      >
        <div className="space-y-5">
          <div className="aspect-video overflow-hidden rounded-2xl bg-page">
            <SmartImage
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted">Description</p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-ink">{item.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted">Location</p>
                <p className="mt-1 text-[14px] font-bold text-ink">{item.location}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted">Date</p>
                <p className="mt-1 text-[14px] font-bold text-ink">{item.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-page p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-bold">
                {item.contact.charAt(0)}
              </div>
              <div>
                <p className="text-[12px] font-medium text-muted leading-tight">Reported by</p>
                <p className="text-[14px] font-bold text-ink leading-tight">{item.contact}</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
