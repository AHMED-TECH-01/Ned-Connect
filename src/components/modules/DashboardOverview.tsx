"use client";

import Link from "next/link";
import {
  BookOpen,
  Recycle,
  SearchCheck,
  Wrench,
  Clock,
  ChevronRight,
} from "lucide-react";
import { useMockLoading } from "@/hooks/useMockLoading";
import { StatusBadge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SkeletonList, SkeletonStatGrid } from "@/components/ui/Skeleton";
import { StatCard } from "@/components/ui/StatCard";
import { categoryMeta, reports } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const quickActions = [
  {
    label: "Report Lost Item",
    href: "/lost-found",
    icon: SearchCheck,
    bg: "bg-blue-50 text-blue-600",
  },
  {
    label: "Report Found Item",
    href: "/lost-found",
    icon: SearchCheck,
    bg: "bg-blue-50 text-blue-600",
  },
  {
    label: "Submit Maintenance",
    href: "/maintenance",
    icon: Wrench,
    bg: "bg-orange-50 text-orange-600",
  },
  {
    label: "List Study Material",
    href: "/study-materials",
    icon: BookOpen,
    bg: "bg-indigo-50 text-indigo-600",
  },
  {
    label: "Report Waste",
    href: "/recycling",
    icon: Recycle,
    bg: "bg-green-50 text-green-600",
  },
];

export function DashboardOverview() {
  const loading = useMockLoading();

  const stats = [
    { label: "Lost & Found", value: "2 new items", icon: <SearchCheck className="h-6 w-6" />, tone: "blue" as const },
    { label: "Maintenance", value: "3 pending reports", icon: <Wrench className="h-6 w-6" />, tone: "yellow" as const },
    { label: "Study Materials", value: "5 new listings", icon: <BookOpen className="h-6 w-6" />, tone: "purple" as const },
    { label: "Recycling", value: "1 new update", icon: <Recycle className="h-6 w-6" />, tone: "green" as const },
  ];

  const recent = [...reports].slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Page Title & Date */}
      <div>
        <h1 className="text-[30px] font-black tracking-tight text-ink sm:text-[36px]">
          Welcome back, Ahmed!
        </h1>
        <p className="mt-2 text-[15px] font-medium text-muted">
          {new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date("2026-10-29"))}
        </p>
      </div>

      {/* Stats Grid */}
      {loading ? <SkeletonStatGrid /> : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        {/* Recent Activity */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-bold text-ink">Recent Activity</h2>
            <Link
              href="/my-reports"
              className="inline-flex items-center gap-1 text-[13px] font-bold text-brand-700 hover:underline"
            >
              View all
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <Card padded={false} className="overflow-hidden border-line/60">
            {loading ? (
              <SkeletonList count={4} />
            ) : (
              <ul className="divide-y divide-line/60">
                {recent.map((report) => (
                  <li
                    key={report.id}
                    className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-page/50 sm:px-6"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-100">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[14.5px] font-bold text-ink">
                        {report.title}
                      </p>
                      <p className="mt-0.5 text-[12.5px] font-medium text-muted">
                        {report.submittedAt} · {categoryMeta[report.category].label}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <StatusBadge status={report.status} />
                      <ChevronRight className="h-4 w-4 text-muted/40 transition-colors group-hover:text-muted" />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-[18px] font-bold text-ink">Quick Actions</h2>
          <div className="grid gap-3">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="group flex items-center gap-4 rounded-2xl border border-line/60 bg-surface p-4 shadow-sm transition-all hover:border-brand-200 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", action.bg)}>
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="flex-1 text-[14.5px] font-bold text-ink">
                  {action.label}
                </span>
                <ChevronRight className="h-4 w-4 text-muted/40 transition-colors group-hover:text-brand-600" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
