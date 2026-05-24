import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Nav, Footer } from "@/components/site-nav";
import { ExampleCard } from "@/components/example-card";
import { HighlightExplainer } from "@/components/highlight-explainer";
import { Quiz } from "@/components/quiz";
import {
  concepts,
  conceptBySlug,
  nextConcept,
  prevConcept,
  type ConceptBodyBlock,
} from "@/lib/concepts";
import { useProgress } from "@/lib/storage";
import { Clock, Hand, Menu, X, Check } from "lucide-react";

export const Route = createFileRoute("/playbook/$slug")({
  loader: ({ params }) => {
    const concept = conceptBySlug(params.slug);
    if (!concept) throw notFound();
    return { concept };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.concept;
    if (!c) return { meta: [{ title: "Concept — FactorBeam" }] };
    return {
      meta: [
        { title: `${c.title} — AI Playbook · FactorBeam` },
        { name: "description", content: c.summary },
        { property: "og:title", content: `${c.title} — FactorBeam` },
        { property: "og:description", content: c.summary },
        { property: "og:url", content: `/playbook/${c.slug}` },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/playbook/${c.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center text-center">
      <div>
        <h1 className="text-2xl font-medium">Concept not found</h1>
        <Link to="/playbook" className="mt-3 inline-block text-purple hover:underline">
          ← Back to playbook
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ reset }) => {
    const router = useRouter();
    return (
      <div className="flex min-h-screen items-center justify-center text-center">
        <div>
          <h1 className="text-xl font-medium">Something went wrong loading this concept.</h1>
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="mt-3 rounded-md bg-purple px-4 py-2 text-[13px] text-white"
          >
            Try again
          </button>
        </div>
      </div>
    );
  },
  component: ConceptPage,
});

function ConceptPage() {
  const { concept } = Route.useLoaderData() as {
    concept: NonNullable<ReturnType<typeof conceptBySlug>>;
  };
  const { progress, markDone, markInProgress } = useProgress();
  const articleRef = useRef<HTMLElement | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    markInProgress(concept.slug);
  }, [concept.slug, markInProgress]);

  const doneCount = concepts.filter((c) => progress[c.slug] === "done").length;
  const pct = Math.round((doneCount / concepts.length) * 100);
  const next = nextConcept(concept.slug);
  const prev = prevConcept(concept.slug);

  return (
    <div className="min-h-screen">
      {/* Slim top nav with progress */}
      <header
        className="sticky top-0 z-40 hairline-b bg-background/85 backdrop-blur"
        style={{ height: 52 }}
      >
        <div className="mx-auto flex h-full max-w-[1100px] items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              className="rounded-md p-1.5 text-muted-foreground hover:bg-muted lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open concept menu"
            >
              <Menu size={18} />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <span
                className="inline-block rounded-full bg-purple"
                style={{ width: 8, height: 8 }}
              />
              <span className="text-[15px] font-medium">FactorBeam</span>
            </Link>
            <Link
              to="/playbook"
              className="hidden text-[12px] text-muted-foreground hover:text-foreground sm:inline"
            >
              ← All concepts
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-muted-foreground">
              {doneCount} of {concepts.length} · {pct}%
            </span>
            <div className="hidden h-1 w-24 overflow-hidden rounded-full bg-muted sm:block">
              <div className="h-full bg-purple" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1100px]">
        {/* Sidebar */}
        <Sidebar
          currentSlug={concept.slug}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main */}
        <main className="min-w-0 flex-1 px-5 py-9 sm:px-10">
          <article ref={articleRef} className="relative mx-auto max-w-[660px]">
            <HighlightExplainer containerRef={articleRef} />

            <p className="text-[11px] text-muted-foreground">Module 1 › {concept.shortTitle}</p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-[12px]">
              <span className="rounded-md bg-purple-light px-2 py-0.5 text-[11px] font-medium text-purple-dark">
                Concept {concept.number} of {concepts.length}
              </span>
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <Clock size={12} />
                {concept.readingMinutes} min read · {concept.examples.length} examples ·{" "}
                {concept.quiz.length} questions
              </span>
            </div>

            <h1 id="concept" className="mt-4 text-[26px] font-medium leading-snug">
              {concept.title}
            </h1>
            <p className="hairline-b mt-3 pb-5 text-[15px] leading-relaxed text-muted-foreground">
              {concept.summary}
            </p>

            <div
              className="mt-6 rounded-xl bg-purple-light/70 px-5 py-4 text-[14px] text-purple-dark"
              style={{ borderLeft: "3px solid var(--purple)" }}
            >
              <p className="text-[10px] font-medium uppercase tracking-wider text-purple">
                Key takeaway
              </p>
              <p className="mt-1 font-medium leading-relaxed">{concept.keyTakeaway}</p>
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-md bg-muted/60 px-3 py-2 text-[12px] text-muted-foreground">
              <Hand size={13} />
              Select any sentence below to get a plain-English explanation
            </div>

            <div className="mt-7 space-y-5 text-[15px] leading-[1.8] text-foreground">
              {concept.body.map((block, i) => (
                <BodyParagraph key={i} block={block} />
              ))}
            </div>

            {/* Examples */}
            <section id="examples" className="mt-14">
              <p className="section-label">Examples</p>

              <div
                className="mt-3 rounded-xl bg-amber-bg/70 px-5 py-4 text-[14px] italic text-foreground"
                style={{ borderLeft: "3px solid var(--amber)" }}
              >
                {concept.pmCallout}
              </div>

              <div className="mt-5 space-y-3">
                {concept.examples.map((ex, i) => (
                  <ExampleCard key={i} example={ex} index={i} defaultOpen={i === 0} />
                ))}
              </div>
            </section>

            {/* Quiz */}
            <section id="quiz">
              <Quiz
                questions={concept.quiz}
                onComplete={() => markDone(concept.slug)}
                nextSlug={next?.slug}
                nextTitle={next?.shortTitle}
              />
            </section>

            {/* Bottom nav */}
            <div className="hairline-t mt-10 flex flex-wrap items-center justify-between gap-3 pt-5">
              {prev ? (
                <Link
                  to="/playbook/$slug"
                  params={{ slug: prev.slug }}
                  className="hairline rounded-md px-3 py-2 text-[13px] text-foreground hover:bg-muted"
                >
                  ← {prev.shortTitle}
                </Link>
              ) : (
                <span />
              )}
              <span className="text-[12px] text-muted-foreground">
                {progress[concept.slug] === "done" ? (
                  <span className="inline-flex items-center gap-1 text-success">
                    <Check size={12} /> Concept complete
                  </span>
                ) : (
                  "Finish the quiz to mark complete"
                )}
              </span>
              {next ? (
                <Link
                  to="/playbook/$slug"
                  params={{ slug: next.slug }}
                  className={`rounded-md px-3 py-2 text-[13px] font-medium ${
                    progress[concept.slug] === "done"
                      ? "bg-purple text-white hover:bg-purple-dark"
                      : "hairline text-muted-foreground pointer-events-none opacity-60"
                  }`}
                >
                  {next.shortTitle} →
                </Link>
              ) : (
                <Link
                  to="/playbook"
                  className="rounded-md bg-purple px-3 py-2 text-[13px] font-medium text-white hover:bg-purple-dark"
                >
                  Back to playbook
                </Link>
              )}
            </div>
          </article>
        </main>
      </div>
      <Footer />
    </div>
  );
}

