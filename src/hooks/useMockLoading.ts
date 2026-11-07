"use client";

import { useEffect, useState } from "react";

/**
 * Simulates a short data fetch so skeleton loaders are visible on first paint.
 * This is UI-only: no network request is made.
 */
export function useMockLoading(delay = 650): boolean {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), delay);
    return () => window.clearTimeout(timer);
  }, [delay]);

  return loading;
}
