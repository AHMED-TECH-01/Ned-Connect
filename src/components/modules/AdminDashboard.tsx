"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  ClipboardList,
  Clock,
  Inbox,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { useMockLoading } from "@/hooks/useMockLoading";
import { AdminReportTable } from "@/components/modules/AdminReportTable";
import { Alert } from "@/components/ui/Alert";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, SectionCard } from "@/components/ui/Card";
import { FilterChips } from "@/components/ui/FilterChips";
import { FormField, Select, Textarea } from "@/components/ui/Input";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { SearchBar } from "@/components/ui/SearchBar";
import { SkeletonStatGrid, SkeletonTableRows } from "@/components/ui/Skeleton";
import { StatCard } from "@/components/ui/StatCard";
import { adminReports, categoryMeta } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { Report, ReportStatus } from "@/lib/types";

const categoryFilters = [
  "All categories",
  ...Object.values(categoryMeta).map((meta) => meta.label),
];

const statusFilters: (ReportStatus | "all")[] = [
  "all",
  "pending",
  "in-progress",
  "resolved",
  "rejected",
];

const statusFilterLabels: Record<ReportStatus | "all", string> = {
  all: "All statuses",
  pending: "Pending",
  "in-progress": "In Progress",
  resolved: "Resolved",
  rejected: "Rejected",
};

const statusBar: Record<ReportStatus, string> = {
  pending: "bg-warning",
  "in-progress": "bg-info",
  resolved: "bg-success",
  rejected: "bg-danger",
};

const statusOrder: ReportStatus[] = [
  "pending",
  "in-progress",
  "resolved",
  "rejected",
];

