import { cn } from "@/lib/utils";

export interface FilterChipsProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  className?: string;
}

export function FilterChips({
  options,
  value,
  onChange,
  label,
  className,
}: FilterChipsProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "scrollbar-hide -mx-1 flex gap-2 overflow-x-auto px-1 py-0.5",
        className
      )}
    >
      {options.map((option) => {
        const active = option === value;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option)}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-colors duration-150",
              active
                ? "border-brand-700 bg-brand-700 text-white"
                : "border-line bg-surface text-muted hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
