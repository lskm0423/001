import { Router } from "express";
import { randomUUID } from "node:crypto";
import { db } from "../db.js";

export const assignmentsRouter = Router();

interface AssignmentRow {
  id: string;
  task_id: string;
  member_id: string;
  allocated_hours: number;
  start_date: string;
  end_date: string;
}

function toAssignment(row: AssignmentRow) {
  return {
    id: row.id,
    taskId: row.task_id,
    memberId: row.member_id,
    allocatedHours: row.allocated_hours,
    startDate: row.start_date,
    endDate: row.end_date,
  };
}

assignmentsRouter.get("/", (req, res) => {
  const taskId = typeof req.query.taskId === "string" ? req.query.taskId : "";

  const rows = taskId
    ? db.prepare<[string], AssignmentRow>("SELECT * FROM assignments WHERE task_id = ?").all(taskId)
    : db.prepare<[], AssignmentRow>("SELECT * FROM assignments").all();

  res.json(rows.map(toAssignment));
});

assignmentsRouter.post("/", (req, res) => {
  const { taskId, memberId, allocatedHours, startDate, endDate } = req.body as {
    taskId?: string;
    memberId?: string;
    allocatedHours?: number;
    startDate?: string;
    endDate?: string;
  };

  if (!taskId || !memberId || !allocatedHours || !startDate || !endDate) {
    res.status(400).json({
      message: "taskId, memberId, allocatedHours, startDate, endDate가 필요합니다.",
    });
    return;
  }

  const id = randomUUID();
  db.prepare(
    "INSERT INTO assignments (id, task_id, member_id, allocated_hours, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)",
  ).run(id, taskId, memberId, allocatedHours, startDate, endDate);

  const row = db
    .prepare<[string], AssignmentRow>("SELECT * FROM assignments WHERE id = ?")
    .get(id);
  res.status(201).json(toAssignment(row!));
});
