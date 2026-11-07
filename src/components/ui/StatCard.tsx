import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type StatTone = "blue" | "yellow" | "green" | "purple";

const toneStyles: Record<StatTone, string> = {
  blue: "bg-[#E0F2FE] text-[#0284C7]",
  yellow: "bg-[#FEF3C7] text-[#D97706]",
  green: "bg-[#DCFCE7] text-[#16A34A]",
  purple: "bg-[#EEF2FF] text-[#4F46E5]",
};

export interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  tone?: StatTone;
  className?: string;
}

export function StatCard({
  label,
  value,
  icon,
  tone = "blue",
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-[20px] border border-line bg-surface p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5",
        className
      )}
    >
      <div
        className={cn(
          "flex h-14 w-14 shrink-0 items-center justify-center rounded-[16px]",
          toneStyles[tone]
        )}
      >
        <span className="scale-110">{icon}</span>
      </div>
      <div className="min-w-0">
        <p className="text-[14px] font-bold text-ink truncate">{label}</p>
        <p className="mt-0.5 text-[13px] font-medium text-muted truncate">
          {value}
        </p>
      </div>
    </div>
  );
}
