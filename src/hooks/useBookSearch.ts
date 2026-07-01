import { useState } from "react";
import type { Book } from "../types";
import { MOCK_BOOKS } from "../mocks/books";

export function useBookSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);

  function search() {
    const keyword = query.trim().toLowerCase();
    if (keyword === "") {
      setResults([]);
      return;
    }
    setResults(
      MOCK_BOOKS.filter(
        (book) =>
          book.title.toLowerCase().includes(keyword) ||
          book.author.toLowerCase().includes(keyword),
      ),
    );
  }

  function getBookById(id: string): Book | undefined {
    return MOCK_BOOKS.find((book) => book.id === id);
  }

  return { query, setQuery, results, search, getBookById };
}
