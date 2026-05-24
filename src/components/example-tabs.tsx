import { useState } from "react";
import type { Example } from "@/lib/concepts";

export function ExampleTabs({ examples }: { examples: Example[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!examples || examples.length === 0) return null;

  const activeExample = examples[activeIndex];

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-2 border-b border-muted/60 pb-4">
        {examples.map((ex, idx) => {
          const isActive = idx === activeIndex;

          // Try to extract a short company/feature name before a dash or colon
          let shortName = ex.title;
          if (shortName.includes("—")) shortName = shortName.split("—")[0];
          else if (shortName.includes("-")) shortName = shortName.split("-")[0];
          else if (shortName.includes(":")) shortName = shortName.split(":")[0];
          shortName = shortName.trim();

          return (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors \${
                isActive
                  ? "bg-purple text-white shadow-sm"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {shortName}
            </button>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl border border-muted/60 bg-card p-6 shadow-sm">
        <h4 className="text-lg font-semibold text-foreground tracking-tight">
          {activeExample.title}
        </h4>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground whitespace-pre-line">
          {activeExample.body}
        </p>
      </div>
    </div>
  );
}
