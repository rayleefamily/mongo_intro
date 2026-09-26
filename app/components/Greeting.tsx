"use client";

import { useVisitorName } from "../context/VisitorNameContext";

export default function Greeting() {
  const name = useVisitorName();

  if (!name) return null;

  return (
    <p className="text-sm font-medium tracking-wide text-mustard">
      Hi，{name}，歡迎光臨台灣芒果
    </p>
  );
}
