import type { ProjectStatus, TaskStatus } from "../types";

export const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
  planned: "계획",
  in_progress: "진행중",
  completed: "완료",
};

export const TASK_STATUS_LABEL: Record<TaskStatus, string> = {
  planned: "계획",
  in_progress: "진행중",
  completed: "완료",
};
