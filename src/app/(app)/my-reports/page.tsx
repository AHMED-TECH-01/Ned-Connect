import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { MyReportsBoard } from "@/components/modules/MyReportsBoard";

export const metadata: Metadata = { title: "My Reports" };

export default function MyReportsPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="My activity"
        title="My Reports"
        description="Track every report you have submitted — maintenance complaints, lost items, recycling requests and material listings."
      />
      <MyReportsBoard />
    </div>
  );
}
