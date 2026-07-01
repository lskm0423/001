import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, NavBar } from "../components";
import { useAppContext } from "../context/AppContext";
import { useBookSearch } from "../hooks/useBookSearch";
import { READING_STATUS_LABEL } from "../utils/readingStatus";
import type { ReadingStatus } from "../types";

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getBookById } = useBookSearch();
  const { addToLibrary } = useAppContext();
  const navigate = useNavigate();
  const [status, setStatus] = useState<ReadingStatus>("WANT_TO_READ");

  const book = id ? getBookById(id) : undefined;

  if (!book) {
    return (
      <div>
        <NavBar />
        <p>도서를 찾을 수 없습니다.</p>
      </div>
    );
  }

  function handleAdd() {
    addToLibrary(book!.id, status);
    navigate("/library");
  }

  return (
    <div>
      <NavBar />
      <h2>{book.title}</h2>
      <p>{book.author}</p>
      <p>{book.description}</p>
      <div className="form-field">
        <label htmlFor="status">읽기 상태</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as ReadingStatus)}
        >
          {Object.entries(READING_STATUS_LABEL).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <Button onClick={handleAdd}>내 서재에 추가</Button>
    </div>
  );
}
