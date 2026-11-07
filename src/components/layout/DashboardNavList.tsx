"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardNav } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function DashboardNavList({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="Dashboard" className="flex flex-col gap-6">
      {dashboardNav.map((section) => (
        <div key={section.title}>
          <p className="px-3 text-[10.5px] font-extrabold uppercase tracking-[0.15em] text-brand-300/80">
            {section.title}
          </p>
          <ul className="mt-2 space-y-0.5">
            {section.items.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-semibold transition-colors duration-150",
                      active
                        ? "bg-white/14 text-white"
                        : "text-brand-200 hover:bg-white/[0.08] hover:text-white"
                    )}
                  >
                    {active ? (
                      <span
                        aria-hidden
                        className="absolute -left-3 top-1/2 h-7 w-1.5 -translate-y-1/2 rounded-r-full bg-brand-400"
                      />
                    ) : null}
                    <Icon
                      className="h-[18px] w-[18px] shrink-0"
                      strokeWidth={1.85}
                    />
                    <span className="truncate">{item.label}</span>
                    {item.badge ? (
                      <span
                        className={cn(
                          "ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold",
                          active
                            ? "bg-brand-400 text-[#00402F]"
                            : "bg-white/12 text-brand-100"
                        )}
                      >
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
