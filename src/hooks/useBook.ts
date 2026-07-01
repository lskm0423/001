import { useEffect, useState } from "react";
import type { Book } from "../types";
import { apiGet } from "../lib/api";

export function useBook(id: string | undefined) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setBook(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    apiGet<Book>(`/api/books/${id}`)
      .then((result) => {
        if (!cancelled) setBook(result);
      })
      .catch(() => {
        if (!cancelled) setBook(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { book, loading };
}