function BodyParagraph({ block }: { block: ConceptBodyBlock }) {
  if (block.kind === "h") {
    return (
      <div className="hairline-t mt-10 pt-6">
        <p className="text-[11px] font-medium uppercase tracking-wider text-purple">
          Section {block.number}
        </p>
        <h2 className="mt-1 text-[20px] font-medium leading-snug text-foreground">
          {block.title}
        </h2>
        {block.subtitle && (
          <p className="mt-1 text-[14px] italic text-muted-foreground">{block.subtitle}</p>
        )}
      </div>
    );
  }
  if (block.kind === "take") {
    return (
      <div
        className="rounded-xl bg-purple-light/70 px-5 py-4 text-[14px] text-purple-dark"
        style={{ borderLeft: "3px solid var(--purple)" }}
      >
        <p className="text-[10px] font-medium uppercase tracking-wider text-purple">
          Key takeaway
        </p>
        <p className="mt-1 font-medium leading-relaxed">{block.text}</p>
      </div>
    );
  }
  if (block.kind === "why") {
    return (
      <div
        className="rounded-xl bg-amber-bg/70 px-5 py-4 text-[14px] italic text-foreground"
        style={{ borderLeft: "3px solid var(--amber)" }}
      >
        <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-foreground/70 not-italic">
          Why this matters for you
        </p>
        {block.text}
      </div>
    );
  }
  if (block.kind === "ex") {
    return (
      <div className="hairline rounded-xl bg-card px-5 py-4">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Example
        </p>
        <p className="mt-1 text-[14px] font-medium text-foreground">{block.title}</p>
        <p className="mt-2 text-[14px] leading-relaxed text-foreground/90">{block.body}</p>
      </div>
    );
  }
  if (block.kind === "trans") {
    return (
      <p className="text-[14px] italic leading-relaxed text-muted-foreground">{block.text}</p>
    );
  }
  return (
    <p>
      {block.parts.map((part, i) => {
        if (typeof part === "string") return <span key={i}>{part}</span>;
        return (
          <span
            key={i}
            data-explain={part.explain}
            className="rounded-sm bg-purple-light/40 underline decoration-purple/30 decoration-dotted underline-offset-4 transition-colors hover:bg-purple-light"
          >
            {part.text}
          </span>
        );
      })}
    </p>
  );
}

