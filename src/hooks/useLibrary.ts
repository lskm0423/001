import { useEffect, useState } from "react";
import type { LibraryEntryWithBook, ReadingStatus } from "../types";
import { apiGet, apiPatch, apiPost } from "../lib/api";

export function useLibrary(userId: string | undefined) {
  const [entries, setEntries] = useState<LibraryEntryWithBook[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      setEntries([]);
      return;
    }
    setError("");
    apiGet<LibraryEntryWithBook[]>(`/api/library?userId=${userId}`)
      .then(setEntries)
      .catch((err) => {
        setError(err instanceof Error ? err.message : "서재 목록을 불러오지 못했습니다.");
      });
  }, [userId]);

  async function addToLibrary(bookId: string, status: ReadingStatus) {
    if (!userId) return;
    const entry = await apiPost<LibraryEntryWithBook>("/api/library", {
      userId,
      bookId,
      status,
    });
    setEntries((prev) => [...prev, entry]);
    return entry;
  }

  async function updateStatus(entryId: string, status: ReadingStatus) {
    const updated = await apiPatch<LibraryEntryWithBook>(`/api/library/${entryId}`, {
      status,
    });
    setEntries((prev) => prev.map((entry) => (entry.id === entryId ? updated : entry)));
  }

  function getEntryById(entryId: string): LibraryEntryWithBook | undefined {
    return entries.find((entry) => entry.id === entryId);
  }

  return { entries, error, addToLibrary, updateStatus, getEntryById };
}
