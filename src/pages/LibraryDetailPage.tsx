import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, NavBar, StatusSelect } from "../components";
import { useAppContext } from "../context/AppContext";
import { useReadingRecords } from "../hooks/useReadingRecords";
import { formatDate } from "../utils/date";

export default function LibraryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getEntryById, updateStatus } = useAppContext();
  const { records, addRecord } = useReadingRecords(id);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const entry = id ? getEntryById(id) : undefined;

  if (!entry) {
    return (
      <div>
        <NavBar />
        <p>서재 항목을 찾을 수 없습니다.</p>
      </div>
    );
  }

  async function handleStatusChange(status: Parameters<typeof updateStatus>[1]) {
    setError("");
    try {
      await updateStatus(entry!.id, status);
    } catch (err) {
      setError(err instanceof Error ? err.message : "상태를 변경하지 못했습니다.");
    }
  }

  async function handleAddRecord() {
    if (content.trim() === "") return;
    setError("");
    try {
      await addRecord(content.trim());
      setContent("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "기록을 저장하지 못했습니다.");
    }
  }

  return (
    <div>
      <NavBar />
      <h2>{entry.bookTitle}</h2>
      <p>{entry.bookAuthor}</p>

      <div className="form-field">
        <label htmlFor="status">읽기 상태</label>
        <StatusSelect id="status" value={entry.status} onChange={handleStatusChange} />
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
      {error && <p className="form-error">{error}</p>}

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
