import path from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "..", "data.sqlite");

export const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    nickname TEXT NOT NULL,
    password_hash TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS books (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    cover_url TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS library_entries (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    book_id TEXT NOT NULL REFERENCES books(id),
    status TEXT NOT NULL,
    added_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS reading_records (
    id TEXT PRIMARY KEY,
    library_entry_id TEXT NOT NULL REFERENCES library_entries(id),
    content TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
`);

const seedBooks = [
  {
    id: "book-1",
    title: "코스모스",
    author: "칼 세이건",
    coverUrl: "",
    description: "우주와 인간에 대한 과학 교양서",
  },
  {
    id: "book-2",
    title: "사피엔스",
    author: "유발 하라리",
    coverUrl: "",
    description: "인류의 역사를 다룬 교양서",
  },
  {
    id: "book-3",
    title: "1984",
    author: "조지 오웰",
    coverUrl: "",
    description: "전체주의를 다룬 고전 소설",
  },
];

const insertBook = db.prepare(
  `INSERT OR IGNORE INTO books (id, title, author, cover_url, description) VALUES (@id, @title, @author, @coverUrl, @description)`,
);
for (const book of seedBooks) {
  insertBook.run(book);
}
