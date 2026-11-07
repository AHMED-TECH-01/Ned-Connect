import type { ReactNode } from "react";
import {
  CheckCircle2,
  Info,
  TriangleAlert,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type AlertTone = "success" | "error" | "warning" | "info";

const toneStyles: Record<AlertTone, { wrap: string; icon: LucideIcon }> = {
  success: {
    wrap: "border-[#bbf7d0] bg-success-soft text-[#14532d]",
    icon: CheckCircle2,
  },
  error: { wrap: "border-[#fecaca] bg-danger-soft text-[#7f1d1d]", icon: XCircle },
  warning: {
    wrap: "border-[#fde68a] bg-warning-soft text-[#78350f]",
    icon: TriangleAlert,
  },
  info: { wrap: "border-[#bae6fd] bg-info-soft text-[#0c4a6e]", icon: Info },
};

export interface AlertProps {
  tone: AlertTone;
  title?: string;
  children?: ReactNode;
  className?: string;
}

export function Alert({ tone, title, children, className }: AlertProps) {
  const { wrap, icon: Icon } = toneStyles[tone];
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-3 rounded-xl border px-4 py-3",
        wrap,
        className
      )}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <div className="min-w-0 text-sm">
        {title ? <p className="font-semibold">{title}</p> : null}
        {children ? (
          <div className={cn("leading-relaxed", title && "mt-0.5 opacity-90")}>
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
}
