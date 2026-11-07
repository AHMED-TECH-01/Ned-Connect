"use client";

import { ErrorState, HomeLink } from "@/components/layout/ErrorState";
import { RetryButton } from "@/components/modules/RetryButton";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      code="500"
      tone="danger"
      title="Something Went Wrong"
      description="An unexpected error interrupted this page. You can retry the request or return to a safe page."
      helpItems={
        error.digest ? [`Error reference: ${error.digest}`] : undefined
      }
      actions={
        <>
          <RetryButton label="Try again" onRetry={reset} />
          <HomeLink />
        </>
      }
    />
  );
}
