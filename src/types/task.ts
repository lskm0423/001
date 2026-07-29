export type TaskStatus = "planned" | "in_progress" | "completed";

export interface Task {
  id: string;
  projectId: string;
  name: string;
  plannedStartDate: string;
  plannedEndDate: string;
  plannedHours: number;
  status: TaskStatus;
}
