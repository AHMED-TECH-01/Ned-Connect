import Link from "next/link";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  action: string;
  href: string;
  iconBg: string;
  className?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  action,
  href,
  iconBg,
  className,
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col items-center justify-center rounded-[24px] border border-line bg-surface p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
        className
      )}
    >
      <div
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-full text-white shadow-inner transition-transform duration-300 group-hover:scale-110",
          iconBg
        )}
      >
        <Icon className="h-8 w-8" strokeWidth={2} />
      </div>
      <h3 className="mt-5 text-[18px] font-bold text-ink">{title}</h3>
      <span className="mt-2 inline-flex items-center gap-1.5 text-[14px] font-medium text-muted transition-colors group-hover:text-brand-700">
        {action}
      </span>
    </Link>
  );
}
