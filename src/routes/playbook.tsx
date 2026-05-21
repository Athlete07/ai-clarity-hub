import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/site-nav";
import { concepts } from "@/lib/concepts";
import { useProgress } from "@/lib/storage";
import { StatusIndicator, StatusBadge } from "@/components/status";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/playbook")({
  head: () => ({
    meta: [
      { title: "The Playbook — FactorBeam" },
      {
        name: "description",
        content: "Seven AI concepts, in order. Start anywhere — there's no wrong order.",
      },
      { property: "og:title", content: "The Playbook — FactorBeam" },
      {
        property: "og:description",
        content: "Seven AI concepts written for non-engineers. Start anywhere.",
      },
      { property: "og:url", content: "/playbook" },
    ],
    links: [{ rel: "canonical", href: "/playbook" }],
  }),
  component: Playbook,
});

function Playbook() {
  const { progress } = useProgress();
  const doneCount = concepts.filter((c) => progress[c.slug] === "done").length;
  const pct = Math.round((doneCount / concepts.length) * 100);

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-[720px] px-6 pt-12 pb-24">
        <h1 className="text-[26px] font-medium">The Playbook</h1>
        <p className="mt-1 text-[14px] text-muted-foreground">
          7 concepts. Start anywhere — there's no wrong order.
        </p>

        <div className="mt-6 flex items-center justify-between text-[12px] text-muted-foreground">
          <span>{doneCount} of {concepts.length} done</span>
          <span>{pct}%</span>
        </div>
        <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-purple transition-all" style={{ width: `${pct}%` }} />
        </div>

        <div className="mt-8 space-y-3">
          {concepts.map((c) => {
            const status =
              progress[c.slug] === "done"
                ? "done"
                : progress[c.slug] === "in-progress"
                  ? "active"
                  : "todo";
            return (
              <Link
                key={c.slug}
                to="/playbook/$slug"
                params={{ slug: c.slug }}
                className="hairline group flex items-center gap-5 rounded-xl bg-card px-6 py-5 transition-colors hover:bg-muted/30"
              >
                <StatusIndicator status={status} number={c.number} size={32} />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-muted-foreground">
                    Concept {c.number} of {concepts.length}
                  </p>
                  <h2 className="mt-0.5 text-[15px] font-medium text-foreground">
                    {c.title}
                  </h2>
                  <p className="mt-1 text-[13px] text-muted-foreground line-clamp-1">
                    {c.summary}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                    <span>~{c.readingMinutes * 5} min</span>
                    <span aria-hidden>·</span>
                    <span>{c.examples.length} examples</span>
                    <span aria-hidden>·</span>
                    <span>{c.quiz.length} questions</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={status} />
                  <ArrowRight
                    size={16}
                    className="text-muted-foreground transition-transform group-hover:translate-x-0.5"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
