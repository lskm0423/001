import { Router } from "express";
import { db } from "../db.js";

export const summaryRouter = Router();

interface CountRow {
  status: string;
  count: number;
}

summaryRouter.get("/", (req, res) => {
  const userId = typeof req.query.userId === "string" ? req.query.userId : "";

  if (userId === "") {
    res.status(400).json({ message: "userId가 필요합니다." });
    return;
  }

  const rows = db
    .prepare<[string], CountRow>(
      "SELECT status, COUNT(*) as count FROM library_entries WHERE user_id = ? GROUP BY status",
    )
    .all(userId);

  const summary = { WANT_TO_READ: 0, READING: 0, DONE: 0 };
  for (const row of rows) {
    if (row.status in summary) {
      summary[row.status as keyof typeof summary] = row.count;
    }
  }

  res.json(summary);
});
