import { BRAND } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function BrandMark({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white",
        className
      )}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={BRAND.logo}
        alt={`${BRAND.university} logo`}
        width={size}
        height={size}
        className="h-full w-full object-contain"
      />
    </span>
  );
}

export interface WordmarkProps {
  size?: number;
  tone?: "light" | "dark";
  showTagline?: boolean;
  className?: string;
}

export function BrandWordmark({
  size = 40,
  tone = "dark",
  showTagline = false,
  className,
}: WordmarkProps) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <BrandMark size={size} />
      <span className="min-w-0">
        <span
          className={cn(
            "block truncate text-[15px] font-extrabold leading-tight tracking-tight",
            tone === "light" ? "text-white" : "text-ink"
          )}
        >
          {BRAND.name}
        </span>
        <span
          className={cn(
            "block truncate text-[11px] font-medium leading-tight",
            tone === "light" ? "text-brand-200" : "text-muted"
          )}
        >
          {showTagline ? BRAND.tagline : BRAND.university}
        </span>
      </span>
    </span>
  );
}
