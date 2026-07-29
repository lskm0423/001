export type ProjectStatus = "planned" | "in_progress" | "completed";

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
}
