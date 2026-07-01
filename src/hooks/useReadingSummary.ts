import { useEffect, useState } from "react";
import type { ReadingStatus } from "../types";
import { apiGet } from "../lib/api";

export function useReadingSummary(userId: string | undefined, refreshKey: unknown) {
  const [summary, setSummary] = useState<Record<ReadingStatus, number>>({
    WANT_TO_READ: 0,
    READING: 0,
    DONE: 0,
  });

  useEffect(() => {
    if (!userId) {
      setSummary({ WANT_TO_READ: 0, READING: 0, DONE: 0 });
      return;
    }
    apiGet<Record<ReadingStatus, number>>(`/api/summary?userId=${userId}`)
      .then(setSummary)
      .catch(() => {
        setSummary({ WANT_TO_READ: 0, READING: 0, DONE: 0 });
      });
  }, [userId, refreshKey]);

  return summary;
}
