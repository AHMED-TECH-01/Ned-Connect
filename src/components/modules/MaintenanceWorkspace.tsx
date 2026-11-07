"use client";

import { useMemo, useState } from "react";
import { ClipboardList, Wrench } from "lucide-react";
import { useMockLoading } from "@/hooks/useMockLoading";
import { CommonIssuesPanel } from "@/components/modules/CommonIssuesPanel";
import { ComplaintForm } from "@/components/modules/ComplaintForm";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonList } from "@/components/ui/Skeleton";
import { issueTypes, reports } from "@/lib/mock-data";
import type { Report } from "@/lib/types";

export function MaintenanceWorkspace() {
  const loading = useMockLoading();
  const [prefillIssue, setPrefillIssue] = useState<string | undefined>();
  const initial = useMemo(
    () => reports.filter((report) => report.category === "maintenance"),
    []
  );
  const [complaints, setComplaints] = useState<Report[]>(initial);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr] lg:items-start">
        <ComplaintForm
          prefillIssue={prefillIssue}
          onSubmitted={({ title, location }) => {
            setComplaints((previous) => [
              {
                id: `RPT-${Math.floor(Math.random() * 400 + 2430)}`,
                title,
                category: "maintenance",
                status: "pending",
                priority: "medium",
                location,
                submittedAt: "2026-10-29",
                description: title,
                reporter: "Ahmed Raza",
              },
              ...previous,
            ]);
          }}
        />

        <div className="space-y-6">
          <CommonIssuesPanel
            onSelectIssue={(issueType) => {
              setPrefillIssue(issueType);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            issueMap={issueTypes}
          />
        </div>
      </div>

      <SectionCard
        title="My complaints"
        description="Maintenance and repair requests you have filed"
        action={
          <Button variant="outline" size="sm">
            Export list
          </Button>
        }
        bodyClassName="p-0"
      >
        {loading ? (
          <SkeletonList count={4} />
        ) : complaints.length === 0 ? (
          <EmptyState
            icon={<Wrench className="h-6 w-6" />}
            title="No complaints yet"
            description="When you submit a maintenance complaint it will appear here with a live status badge."
            className="m-5 border-0 bg-transparent sm:m-6"
          />
        ) : (
          <ul className="divide-y divide-line">
            {complaints.map((complaint) => (
              <li
                key={complaint.id}
                className="flex flex-wrap items-start gap-4 px-5 py-4 transition-colors hover:bg-brand-50/60 sm:px-6"
              >
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                  <ClipboardList className="h-4 w-4" strokeWidth={1.85} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-semibold text-ink">
                    {complaint.title}
                  </p>
                  <p className="mt-0.5 text-[12px] text-muted">
                    {complaint.id} · {complaint.location} ·{" "}
                    {complaint.submittedAt}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-page px-2.5 py-1 text-[11px] font-semibold capitalize text-muted">
                    {complaint.priority} priority
                  </span>
                  <StatusBadge status={complaint.status} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>
    </div>
  );
}
