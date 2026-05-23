import { concepts } from "@/lib/concepts";
import { Check, Lock } from "lucide-react";
import type { Progress } from "@/lib/storage";

type Status = "done" | "active" | "locked" | "todo";

export function statusFor(slug: string, progress: Progress, allowLocked = false): Status {
  const state = progress[slug];
  if (state === "done") return "done";
  if (state === "in-progress") return "active";
  if (allowLocked) {
    // First non-done concept is active, rest locked
    for (const c of concepts) {
      const s = progress[c.slug];
      if (s === "done") continue;
      if (c.slug === slug) return "active";
      return "locked";
    }
  }
  return "todo";
}

export function StatusIndicator({
  status,
  number,
  size = 28,
}: {
  status: Status;
  number: number;
  size?: number;
}) {
  const base = `flex shrink-0 items-center justify-center rounded-full text-[12px] font-medium`;
  const style = { width: size, height: size };
  if (status === "done")
    return (
      <span className={`${base} bg-success-bg text-success`} style={style} aria-label="Completed">
        <Check size={size * 0.5} />
      </span>
    );
  if (status === "active")
    return (
      <span className={`${base} bg-purple text-white`} style={style}>
        {number}
      </span>
    );
  if (status === "locked")
    return (
      <span className={`${base} bg-muted text-muted-foreground`} style={style} aria-label="Locked">
        <Lock size={size * 0.45} />
      </span>
    );
  return (
    <span className={`${base} hairline text-muted-foreground`} style={style}>
      {number}
    </span>
  );
}

export function StatusBadge({ status }: { status: Status }) {
  if (status === "done")
    return (
      <span className="rounded-md bg-success-bg px-2 py-0.5 text-[11px] font-medium text-success">
        Done
      </span>
    );
  if (status === "active")
    return (
      <span className="rounded-md bg-purple-light px-2 py-0.5 text-[11px] font-medium text-purple-dark">
        In progress
      </span>
    );
  if (status === "locked")
    return (
      <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
        Locked
      </span>
    );
  return (
    <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
      Not started
    </span>
  );
}
