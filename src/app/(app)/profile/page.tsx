import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProfileWorkspace } from "@/components/modules/ProfileWorkspace";

export const metadata: Metadata = { title: "Profile & Settings" };

export default function ProfilePage() {
  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="My activity"
        title="Profile & Settings"
        description="Manage your student profile, account security, notification preferences and privacy settings."
      />
      <ProfileWorkspace />
    </div>
  );
}
