export type ReadingStatus = "WANT_TO_READ" | "READING" | "DONE";

export interface LibraryEntry {
  id: string;
  bookId: string;
  status: ReadingStatus;
  addedAt: string;
}

export interface LibraryEntryWithBook extends LibraryEntry {
  bookTitle: string;
  bookAuthor: string;
}
