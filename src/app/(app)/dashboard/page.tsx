import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { DashboardOverview } from "@/components/modules/DashboardOverview";
import { buttonStyles } from "@/components/ui/Button";
import { currentStudent } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Dashboard" };

const today = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(new Date("2026-10-29"));

export default function DashboardPage() {
  const firstName = currentStudent.name.split(" ")[0];

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Student dashboard"
        title={`Welcome back, ${firstName}`}
        description={`${today} · ${currentStudent.department} · ${currentStudent.studentId}`}
        actions={
          <>
            <Link
              href="/my-reports"
              className={buttonStyles({ variant: "outline" })}
            >
              My reports
            </Link>
            <Link
              href="/maintenance"
              className={buttonStyles({ variant: "primary" })}
            >
              <Plus className="h-4 w-4" />
              New complaint
            </Link>
          </>
        }
      />
      <DashboardOverview />
    </div>
  );
}
