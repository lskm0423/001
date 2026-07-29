import { useState } from "react";
import type { Task } from "../types";
import { MOCK_TASKS } from "../data/mockData";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);

  function addTask(input: Omit<Task, "id">) {
    const task: Task = { ...input, id: crypto.randomUUID() };
    setTasks((prev) => [...prev, task]);
    return task;
  }

  function getTasksByProject(projectId: string): Task[] {
    return tasks.filter((task) => task.projectId === projectId);
  }

  function getTaskById(taskId: string): Task | undefined {
    return tasks.find((task) => task.id === taskId);
  }

  return { tasks, addTask, getTasksByProject, getTaskById };
}
