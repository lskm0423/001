import { useMemo } from "react";
import type { ActualEntry, Task } from "../types";
import { summarizeProjectResources, summarizeTaskResources } from "../utils/resource";

export function useTaskResourceSummary(task: Task | undefined, taskActualEntries: ActualEntry[]) {
  return useMemo(
    () => summarizeTaskResources(task, taskActualEntries),
    [task, taskActualEntries],
  );
}

export function useProjectResourceSummary(projectTasks: Task[], actualEntries: ActualEntry[]) {
  return useMemo(
    () => summarizeProjectResources(projectTasks, actualEntries),
    [projectTasks, actualEntries],
  );
}
