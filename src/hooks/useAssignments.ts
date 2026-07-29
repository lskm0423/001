import { useEffect, useState } from "react";
import type { Assignment } from "../types";
import { apiGet, apiPost } from "../lib/api";

export function useAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiGet<Assignment[]>("/api/assignments")
      .then(setAssignments)
      .catch((err) => {
        setError(err instanceof Error ? err.message : "인력 배정 목록을 불러오지 못했습니다.");
      });
  }, []);

  async function addAssignment(input: Omit<Assignment, "id">) {
    const assignment = await apiPost<Assignment>("/api/assignments", input);
    setAssignments((prev) => [...prev, assignment]);
    return assignment;
  }

  function getAssignmentsByTask(taskId: string): Assignment[] {
    return assignments.filter((assignment) => assignment.taskId === taskId);
  }

  return { assignments, assignmentsError: error, addAssignment, getAssignmentsByTask };
}
