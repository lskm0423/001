import { Router } from "express";
import { randomUUID } from "node:crypto";
import { db } from "../db.js";

export const membersRouter = Router();

interface MemberRow {
  id: string;
  name: string;
  role: string;
}

membersRouter.get("/", (_req, res) => {
  const rows = db.prepare<[], MemberRow>("SELECT * FROM members").all();
  res.json(rows);
});

membersRouter.post("/", (req, res) => {
  const { name, role } = req.body as { name?: string; role?: string };

  if (!name || !role) {
    res.status(400).json({ message: "name, role이 필요합니다." });
    return;
  }

  const id = randomUUID();
  db.prepare("INSERT INTO members (id, name, role) VALUES (?, ?, ?)").run(id, name, role);

  res.status(201).json({ id, name, role });
});
