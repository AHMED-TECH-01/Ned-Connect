import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "link";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[14px] font-bold transition-all duration-150 disabled:opacity-45 disabled:pointer-events-none select-none whitespace-nowrap";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-700 text-white shadow-[0_4px_20px_-4px_rgba(0,64,47,0.22)] hover:bg-brand-800 active:bg-brand-900",
  secondary:
    "bg-brand-100 text-brand-800 hover:bg-brand-200 active:bg-brand-300/70",
  outline:
    "border border-line bg-surface text-ink hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800",
  ghost: "text-muted hover:bg-brand-50 hover:text-brand-800",
  danger:
    "bg-danger text-white shadow-[0_2px_8px_rgba(220,38,38,0.2)] hover:bg-[#b91c1c]",
  link: "text-brand-700 underline-offset-4 hover:underline p-0 h-auto",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-6 text-[15px]",
  icon: "h-10 w-10",
};

export function buttonStyles(options?: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}): string {
  const { variant = "primary", size = "md", className } = options ?? {};
  return cn(base, variantStyles[variant], sizeStyles[size], className);
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  children,
  disabled,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={buttonStyles({ variant, size, className })}
      {...rest}
    >
      {loading ? (
        <span
          aria-hidden
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : null}
      {children}
    </button>
  );
}
