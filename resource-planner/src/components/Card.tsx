import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
  onClick?: () => void;
}

export default function Card({ title, children, onClick }: CardProps) {
  return (
    <div className="card" onClick={onClick} role={onClick ? "button" : undefined}>
      {title && <h3 className="card-title">{title}</h3>}
      {children}
    </div>
  );
}
