import { Router } from "express";
import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import { db } from "../db.js";

export const authRouter = Router();

interface UserRow {
  id: string;
  email: string;
  nickname: string;
  password_hash: string;
}

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    res.status(400).json({ message: "이메일과 비밀번호를 입력해 주세요." });
    return;
  }

  const existing = db
    .prepare<[string], UserRow>("SELECT * FROM users WHERE email = ?")
    .get(email);

  if (existing) {
    const matches = await bcrypt.compare(password, existing.password_hash);
    if (!matches) {
      res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
      return;
    }
    res.json({ id: existing.id, email: existing.email, nickname: existing.nickname });
    return;
  }

  const id = randomUUID();
  const nickname = email.split("@")[0];
  const passwordHash = await bcrypt.hash(password, 10);
  db.prepare(
    "INSERT INTO users (id, email, nickname, password_hash) VALUES (?, ?, ?, ?)",
  ).run(id, email, nickname, passwordHash);

  res.status(201).json({ id, email, nickname });
});
