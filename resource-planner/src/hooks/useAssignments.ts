import { useState } from "react";
import type { Assignment } from "../types";
import { MOCK_ASSIGNMENTS } from "../data/mockData";

export function useAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>(MOCK_ASSIGNMENTS);

  function addAssignment(input: Omit<Assignment, "id">) {
    const assignment: Assignment = { ...input, id: crypto.randomUUID() };
    setAssignments((prev) => [...prev, assignment]);
    return assignment;
  }

  function getAssignmentsByTask(taskId: string): Assignment[] {
    return assignments.filter((assignment) => assignment.taskId === taskId);
  }

  return { assignments, addAssignment, getAssignmentsByTask };
}
