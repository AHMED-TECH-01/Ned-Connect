import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

const controlBase =
  "w-full rounded-[14px] border bg-surface px-4 text-[15px] text-ink placeholder:text-brand-300/60 transition-colors duration-150 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10 disabled:cursor-not-allowed disabled:bg-brand-50 disabled:text-muted";

export function fieldBorder(hasError?: boolean): string {
  return hasError
    ? "border-danger focus:border-danger focus:ring-danger/12"
    : "border-line hover:border-brand-200";
}

export interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
  labelClassName?: string;
}

export function FormField({
  label,
  htmlFor,
  hint,
  error,
  required,
  children,
  className,
  labelClassName,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {label ? (
        <label
          htmlFor={htmlFor}
          className={cn(
            "flex items-center gap-1",
            labelClassName ?? "text-[13px] font-semibold text-ink"
          )}
        >
          {label}
          {required ? <span className="text-danger">*</span> : null}
        </label>
      ) : null}
      {children}
      {error ? (
        <p className="flex items-center gap-1 text-xs font-medium text-danger">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export function Input({ className, invalid, ...rest }: InputProps) {
  return (
    <input
      className={cn(controlBase, fieldBorder(invalid), "h-11", className)}
      {...rest}
    />
  );
}

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export function Textarea({ className, invalid, ...rest }: TextareaProps) {
  return (
    <textarea
      className={cn(
        controlBase,
        fieldBorder(invalid),
        "min-h-[120px] resize-y py-2.5 leading-relaxed",
        className
      )}
      {...rest}
    />
  );
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

export function Select({ className, invalid, children, ...rest }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={cn(
          controlBase,
          fieldBorder(invalid),
          "h-11 appearance-none pr-9",
          className
        )}
        {...rest}
      >
        {children}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      >
        <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
