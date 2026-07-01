import express from "express";
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

app.use("/api/auth", authRouter);
app.use("/api/books", booksRouter);
app.use("/api/library", libraryRouter);
app.use("/api/summary", summaryRouter);

app.listen(PORT, () => {
  console.log(`Reading log API server listening on port ${PORT}`);
});
