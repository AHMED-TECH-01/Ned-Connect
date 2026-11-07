"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  ClipboardList,
  Clock,
  FileSearch,
  Recycle,
} from "lucide-react";
import { useMockLoading } from "@/hooks/useMockLoading";
import { ReportTable } from "@/components/modules/ReportTable";
import { Alert } from "@/components/ui/Alert";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterChips } from "@/components/ui/FilterChips";
import { Modal } from "@/components/ui/Modal";
import { SearchBar } from "@/components/ui/SearchBar";
import { SkeletonStatGrid, SkeletonTableRows } from "@/components/ui/Skeleton";
import { StatCard } from "@/components/ui/StatCard";
import { categoryMeta, reports, statusMeta } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { Report, ReportStatus } from "@/lib/types";

const statusTabs: { value: ReportStatus | "all"; label: string }[] = [
  { value: "all", label: "All reports" },
  { value: "pending", label: "Pending" },
  { value: "in-progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
  { value: "rejected", label: "Rejected" },
];

const categoryFilters = [
  "All categories",
  ...Object.values(categoryMeta).map((meta) => meta.label),
];

export function MyReportsBoard() {
  const loading = useMockLoading();
  const [status, setStatus] = useState<ReportStatus | "all">("all");
  const [category, setCategory] = useState("All categories");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Report | null>(null);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return reports.filter((report) => {
      const matchesStatus = status === "all" || report.status === status;
      const matchesCategory =
        category === "All categories" ||
        categoryMeta[report.category].label === category;
      const matchesQuery =
        !search ||
        report.title.toLowerCase().includes(search) ||
        report.id.toLowerCase().includes(search) ||
        report.location.toLowerCase().includes(search);
      return matchesStatus && matchesCategory && matchesQuery;
    });
  }, [status, category, query]);

  const open = reports.filter(
    (report) => report.status === "pending" || report.status === "in-progress"
  ).length;
  const resolved = reports.filter((r) => r.status === "resolved").length;
  const recycling = reports.filter((r) => r.category === "recycling").length;

  const stats = [
    {
      label: "Total reports",
      value: reports.length,
      icon: <ClipboardList className="h-5 w-5" />,
      tone: "blue" as const,
    },
    {
      label: "Open",
      value: open,
      icon: <Clock className="h-5 w-5" />,
      tone: "yellow" as const,
    },
    {
      label: "Resolved",
      value: resolved,
      icon: <CheckCircle2 className="h-5 w-5" />,
      tone: "green" as const,
    },
    {
      label: "Recycling reports",
      value: recycling,
      icon: <Recycle className="h-5 w-5" />,
      tone: "purple" as const,
    },
  ];

  function resetFilters() {
    setStatus("all");
    setCategory("All categories");
    setQuery("");
  }

  return (
    <div className="space-y-6">
      {loading ? <SkeletonStatGrid /> : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      )}

      <SectionCard
        title="Your reports"
        description="Every issue, lost item and listing you have submitted"
        action={
          <Badge tone="brand">
            {filtered.length} of {reports.length} shown
          </Badge>
        }
        bodyClassName="p-0"
      >
        <div className="space-y-4 border-b border-line px-5 py-4 sm:px-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <SearchBar
              label="Search reports"
              value={query}
              onChange={setQuery}
              placeholder="Search by title, ID or location…"
              className="lg:max-w-md"
            />
            <div className="flex flex-wrap items-center gap-2">
              {query || category !== "All categories" || status !== "all" ? (
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  Clear filters
                </Button>
              ) : null}
              <Button variant="outline" size="sm">
                Export CSV
              </Button>
            </div>
          </div>

          <div
            role="group"
            aria-label="Filter reports by status"
            className="scrollbar-hide -mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
          >
            {statusTabs.map((tab) => {
              const isActive = tab.value === status;
              const count =
                tab.value === "all"
                  ? reports.length
                  : reports.filter((report) => report.status === tab.value).length;
              return (
                <button
                  key={tab.value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setStatus(tab.value)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-colors",
                    isActive
                      ? "border-brand-700 bg-brand-700 text-white"
                      : "border-line bg-surface text-muted hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
                  )}
                >
                  {tab.label}
                  <span
                    className={cn(
                      "rounded-full px-1.5 text-[11px] font-bold",
                      isActive ? "bg-white/20 text-white" : "bg-page text-muted"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="border-t border-line pt-4">
            <FilterChips
              label="Filter reports by category"
              options={categoryFilters}
              value={category}
              onChange={setCategory}
            />
          </div>
        </div>

        {loading ? (
          <SkeletonTableRows rows={6} columns={6} />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<FileSearch className="h-6 w-6" />}
            title="No reports match these filters"
            description="Nothing here for this combination of status, category and search. Clear the filters to see all of your reports."
            action={<Button onClick={resetFilters}>Clear filters</Button>}
            className="m-5 border-0 bg-transparent sm:m-6"
          />
        ) : (
          <ReportTable reports={filtered} onView={setActive} />
        )}
      </SectionCard>

      <Modal
        open={Boolean(active)}
        onClose={() => setActive(null)}
        title={active ? active.title : ""}
        description={active ? `${active.id} · ${active.location}` : undefined}
        footer={
          <>
            <Button variant="outline" onClick={() => setActive(null)}>
              Close
            </Button>
            <Button>Add a comment</Button>
          </>
        }
      >
        {active ? (
          <div className="space-y-4">
            <Alert tone="info" title="This is a front-end demo">
              Report details below are mock data. No server request is made.
            </Alert>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={active.status} />
              <Badge tone="neutral">
                {categoryMeta[active.category].label}
              </Badge>
              <Badge tone="brand">
                {statusMeta[active.status].label} status
              </Badge>
            </div>
            <dl className="grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-muted">
                  Submitted
                </dt>
                <dd className="mt-1 text-[13.5px] font-semibold text-ink">
                  {active.submittedAt}
                </dd>
              </div>
              <div>
                <dt className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-muted">
                  Priority
                </dt>
                <dd className="mt-1 text-[13.5px] font-semibold capitalize text-ink">
                  {active.priority}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-muted">
                  Location
                </dt>
                <dd className="mt-1 text-[13.5px] font-semibold text-ink">
                  {active.location}
                </dd>
              </div>
            </dl>
            <div>
              <p className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-muted">
                Description
              </p>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
                {active.description}
              </p>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
