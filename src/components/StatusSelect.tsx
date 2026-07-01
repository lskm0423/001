import { READING_STATUS_LABEL } from "../utils/readingStatus";
import type { ReadingStatus } from "../types";

interface StatusSelectProps {
  id: string;
  value: ReadingStatus;
  onChange: (status: ReadingStatus) => void;
}

export default function StatusSelect({ id, value, onChange }: StatusSelectProps) {
  return (
    <select id={id} value={value} onChange={(e) => onChange(e.target.value as ReadingStatus)}>
      {Object.entries(READING_STATUS_LABEL).map(([status, label]) => (
        <option key={status} value={status}>
          {label}
        </option>
      ))}
    </select>
  );
}
