import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, NavBar, StatusBadge } from "../components";
import { useAppContext } from "../context/AppContext";
import { READING_STATUS_LABEL } from "../utils/readingStatus";
import type { ReadingStatus } from "../types";

type Filter = ReadingStatus | "ALL";

export default function LibraryListPage() {
  const { entries, error } = useAppContext();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>("ALL");

  const filteredEntries =
    filter === "ALL" ? entries : entries.filter((entry) => entry.status === filter);

  return (
    <div>
      <NavBar />
      <h2>내 서재</h2>
      <div className="filter-bar">
        <button aria-pressed={filter === "ALL"} onClick={() => setFilter("ALL")}>
          전체
        </button>
        {(Object.keys(READING_STATUS_LABEL) as ReadingStatus[]).map((status) => (
          <button
            key={status}
            aria-pressed={filter === status}
            onClick={() => setFilter(status)}
          >
            {READING_STATUS_LABEL[status]}
          </button>
        ))}
      </div>
      {error && <p className="form-error">{error}</p>}
      <List
        items={filteredEntries}
        getKey={(entry) => entry.id}
        emptyMessage="등록된 도서가 없습니다."
        renderItem={(entry) => (
          <div className="book-card" onClick={() => navigate(`/library/${entry.id}`)}>
            <div>
              <div className="book-card-title">{entry.bookTitle}</div>
              <div className="book-card-author">{entry.bookAuthor}</div>
            </div>
            <StatusBadge status={entry.status} />
          </div>
        )}
      />
    </div>
  );
}
