import type { ReactNode } from "react";
import Link from "next/link";
import { Compass, Lock, ServerCrash, type LucideIcon } from "lucide-react";
import { BrandWordmark } from "@/components/layout/Brand";
import { buttonStyles } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export type ErrorTone = "brand" | "warning" | "danger";

const tones: Record<
  ErrorTone,
  { code: string; icon: LucideIcon; tile: string; glow: string }
> = {
  brand: {
    code: "text-brand-700",
    icon: Compass,
    tile: "bg-brand-100 text-brand-700",
    glow: "bg-brand-200/50",
  },
  warning: {
    code: "text-warning",
    icon: Lock,
    tile: "bg-warning-soft text-[#b45309]",
    glow: "bg-warning/25",
  },
  danger: {
    code: "text-danger",
    icon: ServerCrash,
    tile: "bg-danger-soft text-danger",
    glow: "bg-danger/20",
  },
};

export interface ErrorStateProps {
  code: string;
  title: string;
  description: string;
  tone?: ErrorTone;
  /** Buttons or links rendered under the description. */
  actions?: ReactNode;
  /** Extra informational list rendered under the actions. */
  helpItems?: string[];
  className?: string;
}

export function ErrorState({
  code,
  title,
  description,
  tone = "brand",
  actions,
  helpItems,
  className,
}: ErrorStateProps) {
  const config = tones[tone];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col overflow-hidden bg-page",
        className
      )}
    >
      <div aria-hidden className="grid-lines absolute inset-0 opacity-50" />
      <div
        aria-hidden
        className={cn(
          "absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl",
          config.glow
        )}
      />

      <div className="relative z-10 flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="NED Campus Connect home">
          <BrandWordmark size={38} />
        </Link>
      </div>

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
        <div className="animate-fade-up w-full max-w-lg text-center">
          <span
            className={cn(
              "mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl",
              config.tile
            )}
          >
            <Icon className="h-7 w-7" strokeWidth={1.8} />
          </span>

          <p
            className={cn(
              "mt-6 text-[64px] font-extrabold leading-none tracking-tighter sm:text-[80px]",
              config.code
            )}
          >
            {code}
          </p>
          <h1 className="mt-3 text-[26px] font-extrabold tracking-tight text-ink sm:text-[30px]">
            {title}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
            {description}
          </p>

          {helpItems && helpItems.length > 0 ? (
            <ul className="mx-auto mt-6 max-w-sm space-y-2 text-left">
              {helpItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 rounded-lg border border-line bg-surface px-3.5 py-2.5 text-[13px] text-muted"
                >
                  <span
                    aria-hidden
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"
                  />
                  {item}
                </li>
              ))}
            </ul>
          ) : null}

          {actions ? (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {actions}
            </div>
          ) : null}

          <p className="mt-10 text-xs text-muted">
            Error reference {code} · NED Campus Connect support
          </p>
        </div>
      </main>
    </div>
  );
}

export function HomeLink({ label = "Back to home" }: { label?: string }) {
  return (
    <Link href="/" className={buttonStyles({ variant: "outline", size: "lg" })}>
      {label}
    </Link>
  );
}

export function DashboardLink({
  label = "Go to dashboard",
}: {
  label?: string;
}) {
  return (
    <Link
      href="/dashboard"
      className={buttonStyles({ variant: "primary", size: "lg" })}
    >
      {label}
    </Link>
  );
}
