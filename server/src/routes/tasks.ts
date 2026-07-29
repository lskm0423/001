import { Router } from "express";
import { randomUUID } from "node:crypto";
import { db } from "../db.js";

export const tasksRouter = Router();

interface TaskRow {
  id: string;
  project_id: string;
  name: string;
  planned_start_date: string;
  planned_end_date: string;
  planned_hours: number;
  status: string;
}

function toTask(row: TaskRow) {
  return {
    id: row.id,
    projectId: row.project_id,
    name: row.name,
    plannedStartDate: row.planned_start_date,
    plannedEndDate: row.planned_end_date,
    plannedHours: row.planned_hours,
    status: row.status,
  };
}

tasksRouter.get("/", (req, res) => {
  const projectId = typeof req.query.projectId === "string" ? req.query.projectId : "";

  const rows = projectId
    ? db.prepare<[string], TaskRow>("SELECT * FROM tasks WHERE project_id = ?").all(projectId)
    : db.prepare<[], TaskRow>("SELECT * FROM tasks").all();

  res.json(rows.map(toTask));
});

tasksRouter.post("/", (req, res) => {
  const { projectId, name, plannedStartDate, plannedEndDate, plannedHours, status } = req.body as {
    projectId?: string;
    name?: string;
    plannedStartDate?: string;
    plannedEndDate?: string;
    plannedHours?: number;
    status?: string;
  };

  if (!projectId || !name || !plannedStartDate || !plannedEndDate || !plannedHours || !status) {
    res.status(400).json({
      message: "projectId, name, plannedStartDate, plannedEndDate, plannedHours, status가 필요합니다.",
    });
    return;
  }

  const id = randomUUID();
  db.prepare(
    "INSERT INTO tasks (id, project_id, name, planned_start_date, planned_end_date, planned_hours, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
  ).run(id, projectId, name, plannedStartDate, plannedEndDate, plannedHours, status);

  const row = db.prepare<[string], TaskRow>("SELECT * FROM tasks WHERE id = ?").get(id);
  res.status(201).json(toTask(row!));
});

tasksRouter.get("/:id", (req, res) => {
  const row = db.prepare<[string], TaskRow>("SELECT * FROM tasks WHERE id = ?").get(req.params.id);

  if (!row) {
    res.status(404).json({ message: "작업을 찾을 수 없습니다." });
    return;
  }

  res.json(toTask(row));
});
