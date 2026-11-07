import type { ChangeEvent } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search…",
  label,
  className,
}: SearchBarProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <Search
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        aria-hidden
      />
      <input
        type="search"
        aria-label={label}
        value={value}
        placeholder={placeholder}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.value)
        }
        className="h-11 w-full rounded-lg border border-line bg-surface pl-10 pr-3.5 text-sm text-ink placeholder:text-brand-300 transition-colors hover:border-brand-200 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/12"
      />
    </div>
  );
}

export interface SortControlProps {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  label: string;
  className?: string;
}

export function SortControl({
  value,
  options,
  onChange,
  label,
  className,
}: SortControlProps) {
  return (
    <div className={cn("relative", className)}>
      <SlidersHorizontal
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        aria-hidden
      />
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full appearance-none rounded-lg border border-line bg-surface pl-9 pr-8 text-[13px] font-semibold text-ink transition-colors hover:border-brand-200 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/12"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
