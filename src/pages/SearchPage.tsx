import { useNavigate } from "react-router-dom";
import { Button, Input, List, NavBar } from "../components";
import { useBookSearch } from "../hooks/useBookSearch";

export default function SearchPage() {
  const { query, setQuery, results, search, error } = useBookSearch();
  const navigate = useNavigate();

  return (
    <div>
      <NavBar />
      <h2>도서 검색</h2>
      <div className="form-field">
        <Input
          placeholder="제목 또는 저자로 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") search();
          }}
        />
        <Button onClick={search}>검색</Button>
      </div>
      {error && <p className="form-error">{error}</p>}
      <List
        items={results}
        getKey={(book) => book.id}
        emptyMessage="검색 결과가 없습니다."
        renderItem={(book) => (
          <div
            className="book-card"
            onClick={() => navigate(`/books/${book.id}`)}
          >
            <div className="book-card-title">{book.title}</div>
            <div className="book-card-author">{book.author}</div>
          </div>
        )}
      />
    </div>
  );
}
