import express, { type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import "./db.js";
import { projectsRouter } from "./routes/projects.js";
import { tasksRouter } from "./routes/tasks.js";
import { membersRouter } from "./routes/members.js";
import { assignmentsRouter } from "./routes/assignments.js";
import { actualEntriesRouter } from "./routes/actualEntries.js";

const app = express();
const PORT = process.env.PORT ?? 4001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/projects", projectsRouter);
app.use("/api/tasks", tasksRouter);
app.use("/api/members", membersRouter);
app.use("/api/assignments", assignmentsRouter);
app.use("/api/actual-entries", actualEntriesRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "요청한 경로를 찾을 수 없습니다." });
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "서버 오류가 발생했습니다." });
});

app.listen(PORT, () => {
  console.log(`Resource planner API server listening on port ${PORT}`);
});
