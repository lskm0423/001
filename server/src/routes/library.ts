import { Router } from "express";
import { randomUUID } from "node:crypto";
import { db } from "../db.js";

export const libraryRouter = Router();

interface LibraryEntryRow {
  id: string;
  user_id: string;
  book_id: string;
  status: string;
  added_at: string;
  title: string;
  author: string;
}

interface ReadingRecordRow {
  id: string;
  library_entry_id: string;
  content: string;
  created_at: string;
}

const ENTRY_WITH_BOOK_SQL = `
  SELECT
    le.id, le.user_id, le.book_id, le.status, le.added_at,
    b.title, b.author
  FROM library_entries le
  JOIN books b ON b.id = le.book_id
`;

function toEntry(row: LibraryEntryRow) {
  return {
    id: row.id,
    bookId: row.book_id,
    status: row.status,
    addedAt: row.added_at,
    bookTitle: row.title,
    bookAuthor: row.author,
  };
}

function toRecord(row: ReadingRecordRow) {
  return {
    id: row.id,
    libraryEntryId: row.library_entry_id,
    content: row.content,
    createdAt: row.created_at,
  };
}

libraryRouter.get("/", (req, res) => {
  const userId = typeof req.query.userId === "string" ? req.query.userId : "";

  if (userId === "") {
    res.status(400).json({ message: "userId가 필요합니다." });
    return;
  }

  const rows = db
    .prepare<[string], LibraryEntryRow>(`${ENTRY_WITH_BOOK_SQL} WHERE le.user_id = ?`)
    .all(userId);

  res.json(rows.map(toEntry));
});

libraryRouter.post("/", (req, res) => {
  const { userId, bookId, status } = req.body as {
    userId?: string;
    bookId?: string;
    status?: string;
  };

  if (!userId || !bookId || !status) {
    res.status(400).json({ message: "userId, bookId, status가 필요합니다." });
    return;
  }

  const id = randomUUID();
  const addedAt = new Date().toISOString();

  db.prepare(
    "INSERT INTO library_entries (id, user_id, book_id, status, added_at) VALUES (?, ?, ?, ?, ?)",
  ).run(id, userId, bookId, status, addedAt);

  const row = db
    .prepare<[string], LibraryEntryRow>(`${ENTRY_WITH_BOOK_SQL} WHERE le.id = ?`)
    .get(id);

  res.status(201).json(toEntry(row!));
});

libraryRouter.get("/:id", (req, res) => {
  const row = db
    .prepare<[string], LibraryEntryRow>(`${ENTRY_WITH_BOOK_SQL} WHERE le.id = ?`)
    .get(req.params.id);

  if (!row) {
    res.status(404).json({ message: "서재 항목을 찾을 수 없습니다." });
    return;
  }

  res.json(toEntry(row));
});

libraryRouter.patch("/:id", (req, res) => {
  const { status } = req.body as { status?: string };

  if (!status) {
    res.status(400).json({ message: "status가 필요합니다." });
    return;
  }

  const result = db
    .prepare("UPDATE library_entries SET status = ? WHERE id = ?")
    .run(status, req.params.id);

  if (result.changes === 0) {
    res.status(404).json({ message: "서재 항목을 찾을 수 없습니다." });
    return;
  }

  const row = db
    .prepare<[string], LibraryEntryRow>(`${ENTRY_WITH_BOOK_SQL} WHERE le.id = ?`)
    .get(req.params.id);

  res.json(toEntry(row!));
});

libraryRouter.get("/:id/records", (req, res) => {
  const rows = db
    .prepare<[string], ReadingRecordRow>(
      "SELECT * FROM reading_records WHERE library_entry_id = ? ORDER BY created_at ASC",
    )
    .all(req.params.id);

  res.json(rows.map(toRecord));
});

libraryRouter.post("/:id/records", (req, res) => {
  const { content } = req.body as { content?: string };

  if (!content || content.trim() === "") {
    res.status(400).json({ message: "내용을 입력해 주세요." });
    return;
  }

  const id = randomUUID();
  const createdAt = new Date().toISOString();

  db.prepare(
    "INSERT INTO reading_records (id, library_entry_id, content, created_at) VALUES (?, ?, ?, ?)",
  ).run(id, req.params.id, content.trim(), createdAt);

  res.status(201).json({
    id,
    libraryEntryId: req.params.id,
    content: content.trim(),
    createdAt,
  });
});
