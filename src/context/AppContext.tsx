import { createContext, useContext, type ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { useLibrary } from "../hooks/useLibrary";

type AppContextValue = ReturnType<typeof useAuth> & ReturnType<typeof useLibrary>;

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const library = useLibrary(auth.user?.id);

  const value: AppContextValue = { ...auth, ...library };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return ctx;
}
