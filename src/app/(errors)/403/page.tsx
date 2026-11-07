import type { Metadata } from "next";
import Link from "next/link";
import {
  ErrorState,
  HomeLink,
} from "@/components/layout/ErrorState";
import { buttonStyles } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Access Denied" };

export default function ForbiddenPage() {
  return (
    <ErrorState
      code="403"
      tone="warning"
      title="Access Denied"
      description="Your student account does not have permission to open this area. Administrative screens are restricted to campus staff."
      helpItems={[
        "If you believe you should have access, contact Student Affairs.",
        "You can continue using the student modules from your dashboard.",
      ]}
      actions={
        <>
          <Link
            href="/dashboard"
            className={buttonStyles({ variant: "primary", size: "lg" })}
          >
            Back to dashboard
          </Link>
          <HomeLink label="Return home" />
        </>
      }
    />
  );
}
