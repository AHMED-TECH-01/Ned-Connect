"use client";

import { Eye } from "lucide-react";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { categoryMeta } from "@/lib/mock-data";
import type { Report } from "@/lib/types";

export interface AdminReportTableProps {
  reports: Report[];
  onReview: (report: Report) => void;
}

export function AdminReportTable({ reports, onReview }: AdminReportTableProps) {
  return (
    <>
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[820px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-brand-50/60 text-[11.5px] font-bold uppercase tracking-[0.08em] text-muted">
              <th scope="col" className="px-5 py-3 font-bold">
                Report ID
              </th>
              <th scope="col" className="px-4 py-3 font-bold">
                Title
              </th>
              <th scope="col" className="px-4 py-3 font-bold">
                Reporter
              </th>
              <th scope="col" className="px-4 py-3 font-bold">
                Category
              </th>
              <th scope="col" className="px-4 py-3 font-bold">
                Submitted
              </th>
              <th scope="col" className="px-4 py-3 font-bold">
                Status
              </th>
              <th scope="col" className="px-5 py-3 text-right font-bold">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {reports.map((report) => (
              <tr
                key={report.id}
                className="transition-colors hover:bg-brand-50/50"
              >
                <td className="whitespace-nowrap px-5 py-4 text-[12.5px] font-semibold text-brand-700">
                  {report.id}
                </td>
                <td className="max-w-[260px] px-4 py-4">
                  <p className="truncate text-[13.5px] font-semibold text-ink">
                    {report.title}
                  </p>
                  <p className="mt-0.5 truncate text-[11.5px] text-muted">
                    {report.location}
                  </p>
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-[13px] text-muted">
                  {report.reporter}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-[13px] text-muted">
                  {categoryMeta[report.category].label}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-[13px] text-muted">
                  {report.submittedAt}
                </td>
                <td className="px-4 py-4">
                  <StatusBadge status={report.status} />
                </td>
                <td className="px-5 py-4 text-right">
                  <Button size="sm" onClick={() => onReview(report)}>
                    <Eye className="h-3.5 w-3.5" />
                    Review
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-line lg:hidden">
        {reports.map((report) => (
          <li key={report.id} className="px-5 py-4 sm:px-6">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-brand-600">
                  {report.id}
                </p>
                <p className="mt-1 text-[14px] font-semibold text-ink">
                  {report.title}
                </p>
                <p className="mt-0.5 text-[12px] text-muted">
                  {report.reporter} · {categoryMeta[report.category].label}
                </p>
              </div>
              <StatusBadge status={report.status} />
            </div>
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-[12px] text-muted">
                {report.submittedAt}
              </span>
              <Button size="sm" onClick={() => onReview(report)}>
                Review report
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
