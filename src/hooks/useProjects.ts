import { useState } from "react";
import type { Project } from "../types";
import { MOCK_PROJECTS } from "../data/mockData";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);

  function addProject(input: Omit<Project, "id">) {
    const project: Project = { ...input, id: crypto.randomUUID() };
    setProjects((prev) => [...prev, project]);
    return project;
  }

  function getProjectById(projectId: string): Project | undefined {
    return projects.find((project) => project.id === projectId);
  }

  return { projects, addProject, getProjectById };
}
