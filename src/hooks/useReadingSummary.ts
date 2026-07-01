import type { LibraryEntry, ReadingStatus } from "../types";

export function useReadingSummary(entries: LibraryEntry[]) {
  const summary: Record<ReadingStatus, number> = {
    WANT_TO_READ: 0,
    READING: 0,
    DONE: 0,
  };

  for (const entry of entries) {
    summary[entry.status] += 1;
  }

  return summary;
}
