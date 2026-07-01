import { useState } from "react";
import type { ReadingRecord } from "../types";

export function useReadingRecords() {
  const [records, setRecords] = useState<ReadingRecord[]>([]);

  function addRecord(libraryEntryId: string, content: string) {
    const record: ReadingRecord = {
      id: `record-${Date.now()}`,
      libraryEntryId,
      content,
      createdAt: new Date().toISOString(),
    };
    setRecords((prev) => [...prev, record]);
    return record;
  }

  function getRecordsByEntry(libraryEntryId: string): ReadingRecord[] {
    return records.filter((record) => record.libraryEntryId === libraryEntryId);
  }

  return { records, addRecord, getRecordsByEntry };
}
