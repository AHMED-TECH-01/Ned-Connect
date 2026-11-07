import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  secondaryAction?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-card border border-dashed border-brand-200 bg-brand-50/60 px-6 py-14 text-center",
        className
      )}
    >
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-surface text-brand-600 ring-1 ring-brand-200">
        {icon}
      </span>
      <h3 className="mt-4 text-base font-bold text-ink">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted">
        {description}
      </p>
      {action || secondaryAction ? (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {action}
          {secondaryAction}
        </div>
      ) : null}
    </div>
  );
}
