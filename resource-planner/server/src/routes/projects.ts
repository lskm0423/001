import { Router } from "express";
import { randomUUID } from "node:crypto";
import { db } from "../db.js";

export const projectsRouter = Router();

interface ProjectRow {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: string;
}

function toProject(row: ProjectRow) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    startDate: row.start_date,
    endDate: row.end_date,
    status: row.status,
  };
}

projectsRouter.get("/", (_req, res) => {
  const rows = db.prepare<[], ProjectRow>("SELECT * FROM projects").all();
  res.json(rows.map(toProject));
});

projectsRouter.post("/", (req, res) => {
  const { name, description, startDate, endDate, status } = req.body as {
    name?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
  };

  if (!name || !startDate || !endDate || !status) {
    res.status(400).json({ message: "name, startDate, endDate, status가 필요합니다." });
    return;
  }

  const id = randomUUID();
  db.prepare(
    "INSERT INTO projects (id, name, description, start_date, end_date, status) VALUES (?, ?, ?, ?, ?, ?)",
  ).run(id, name, description ?? "", startDate, endDate, status);

  const row = db.prepare<[string], ProjectRow>("SELECT * FROM projects WHERE id = ?").get(id);
  res.status(201).json(toProject(row!));
});

projectsRouter.get("/:id", (req, res) => {
  const row = db
    .prepare<[string], ProjectRow>("SELECT * FROM projects WHERE id = ?")
    .get(req.params.id);

  if (!row) {
    res.status(404).json({ message: "프로젝트를 찾을 수 없습니다." });
    return;
  }

  res.json(toProject(row));
});
