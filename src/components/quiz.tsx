import { useState } from "react";
import type { QuizQuestion } from "@/lib/concepts";
import { Check, HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useGlossary } from "@/lib/storage";

export function Quiz({
  questions,
  onComplete,
  nextSlug,
  nextTitle,
}: {
  questions: QuizQuestion[];
  onComplete: () => void;
  nextSlug?: string;
  nextTitle?: string;
}) {
  const [current, setCurrent] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [wrongFlash, setWrongFlash] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const { entries } = useGlossary();

  const q = questions[current];

  function handlePick(i: number) {
    if (picked !== null) return;
    if (i === q.correct) {
      setPicked(i);
      setTimeout(() => {
        if (current === questions.length - 1) {
          setDone(true);
          onComplete();
        } else {
          setCurrent((c) => c + 1);
          setPicked(null);
        }
      }, 1200);
    } else {
      setWrongFlash(i);
      setTimeout(() => setWrongFlash(null), 2000);
    }
  }

  if (done) {
    return (
      <section className="hairline mt-8 overflow-hidden rounded-xl">
        <div className="bg-purple-light px-5 py-3 text-[13px] font-medium text-purple-dark">
          Concept check · complete
        </div>
        <div className="bg-card px-6 py-8 text-center">
          <div
            className="mx-auto mb-3 flex items-center justify-center rounded-full bg-success-bg text-success"
            style={{ width: 44, height: 44 }}
          >
            <Check size={22} />
          </div>
          <h3 className="text-[17px] font-medium text-foreground">Concept complete!</h3>
          <p className="mx-auto mt-1 max-w-md text-[13px] text-muted-foreground">
            Nicely done. You can move on, or come back to re-read anytime.
          </p>
          <div className="mt-5 rounded-md bg-muted/60 px-4 py-3 text-[12px] text-muted-foreground">
            Added {entries.length} term{entries.length === 1 ? "" : "s"} to your glossary.{" "}
            <Link to="/glossary" className="text-purple hover:underline">
              View glossary →
            </Link>
          </div>
          {nextSlug && (
            <Link
              to="/playbook/$slug"
              params={{ slug: nextSlug }}
              className="mt-6 inline-flex items-center gap-1.5 rounded-md bg-purple px-4 py-2 text-[13px] font-medium text-white hover:bg-purple-dark"
            >
              Next: {nextTitle} <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="hairline mt-8 overflow-hidden rounded-xl">
      <div className="flex items-center gap-2 bg-purple-light px-5 py-3 text-[13px] font-medium text-purple-dark">
        <HelpCircle size={14} />
        Concept check · {current + 1} of {questions.length}
      </div>
      <div className="bg-card px-6 py-6">
        <h3 className="text-[14px] font-medium text-foreground">{q.q}</h3>
        <div className="mt-4 space-y-2">
          {q.options.map((opt, i) => {
            const isCorrectPick = picked === i;
            const isWrongFlash = wrongFlash === i;
            const base =
              "hairline w-full rounded-xl px-4 py-2.5 text-left text-[13px] transition-colors";
            const cls = isCorrectPick
              ? "border-success bg-success-bg text-success"
              : isWrongFlash
                ? "border-error bg-error-bg text-error"
                : picked !== null
                  ? "text-muted-foreground"
                  : "hover:bg-muted";
            return (
              <button
                key={i}
                onClick={() => handlePick(i)}
                className={`${base} ${cls}`}
                disabled={picked !== null}
              >
                {opt}
              </button>
            );
          })}
        </div>
        {picked !== null && (
          <p className="mt-3 text-[12px] text-success">{q.correctFeedback}</p>
        )}
        {wrongFlash !== null && (
          <p className="mt-3 text-[12px] text-error">{q.wrongFeedback}</p>
        )}
      </div>
    </section>
  );
}
