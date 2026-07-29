import type { ActualEntry, Task } from "../types";

export function calculateUtilizationRate(plannedHours: number, actualHours: number): number {
  if (plannedHours <= 0) return 0;
  return Math.round((actualHours / plannedHours) * 100);
}

export function calculateProgress(plannedCount: number, completedCount: number): number {
  if (plannedCount <= 0) return 0;
  return Math.round((completedCount / plannedCount) * 100);
}

export interface ResourceSummary {
  plannedHours: number;
  actualHours: number;
  utilizationRate: number;
  progress: number;
}

export function summarizeProjectResources(
  projectTasks: Task[],
  actualEntries: ActualEntry[],
): ResourceSummary {
  const plannedHours = projectTasks.reduce((sum, task) => sum + task.plannedHours, 0);
  const taskIds = new Set(projectTasks.map((task) => task.id));
  const actualHours = actualEntries
    .filter((entry) => taskIds.has(entry.taskId))
    .reduce((sum, entry) => sum + entry.actualHours, 0);
  const completedCount = projectTasks.filter((task) => task.status === "completed").length;

  return {
    plannedHours,
    actualHours,
    utilizationRate: calculateUtilizationRate(plannedHours, actualHours),
    progress: calculateProgress(projectTasks.length, completedCount),
  };
}

export function summarizeTaskResources(
  task: Task | undefined,
  taskActualEntries: ActualEntry[],
): { plannedHours: number; actualHours: number; utilizationRate: number } {
  const plannedHours = task?.plannedHours ?? 0;
  const actualHours = taskActualEntries.reduce((sum, entry) => sum + entry.actualHours, 0);
  return {
    plannedHours,
    actualHours,
    utilizationRate: calculateUtilizationRate(plannedHours, actualHours),
  };
}
