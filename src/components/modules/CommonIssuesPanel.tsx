"use client";

import { TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { commonIssues } from "@/lib/mock-data";

export interface CommonIssuesPanelProps {
  onSelectIssue: (issueType: string) => void;
  issueMap: string[];
}

export function CommonIssuesPanel({
  onSelectIssue,
  issueMap,
}: CommonIssuesPanelProps) {
  const max = Math.max(...commonIssues.map((issue) => issue.count));

  return (
    <Card padded={false} className="overflow-hidden">
      <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
        <div>
          <h2 className="text-[15px] font-bold text-ink">Common issues</h2>
          <p className="mt-0.5 text-xs text-muted">
            Most reported problems this month
          </p>
        </div>
        <Badge tone="brand" icon={<TrendingUp className="h-3 w-3" />}>
          Live
        </Badge>
      </div>

      <ul className="divide-y divide-line">
        {commonIssues.map((issue, index) => {
          const percentage = Math.round((issue.count / max) * 100);
          return (
            <li key={issue.id} className="px-5 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[13.5px] font-semibold text-ink">
                    {issue.label}
                  </p>
                  <p className="mt-0.5 text-[11.5px] text-muted">
                    {issue.location} · {issue.count} reports
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectIssue(issueMap[index] ?? issueMap[0])}
                  className="shrink-0 rounded-lg px-2.5 py-1.5 text-[11.5px] font-semibold text-brand-700 transition-colors hover:bg-brand-50"
                >
                  Report this
                </button>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-brand-100">
                <div
                  className="h-full rounded-full bg-brand-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <p className="border-t border-line px-5 py-3.5 text-[11.5px] text-muted">
        Selecting an issue pre-fills the complaint form on the left.
      </p>
    </Card>
  );
}
