import { cn } from "@/lib/utils";

export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  id?: string;
  disabled?: boolean;
  className?: string;
}

export function Switch({
  checked,
  onCheckedChange,
  label,
  id,
  disabled,
  className,
}: SwitchProps) {
  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 disabled:opacity-45",
        checked ? "bg-brand-600" : "bg-brand-200",
        className
      )}
    >
      <span
        className={cn(
          "inline-block h-5 w-5 transform rounded-full bg-white shadow-[0_1px_3px_rgba(4,39,27,0.3)] transition-transform duration-200",
          checked ? "translate-x-[22px]" : "translate-x-0.5"
        )}
      />
    </button>
  );
}

export interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  id?: string;
  className?: string;
}

export function Checkbox({
  checked,
  onCheckedChange,
  label,
  id,
  className,
}: CheckboxProps) {
  return (
    <input
      id={id}
      type="checkbox"
      aria-label={label}
      checked={checked}
      onChange={(event) => onCheckedChange(event.target.checked)}
      className={cn(
        "h-4 w-4 shrink-0 cursor-pointer rounded border-line text-brand-700 accent-brand-700",
        className
      )}
    />
  );
}
