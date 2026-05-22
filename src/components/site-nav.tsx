import { Link } from "@tanstack/react-router";
import { useStreak } from "@/lib/storage";
import { useTheme } from "@/lib/theme";
import { Flame, Moon, Sun } from "lucide-react";

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="hairline inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {isDark ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  );
}

export function Logo({ size = 15 }: { size?: number }) {
  return (
    <Link to="/" className="flex items-center gap-2 text-foreground">
      <span
        aria-hidden
        className="inline-block rounded-full bg-purple"
        style={{ width: 8, height: 8 }}
      />
      <span style={{ fontSize: size, fontWeight: 500, letterSpacing: "-0.01em" }}>
        FactorBeam
      </span>
    </Link>
  );
}

export function Nav({ slim = false }: { slim?: boolean }) {
  const streak = useStreak();
  return (
    <header
      className="sticky top-0 z-40 hairline-b bg-background/85 backdrop-blur"
      style={{ height: slim ? 52 : 60 }}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-5">
          <Logo />
          {slim && (
            <Link
              to="/playbook"
              className="hidden text-[13px] text-muted-foreground hover:text-foreground sm:inline"
            >
              ← All concepts
            </Link>
          )}
        </div>

        {!slim && (
          <nav className="hidden items-center gap-7 md:flex">
            <Link
              to="/playbook"
              className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              Concepts
            </Link>
            <Link
              to="/playbook"
              hash="examples"
              className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              Examples
            </Link>
            <Link
              to="/about"
              className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
            <Link
              to="/glossary"
              className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              Glossary
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-4">
          {streak > 1 && (
            <span className="hidden items-center gap-1 text-[12px] text-muted-foreground md:inline-flex">
              <Flame size={13} />
              {streak}-day streak
            </span>
          )}
          {!slim ? (
            <Link
              to="/playbook"
              className="hairline rounded-md px-3 py-1.5 text-[13px] text-foreground transition-colors hover:bg-muted"
            >
              Start learning →
            </Link>
          ) : null}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="hairline-t mt-24 py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-6 text-[12px] text-muted-foreground sm:flex-row sm:items-center">
        <span>FactorBeam · 2026</span>
        <span>Built for curious minds, not engineers.</span>
      </div>
    </footer>
  );
}
