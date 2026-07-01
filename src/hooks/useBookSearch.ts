import { useState } from "react";
import type { Book } from "../types";
import { apiGet } from "../lib/api";

export function useBookSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  async function search() {
    const keyword = query.trim();
    if (keyword === "") {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const books = await apiGet<Book[]>(`/api/books?q=${encodeURIComponent(keyword)}`);
      setResults(books);
    } finally {
      setLoading(false);
    }
  }

  return { query, setQuery, results, search, loading };
}
