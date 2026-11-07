import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { statusMeta } from "@/lib/mock-data";
import type { ReportStatus } from "@/lib/types";

export type BadgeTone =
  | "neutral"
  | "brand"
  | "success"
  | "warning"
  | "danger"
  | "info";

const toneStyles: Record<BadgeTone, string> = {
  neutral: "bg-brand-50 text-muted ring-line",
  brand: "bg-brand-100 text-brand-800 ring-brand-200",
  success: "bg-success-soft text-[#166534] ring-[#bbf7d0]",
  warning: "bg-warning-soft text-[#92400e] ring-[#fde68a]",
  danger: "bg-danger-soft text-[#991b1b] ring-[#fecaca]",
  info: "bg-info-soft text-[#075985] ring-[#bae6fd]",
};

export interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  icon?: ReactNode;
  className?: string;
}

export function Badge({
  children,
  tone = "neutral",
  icon,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold ring-1 ring-inset",
        toneStyles[tone],
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}

export function StatusBadge({
  status,
  className,
}: {
  status: ReportStatus;
  className?: string;
}) {
  const meta = statusMeta[status];
  return (
    <Badge tone={meta.tone} className={className}>
      {meta.label}
    </Badge>
  );
}
