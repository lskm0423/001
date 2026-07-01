import type { ReadingStatus } from "../types";

export const READING_STATUS_LABEL: Record<ReadingStatus, string> = {
  WANT_TO_READ: "읽고싶음",
  READING: "읽는중",
  DONE: "완료",
};

export function getReadingStatusLabel(status: ReadingStatus): string {
  return READING_STATUS_LABEL[status];
}
