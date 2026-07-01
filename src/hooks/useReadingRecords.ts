import { useEffect, useState } from "react";
import type { ReadingRecord } from "../types";
import { apiGet, apiPost } from "../lib/api";

export function useReadingRecords(libraryEntryId: string | undefined) {
  const [records, setRecords] = useState<ReadingRecord[]>([]);

  useEffect(() => {
    if (!libraryEntryId) {
      setRecords([]);
      return;
    }
    apiGet<ReadingRecord[]>(`/api/library/${libraryEntryId}/records`)
      .then(setRecords)
      .catch(() => setRecords([]));
  }, [libraryEntryId]);

  async function addRecord(content: string) {
    if (!libraryEntryId) return;
    const record = await apiPost<ReadingRecord>(
      `/api/library/${libraryEntryId}/records`,
      { content },
    );
    setRecords((prev) => [...prev, record]);
    return record;
  }

  return { records, addRecord };
}