function Sidebar({
  currentSlug,
  open,
  onClose,
}: {
  currentSlug: string;
  open: boolean;
  onClose: () => void;
}) {
  const { progress } = useProgress();

  const list = (
    <nav className="px-5 py-6">
      <p className="section-label">Module 1 · Foundations</p>
      <ul className="mt-4 space-y-1">
        {concepts.map((c) => {
          const isCurrent = c.slug === currentSlug;
          const done = progress[c.slug] === "done";
          return (
            <li key={c.slug}>
              <Link
                to="/playbook/$slug"
                params={{ slug: c.slug }}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-md px-2.5 py-2 text-[13px] transition-colors ${
                  isCurrent
                    ? "bg-purple-light text-purple-dark"
                    : "text-foreground hover:bg-muted/60"
                }`}
              >
                <span
                  className={`flex items-center justify-center rounded-full text-[10px] font-medium ${
                    done
                      ? "bg-success-bg text-success"
                      : isCurrent
                        ? "bg-purple text-white"
                        : "hairline text-muted-foreground"
                  }`}
                  style={{ width: 20, height: 20 }}
                >
                  {done ? <Check size={11} /> : c.number}
                </span>
                <span className="truncate">{c.shortTitle}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="hairline-t mt-6 pt-5">
        <p className="section-label mb-2">On this page</p>
        <a
          href="#concept"
          className="block py-1 text-[13px] text-muted-foreground hover:text-foreground"
        >
          The concept
        </a>
        <a
          href="#examples"
          className="block py-1 text-[13px] text-muted-foreground hover:text-foreground"
        >
          5 examples
        </a>
        <a
          href="#quiz"
          className="block py-1 text-[13px] text-muted-foreground hover:text-foreground"
        >
          Quiz
        </a>
      </div>
    </nav>
  );

  return (
    <>
      <aside className="hairline-r sticky top-[52px] hidden h-[calc(100vh-52px)] w-[220px] shrink-0 overflow-y-auto bg-background lg:block">
        {list}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/30" onClick={onClose} />
          <div className="absolute left-0 top-0 h-full w-[260px] overflow-y-auto bg-background">
            <div className="hairline-b flex items-center justify-between px-4 py-3">
              <span className="text-[14px] font-medium">Concepts</span>
              <button onClick={onClose} aria-label="Close menu">
                <X size={18} className="text-muted-foreground" />
              </button>
            </div>
            {list}
          </div>
        </div>
      )}
    </>
  );
}
