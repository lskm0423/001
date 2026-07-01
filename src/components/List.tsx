import type { ReactNode } from "react";

interface ListProps<T> {
  items: T[];
  getKey: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  emptyMessage?: string;
}

export default function List<T>({
  items,
  getKey,
  renderItem,
  emptyMessage = "항목이 없습니다.",
}: ListProps<T>) {
  if (items.length === 0) {
    return <div className="list-empty">{emptyMessage}</div>;
  }

  return (
    <ul className="list">
      {items.map((item) => (
        <li key={getKey(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
