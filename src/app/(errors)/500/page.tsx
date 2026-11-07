import type { Metadata } from "next";
import { ErrorState, HomeLink } from "@/components/layout/ErrorState";
import { RetryButton } from "@/components/modules/RetryButton";

export const metadata: Metadata = { title: "Something Went Wrong" };

// "/500" collides with Next.js' reserved error-page output file name when it is
// statically exported, so this route is rendered on demand instead.
export const dynamic = "force-dynamic";

export default function ServerErrorPage() {
  return (
    <ErrorState
      code="500"
      tone="danger"
      title="Something Went Wrong"
      description="We could not complete that request. The issue has been logged and our campus IT team has been notified."
      helpItems={[
        "Refresh the page — most temporary faults clear immediately.",
        "If it keeps happening, report it through Maintenance & Complaints.",
      ]}
      actions={
        <>
          <RetryButton label="Try again" />
          <HomeLink />
        </>
      }
    />
  );
}
