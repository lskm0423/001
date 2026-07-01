import type { LibraryEntry } from "../types";

export const MOCK_LIBRARY_ENTRIES: LibraryEntry[] = [
  {
    id: "entry-1",
    bookId: "book-1",
    status: "DONE",
    addedAt: "2026-05-01T00:00:00.000Z",
  },
  {
    id: "entry-2",
    bookId: "book-2",
    status: "READING",
    addedAt: "2026-06-10T00:00:00.000Z",
  },
  {
    id: "entry-3",
    bookId: "book-3",
    status: "WANT_TO_READ",
    addedAt: "2026-06-20T00:00:00.000Z",
  },
];
