import { Router } from "express";
import { db } from "../db.js";

export const booksRouter = Router();

interface BookRow {
  id: string;
  title: string;
  author: string;
  cover_url: string;
  description: string;
}

function toBook(row: BookRow) {
  return {
    id: row.id,
    title: row.title,
    author: row.author,
    coverUrl: row.cover_url,
    description: row.description,
  };
}

booksRouter.get("/", (req, res) => {
  const q = typeof req.query.q === "string" ? req.query.q.trim() : "";

  if (q === "") {
    res.json([]);
    return;
  }

  const keyword = `%${q}%`;
  const rows = db
    .prepare<[string, string], BookRow>(
      "SELECT * FROM books WHERE title LIKE ? OR author LIKE ?",
    )
    .all(keyword, keyword);

  res.json(rows.map(toBook));
});

booksRouter.get("/:id", (req, res) => {
  const row = db
    .prepare<[string], BookRow>("SELECT * FROM books WHERE id = ?")
    .get(req.params.id);

  if (!row) {
    res.status(404).json({ message: "도서를 찾을 수 없습니다." });
    return;
  }

  res.json(toBook(row));
});
