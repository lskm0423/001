import { useEffect, useState } from "react";
import type { Task } from "../types";
import { apiGet, apiPost } from "../lib/api";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiGet<Task[]>("/api/tasks")
      .then(setTasks)
      .catch((err) => {
        setError(err instanceof Error ? err.message : "작업 목록을 불러오지 못했습니다.");
      });
  }, []);

  async function addTask(input: Omit<Task, "id">) {
    const task = await apiPost<Task>("/api/tasks", input);
    setTasks((prev) => [...prev, task]);
    return task;
  }

  function getTasksByProject(projectId: string): Task[] {
    return tasks.filter((task) => task.projectId === projectId);
  }

  function getTaskById(taskId: string): Task | undefined {
    return tasks.find((task) => task.id === taskId);
  }

  return { tasks, tasksError: error, addTask, getTasksByProject, getTaskById };
}
