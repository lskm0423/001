import { useEffect, useState } from "react";
import type { ActualEntry } from "../types";
import { apiGet, apiPost } from "../lib/api";

export function useActualEntries() {
  const [actualEntries, setActualEntries] = useState<ActualEntry[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiGet<ActualEntry[]>("/api/actual-entries")
      .then(setActualEntries)
      .catch((err) => {
        setError(err instanceof Error ? err.message : "실적 목록을 불러오지 못했습니다.");
      });
  }, []);

  async function addActualEntry(input: Omit<ActualEntry, "id">) {
    const entry = await apiPost<ActualEntry>("/api/actual-entries", input);
    setActualEntries((prev) => [...prev, entry]);
    return entry;
  }

  function getEntriesByTask(taskId: string): ActualEntry[] {
    return actualEntries.filter((entry) => entry.taskId === taskId);
  }

  return { actualEntries, actualEntriesError: error, addActualEntry, getEntriesByTask };
}
