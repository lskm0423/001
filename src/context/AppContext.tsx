import { createContext, useContext, type ReactNode } from "react";
import { useProjects } from "../hooks/useProjects";
import { useTasks } from "../hooks/useTasks";
import { useMembers } from "../hooks/useMembers";
import { useAssignments } from "../hooks/useAssignments";
import { useActualEntries } from "../hooks/useActualEntries";

type AppContextValue = ReturnType<typeof useProjects> &
  ReturnType<typeof useTasks> &
  ReturnType<typeof useMembers> &
  ReturnType<typeof useAssignments> &
  ReturnType<typeof useActualEntries>;

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const projects = useProjects();
  const tasks = useTasks();
  const members = useMembers();
  const assignments = useAssignments();
  const actualEntries = useActualEntries();

  const value: AppContextValue = {
    ...projects,
    ...tasks,
    ...members,
    ...assignments,
    ...actualEntries,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return ctx;
}
