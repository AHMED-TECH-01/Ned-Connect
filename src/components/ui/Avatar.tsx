import { cn } from "@/lib/utils";

export interface AvatarProps {
  initials: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeStyles = {
  sm: "h-8 w-8 text-[11px]",
  md: "h-10 w-10 text-xs",
  lg: "h-14 w-14 text-base",
  xl: "h-20 w-20 text-xl",
};

export function Avatar({
  initials,
  name,
  size = "md",
  className,
}: AvatarProps) {
  return (
    <span
      aria-label={name}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-brand-700 font-bold text-white ring-2 ring-white/20",
        sizeStyles[size],
        className
      )}
    >
      {initials}
    </span>
  );
}
