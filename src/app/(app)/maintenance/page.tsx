import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { MaintenanceWorkspace } from "@/components/modules/MaintenanceWorkspace";

export const metadata: Metadata = { title: "Maintenance & Complaints" };

export default function MaintenancePage() {
  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Campus module"
        title="Maintenance & Complaints"
        description="Report electrical, plumbing, furniture, AV or cleanliness problems on campus. Every complaint is tracked until it is closed."
      />
      <MaintenanceWorkspace />
    </div>
  );
}
