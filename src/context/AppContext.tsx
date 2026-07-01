import { createContext, useContext, type ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { useLibrary } from "../hooks/useLibrary";
import { useReadingRecords } from "../hooks/useReadingRecords";
import { MOCK_LIBRARY_ENTRIES } from "../mocks/libraryEntries";
import { MOCK_READING_RECORDS } from "../mocks/readingRecords";

type AppContextValue = ReturnType<typeof useAuth> &
  ReturnType<typeof useLibrary> &
  ReturnType<typeof useReadingRecords>;

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const library = useLibrary(MOCK_LIBRARY_ENTRIES);
  const readingRecords = useReadingRecords(MOCK_READING_RECORDS);

  const value: AppContextValue = { ...auth, ...library, ...readingRecords };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return ctx;
}
