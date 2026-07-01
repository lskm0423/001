import express, { type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import "./db.js";
import { authRouter } from "./routes/auth.js";
import { booksRouter } from "./routes/books.js";
import { libraryRouter } from "./routes/library.js";
import { summaryRouter } from "./routes/summary.js";

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api/books", booksRouter);
app.use("/api/library", libraryRouter);
app.use("/api/summary", summaryRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "요청한 경로를 찾을 수 없습니다." });
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "서버 오류가 발생했습니다." });
});

app.listen(PORT, () => {
  console.log(`Reading log API server listening on port ${PORT}`);
});
