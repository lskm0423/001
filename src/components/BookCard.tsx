import type { Book } from "../types";

interface BookCardProps {
  book: Book;
  onClick?: () => void;
}

export default function BookCard({ book, onClick }: BookCardProps) {
  return (
    <div className="book-card" onClick={onClick}>
      <img src={book.coverUrl} alt={book.title} />
      <div className="book-card-title">{book.title}</div>
      <div className="book-card-author">{book.author}</div>
    </div>
  );
}
