export type ReadingStatus = "WANT_TO_READ" | "READING" | "DONE";

export interface LibraryEntry {
  id: string;
  bookId: string;
  status: ReadingStatus;
  addedAt: string;
}
