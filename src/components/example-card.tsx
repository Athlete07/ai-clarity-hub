import { useState } from "react";
import type { Example } from "@/lib/concepts";
import { ChevronDown } from "lucide-react";

export function ExampleCard({ example, index, defaultOpen = false }: { example: Example; index: number; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <article className="hairline overflow-hidden rounded-xl bg-card">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-5 py-3 text-left hover:bg-muted/40"
      >
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-purple-light px-2 py-0.5 text-[11px] font-medium text-purple-dark">
            Example {index + 1}
          </span>
          <span className="text-[14px] font-medium text-foreground">{example.title}</span>
        </div>
        <ChevronDown
          size={16}
          className="text-muted-foreground transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }}
        />
      </button>
      {open && (
        <div className="hairline-t px-5 py-4 text-[14px] leading-relaxed text-foreground">
          {example.body}
        </div>
      )}
    </article>
  );
}
