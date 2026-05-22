import { useEffect, useState } from "react";

export type Theme = "light" | "dark";
const KEY = "factorbeam:theme";

function getInitial(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(KEY) as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function apply(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => getInitial());

  useEffect(() => {
    apply(theme);
    try {
      localStorage.setItem(KEY, theme);
    } catch {}
    window.dispatchEvent(new CustomEvent("factorbeam:theme", { detail: theme }));
  }, [theme]);

  useEffect(() => {
    const onChange = (e: Event) => {
      const next = (e as CustomEvent<Theme>).detail;
      if (next && next !== theme) setTheme(next);
    };
    window.addEventListener("factorbeam:theme", onChange);
    return () => window.removeEventListener("factorbeam:theme", onChange);
  }, [theme]);

  return {
    theme,
    setTheme,
    toggle: () => setTheme(theme === "dark" ? "light" : "dark"),
  };
}
