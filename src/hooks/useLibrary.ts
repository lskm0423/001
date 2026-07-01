import { useState } from "react";
import type { LibraryEntry, ReadingStatus } from "../types";

export function useLibrary(initialEntries: LibraryEntry[] = []) {
  const [entries, setEntries] = useState<LibraryEntry[]>(initialEntries);

  function addToLibrary(bookId: string, status: ReadingStatus) {
    const entry: LibraryEntry = {
      id: `entry-${Date.now()}`,
      bookId,
      status,
      addedAt: new Date().toISOString(),
    };
    setEntries((prev) => [...prev, entry]);
    return entry;
  }

  function updateStatus(entryId: string, status: ReadingStatus) {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === entryId ? { ...entry, status } : entry)),
    );
  }

  function getEntryById(entryId: string): LibraryEntry | undefined {
    return entries.find((entry) => entry.id === entryId);
  }

  return { entries, addToLibrary, updateStatus, getEntryById };
}
