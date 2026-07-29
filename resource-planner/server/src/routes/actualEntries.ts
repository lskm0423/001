import { Router } from "express";
import { randomUUID } from "node:crypto";
import { db } from "../db.js";

export const actualEntriesRouter = Router();

interface ActualEntryRow {
  id: string;
  task_id: string;
  member_id: string;
  date: string;
  actual_hours: number;
  note: string;
}

function toActualEntry(row: ActualEntryRow) {
  return {
    id: row.id,
    taskId: row.task_id,
    memberId: row.member_id,
    date: row.date,
    actualHours: row.actual_hours,
    note: row.note,
  };
}

actualEntriesRouter.get("/", (req, res) => {
  const taskId = typeof req.query.taskId === "string" ? req.query.taskId : "";

  const rows = taskId
    ? db
        .prepare<[string], ActualEntryRow>("SELECT * FROM actual_entries WHERE task_id = ?")
        .all(taskId)
    : db.prepare<[], ActualEntryRow>("SELECT * FROM actual_entries").all();

  res.json(rows.map(toActualEntry));
});

actualEntriesRouter.post("/", (req, res) => {
  const { taskId, memberId, date, actualHours, note } = req.body as {
    taskId?: string;
    memberId?: string;
    date?: string;
    actualHours?: number;
    note?: string;
  };

  if (!taskId || !memberId || !date || !actualHours) {
    res.status(400).json({ message: "taskId, memberId, date, actualHours가 필요합니다." });
    return;
  }

  const id = randomUUID();
  db.prepare(
    "INSERT INTO actual_entries (id, task_id, member_id, date, actual_hours, note) VALUES (?, ?, ?, ?, ?, ?)",
  ).run(id, taskId, memberId, date, actualHours, note ?? "");

  const row = db
    .prepare<[string], ActualEntryRow>("SELECT * FROM actual_entries WHERE id = ?")
    .get(id);
  res.status(201).json(toActualEntry(row!));
});
