"use client";
import { createContext, useState } from "react";

interface JobsContextType {
  updates: number;
  setUpdates: (value: number) => void;
}

export const JobsContext = createContext<JobsContextType>({
  updates: 0,
  setUpdates: () => { },
});

export default function JobsProvider({ children }: { children: React.ReactNode }) {
  const [updates, setUpdates] = useState(0);

  return (
    <JobsContext.Provider value={{ updates, setUpdates }}>
      {children}
    </JobsContext.Provider>
  );
}