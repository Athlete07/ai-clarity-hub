import { useEffect, useState, useCallback } from "react";

const PROGRESS_KEY = "factorbeam:progress";
const GLOSSARY_KEY = "factorbeam:glossary";
const STREAK_KEY = "factorbeam:streak";

export type Progress = {
  // slug -> "in-progress" | "done"
  [slug: string]: "in-progress" | "done";
};

export type GlossaryEntry = {
  id: string;
  term: string;
  explanation: string;
  addedAt: number;
};

export type StreakState = {
  count: number;
  lastVisit: string; // YYYY-MM-DD
};

const isBrowser = () => typeof window !== "undefined";

function readJson<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent("factorbeam:storage", { detail: { key } }));
  } catch {
    // ignore
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>({});

  useEffect(() => {
    setProgress(readJson<Progress>(PROGRESS_KEY, {}));
    const onChange = () => setProgress(readJson<Progress>(PROGRESS_KEY, {}));
    window.addEventListener("factorbeam:storage", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("factorbeam:storage", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const markDone = useCallback((slug: string) => {
    const next = { ...readJson<Progress>(PROGRESS_KEY, {}), [slug]: "done" as const };
    writeJson(PROGRESS_KEY, next);
    setProgress(next);
  }, []);

  const markInProgress = useCallback((slug: string) => {
    const current = readJson<Progress>(PROGRESS_KEY, {});
    if (current[slug] === "done") return;
    const next = { ...current, [slug]: "in-progress" as const };
    writeJson(PROGRESS_KEY, next);
    setProgress(next);
  }, []);

  return { progress, markDone, markInProgress };
}

export function useGlossary() {
  const [entries, setEntries] = useState<GlossaryEntry[]>([]);

  useEffect(() => {
    setEntries(readJson<GlossaryEntry[]>(GLOSSARY_KEY, []));
    const onChange = () => setEntries(readJson<GlossaryEntry[]>(GLOSSARY_KEY, []));
    window.addEventListener("factorbeam:storage", onChange);
    return () => window.removeEventListener("factorbeam:storage", onChange);
  }, []);

  const add = useCallback((term: string, explanation: string) => {
    const list = readJson<GlossaryEntry[]>(GLOSSARY_KEY, []);
    if (list.some((e) => e.term.trim().toLowerCase() === term.trim().toLowerCase())) return;
    const next = [
      { id: crypto.randomUUID(), term, explanation, addedAt: Date.now() },
      ...list,
    ];
    writeJson(GLOSSARY_KEY, next);
    setEntries(next);
  }, []);

  const remove = useCallback((id: string) => {
    const next = readJson<GlossaryEntry[]>(GLOSSARY_KEY, []).filter((e) => e.id !== id);
    writeJson(GLOSSARY_KEY, next);
    setEntries(next);
  }, []);

  return { entries, add, remove };
}

function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function daysBetween(a: string, b: string): number {
  const da = new Date(a + "T00:00:00");
  const db = new Date(b + "T00:00:00");
  return Math.round((db.getTime() - da.getTime()) / (1000 * 60 * 60 * 24));
}

export function useStreak(): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const t = today();
    const state = readJson<StreakState>(STREAK_KEY, { count: 0, lastVisit: "" });
    let next: StreakState;
    if (!state.lastVisit) {
      next = { count: 1, lastVisit: t };
    } else {
      const diff = daysBetween(state.lastVisit, t);
      if (diff === 0) next = state;
      else if (diff === 1) next = { count: state.count + 1, lastVisit: t };
      else next = { count: 1, lastVisit: t };
    }
    writeJson(STREAK_KEY, next);
    setCount(next.count);
  }, []);

  return count;
}
