import { useMemo } from "react";
import type { ActualEntry, Task } from "../types";
import { calculateUtilizationRate } from "../utils/resource";

export interface TaskResourceSummary {
  taskId: string;
  plannedHours: number;
  actualHours: number;
  utilizationRate: number;
}

export interface ProjectResourceSummary {
  plannedHours: number;
  actualHours: number;
  utilizationRate: number;
  progress: number;
}

export function useTaskResourceSummary(
  task: Task | undefined,
  actualEntries: ActualEntry[],
): TaskResourceSummary {
  return useMemo(() => {
    const plannedHours = task?.plannedHours ?? 0;
    const actualHours = actualEntries.reduce((sum, entry) => sum + entry.actualHours, 0);
    return {
      taskId: task?.id ?? "",
      plannedHours,
      actualHours,
      utilizationRate: calculateUtilizationRate(plannedHours, actualHours),
    };
  }, [task, actualEntries]);
}

export function useProjectResourceSummary(
  projectTasks: Task[],
  actualEntries: ActualEntry[],
): ProjectResourceSummary {
  return useMemo(() => {
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
      progress:
        projectTasks.length === 0
          ? 0
          : Math.round((completedCount / projectTasks.length) * 100),
    };
  }, [projectTasks, actualEntries]);
}
