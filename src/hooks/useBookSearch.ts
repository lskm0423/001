import { useState } from "react";
import type { Book } from "../types";
import { apiGet } from "../lib/api";

export function useBookSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function search() {
    const keyword = query.trim();
    if (keyword === "") {
      setResults([]);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const books = await apiGet<Book[]>(`/api/books?q=${encodeURIComponent(keyword)}`);
      setResults(books);
    } catch (err) {
      setError(err instanceof Error ? err.message : "검색에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return { query, setQuery, results, search, loading, error };
}
