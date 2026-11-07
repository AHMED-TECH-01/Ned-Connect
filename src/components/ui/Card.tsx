import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface CardProps {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}

export function Card({ children, className, padded = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-line bg-surface shadow-[var(--shadow-card)]",
        padded && "p-5 sm:p-6",
        className
      )}
    >
      {children}
    </div>
  );
}

export interface SectionCardProps {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}

export function SectionCard({
  title,
  description,
  action,
  children,
  className,
  bodyClassName,
}: SectionCardProps) {
  return (
    <Card padded={false} className={cn("overflow-hidden", className)}>
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
        <div>
          <h2 className="text-[15px] font-bold text-ink">{title}</h2>
          {description ? (
            <p className="mt-0.5 text-xs text-muted">{description}</p>
          ) : null}
        </div>
        {action}
      </div>
      <div className={cn("p-5 sm:p-6", bodyClassName)}>{children}</div>
    </Card>
  );
}

export function IconTile({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700",
        className
      )}
    >
      {children}
    </span>
  );
}
