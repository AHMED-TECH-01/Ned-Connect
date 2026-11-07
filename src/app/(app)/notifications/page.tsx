import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { NotificationsBoard } from "@/components/modules/NotificationsBoard";

export const metadata: Metadata = { title: "Notifications" };

export default function NotificationsPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="My activity"
        title="Notifications"
        description="Everything that needs your attention — report status changes, possible lost-item matches and campus announcements."
      />
      <NotificationsBoard />
    </div>
  );
}
