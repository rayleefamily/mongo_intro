"use client";

import { createContext, useContext } from "react";

export const VisitorNameContext = createContext<string | null>(null);

export function useVisitorName() {
  return useContext(VisitorNameContext);
}
