"use client";

import { createContext, useContext, useState } from "react";

type Ctx = {
  activeSection: string;
  setActiveSection: (s: string) => void;
};

export const ScrollStoryContext = createContext<Ctx>({
  activeSection: "",
  setActiveSection: () => {},
});

export function ScrollStoryProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState("");
  return (
    <ScrollStoryContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ScrollStoryContext.Provider>
  );
}

export function useActiveSection() {
  return useContext(ScrollStoryContext);
}
