import type { ReadingStatus } from "../types";
import { getReadingStatusLabel } from "../utils/readingStatus";

interface StatusBadgeProps {
  status: ReadingStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return <span className="status-badge">{getReadingStatusLabel(status)}</span>;
}
