"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function RetryButton({
  label = "Try again",
  onRetry,
}: {
  label?: string;
  onRetry?: () => void;
}) {
  const router = useRouter();
  const [retrying, setRetrying] = useState(false);

  return (
    <Button
      size="lg"
      loading={retrying}
      onClick={() => {
        setRetrying(true);
        if (onRetry) {
          onRetry();
          setRetrying(false);
          return;
        }
        router.refresh();
        window.setTimeout(() => setRetrying(false), 900);
      }}
    >
      {retrying ? null : <RotateCw className="h-4 w-4" />}
      {label}
    </Button>
  );
}
