import { useEffect, useRef, useState } from "react";
import { useGlossary } from "@/lib/storage";

type TooltipState = {
  text: string;
  explanation: string;
  x: number;
  y: number;
};

function genericFallback(text: string): string {
  const trimmed = text.length > 90 ? text.slice(0, 90).trim() + "…" : text.trim();
  return `This part of the concept relates to how the model processes information — in context, "${trimmed}" means roughly: the model is working out a piece of the pattern using everything it has already seen.`;
}

export function HighlightExplainer({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const [tip, setTip] = useState<TooltipState | null>(null);
  const tipRef = useRef<HTMLDivElement | null>(null);
  const { add } = useGlossary();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function onMouseUp(e: MouseEvent) {
      // Ignore clicks inside an open tooltip
      if (tipRef.current && tipRef.current.contains(e.target as Node)) return;

      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) return;
      const selectedText = sel.toString().trim();
      if (selectedText.length < 3) return;

      const range = sel.getRangeAt(0);
      if (!container || !container.contains(range.commonAncestorContainer)) return;

      let node: Node | null = range.commonAncestorContainer;
      let explanation: string | null = null;
      while (node && node !== container) {
        if (node instanceof HTMLElement && node.dataset.explain) {
          explanation = node.dataset.explain;
          break;
        }
        node = node.parentNode;
      }
      if (!explanation) explanation = genericFallback(selectedText);

      const rect = range.getBoundingClientRect();
      const x = rect.left + rect.width / 2 + window.scrollX;
      const y = rect.bottom + window.scrollY + 8;
      setTip({ text: selectedText, explanation, x, y });
      add(selectedText, explanation);
    }

    function onDocClick(e: MouseEvent) {
      if (!tipRef.current) return;
      if (!tipRef.current.contains(e.target as Node)) {
        // Don't close if user is making a new selection
        const sel = window.getSelection();
        if (sel && !sel.isCollapsed) return;
        setTip(null);
      }
    }

    container.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousedown", onDocClick);
    return () => {
      container.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousedown", onDocClick);
    };
  }, [containerRef, add]);

  if (!tip) return null;

  return (
    <div
      ref={tipRef}
      role="dialog"
      className="hairline absolute z-50 rounded-xl bg-card shadow-sm"
      style={{
        left: Math.max(12, Math.min(tip.x - 150, window.innerWidth - 312)),
        top: tip.y,
        maxWidth: 300,
        padding: "14px 16px",
      }}
    >
      <div className="mb-1 text-[10px] font-medium uppercase tracking-wider text-purple-dark">
        Plain English
      </div>
      <div className="text-[13px] leading-relaxed text-foreground">{tip.explanation}</div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground">Saved to glossary</span>
        <button
          onClick={() => setTip(null)}
          className="rounded-md px-2 py-1 text-[12px] text-purple hover:bg-purple-light"
        >
          Got it ✓
        </button>
      </div>
    </div>
  );
}
