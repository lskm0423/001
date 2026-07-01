import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, NavBar } from "../components";
import { useAppContext } from "../context/AppContext";
import { useBookSearch } from "../hooks/useBookSearch";
import { formatDate } from "../utils/date";
import { READING_STATUS_LABEL } from "../utils/readingStatus";
import type { ReadingStatus } from "../types";

export default function LibraryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getEntryById, updateStatus, getRecordsByEntry, addRecord } =
    useAppContext();
  const { getBookById } = useBookSearch();
  const [content, setContent] = useState("");

  const entry = id ? getEntryById(id) : undefined;

  if (!entry) {
    return (
      <div>
        <NavBar />
        <p>서재 항목을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const book = getBookById(entry.bookId);
  const records = getRecordsByEntry(entry.id);

  function handleAddRecord() {
    if (content.trim() === "") return;
    addRecord(entry!.id, content.trim());
    setContent("");
  }

  return (
    <div>
      <NavBar />
      <h2>{book?.title}</h2>
      <p>{book?.author}</p>

      <div className="form-field">
        <label htmlFor="status">읽기 상태</label>
        <select
          id="status"
          value={entry.status}
          onChange={(e) => updateStatus(entry.id, e.target.value as ReadingStatus)}
        >
          {Object.entries(READING_STATUS_LABEL).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <h3>독서 기록</h3>
      <div className="form-field">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="독서 기록을 남겨보세요"
        />
        <Button onClick={handleAddRecord}>기록 저장</Button>
      </div>

      <ul className="list">
        {records.length === 0 && <li className="list-empty">작성된 기록이 없습니다.</li>}
        {records.map((record) => (
          <li className="record-item" key={record.id}>
            <p>{record.content}</p>
            <time>{formatDate(record.createdAt)}</time>
          </li>
        ))}
      </ul>
    </div>
  );
}
