"use client";

import { useEffect, useState, type FormEvent } from "react";
import { VisitorNameContext } from "../context/VisitorNameContext";

const STORAGE_KEY = "visitorName";

export default function VisitorGate({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setName(stored);
    } catch {
      // localStorage unavailable, fall back to asking every time
    }
    setHydrated(true);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    setName(trimmed);
    try {
      window.localStorage.setItem(STORAGE_KEY, trimmed);
    } catch {
      // ignore write failures (e.g. private browsing)
    }
  };

  return (
    <VisitorNameContext.Provider value={name}>
      {children}

      {hydrated && name === null && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-ink/70 px-6">
          <div className="w-full max-w-sm border border-line bg-paper p-8 text-center shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-mustard">
              Welcome
            </p>
            <h2 className="mt-3 font-serif text-2xl text-ink">歡迎光臨台灣芒果</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              想怎麼稱呼您呢？
            </p>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="請輸入您的稱呼"
                autoFocus
                className="border border-line bg-paper-soft px-4 py-2 text-sm text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none"
              />
              <button
                type="submit"
                className="bg-ink px-7 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-paper transition-colors hover:bg-rust"
              >
                進入官網
              </button>
            </form>
          </div>
        </div>
      )}
    </VisitorNameContext.Provider>
  );
}