export function AdminDashboard() {
  const loading = useMockLoading();
  const [rows, setRows] = useState<Report[]>(adminReports);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [status, setStatus] = useState<ReportStatus | "all">("all");
  const [reviewing, setReviewing] = useState<Report | null>(null);
  const [draftStatus, setDraftStatus] = useState<ReportStatus>("pending");
  const [note, setNote] = useState("");
  const [updated, setUpdated] = useState(false);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return rows.filter((report) => {
      const matchesQuery =
        !search ||
        report.title.toLowerCase().includes(search) ||
        report.id.toLowerCase().includes(search) ||
        report.reporter.toLowerCase().includes(search);
      const matchesCategory =
        category === "All categories" ||
        categoryMeta[report.category].label === category;
      const matchesStatus = status === "all" || report.status === status;
      return matchesQuery && matchesCategory && matchesStatus;
    });
  }, [rows, query, category, status]);

  const pending = rows.filter((r) => r.status === "pending").length;
  const inProgress = rows.filter((r) => r.status === "in-progress").length;
  const resolved = rows.filter((r) => r.status === "resolved").length;

  const stats = [
    {
      label: "Total reports",
      value: rows.length,
      icon: <ClipboardList className="h-5 w-5" />,
      tone: "blue" as const,
    },
    {
      label: "Awaiting action",
      value: pending,
      icon: <Inbox className="h-5 w-5" />,
      tone: "yellow" as const,
    },
    {
      label: "In progress",
      value: inProgress,
      icon: <Clock className="h-5 w-5" />,
      tone: "purple" as const,
    },
    {
      label: "Resolved",
      value: resolved,
      icon: <CheckCircle2 className="h-5 w-5" />,
      tone: "green" as const,
    },
  ];

  function openReview(report: Report) {
    setReviewing(report);
    setDraftStatus(report.status);
    setNote("");
    setUpdated(false);
  }

  function updateStatus() {
    if (!reviewing) return;
    setRows((previous) =>
      previous.map((report) =>
        report.id === reviewing.id ? { ...report, status: draftStatus } : report
      )
    );
    setReviewing((previous) =>
      previous ? { ...previous, status: draftStatus } : previous
    );
    setUpdated(true);
  }

  function resetFilters() {
    setQuery("");
    setCategory("All categories");
    setStatus("all");
  }

  return (
    <div className="space-y-6">
      <Alert tone="info" title="Administration demo">
        This panel uses mock campus data. Status changes update the table on this
        screen only — no server request is made.
      </Alert>

      {loading ? <SkeletonStatGrid /> : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <SectionCard
          title="Report management"
          description="Review, assign and resolve reports raised by students"
          action={<Badge tone="brand">{filtered.length} shown</Badge>}
          bodyClassName="p-0"
        >
          <div className="space-y-4 border-b border-line px-5 py-4 sm:px-6">
            <SearchBar
              label="Search reports"
              value={query}
              onChange={setQuery}
              placeholder="Search by ID, title or reporter…"
            />
            <div className="border-t border-line pt-4">
              <FilterChips
                label="Filter reports by category"
                options={categoryFilters}
                value={category}
                onChange={setCategory}
              />
            </div>
            <div
              role="group"
              aria-label="Filter reports by status"
              className="scrollbar-hide -mx-1 flex gap-2 overflow-x-auto px-1"
            >
              {statusFilters.map((value) => {
                const isActive = value === status;
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setStatus(value)}
                    className={cn(
                      "shrink-0 rounded-full border px-3.5 py-2 text-[12.5px] font-semibold transition-colors",
                      isActive
                        ? "border-brand-700 bg-brand-700 text-white"
                        : "border-line bg-surface text-muted hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
                    )}
                  >
                    {statusFilterLabels[value]}
                  </button>
                );
              })}
            </div>
          </div>

          {loading ? (
            <SkeletonTableRows rows={7} columns={6} />
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={<Inbox className="h-6 w-6" />}
              title="No reports found"
              description="No reports match this search and filter combination. Clear the filters to review the full queue."
              action={<Button onClick={resetFilters}>Clear filters</Button>}
              className="m-5 border-0 bg-transparent sm:m-6"
            />
          ) : (
            <AdminReportTable reports={filtered} onReview={openReview} />
          )}
        </SectionCard>

        <div className="space-y-6">
          <Card>
            <h2 className="text-[15px] font-bold text-ink">Queue breakdown</h2>
            <p className="mt-0.5 text-xs text-muted">
              Distribution of {rows.length} reports by status
            </p>
            <ul className="mt-5 space-y-4">
              {statusOrder.map((value) => {
                const count = rows.filter((r) => r.status === value).length;
                const percentage = Math.round((count / rows.length) * 100);
                return (
                  <li key={value}>
                    <div className="flex items-center justify-between gap-3">
                      <StatusBadge status={value} />
                      <span className="text-[12.5px] font-semibold text-muted">
                        {count} · {percentage}%
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-brand-100">
                      <div
                        className={cn("h-full rounded-full", statusBar[value])}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>

          <Card>
            <h2 className="text-[15px] font-bold text-ink">Category load</h2>
            <p className="mt-0.5 text-xs text-muted">
              Reports per campus module
            </p>
            <ul className="mt-4 space-y-3 text-[13px]">
              {Object.entries(categoryMeta).map(([key, meta]) => {
                const count = rows.filter((r) => r.category === key).length;
                return (
                  <li
                    key={key}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="text-muted">{meta.label}</span>
                    <span className="font-semibold text-ink">{count}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-line bg-page px-4 py-3">
              <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <p className="text-[12px] leading-relaxed text-muted">
                Maintenance complaints are the highest volume this month.
                Consider a preventive inspection of the academic block.
              </p>
            </div>
          </Card>

          <Card className="bg-brand-900 text-white">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/12">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[13.5px] font-bold">Admin access</p>
                <p className="mt-0.5 text-[12.5px] leading-relaxed text-white/75">
                  Only campus administration staff can review and change report
                  statuses.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Modal
        open={Boolean(reviewing)}
        onClose={() => setReviewing(null)}
        title={reviewing ? reviewing.title : ""}
        description={
          reviewing
            ? `${reviewing.id} · reported by ${reviewing.reporter}`
            : undefined
        }
        footer={
          <>
            <Button variant="outline" onClick={() => setReviewing(null)}>
              Close
            </Button>
            <Button onClick={updateStatus} disabled={updated}>
              {updated ? "Status updated" : "Update status"}
            </Button>
          </>
        }
      >
        {reviewing ? (
          <div className="space-y-4">
            {updated ? (
              <Alert tone="success" title="Status updated">
                The report now shows as{" "}
                {statusFilters
                  .filter((value): value is ReportStatus => value !== "all")
                  .includes(draftStatus)
                  ? statusFilterLabels[draftStatus]
                  : draftStatus}
                . The reporting student would be notified in the full product.
              </Alert>
            ) : null}

            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={reviewing.status} />
              <Badge tone="neutral">
                {categoryMeta[reviewing.category].label}
              </Badge>
              <Badge tone="brand">{reviewing.location}</Badge>
            </div>

            <div className="rounded-xl border border-line bg-page p-4">
              <p className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-muted">
                Description
              </p>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink">
                {reviewing.description}
              </p>
            </div>

            <FormField label="Set status" htmlFor="admin-status">
              <Select
                id="admin-status"
                value={draftStatus}
                onChange={(event) =>
                  setDraftStatus(event.target.value as ReportStatus)
                }
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </Select>
            </FormField>

            <FormField
              label="Internal note"
              htmlFor="admin-note"
              hint="Visible to campus staff only."
            >
              <Textarea
                id="admin-note"
                value={note}
                placeholder="Add context for the maintenance team…"
                onChange={(event) => setNote(event.target.value)}
              />
            </FormField>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
