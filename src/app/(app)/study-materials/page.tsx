import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { StudyMaterialsBoard } from "@/components/modules/StudyMaterialsBoard";

export const metadata: Metadata = { title: "Study Materials" };

export default function StudyMaterialsPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Campus module"
        title="Affordable Study Materials"
        description="Textbooks, notes, lab manuals and past papers listed by fellow NED students — usually at a fraction of the bookshop price."
      />
      <StudyMaterialsBoard />
    </div>
  );
}
