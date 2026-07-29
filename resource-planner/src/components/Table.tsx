import type { ReactNode } from "react";

interface Column<T> {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
}

interface TableProps<T> {
  items: T[];
  columns: Column<T>[];
  getKey: (item: T) => string;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}

export default function Table<T>({
  items,
  columns,
  getKey,
  onRowClick,
  emptyMessage = "항목이 없습니다.",
}: TableProps<T>) {
  if (items.length === 0) {
    return <div className="list-empty">{emptyMessage}</div>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr
            key={getKey(item)}
            onClick={onRowClick ? () => onRowClick(item) : undefined}
            className={onRowClick ? "table-row-clickable" : undefined}
          >
            {columns.map((column) => (
              <td key={column.key}>{column.render(item)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
