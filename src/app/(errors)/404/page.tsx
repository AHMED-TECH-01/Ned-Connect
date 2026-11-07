import type { Metadata } from "next";
import {
  DashboardLink,
  ErrorState,
  HomeLink,
} from "@/components/layout/ErrorState";

export const metadata: Metadata = { title: "Page Not Found" };

export default function NotFoundPage() {
  return (
    <ErrorState
      code="404"
      tone="brand"
      title="Page Not Found"
      description="The page you are looking for may have been moved, renamed, or it never existed. Check the address or head back to a known page."
      helpItems={[
        "Verify the URL for typos before trying again.",
        "Use the campus modules from your dashboard to find what you need.",
      ]}
      actions={
        <>
          <HomeLink />
          <DashboardLink label="Go to dashboard" />
        </>
      }
    />
  );
}
