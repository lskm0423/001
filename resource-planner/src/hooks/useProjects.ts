import { useEffect, useState } from "react";
import type { Project } from "../types";
import { apiGet, apiPost } from "../lib/api";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiGet<Project[]>("/api/projects")
      .then(setProjects)
      .catch((err) => {
        setError(err instanceof Error ? err.message : "프로젝트 목록을 불러오지 못했습니다.");
      });
  }, []);

  async function addProject(input: Omit<Project, "id">) {
    const project = await apiPost<Project>("/api/projects", input);
    setProjects((prev) => [...prev, project]);
    return project;
  }

  function getProjectById(projectId: string): Project | undefined {
    return projects.find((project) => project.id === projectId);
  }

  return { projects, projectsError: error, addProject, getProjectById };
}
