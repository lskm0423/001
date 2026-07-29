import { useState } from "react";
import type { ActualEntry } from "../types";
import { MOCK_ACTUAL_ENTRIES } from "../data/mockData";

export function useActualEntries() {
  const [actualEntries, setActualEntries] = useState<ActualEntry[]>(MOCK_ACTUAL_ENTRIES);

  function addActualEntry(input: Omit<ActualEntry, "id">) {
    const entry: ActualEntry = { ...input, id: crypto.randomUUID() };
    setActualEntries((prev) => [...prev, entry]);
    return entry;
  }

  function getEntriesByTask(taskId: string): ActualEntry[] {
    return actualEntries.filter((entry) => entry.taskId === taskId);
  }

  return { actualEntries, addActualEntry, getEntriesByTask };
}
