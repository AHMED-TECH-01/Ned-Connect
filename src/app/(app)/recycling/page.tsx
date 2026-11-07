import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { RecyclingWorkspace } from "@/components/modules/RecyclingWorkspace";

export const metadata: Metadata = { title: "Recycling" };

export default function RecyclingPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Campus module"
        title="Recycling Locations & Waste Reporting"
        description="Find the nearest drop-off point for plastic, paper, glass, metal and e-waste, or report a bin that needs emptying."
      />
      <RecyclingWorkspace />
    </div>
  );
}
