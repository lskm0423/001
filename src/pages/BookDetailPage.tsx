import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, NavBar, StatusSelect } from "../components";
import { useAppContext } from "../context/AppContext";
import { useBook } from "../hooks/useBook";
import type { ReadingStatus } from "../types";

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { book, loading } = useBook(id);
  const { addToLibrary } = useAppContext();
  const navigate = useNavigate();
  const [status, setStatus] = useState<ReadingStatus>("WANT_TO_READ");
  const [error, setError] = useState("");

  if (loading) {
    return (
      <div>
        <NavBar />
        <p>불러오는 중...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div>
        <NavBar />
        <p>도서를 찾을 수 없습니다.</p>
      </div>
    );
  }

  async function handleAdd() {
    setError("");
    try {
      await addToLibrary(book!.id, status);
      navigate("/library");
    } catch (err) {
      setError(err instanceof Error ? err.message : "서재에 추가하지 못했습니다.");
    }
  }

  return (
    <div>
      <NavBar />
      <h2>{book.title}</h2>
      <p>{book.author}</p>
      <p>{book.description}</p>
      <div className="form-field">
        <label htmlFor="status">읽기 상태</label>
        <StatusSelect id="status" value={status} onChange={setStatus} />
      </div>
      {error && <p className="form-error">{error}</p>}
      <Button onClick={handleAdd}>내 서재에 추가</Button>
    </div>
  );
}
