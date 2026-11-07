import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { LostFoundBoard } from "@/components/modules/LostFoundBoard";

export const metadata: Metadata = { title: "Lost & Found" };

export default function LostFoundPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Campus module"
        title="Lost & Found"
        description="Report an item you have lost or hand in something you found. Every entry is logged with an ID so owners can be verified before handover."
      />
      <LostFoundBoard />
    </div>
  );
}
