import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { AdminDashboard } from "@/components/modules/AdminDashboard";

export const metadata: Metadata = { title: "Admin Panel" };

export default function AdminPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Administration"
        title="Admin Panel"
        description="Review every report raised across campus, filter the queue by module and status, and move items through to resolution."
      />
      <AdminDashboard />
    </div>
  );
}
